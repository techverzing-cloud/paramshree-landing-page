"use client";

import { useId } from "react";
import type { RefObject } from "react";
import { ModalShell } from "@/components/ui/ModalShell";

export interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  heading: string;
  message: string;
  confirmLabel: string;
  closeLabel: string;
  icon?: "envelope" | "phone" | "calendar";
  /** Element that receives focus again on close. Defaults to the trigger. */
  restoreFocusRef?: RefObject<HTMLElement | null>;
}

const icons = {
  envelope: (
    <>
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
      <path
        d="M9 13.5l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  phone: (
    <>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a10.5 10.5 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A15.5 15.5 0 014.5 6.2 2 2 0 016.5 4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 3.5l1.2 2.5 2.5 1.2-2.5 1.2-1.2 2.5-1.2-2.5L12 7.2l2.3-1.2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M9.5 13.5l1.8 1.8 3.4-3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export type SuccessDialogIcon = keyof typeof icons;

/** Shared confirmation dialog used by newsletter, call back and site visit. */
export function SuccessDialog({
  open,
  onClose,
  heading,
  message,
  confirmLabel,
  closeLabel,
  icon = "envelope",
  restoreFocusRef,
}: SuccessDialogProps) {
  const headingId = useId();

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={headingId}
      restoreFocusRef={restoreFocusRef}
      className="max-w-md overflow-hidden rounded-2xl border border-[#e6e1d3] bg-[#F5F1E9] px-6 py-8 text-center shadow-[0_30px_60px_-30px_rgba(66,24,47,0.6)] sm:px-9 sm:py-10"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 200"
        fill="none"
        className="pointer-events-none absolute -left-5 -top-5 h-36 w-24 rotate-12 text-[#87917B]/20"
      >
        <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 200"
        fill="none"
        className="pointer-events-none absolute -bottom-5 -right-5 h-32 w-20 -rotate-12 text-[#A65F42]/15"
      >
        <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#42182F]/50 transition-colors duration-200 hover:bg-[#A65F42]/10 hover:text-[#42182F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="relative">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#A65F42]/30 bg-[#A65F42]/10 text-[#A65F42]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {icons[icon]}
          </svg>
        </span>

        <h2
          id={headingId}
          className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#42182F] sm:text-4xl"
        >
          {heading}
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#35312F]/85">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="group mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#A65F42] px-7 py-3 text-sm font-medium text-[#F5F1E9] shadow-[0_10px_22px_-12px_rgba(166,95,66,0.9)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#8d5235] hover:shadow-[0_16px_30px_-14px_rgba(166,95,66,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9]"
        >
          {confirmLabel}
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
    </ModalShell>
  );
}