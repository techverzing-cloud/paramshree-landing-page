"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { projectIcons } from "@/components/ui/ProjectIcons";
import { developersData } from "@/data/developers";
import type { Developer } from "@/data/developers";

function DeveloperRow({
  developer,
  hidden,
  isFirst,
}: {
  developer: Developer;
  hidden: boolean;
  isFirst: boolean;
}) {
  const isImageRight = developer.layout === "image-right";
  const state = hidden ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0";
  const logoOrder = isImageRight ? "lg:order-1" : "lg:order-3";
  const imageOrder = isImageRight ? "lg:order-3" : "lg:order-1";

  const logoColumn = (
    <div className={`lg:col-span-2 ${logoOrder} transition-all duration-500 ${state}`}>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <Image
          src={developer.logo.path}
          alt={developer.logo.altText}
          width={developer.logo.width}
          height={developer.logo.height}
          className="h-14 w-auto max-w-full object-contain sm:h-16 lg:h-20"
        />
        <EnquiryButton
          label={developer.cta.label}
          href={developer.cta.href}
          intent={developer.cta.intent}
          variant={developer.cta.variant}
          tone={developer.cta.tone}
          className="w-full justify-center px-4 text-center sm:w-auto sm:px-5"
        />
      </div>
    </div>
  );

  const textColumn = (
    <div className={`min-w-0 lg:order-2 lg:col-span-6 transition-all duration-500 delay-100 ${state}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-[#A65F42]">
          {developer.role}
        </span>
        <span className="h-px w-8 bg-[#A65F42]/40" />
      </div>
      <h3 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-[#42182F] break-words">
        {developer.name}
      </h3>
      <p className="mt-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#A65F42]/90">
        {developer.tagline}
      </p>
      <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#35312F]">
        {developer.description}
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-y-6 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-0">
        {developer.features.map((feature, idx) => (
          <li
            key={feature.label}
            className={`relative flex min-w-0 flex-col items-center gap-2 px-2 text-center transition-all duration-500 ${state}`}
            style={{ transitionDelay: `${150 * (idx + 1)}ms` }}
          >
            {idx > 0 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1 left-0 hidden w-px bg-[#d7d0c2] lg:block"
              />
            )}
<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/40 text-[#A65F42]">
                {projectIcons[feature.icon]}
              </span>
            <span className="text-xs sm:text-[13px] leading-snug font-medium text-[#35312F]">
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageColumn = (
    <div className={`lg:col-span-4 ${imageOrder} transition-all duration-500 delay-200 ${state}`}>
      <div
        className={`group relative overflow-hidden ${
          isImageRight
            ? "rounded-l-[3.5rem] rounded-r-[1rem] sm:rounded-l-[6rem] lg:rounded-l-[7rem]"
            : "rounded-r-[3.5rem] rounded-l-[1rem] sm:rounded-r-[6rem] lg:rounded-r-[7rem]"
        }`}
      >
        <Image
          src={developer.image.path}
          alt={developer.image.altText}
          width={developer.image.width}
          height={developer.image.height}
          className="h-[240px] sm:h-[300px] lg:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );

  return (
    <div
      className={`grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 ${
        isFirst ? "" : "border-t border-[#d7d0c2] pt-12 sm:pt-14 lg:pt-20"
      }`}
    >
      {logoColumn}
      {textColumn}
      {imageColumn}
    </div>
  );
}

export function DevelopersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
if (entry.isIntersecting) {
          setIsVisible(true);
          setIsPending(false);
          observer.disconnect();
        } else {
          setIsPending(true);
        }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const hidden = isPending && !isVisible;
  const state = hidden ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0";

  return (
    <section
      id="developers"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-x-hidden bg-[#F5F1E9] py-10 sm:py-14 lg:py-18"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute left-6 top-24 h-44 w-28 text-[#87917B]/40"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute bottom-16 right-6 h-44 w-28 rotate-180 text-[#87917B]/30"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-5 transition-all duration-500 ${state}`}
          >
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#A65F42]">
              {developersData.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
          </div>
          <h2
            className={`mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-[#42182F] transition-all duration-500 delay-100 ${state}`}
          >
            {developersData.title}
          </h2>
          <p
            className={`mt-4 font-serif text-lg sm:text-xl lg:text-2xl italic text-[#35312F]/80 transition-all duration-500 delay-200 ${state}`}
          >
            {developersData.subtitle}
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 space-y-14 sm:space-y-16 lg:space-y-24">
          {developersData.developers.map((developer, idx) => (
            <DeveloperRow
              key={developer.id}
              developer={developer}
              hidden={hidden}
              isFirst={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
