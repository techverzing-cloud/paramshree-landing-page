"use client";

import { siteConfig } from "@/data/site";

interface WhatsAppCtaProps {
  label: string;
  /** Prefilled WhatsApp text. The message is only opened in WhatsApp, never sent here. */
  message: string;
  unconfiguredNotice: string;
  className?: string;
  /** Set false where the card/section cannot fit the disclosure line. */
  showNote?: boolean;
  /** Appended to the button itself, so a card CTA row can match sibling cards. */
  buttonClassName?: string;
}

export function WhatsAppCta({
  label,
  message,
  unconfiguredNotice,
  className = "",
  showNote = true,
  buttonClassName = "",
}: WhatsAppCtaProps) {
  const base = siteConfig.contact.whatsapp?.split("?")[0].trim();
  const href = base ? `${base}?text=${encodeURIComponent(message)}` : undefined;

  const shared =
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9]";

  const arrow = (
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
  );

  if (!href) {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
<span
        aria-disabled="true"
        className={`${shared} cursor-not-allowed border border-[#A65F42] bg-[#A65F42]/12 text-[#42182F]/70 ${buttonClassName}`}
      >
        {label}
        {arrow}
      </span>
        <p className="max-w-sm text-xs leading-relaxed text-[#35312F]/70">
          {unconfiguredNotice}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2.5 ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shared} bg-[#A65F42] text-[#F5F1E9] shadow-sm hover:bg-[#8d5235] hover:shadow-md ${buttonClassName}`}
      >
        {label}
        {arrow}
      </a>
      {showNote ? (
        <p className="text-xs text-[#35312F]/65">
          Opens WhatsApp in a new tab with your message prefilled. Nothing is sent until you
          send it there.
        </p>
      ) : null}
    </div>
  );
}
