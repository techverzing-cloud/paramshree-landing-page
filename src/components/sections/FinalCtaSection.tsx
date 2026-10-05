"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { CallbackRequestModal } from "@/components/ui/CallbackRequestModal";
import { SiteVisitCta } from "@/components/ui/SiteVisitCta";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";
import { finalCtaData } from "@/data/final-cta";
import type { FinalCtaCard } from "@/data/final-cta";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const STAGGER = 120;

const icons: Record<FinalCtaCard["icon"], ReactNode> = {
  phone: <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
  whatsapp: <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
  pin: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 21.5s7-6.2 7-11.1a7 7 0 10-14 0c0 4.9 7 11.1 7 11.1z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.2" r="2.6" />
    </svg>
  ),
};

/** Slightly varied natural neutrals, so the three cards read as a set. */
const cardTones = ["bg-[#FCFAF6]", "bg-[#F1EDE3]", "bg-[#EFF1EA]"];

export function FinalCtaSection() {
  const { ref, state } = useSectionReveal<HTMLElement>();
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const callTriggerRef = useRef<HTMLButtonElement>(null);

  const callCard = finalCtaData.cards[0];
  const whatsappCard = finalCtaData.cards[1];
  const visitCard = finalCtaData.cards[2];

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ctaClassName =
    "group flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#A65F42] px-6 text-sm font-medium text-[#F5F1E9] shadow-sm transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#8d5235] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2";

  const ctaRowClassName = "mt-auto w-full pt-8";

  const cardClassName = (index: number) =>
    `flex h-full flex-col items-center rounded-2xl border border-[#e6e1d3] px-5 py-7 text-center shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lg sm:px-6 sm:py-8 bg-white ${state}`;

  return (
    <section
      id={finalCtaData.id}
      ref={ref}
      aria-labelledby={`${finalCtaData.id}-heading`}
      className="relative scroll-mt-20 overflow-x-hidden border-t border-[#e6e1d3] bg-[#F5F1E9] py-14 sm:py-16 lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute -right-6 -top-8 h-44 w-32 rotate-[20deg] text-[#87917B]/25"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute -bottom-10 -left-8 h-48 w-36 -rotate-[18deg] text-[#A65F42]/15"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-[#A65F42] sm:tracking-[0.36em]">
            <span aria-hidden="true" className="h-px w-7 bg-[#A65F42]/60" />
            {finalCtaData.eyebrow}
            <span aria-hidden="true" className="h-px w-7 bg-[#A65F42]/60" />
          </p>
          <h2
            id={`${finalCtaData.id}-heading`}
            className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#42182F] sm:text-4xl lg:text-5xl"
          >
            {finalCtaData.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#35312F]/85 sm:text-base">
            {finalCtaData.description}
          </p>
        </div>

        <div className="mt-9 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div className={cardClassName(0)} style={{ transitionDelay: "0ms" }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A65F42]/40 text-[#A65F42]">
              {icons[callCard.icon]}
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[#42182F] sm:text-2xl">
              {callCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#35312F]/85">
              {callCard.description}
            </p>
            <div className={ctaRowClassName}>
              <button
                ref={callTriggerRef}
                type="button"
                onClick={() => setIsCallbackOpen(true)}
                className={ctaClassName}
              >
                {callCard.ctaLabel}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                  {arrow}
                </span>
              </button>
            </div>
          </div>

          <div className={cardClassName(1)} style={{ transitionDelay: `${STAGGER}ms` }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A65F42]/40 text-[#A65F42]">
              {icons[whatsappCard.icon]}
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[#42182F] sm:text-2xl">
              {whatsappCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#35312F]/85">
              {whatsappCard.description}
            </p>
            <div className={ctaRowClassName}>
              <WhatsAppCta
                label={whatsappCard.ctaLabel}
                message={finalCtaData.whatsapp.message}
                unconfiguredNotice={finalCtaData.whatsapp.unconfiguredNotice}
                showNote={false}
                buttonClassName={ctaClassName}
              />
            </div>
          </div>

          <div className={cardClassName(2)} style={{ transitionDelay: `${STAGGER * 2}ms` }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#A65F42]/40 text-[#A65F42]">
              {icons[visitCard.icon]}
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[#42182F] sm:text-2xl">
              {visitCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#35312F]/85">
              {visitCard.description}
            </p>
            <div className={ctaRowClassName}>
              <SiteVisitCta
                label={visitCard.ctaLabel}
                tone="ivory"
                className={ctaClassName}
              />
            </div>
          </div>
        </div>
      </div>

      <CallbackRequestModal
        open={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        returnFocusRef={callTriggerRef}
      />
    </section>
  );
}