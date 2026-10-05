"use client";

import { useRef, useState } from "react";
import { SiteVisitModal } from "@/components/ui/SiteVisitModal";

export interface SiteVisitCtaProps {
  label: string;
  /** Visual style; matches the existing EnquiryButton variants. */
  variant?: "primary" | "secondary";
  className?: string;
  /** Hero sits on a dark overlay and needs ivory text. */
  tone?: "white" | "ivory";
}

/**
 * Any site-visit CTA ("Visit a Site", "Plan Your Visit", ...) renders this.
 * It owns only the open state and the shared SiteVisitModal, so the form is
 * never duplicated per button.
 */
export function SiteVisitCta({
  label,
  variant = "primary",
  className = "",
  tone = "white",
}: SiteVisitCtaProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const shared =
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9]";

  const styles =
    variant === "primary"
      ? `bg-[#A65F42] ${tone === "ivory" ? "text-[#F5F1E9]" : "text-white"} shadow-sm hover:bg-[#8d5235] hover:shadow-md`
      : "border border-[#A65F42] text-[#42182F] hover:bg-[#A65F42]/10";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`${shared} ${styles} ${className}`}
      >
        {label}
        <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
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

      <SiteVisitModal
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
      />
    </>
  );
}