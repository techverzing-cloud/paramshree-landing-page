import { NextResponse } from "next/server";
import { contactData } from "@/data/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

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

function parsePayload(body: unknown): { payload: LeadPayload | null; errors: LeadErrors } {
  if (!isRecord(body)) {
    return { payload: null, errors: { fullName: contactData.form.validation.fullNameRequired } };
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const interestedIn = typeof body.interestedIn === "string" ? body.interestedIn.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  const consent = body.consent === true;
  const intent = typeof body.intent === "string" ? body.intent.slice(0, 120) : null;

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
  } else if (!EMAIL_PATTERN.test(email)) {
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function leadSummary(payload: LeadPayload) {
  return [
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Interested In: ${payload.interestedIn}`,
    `Intent: ${payload.intent ?? "not set"}`,
    `Message: ${payload.message || "-"}`,
    `Submitted At: ${new Date().toISOString()}`,
  ].join("\n");
}

async function deliverToGoogleSheets(payload: LeadPayload): Promise<ChannelStatus> {
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
        consent: payload.consent,
        submittedAt: new Date().toISOString(),
      }),
    });

    return { channel: "google-sheets", status: response.ok ? "sent" : "failed" };
  } catch {
    return { channel: "google-sheets", status: "failed" };
  }
}

async function deliverToResend(payload: LeadPayload): Promise<ChannelStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    return { channel: "resend", status: "skipped" };
  }

  const to = (process.env.ENQUIRY_TO_EMAIL ?? process.env.RESEND_TO_EMAIL ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (to.length === 0) {
    return { channel: "resend", status: "skipped" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New SOUL Prakriti enquiry - ${payload.interestedIn}`,
        text: leadSummary(payload),
        html: `<h2>New SOUL Prakriti enquiry</h2><pre>${escapeHtml(leadSummary(payload))}</pre>`,
      }),
    });

    return { channel: "resend", status: response.ok ? "sent" : "failed" };
  } catch {
    return { channel: "resend", status: "failed" };
  }
}

async function deliverToWhatsApp(payload: LeadPayload): Promise<ChannelStatus> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.ENQUIRY_WHATSAPP_TO;

  if (!accessToken || !phoneNumberId || !recipient) {
    return { channel: "whatsapp", status: "skipped" };
  }

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
          text: { preview_url: false, body: `New SOUL Prakriti enquiry\n${leadSummary(payload)}` },
        }),
      }
    );

    return { channel: "whatsapp", status: response.ok ? "sent" : "failed" };
  } catch {
    return { channel: "whatsapp", status: "failed" };
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { payload, errors } = parsePayload(body);

  if (!payload) {
    return NextResponse.json({ error: "validation_failed", errors }, { status: 400 });
  }

  const channels = await Promise.all([
    deliverToGoogleSheets(payload),
    deliverToResend(payload),
    deliverToWhatsApp(payload),
  ]);

  const delivered = channels.filter((channel) => channel.status === "sent");

  if (delivered.length === 0) {
    const configured = channels.filter((channel) => channel.status === "failed").length > 0;

    return NextResponse.json(
      {
        error: configured ? "enquiry_delivery_failed" : "enquiry_delivery_not_configured",
      },
      { status: configured ? 502 : 503 }
    );
  }

  return NextResponse.json(
    { ok: true, channels: channels.filter((channel) => channel.status !== "skipped") },
    { status: 200 }
  );
}
