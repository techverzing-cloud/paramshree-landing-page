"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Leaf, Phone } from "lucide-react";
import { CallbackRequestModal } from "@/components/ui/CallbackRequestModal";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { ModalShell } from "@/components/ui/ModalShell";
import { ctaConfig } from "@/data/cta";
import { siteConfig } from "@/data/site";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const callTriggerRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  // Page-session latch: the popup is offered exactly once, even if the cursor
  // leaves through the top edge again after the user closes it.
  const hasExited = useRef(false);

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget || event.clientY > 0 || hasExited.current) {
        return;
      }
      hasExited.current = true;
      setOpen(true);
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, []);

  const openCallback = () => {
    setOpen(false);
    setIsCallbackOpen(true);
  };

  return (
    <>
      <ModalShell
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={headingId}
        className="max-w-md rounded-3xl border border-[#e6e1d3] bg-white px-5 py-8 text-center shadow-[0_30px_60px_-30px_rgba(66,24,47,0.6)] sm:px-9 sm:py-10"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#42182F]/50 transition-colors duration-200 hover:bg-[#A65F42]/10 hover:text-[#42182F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#A65F42]/30 bg-[#A65F42]/10 text-[#A65F42]">
          <Leaf className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
        </span>

        <h2
          id={headingId}
          className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#42182F] sm:text-4xl"
        >
          Wait! Before You Leave...
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#35312F]/85">
          Share your details and our team will send the price, offers and availability for SOUL
          Prakriti farmhouses and villas near Haridwar.
        </p>

        <div className="mt-7 space-y-3">
          <EnquiryButton
            href={ctaConfig.enquiry.target}
            label={siteConfig.hero.primaryCta.label}
            onNavigate={() => setOpen(false)}
            className="w-full transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          />
          <button
            ref={callTriggerRef}
            type="button"
            onClick={openCallback}
            className="group inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full border border-[#A65F42] px-6 py-3 text-sm font-medium text-[#42182F] transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#A65F42] hover:text-[#F5F1E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <Phone className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12" />
            Call Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-5 text-xs leading-relaxed text-[#35312F]/60 underline underline-offset-4 transition-colors duration-200 hover:text-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40"
        >
          No thanks, I&apos;ll come back later
        </button>
      </ModalShell>

      <CallbackRequestModal
        open={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        returnFocusRef={callTriggerRef}
      />
    </>
  );
}
