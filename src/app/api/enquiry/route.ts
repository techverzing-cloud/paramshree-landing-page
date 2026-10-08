import { NextResponse } from "next/server";
import { contactData } from "@/data/contact";
import {
  PRIVACY_POLICY_VERSION,
  consentRecord,
  type EnquiryConsentRecord,
} from "@/data/privacy";
import { sendEnquiryEmails, type EnquiryEmailResult } from "@/lib/email/resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;
const MAX_BODY_CHARS = 20_000;

const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const DUPLICATE_WINDOW_MS = 10_000;

// ponytail: in-memory, per-instance limits. On serverless these reset per
// cold start/instance - move to a shared store (e.g. Upstash) if abuse persists.
const rateLimitHits = new Map<string, number[]>();
const recentDeliveries = new Map<string, number>();

interface LeadPayload {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
  consent: boolean;
  intent: string | null;
}

type ChannelStatus = {
  channel: "google-sheets" | "resend" | "whatsapp";
  status: "sent" | "skipped" | "failed";
};

type LeadErrors = Partial<
  Record<"fullName" | "phone" | "email" | "interestedIn" | "consent", string>
>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Collapses control characters (header/subject injection) and trims. */
function singleLine(value: string, maxLength: number) {
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").trim().slice(0, maxLength);
}

/** Message keeps newlines but drops carriage returns and other control chars. */
function multiline(value: string, maxLength: number) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitHits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    rateLimitHits.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitHits.set(ip, recent);
  return false;
}

function parsePayload(body: unknown): { payload: LeadPayload | null; errors: LeadErrors } {
  if (!isRecord(body)) {
    return { payload: null, errors: { fullName: contactData.form.validation.fullNameRequired } };
  }

  const fullName = singleLine(typeof body.fullName === "string" ? body.fullName : "", 100);
  const phone = singleLine(typeof body.phone === "string" ? body.phone : "", 20);
  const email = singleLine(typeof body.email === "string" ? body.email : "", 254).toLowerCase();
  const interestedIn =
    typeof body.interestedIn === "string" ? body.interestedIn.trim() : "";
  const message =
    typeof body.message === "string" ? multiline(body.message, 2000) : "";
  const consent = body.consent === true;
  const intent =
    typeof body.intent === "string" ? singleLine(body.intent, 120) : null;

  const errors: LeadErrors = {};
  const { validation } = contactData.form;

  if (!fullName) {
    errors.fullName = validation.fullNameRequired;
  }

  if (!phone) {
    errors.phone = validation.phoneRequired;
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = validation.phoneInvalid;
  }

  if (!email) {
    errors.email = validation.emailRequired;
  } else if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    errors.email = validation.emailInvalid;
  }

  if (!interestedIn) {
    errors.interestedIn = validation.interestedInRequired;
  } else if (!contactData.enquiryOptions.includes(interestedIn)) {
    errors.interestedIn = validation.interestedInRequired;
  }

  if (!consent) {
    errors.consent = validation.consentRequired;
  }

  if (Object.keys(errors).length > 0) {
    return { payload: null, errors };
  }

  return {
    payload: { fullName, phone, email, interestedIn, message, consent, intent },
    errors: {},
  };
}

function buildConsentRecord(): EnquiryConsentRecord {
  return {
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    privacyPolicyVersion: PRIVACY_POLICY_VERSION,
    consentPurpose: consentRecord.purpose,
    source: consentRecord.source,
  };
}

async function deliverToGoogleSheets(
  payload: LeadPayload,
  consent: EnquiryConsentRecord
): Promise<ChannelStatus> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { channel: "google-sheets", status: "skipped" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: payload.fullName,
        phone: payload.phone,
        email: payload.email,
        interestedIn: payload.interestedIn,
        message: payload.message,
        intent: payload.intent,
        consent,
        submittedAt: consent.consentTimestamp,
      }),
    });

    return { channel: "google-sheets", status: response.ok ? "sent" : "failed" };
  } catch {
    return { channel: "google-sheets", status: "failed" };
  }
}

async function deliverToWhatsApp(
  payload: LeadPayload,
  consent: EnquiryConsentRecord
): Promise<ChannelStatus> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.ENQUIRY_WHATSAPP_TO;

  if (!accessToken || !phoneNumberId || !recipient) {
    return { channel: "whatsapp", status: "skipped" };
  }

  const summary = [
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Interested In: ${payload.interestedIn}`,
    `Intent: ${payload.intent ?? "not set"}`,
    `Message: ${payload.message || "-"}`,
    `Submitted At: ${consent.consentTimestamp}`,
    `Consent Given: ${consent.consentGiven}`,
    `Consent Timestamp: ${consent.consentTimestamp}`,
    `Privacy Policy Version: ${consent.privacyPolicyVersion}`,
    `Consent Purpose: ${consent.consentPurpose}`,
    `Consent Source: ${consent.source}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipient.replace(/[^\d]/g, ""),
          type: "text",
          text: {
            preview_url: false,
            body: `New SOUL Prakriti enquiry\n${summary}`,
          },
        }),
      }
    );

    return { channel: "whatsapp", status: response.ok ? "sent" : "failed" };
  } catch {
    return { channel: "whatsapp", status: "failed" };
  }
}

function deliverByEmail(
  payload: LeadPayload,
  origin: string
): Promise<{ channel: ChannelStatus["channel"]; status: EnquiryEmailResult["company"] }> {
  return sendEnquiryEmails({
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    interestedIn: payload.interestedIn,
    message: payload.message,
    intent: payload.intent,
    submittedAt: new Date(),
    origin,
  }).then((result) => ({ channel: "resend", status: result.company }));
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_CHARS) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Pretend success so bots
  // learn nothing.
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { payload, errors } = parsePayload(body);

  if (!payload) {
    return NextResponse.json({ error: "validation_failed", errors }, { status: 400 });
  }

  // Ignore rapid retries of the same enquiry (double click / refresh + resubmit).
  const now = Date.now();
  const lastDelivery = recentDeliveries.get(payload.email);
  if (lastDelivery && now - lastDelivery < DUPLICATE_WINDOW_MS) {
    return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });
  }

  const consent = buildConsentRecord();
  const origin = new URL(request.url).origin;

  const [sheets, whatsapp, emails] = await Promise.all([
    deliverToGoogleSheets(payload, consent),
    deliverToWhatsApp(payload, consent),
    deliverByEmail(payload, origin),
  ]);

  const channels: ChannelStatus[] = [sheets, whatsapp, emails];
  const delivered = channels.filter((channel) => channel.status === "sent");

  if (delivered.length === 0) {
    const configured = channels.some((channel) => channel.status === "failed");

    return NextResponse.json(
      {
        error: configured ? "enquiry_delivery_failed" : "enquiry_delivery_not_configured",
      },
      { status: configured ? 502 : 503 }
    );
  }

  recentDeliveries.set(payload.email, now);

  return NextResponse.json(
    { ok: true, channels: channels.filter((channel) => channel.status !== "skipped") },
    { status: 200 }
  );
}
