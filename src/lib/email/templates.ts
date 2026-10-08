import { siteConfig } from "@/data/site";
import { PRIVACY_POLICY_PATH } from "@/data/privacy";

/** Brand palette mirrored from the landing page (src/app/globals.css, section styles). */
const BRAND = {
  plum: "#42182F",
  terracotta: "#A65F42",
  cream: "#F5F1E9",
  ink: "#35312F",
  border: "#d7d0c2",
  white: "#FFFFFF",
} as const;

const SANS =
  "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";

export interface ContactNotificationInput {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
  intent: string | null;
  submittedAt: Date;
  /** Absolute origin of the site (from the incoming request) for logo/links. */
  origin: string;
}

export interface ContactConfirmationInput {
  fullName: string;
  email: string;
  origin: string;
}

/** Escapes untrusted text before it is placed into an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders the submission time in a consistent, human-readable IST format. */
function formatSubmittedAt(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function brandHeader(logoUrl: string): string {
  return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 18px 0;border-bottom:1px solid ${BRAND.border};">
            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td valign="middle" style="padding-right:12px;">
                  <img src="${logoUrl}" width="46" alt="${escapeHtml(siteConfig.name)}" style="display:block;border:0;height:46px;width:auto;" />
                </td>
                <td valign="middle" style="font-family:${SANS};font-size:17px;font-weight:600;letter-spacing:0.04em;color:${BRAND.plum};">
                  ${escapeHtml(siteConfig.name)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;
}

const CONTACT_EMAIL = siteConfig.contact.email;

/** Mailto line for the company address, empty when not configured. */
function contactEmailHtml(separator: string): string {
  if (!CONTACT_EMAIL) {
    return "";
  }
  return `${separator}<a href="mailto:${escapeHtml(CONTACT_EMAIL)}" style="color:${BRAND.terracotta};text-decoration:underline;">${escapeHtml(CONTACT_EMAIL)}</a>`;
}

function brandFooter(origin: string, note: string): string {
  const privacyUrl = `${origin}${PRIVACY_POLICY_PATH}`;
  return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:18px 0 0 0;border-top:1px solid ${BRAND.border};font-family:${SANS};font-size:12px;line-height:1.6;color:${BRAND.ink};opacity:0.85;">
            ${note}
            <br />
            <a href="${privacyUrl}" style="color:${BRAND.terracotta};text-decoration:underline;">Privacy Policy</a>${contactEmailHtml("&nbsp;|&nbsp;")}
          </td>
        </tr>
      </table>`;
}

function detailRow(label: string, value: string): string {
  return `
          <tr>
            <td valign="top" style="padding:8px 0;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.terracotta};white-space:nowrap;padding-right:18px;">
              ${label}
            </td>
            <td valign="top" style="padding:8px 0;font-family:${SANS};font-size:14px;line-height:1.6;color:${BRAND.ink};">
              ${value}
            </td>
          </tr>`;
}

function document(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:${BRAND.cream};-webkit-text-size-adjust:100%;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background-color:${BRAND.cream};">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:600px;background-color:${BRAND.white};border:1px solid ${BRAND.border};border-radius:16px;">
            <tr>
              <td style="padding:24px 24px 20px 24px;">
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Email sent to the company inbox with the complete enquiry. */
export function contactNotificationEmail(input: ContactNotificationInput): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Contact Enquiry | ${input.fullName} | ${input.interestedIn}`;
  const logoUrl = `${input.origin}/images/logo/logo1.png`;
  const message = input.message || "-";

  const body = `${brandHeader(logoUrl)}
        <h1 style="margin:0 0 4px 0;font-family:${SERIF};font-size:28px;font-weight:600;line-height:1.2;color:${BRAND.plum};">
          New Website Enquiry
        </h1>
        <p style="margin:0 0 14px 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${BRAND.ink};opacity:0.8;">
          A new enquiry has been submitted through the website contact form.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid ${BRAND.border};border-bottom:1px solid ${BRAND.border};">
          ${detailRow("Name", escapeHtml(input.fullName))}
          ${detailRow("Email", escapeHtml(input.email))}
          ${detailRow("Phone", escapeHtml(input.phone))}
          ${detailRow("Interested In", escapeHtml(input.interestedIn))}
          ${input.intent ? detailRow("Intent", escapeHtml(input.intent)) : ""}
          ${detailRow("Submitted", formatSubmittedAt(input.submittedAt))}
        </table>
        <p style="margin:18px 0 6px 0;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.terracotta};">
          Message
        </p>
        <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${BRAND.ink};white-space:pre-wrap;word-break:break-word;">${escapeHtml(message)}</p>
        ${brandFooter(
          input.origin,
          "This email was generated in response to a contact request submitted through our website."
        )}`;

  const html = document(body);

  const text = [
    "New Website Enquiry",
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Interested In: ${input.interestedIn}`,
    input.intent ? `Intent: ${input.intent}` : null,
    `Submitted: ${formatSubmittedAt(input.submittedAt)}`,
    "",
    "Message:",
    message,
    "",
    "This email was generated in response to a contact request submitted through our website.",
    `Privacy Policy: ${input.origin}${PRIVACY_POLICY_PATH}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return { subject, html, text };
}

/** Minimal acknowledgement sent to the person who submitted the form. */
export function contactConfirmationEmail(input: ContactConfirmationInput): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "Thank You for Contacting Us";
  const logoUrl = `${input.origin}/images/logo/logo1.png`;
  const name = escapeHtml(input.fullName);
  const company = escapeHtml(siteConfig.name);

  const body = `${brandHeader(logoUrl)}
        <h1 style="margin:0 0 12px 0;font-family:${SERIF};font-size:26px;font-weight:600;line-height:1.25;color:${BRAND.plum};">
          Thank You, ${name}
        </h1>
        <p style="margin:0 0 14px 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${BRAND.ink};">
          We have received your enquiry submitted through our website. Our team will review
          the information you provided and get in touch with you if we need any additional
          details.
        </p>
        <p style="margin:0 0 14px 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${BRAND.ink};">
          We appreciate your interest in SOUL Prakriti.
        </p>
        <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${BRAND.ink};">
          Regards,<br />
          <strong>${company}</strong>
        </p>
        ${brandFooter(
          input.origin,
          "This email was generated in response to a contact request submitted through our website."
        )}`;

  const html = document(body);

  const text = [
    `Thank You, ${input.fullName}`,
    "",
    "We have received your enquiry submitted through our website. Our team will review the",
    "information you provided and get in touch with you if we need any additional details.",
    "",
    "We appreciate your interest in SOUL Prakriti.",
    "",
    `Regards,`,
    company,
    ...(CONTACT_EMAIL ? [CONTACT_EMAIL] : []),
    "",
    `Privacy Policy: ${input.origin}${PRIVACY_POLICY_PATH}`,
  ].join("\n");

  return { subject, html, text };
}
