"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { contactData } from "@/data/contact";
import { PRIVACY_POLICY_PATH } from "@/data/privacy";
import { useSectionReveal } from "@/hooks/useSectionReveal";

interface EnquiryFormValues {
  fullName: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
  consent: boolean;
}

type EnquiryFormErrors = Partial<Record<keyof EnquiryFormValues, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const emptyValues: EnquiryFormValues = {
  fullName: "",
  phone: "",
  email: "",
  interestedIn: "",
  message: "",
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

function validateValues(values: EnquiryFormValues): EnquiryFormErrors {
  const { validation } = contactData.form;
  const errors: EnquiryFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = validation.fullNameRequired;
  }

  if (!values.phone.trim()) {
    errors.phone = validation.phoneRequired;
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = validation.phoneInvalid;
  }

  if (!values.email.trim()) {
    errors.email = validation.emailRequired;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = validation.emailInvalid;
  }

  if (!values.interestedIn) {
    errors.interestedIn = validation.interestedInRequired;
  }

  if (!values.consent) {
    errors.consent = validation.consentRequired;
  }

  return errors;
}

function resolveIntent(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("intent");
  if (fromQuery) {
    return fromQuery;
  }

  const fromHash = window.location.hash.replace(/^#/, "");
  const [hashPath, hashQuery] = fromHash.split("?");
  if (hashPath !== "enquiry" || !hashQuery) {
    return null;
  }

  return new URLSearchParams(hashQuery).get("intent");
}

function subscribeToLocation(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getServerIntent() {
  return "";
}

export function EnquiryForm() {
  const {
    fields,
    privacyNotice,
    consentLabelPrefix,
    // consentLabelSuffix,
    submitLabel,
    description,
  } = contactData.form;
  const { ref: sectionRef, state: revealState } = useSectionReveal<HTMLDivElement>();
  const [values, setValues] = useState<EnquiryFormValues>(emptyValues);
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const intent = useSyncExternalStore(subscribeToLocation, resolveIntent, getServerIntent);
  const preset = intent
    ? contactData.intentPresets.find((item) => item.intent === intent)
    : undefined;
  const interestedIn = values.interestedIn || preset?.interestedIn || "";

  const updateField = (field: keyof EnquiryFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submission = { ...values, interestedIn };
    const nextErrors = validateValues(submission);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      field?.focus();
      return;
    }

    setSubmitState("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...submission,
          message: submission.message.trim(),
          intent: intent || null,
        }),
      });

      if (response.ok) {
        setValues(emptyValues);
        setSubmitState("success");
        setStatusMessage(contactData.statusMessages.success);
        return;
      }

      if (response.status === 503) {
        setSubmitState("error");
        setStatusMessage(contactData.statusMessages.deliveryUnavailable);
        return;
      }

      const payload = (await response.json().catch(() => null)) as {
        errors?: EnquiryFormErrors;
      } | null;

      if (payload?.errors) {
        setErrors(payload.errors);
      }

      setSubmitState("error");
      setStatusMessage(contactData.statusMessages.genericError);
    } catch {
      setSubmitState("error");
      setStatusMessage(contactData.statusMessages.genericError);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-[#F5F1E9] px-4 py-2.5 text-sm text-[#35312F] placeholder-[#35312F]/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40";
  const inputTone = (field: keyof EnquiryFormValues) =>
    `${inputBase} ${errors[field] ? "border-[#A65F42]" : "border-[#d7d0c2] focus:border-[#A65F42]"}`;

  const labelBase = "mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-[#42182F]";

  return (
    <div ref={sectionRef} className={`transition-all duration-500 ${revealState}`}>
      <form
        ref={formRef}
        id={contactData.form.id}
        onSubmit={handleSubmit}
        noValidate
        className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-[#d7d0c2] bg-[#F5F1E9] p-4 shadow-sm sm:p-5"
      >
        <svg
          viewBox="0 0 120 200"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-1 top-1 h-20 w-14 text-[#87917B]/30"
        >
          <path
            d="M62 190C62 140 60 96 34 46"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      <h3 className="font-serif text-2xl font-semibold text-[#42182F] sm:text-3xl">
        {contactData.form.heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#35312F]/80">{description}</p>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="enquiry-fullName" className={labelBase}>
            {fields.fullName} <span className="text-[#A65F42]">*</span>
          </label>
          <input
            id="enquiry-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "enquiry-fullName-error" : undefined}
            className={inputTone("fullName")}
          />
          {errors.fullName && (
            <p id="enquiry-fullName-error" className="mt-1.5 text-xs text-[#A65F42]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="enquiry-phone" className={labelBase}>
              {fields.phone} <span className="text-[#A65F42]">*</span>
            </label>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
              className={inputTone("phone")}
            />
            {errors.phone && (
              <p id="enquiry-phone-error" className="mt-1.5 text-xs text-[#A65F42]">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="enquiry-email" className={labelBase}>
              {fields.email} <span className="text-[#A65F42]">*</span>
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "enquiry-email-error" : undefined}
              className={inputTone("email")}
            />
            {errors.email && (
              <p id="enquiry-email-error" className="mt-1.5 text-xs text-[#A65F42]">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="enquiry-interestedIn" className={labelBase}>
            {fields.interestedIn} <span className="text-[#A65F42]">*</span>
          </label>
          <div className="relative">
            <select
              id="enquiry-interestedIn"
              name="interestedIn"
              value={interestedIn}
              onChange={(event) => updateField("interestedIn", event.target.value)}
              aria-invalid={Boolean(errors.interestedIn)}
              aria-describedby={errors.interestedIn ? "enquiry-interestedIn-error" : undefined}
              className={`${inputTone("interestedIn")} appearance-none pr-11`}
            >
              <option value="">Select an option</option>
              {contactData.enquiryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#42182F]/70"
            >
              <path
                d="M4 6.5L8 10.5L12 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {errors.interestedIn && (
            <p id="enquiry-interestedIn-error" className="mt-1.5 text-xs text-[#A65F42]">
              {errors.interestedIn}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-message" className={labelBase}>
            {fields.message}
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            style={{
              height: 96
            }}
            rows={2}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${inputTone("message")} resize-y`}
          />
        </div>

        <div className="rounded-xl border border-[#A65F42]/30 bg-[#FCFAF6] p-3">
          <p id="enquiry-privacy-notice" className="text-xs leading-relaxed text-[#35312F]/85">
            {privacyNotice}
          </p>

          <label htmlFor="enquiry-consent" className="mt-2.5 flex cursor-pointer items-start gap-3">
            <input
              id="enquiry-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent
                  ? "enquiry-privacy-notice enquiry-consent-error"
                  : "enquiry-privacy-notice"
              }
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border border-[#d7d0c2] accent-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40"
            />
            <span className="text-xs leading-relaxed text-[#35312F]/85">
              {consentLabelPrefix}
              <Link
                href={PRIVACY_POLICY_PATH}
                className="font-medium text-[#A65F42] underline underline-offset-2 transition-colors duration-200 hover:text-[#8d5235] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40"
              >
                Privacy Policy
              </Link>
              {/* {consentLabelSuffix} <span className="text-[#A65F42]">*</span> */}
            </span>
          </label>
          {errors.consent && (
            <p id="enquiry-consent-error" role="alert" className="mt-1.5 text-xs text-[#A65F42]">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="group mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#A65F42] px-5 py-2.5 text-sm font-medium text-[#F5F1E9] shadow-sm transition-colors duration-200 hover:bg-[#8d5235] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitState === "submitting" ? "Submitting…" : submitLabel}
        <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[1.25rem] text-xs leading-relaxed ${
          submitState === "success" ? "text-[#35312F]" : "text-[#A65F42]"
        }`}
      >
        {statusMessage}
      </p>
      </form>
    </div>
  );
}