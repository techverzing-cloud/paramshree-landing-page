"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Expand, FileText, Home, Leaf, MapPin, Shield, Sparkles, User } from "lucide-react";
import { aboutData } from "@/data/about";
import type { AboutAdvantage, AboutPillar } from "@/data/about";
import { ctaConfig } from "@/data/cta";
import { EnquiryButton } from "@/components/ui/EnquiryButton";

const pillarIcons: Record<AboutPillar["icon"], React.ReactNode> = {
  space: <Expand className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
  privacy: <Shield className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
  nature: <Leaf className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
  experience: <Sparkles className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
};

const advantageIcons: Record<AboutAdvantage["icon"], React.ReactNode> = {
  "badge-check": <BadgeCheck className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />,
  sparkles: <Sparkles className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />,
  home: <Home className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />,
  "map-pin": <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />,
  "file-text": <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />,
  user: <User className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />,
};

const iconComponents = {
  "user-check": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "shield-check": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  headset: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 18a2 2 0 002 2h2v-4H4a2 2 0 00-2 2zM22 18a2 2 0 01-2 2h-2v-4h2a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14V8a8 8 0 1116 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotion = () => {
      if (mediaQuery.matches) {
        setIsVisible(true);
      }
    };

    handleReducedMotion();

    if (mediaQuery.matches) {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";
  const featureRevealClass = isVisible ? "animate-fade-in-up" : "opacity-0";
  const cardRevealClass = isVisible ? "animate-fade-in" : "opacity-0";

  return (
    <section id="about" ref={sectionRef} className="bg-[#F5F1E9] overflow-x-hidden">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col">
            <div className={`flex items-center gap-3 transition-all duration-500 ${revealClass}`}>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.4em] text-[#42182F]">{aboutData.eyebrow}</span>
              <div className="h-px w-12 sm:w-16 bg-[#A65F42]" />
            </div>
            <h2 className={`mt-4 sm:mt-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-[#42182F] break-words transition-all duration-500 delay-100 ${revealClass}`}>
              {aboutData.title}
            </h2>
            <p className={`mt-4 text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#A65F42] font-medium transition-all duration-500 delay-200 ${revealClass}`}>
              {aboutData.subtitle}
            </p>
            <p className={`mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#35312F] transition-all duration-500 delay-300 ${revealClass}`}>
              {aboutData.description}
            </p>
            <div className={`mt-8 sm:mt-10 rounded-2xl bg-[#F5F1E9] p-4 sm:p-6 border border-[#d7d0c2] transition-all duration-500 delay-400 ${revealClass}`}>
              <div className="grid grid-cols-3 items-start gap-2 sm:gap-4">
                {aboutData.trustFeatures.map((feature, idx) => (
                  <div
                    key={feature.title}
                    className={`relative flex min-w-0 flex-col items-center justify-start gap-3 px-1 text-center transition-all duration-500 sm:px-3 ${featureRevealClass}`}
                    style={{ animationDelay: `${500 + idx * 100}ms` }}
                  >
                    {idx < aboutData.trustFeatures.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-1 right-0 w-px bg-[#d7d0c2]"
                      />
                    )}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A65F42] text-[#A65F42] sm:h-12 sm:w-12">
                      {iconComponents[feature.icon]}
                    </div>
                    <h3 className="w-full min-h-[2.5rem] text-xs leading-snug font-medium text-[#42182F] sm:text-sm">{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`relative transition-all duration-700 delay-200 ${revealClass}`}>
            <div className="">
              <Image src={aboutData.image.path} alt={aboutData.image.altText} width={1200} height={800} className="h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] w-full object-cover object-center rounded-2xl" priority />
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 rounded-full bg-[#42182F] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#F5F1E9] shadow-md">
                {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 3c-2 2-4 3-6 3 0 4 2 6 4 8 2-2 4-4 4-8-2 0-4-1-6-3z" stroke="currentColor" strokeWidth="1.25" fill="none" />
                  <path d="M12 3c2 2 4 3 6 3 0 4-2 6-4 8-2-2 4-4 4-8 2 0 4-1 6-3z" stroke="currentColor" strokeWidth="1.25" fill="none" />
                  <circle cx="12" cy="11" r="1" fill="currentColor" />
                </svg> */}
                <span>{aboutData.image.badgeText}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aboutData.cards.map((card, idx) => (
            <div
              key={card.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#F5F1E9] shadow-sm border border-[#e6e1d3] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${cardRevealClass}`}
              style={{ animationDelay: `${700 + idx * 150}ms`, backgroundColor: card.bgColor }}
            >
              <div className="relative h-48 sm:h-56 md:h-52 lg:h-56 w-full overflow-hidden">
                <Image src={card.imagePath} alt={card.altText} width={800} height={600} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex h-full flex-1 flex-col p-6 sm:p-7">
                {card.priceAdvantage ? (
                  <>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
                      {card.priceAdvantage.eyebrow}
                    </span>
                    <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-[#42182F]">
                      {card.priceAdvantage.heading}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#35312F]">
                      {card.priceAdvantage.description}
                    </p>

                    <dl className="mt-5 border-y border-[#42182F]/12">
                      {card.priceAdvantage.facts.map((fact) => (
                        <div
                          key={fact.label}
                          className="flex items-baseline justify-between gap-3 py-2.5"
                        >
                          <dt className="text-xs font-medium uppercase tracking-wide text-[#42182F]/70">
                            {fact.label}
                          </dt>
                          <dd className="text-right text-xs font-semibold text-[#42182F]">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-5">
                      <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
                        {card.priceAdvantage.benefitHeading}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#35312F]/85">
                        {card.priceAdvantage.benefitDescription}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <EnquiryButton
                        label={card.priceAdvantage.ctaLabel}
                        href={ctaConfig.enquiry.target}
                        intent={card.priceAdvantage.ctaIntent}
                        className="w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {card.eyebrow ? (
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
                        {card.eyebrow}
                      </span>
                    ) : null}
                    <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-[#42182F]">{card.title}</h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#35312F]">{card.description}</p>

                    {card.pillars ? (
                      <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6 border-t border-[#42182F]/12 pt-6 min-[360px]:grid-cols-2 sm:gap-x-6">
                        {card.pillars.map((pillar, pillarIdx) => (
                          <li
                            key={pillar.title}
                            className={`group/pillar flex flex-col transition-transform duration-300 hover:-translate-y-0.5 min-[360px]:even:border-l min-[360px]:even:border-[#42182F]/12 min-[360px]:even:pl-5 sm:min-[360px]:even:pl-6 ${featureRevealClass}`}
                            style={{ animationDelay: `${isVisible ? 850 + pillarIdx * 120 : 0}ms` }}
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/60 text-[#A65F42] transition-transform duration-300 group-hover/pillar:scale-110 motion-reduce:group-hover/pillar:scale-100 motion-reduce:hover:translate-y-0">
                              {pillarIcons[pillar.icon]}
                            </span>
                            <h4 className="mt-3 font-serif text-base sm:text-lg font-semibold uppercase tracking-wide text-[#42182F]">
                              {pillar.title}
                            </h4>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-[#35312F]/85">
                              {pillar.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {card.advantages ? (
                      <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 border-t border-[#42182F]/12 pt-5 min-[360px]:grid-cols-2">
                        {card.advantages.map((advantage, advantageIdx) => (
                          <li
                            key={advantage.title}
                            className={`flex flex-col gap-2 ${featureRevealClass}`}
                            style={{ animationDelay: `${isVisible ? 850 + advantageIdx * 120 : 0}ms` }}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/60 text-[#A65F42]">
                                {advantageIcons[advantage.icon]}
                              </span>
                              <h4 className="font-serif text-sm font-semibold uppercase leading-tight tracking-wide text-[#42182F] sm:text-base">
                                {advantage.title}
                              </h4>
                            </span>
                            <p className="text-[13px] leading-relaxed text-[#35312F]/85">
                              {advantage.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {card.conversion ? (
                      <div className="mt-auto pt-6">
                        <div className="border-t border-[#42182F]/12 pt-5">
                          <p className="text-sm leading-relaxed text-[#42182F]/85">
                            {card.conversion.hook}
                          </p>
                          <div className="mt-4">
                            <EnquiryButton
                              label={card.conversion.ctaLabel}
                              href={ctaConfig.enquiry.target}
                              intent={card.conversion.ctaIntent}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}