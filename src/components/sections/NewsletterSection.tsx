"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { newsletterData } from "@/data/newsletter";
import type { BenefitIcon } from "@/data/newsletter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BENEFIT_STAGGER = 70;

const benefitIcons: Record<BenefitIcon, React.ReactNode> = {
  spark: (
    <path
      d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  megaphone: (
    <path
      d="M4 9.5v3a1.5 1.5 0 001.5 1.5H7l7 4V5.5l-7 4H5.5A1.5 1.5 0 004 11zM17 9a3.5 3.5 0 010 4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  leaf: (
    <path
      d="M19 5c-8 0-13 3.5-13 9.5A4.5 4.5 0 0010.5 19C16.5 19 19 13 19 5zM5.5 19.5C7 16.5 9.5 14 13 12.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function NewsletterSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { form, validation, benefits, popup } = newsletterData;

  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      setError(trimmed ? validation.emailInvalid : validation.emailRequired);
      emailRef.current?.focus();
      return;
    }

    // TODO: NEWSLETTER BACKEND INTEGRATION
    //
    // When the backend is ready:
    // 1. Send the subscriber email to the secure server/API.
    // 2. Store the subscriber in Google Sheets.
    // 3. Optionally send a confirmation/notification using Resend.
    // 4. Only show the success popup after the backend confirms success.
    //
    // IMPORTANT:
    // Never expose Resend API keys or Google credentials in this client component.
    // Insert that single awaited call here, map a failure to `setError(...)`,
    // and leave the two lines below as the success path. No UI needs to change.

    setError("");
    setEmail("");
    setIsOpen(true);
  };

  const revealState =
    isVisible || prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section
      id={newsletterData.id}
      ref={sectionRef}
      aria-labelledby={`${newsletterData.id}-heading`}
      className="relative scroll-mt-20 overflow-x-hidden border-t border-[#e6e1d3] bg-[#F5F1E9] py-10 sm:py-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute -right-5 -top-7 h-40 w-28 rotate-[20deg] text-[#87917B]/25"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute -bottom-8 -left-6 h-44 w-32 -rotate-[18deg] text-[#A65F42]/15"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <div
            aria-hidden="true"
            className={`relative hidden h-[15rem] overflow-hidden rounded-2xl border border-[#e6e1d3] lg:block ${revealState}`}
            style={{ transitionDelay: "60ms" }}
          >
            <Image
              src={newsletterData.visual.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 34vw, 0px"
              className="object-cover"
            />
            <span className="absolute inset-0 " />
            <span className="absolute inset-0 " />

            {/* <svg
              viewBox="0 0 120 200"
              fill="none"
              className="absolute left-1/2 top-1/2 h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 text-[#87917B]/55"
            >
              <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg> */}

            <span className="absolute bottom-4 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-[#A65F42]/45" />
            <span className="absolute bottom-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#A65F42]/60" />
          </div>

          <div className={`min-w-0 transition-all duration-500 ${revealState}`}>
            <p className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.32em] text-[#A65F42] sm:text-[11px] sm:tracking-[0.36em]">
              <span aria-hidden="true" className="h-px w-7 bg-[#A65F42]/60" />
              {newsletterData.eyebrow}
            </p>

            <h2
              id={`${newsletterData.id}-heading`}
              className="mt-3 font-serif text-[1.75rem] font-semibold leading-[1.08] tracking-tight text-[#42182F] sm:text-4xl lg:text-[2.75rem]"
            >
              {newsletterData.heading}
            </h2>

            <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#35312F]/80 sm:text-[15px]">
              {newsletterData.description}
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-5 max-w-xl sm:mt-6">
              <div className="rounded-[1.75rem] border border-[#d7d0c2] bg-[#FCFAF6] p-1.5 shadow-[0_1px_2px_rgba(66,24,47,0.04)] transition-[border-color,box-shadow] duration-300 focus-within:border-[#A65F42]/55 focus-within:shadow-[0_12px_30px_-20px_rgba(66,24,47,0.55)] sm:flex sm:items-center sm:gap-1 sm:rounded-full">
                <label
                  htmlFor={`${newsletterData.id}-email`}
                  className="flex min-w-0 flex-1 items-center gap-2.5 px-3.5 py-0 sm:px-4"
                >
                  <span aria-hidden="true" className="shrink-0 text-[#87917B]">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 6.5h16v11H4z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.5 7.5l7.5 5.5 7.5-5.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    ref={emailRef}
                    id={`${newsletterData.id}-email`}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    disabled={isOpen}
                    placeholder={form.emailPlaceholder}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${newsletterData.id}-error` : undefined}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) {
                        setError("");
                      }
                    }}
                    className="min-h-11 w-full min-w-0 flex-1 bg-transparent text-base text-[#35312F] placeholder:text-[#35312F]/45 focus:outline-none disabled:opacity-60"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isOpen}
                  className="group mt-1.5 inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#A65F42] px-6 text-sm font-medium text-[#F5F1E9] shadow-[0_8px_18px_-10px_rgba(166,95,66,0.9)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#8d5235] hover:shadow-[0_14px_26px_-12px_rgba(166,95,66,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAF6] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-0 sm:w-auto"
                >
                  {form.submitLabel}
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
              </div>

              {error && (
                <p
                  id={`${newsletterData.id}-error`}
                  role="alert"
                  className="mt-2.5 pl-4 text-xs leading-relaxed text-[#8d5235]"
                >
                  {error}
                </p>
              )}
            </form>

            <ul className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit.id}
                  style={{ transitionDelay: `${220 + index * BENEFIT_STAGGER}ms` }}
                  className={`flex items-center gap-2 text-[12px] text-[#35312F]/70 transition-all duration-500 ${
                    index > 0 ? "sm:border-l sm:border-[#d7d0c2] sm:pl-5" : ""
                  } ${revealState}`}
                >
                  <span aria-hidden="true" className="shrink-0 text-[#87917B]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      {benefitIcons[benefit.icon]}
                    </svg>
                  </span>
                  {benefit.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SuccessDialog
        open={isOpen}
        onClose={closeModal}
        heading={popup.heading}
        message={popup.message}
        confirmLabel={popup.confirmLabel}
        closeLabel={popup.closeLabel}
        restoreFocusRef={emailRef}
      />
    </section>
  );
}
