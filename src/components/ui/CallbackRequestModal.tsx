"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent, RefObject } from "react";
import { ModalShell } from "@/components/ui/ModalShell";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { isValidEmail, isValidIndianPhone } from "@/lib/validation";
import { callbackData } from "@/data/cta";

const MIN_NAME_LENGTH = 2;

type Field = "fullName" | "phone" | "email" | "preferredTime";

type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const emptyValues: Values = {
  fullName: "",
  phone: "",
  email: "",
  preferredTime: "",
};

function validate(values: Values): Errors {
  const { validation } = callbackData;
  const errors: Errors = {};

  if (values.fullName.trim().length < MIN_NAME_LENGTH) {
    errors.fullName = validation.fullName;
  }

  if (!isValidIndianPhone(values.phone.trim())) {
    errors.phone = validation.phone;
  }

  if (!isValidEmail(values.email)) {
    errors.email = validation.email;
  }

  if (!values.preferredTime) {
    errors.preferredTime = validation.preferredTime;
  }

  return errors;
}

export interface CallbackRequestModalProps {
  open: boolean;
  onClose: () => void;
  /** "Call Now" button that opened the modal, refocused on close. */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function CallbackRequestModal({
  open,
  onClose,
  returnFocusRef,
}: CallbackRequestModalProps) {
  const headingId = useId();
  const { fields, placeholders, success } = callbackData;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});

  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const updateField = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];

    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    // TODO: CALL BACK BACKEND INTEGRATION
    //
    // When the backend is ready:
    // 1. Send the callback request securely to the server/API.
    // 2. Store the lead in Google Sheets/CRM.
    // 3. Optionally send an internal notification using Resend.
    // 4. Only show the success modal after the backend confirms success.
    //
    // IMPORTANT:
    // Never expose Resend API keys, Google credentials,
    // or other secrets in this client component.
    // Await that call here; on failure set a form level error instead of
    // `setIsSubmitted(true)`. No markup changes needed.

    setValues(emptyValues);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SuccessDialog
        open={open}
        onClose={() => {
          setIsSubmitted(false);
          onClose();
        }}
        heading={success.heading}
        message={success.message}
        confirmLabel={success.confirmLabel}
        closeLabel={success.closeLabel}
        icon="phone"
        restoreFocusRef={returnFocusRef}
      />
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-[#FCFAF6] px-4 text-sm text-[#35312F] placeholder:text-[#35312F]/45 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40";

  const inputTone = (field: Field) =>
    `${inputBase} ${errors[field] ? "border-[#A65F42]" : "border-[#d7d0c2] focus:border-[#A65F42]"}`;

  const labelBase = "mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#42182F]";

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={headingId}
      initialFocusRef={firstFieldRef}
      restoreFocusRef={returnFocusRef}
      className="max-w-lg overflow-hidden rounded-[1.5rem] border border-[#e6e1d3] bg-[#F5F1E9] shadow-[0_36px_70px_-32px_rgba(66,24,47,0.65)]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 200"
        fill="none"
        className="pointer-events-none absolute -left-4 -top-4 h-28 w-20 rotate-12 text-[#87917B]/20"
      >
        <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#42182F]/50 transition-colors duration-200 hover:bg-[#A65F42]/10 hover:text-[#42182F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="relative max-h-[85dvh] overflow-y-auto px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-9"
      >
        <h2
          id={headingId}
          className="pr-12 font-serif text-2xl font-semibold leading-tight text-[#42182F] sm:text-3xl"
        >
          {callbackData.heading}
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#35312F]/80">
          {callbackData.description}
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="callback-fullName" className={labelBase}>
              {fields.fullName} <span className="text-[#A65F42]">*</span>
            </label>
            <input
              ref={firstFieldRef}
              id="callback-fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder={placeholders.fullName}
              value={values.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "callback-fullName-error" : undefined}
              className={`${inputTone("fullName")} min-h-11 sm:min-h-12`}
            />
            {errors.fullName && (
              <p id="callback-fullName-error" className="mt-1.5 text-xs text-[#8d5235]">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="callback-phone" className={labelBase}>
                {fields.phone} <span className="text-[#A65F42]">*</span>
              </label>
              <input
                id="callback-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={placeholders.phone}
                value={values.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "callback-phone-error" : undefined}
                className={`${inputTone("phone")} min-h-11 sm:min-h-12`}
              />
              {errors.phone && (
                <p id="callback-phone-error" className="mt-1.5 text-xs text-[#8d5235]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="callback-email" className={labelBase}>
                {fields.email} <span className="text-[#A65F42]">*</span>
              </label>
              <input
                id="callback-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={placeholders.email}
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "callback-email-error" : undefined}
                className={`${inputTone("email")} min-h-11 sm:min-h-12`}
              />
              {errors.email && (
                <p id="callback-email-error" className="mt-1.5 text-xs text-[#8d5235]">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="callback-preferredTime" className={labelBase}>
              {fields.preferredTime} <span className="text-[#A65F42]">*</span>
            </label>
            <div className="relative">
              <select
                id="callback-preferredTime"
                name="preferredTime"
                value={values.preferredTime}
                onChange={(event) => updateField("preferredTime", event.target.value)}
                aria-invalid={Boolean(errors.preferredTime)}
                aria-describedby={
                  errors.preferredTime ? "callback-preferredTime-error" : undefined
                }
                className={`${inputTone("preferredTime")} min-h-11 appearance-none pr-11 sm:min-h-12`}
              >
                <option value="">{placeholders.preferredTime}</option>
                {callbackData.timeOptions.map((option) => (
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
            {errors.preferredTime && (
              <p
                id="callback-preferredTime-error"
                className="mt-1.5 text-xs text-[#8d5235]"
              >
                {errors.preferredTime}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="group mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#A65F42] px-5 text-sm font-medium text-[#F5F1E9] shadow-[0_8px_18px_-10px_rgba(166,95,66,0.9)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#8d5235] hover:shadow-[0_14px_26px_-12px_rgba(166,95,66,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] sm:min-h-12"
        >
          {callbackData.submitLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </form>
    </ModalShell>
  );
}