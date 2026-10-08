/**
 * Single source of truth for privacy/consent metadata.
 *
 * The Privacy Policy page and the enquiry API both import from here so the
 * version stamped into a consent record always matches the published policy.
 *
 * TODO(before production): fill in the official privacy/grievance email and
 * the public website URL below. While they are unset the Privacy Policy page
 * renders the bracketed placeholder from `privacyPlaceholders` and shows a
 * pre-publication warning - never publish with the placeholder still visible,
 * and never publish a made-up address.
 */
export const PRIVACY_POLICY_VERSION = "1.0";

export const PRIVACY_POLICY_PATH = "/privacy-policy";

export const privacyPolicyMeta = {
  title: "Privacy Policy",
  effectiveDate: "08 October 2026",
  lastUpdated: "08 October 2026",
  version: PRIVACY_POLICY_VERSION,
  /** TODO: set the production website URL, e.g. "https://example.com". */
  websiteUrl: "https://www.paramshreeassociates.com" as string | undefined,
  /** TODO: set the official privacy / grievance email before publishing. */
  grievanceEmail: "info@paramshreeassociates.com" as string | undefined,
  /** Data Fiduciary / website operator. */
  owner: "Paramshree Associates",
};

/**
 * Shown only while the matching value above is unset. These bracketed
 * placeholders must be replaced before the site goes live.
 */
export const privacyPlaceholders = {
  websiteUrl: "https://www.paramshreeassociates.com",
  grievanceEmail: "info@paramshreeassociates.com",
} as const;

/** Recorded with every enquiry submission as the consent record. */
export const consentRecord = {
  purpose: "Contact/enquiry response",
  source: "Website Contact Form",
};

export interface EnquiryConsentRecord {
  consentGiven: true;
  consentTimestamp: string;
  privacyPolicyVersion: string;
  consentPurpose: string;
  source: string;
}
