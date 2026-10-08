import { Resend } from "resend";
import { siteConfig } from "@/data/site";
import { contactConfirmationEmail, contactNotificationEmail } from "./templates";

export interface EnquiryEmailPayload {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
  intent: string | null;
  submittedAt: Date;
  /** Absolute origin of the site, derived from the incoming request. */
  origin: string;
}

export type EnquiryEmailStatus = "sent" | "failed" | "skipped";

export interface EnquiryEmailResult {
  /** Company notification - this is the delivery that matters. */
  company: EnquiryEmailStatus;
  /** Best-effort acknowledgement to the submitter. */
  confirmation: EnquiryEmailStatus;
}

/**
 * Sends the company notification (Reply-To: submitter) followed by a minimal
 * acknowledgement to the submitter. Only reads server-side env vars.
 *
 * A confirmation failure never downgrades a successful company delivery.
 */
export async function sendEnquiryEmails(
  payload: EnquiryEmailPayload
): Promise<EnquiryEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TO_EMAIL?.trim();

  if (!apiKey || !to) {
    return { company: "skipped", confirmation: "skipped" };
  }

  // Sender priority: explicit RESEND_FROM_EMAIL (verified domain), legacy
  // ENQUIRY_FROM_EMAIL, then Resend's trial sender - the only sender that works
  // before a domain is verified (delivers to the Resend account address only).
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.ENQUIRY_FROM_EMAIL?.trim() ||
    `${siteConfig.name} <onboarding@resend.dev>`;
  const resend = new Resend(apiKey);

  const notification = contactNotificationEmail(payload);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  });

  if (error) {
    // Log the error type only - never the payload or API details.
    console.error("[enquiry-email] notification send failed:", error.name);
    return { company: "failed", confirmation: "skipped" };
  }

  const confirmation = contactConfirmationEmail({
    fullName: payload.fullName,
    email: payload.email,
    origin: payload.origin,
  });
  const { error: confirmationError } = await resend.emails.send({
    from,
    to: [payload.email],
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
  });

  if (confirmationError) {
    console.error("[enquiry-email] confirmation send failed:", confirmationError.name);
    return { company: "sent", confirmation: "failed" };
  }

  return { company: "sent", confirmation: "sent" };
}
