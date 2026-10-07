"use client";

import { useState } from "react";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { faqData } from "@/data/contact";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export function FaqSection() {
  const { ref, state } = useSectionReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={faqData.id} ref={ref} className="relative overflow-x-hidden bg-[#42182F] py-10 sm:py-14 lg:py-18">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg viewBox="0 0 120 200" fill="none" className="absolute -left-4 top-10 h-52 w-32 text-[#87917B]/30">
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 120 200" fill="none" className="absolute -right-6 bottom-6 h-56 w-36 rotate-180 text-[#87917B]/25">
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className={`lg:col-span-5 transition-all duration-500 ${state}`}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#A65F42]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42]">
                {faqData.eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-[#F5F1E9]">
              {faqData.heading}
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-[#87917B]">
              {faqData.subtitle}
            </p>
            <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-[#F5F1E9]/75">
              {faqData.description}
            </p>
            <div className="mt-7">
              <EnquiryButton
                label={faqData.ctaLabel}
                href="#enquiry"
                intent={faqData.ctaIntent}
                tone="ivory"
                className="w-full justify-center px-4 text-center sm:w-auto sm:px-5"
              />
            </div>
          </div>

          <div className={`lg:col-span-7 transition-all duration-500 delay-100 ${state}`}>
            <ul className="divide-y divide-[#F5F1E9]/15 border-y border-[#F5F1E9]/15">
              {faqData.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const buttonId = `faq-button-${idx}`;
                const panelId = `faq-panel-${idx}`;

                return (
                  <li key={item.question}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 hover:text-[#F5F1E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#35312F] sm:py-5"
                      >
                        <span className="text-sm sm:text-base font-medium text-[#F5F1E9]/90 transition-colors duration-200 group-hover:text-[#F5F1E9]">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/60 text-[#A65F42]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3.5v9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              className={`origin-center transition-transform duration-300 motion-reduce:transition-none ${
                                isOpen ? "scale-y-0" : "scale-y-100"
                              }`}
                            />
                            <path
                              d="M3.5 8h9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden" inert={!isOpen}>
                        <p className="pb-5 pr-8 text-sm leading-relaxed text-[#F5F1E9]/75 sm:text-[15px]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
