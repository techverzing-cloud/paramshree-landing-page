"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CalendarClock,
  ChevronRight,
  Eye,
  Home,
  IndianRupee,
  Layers,
  Maximize,
} from "lucide-react";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { ProjectImageFrame } from "@/components/ui/ProjectImageFrame";
import { projectsData } from "@/data/projects";
import type { ProjectFact, ProjectShowcase } from "@/data/projects";
import { ctaConfig } from "@/data/cta";

const factIcons: Record<ProjectFact["icon"], React.ReactNode> = {
  home: <Home className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />,
  maximize: (
    <Maximize className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
  ),
  eye: <Eye className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />,
  layers: <Layers className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />,
  rupee: (
    <IndianRupee className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
  ),
  calendar: (
    <CalendarClock className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
  ),
  building: (
    <Building2 className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
  ),
};

function FactsPanel({
  facts,
  isVisible,
}: {
  facts: ProjectFact[];
  isVisible: boolean;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-[#d7d0c2] bg-[#F5F1E9]/60 p-6 sm:p-7">
      <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
        Property Details
      </h4>
      <ul className="mt-1 divide-y divide-[#42182F]/8">
        {facts.map((fact, idx) => (
          <li
            key={fact.label}
            className={`flex items-center gap-3 py-2.5 transition-all duration-500 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${isVisible ? 300 + idx * 60 : 0}ms` }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A65F42]/10 text-[#A65F42]">
              {factIcons[fact.icon]}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#42182F]/60">
              {fact.label}
            </span>
            <span className="ml-auto text-right text-xs font-semibold text-[#42182F]">
              {fact.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectShowcaseRow({
  showcase,
  isVisible,
}: {
  showcase: ProjectShowcase;
  isVisible: boolean;
}) {
  const galleryLayout = showcase.gallery.map((img, idx) => ({
    img,
    className:
      showcase.gallery.length === 3 && idx === 0
        ? "col-span-2 aspect-[16/9]"
        : "aspect-[4/3]",
  }));

  return (
    <article className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-6">
      <div className="col-span-2 relative">
        <div
          className={`top-0 absolute w-full h-full left-0 aspect-[16/10] overflow-hidden rounded-3xl transition-all duration-500  ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Image
            src={showcase.primaryImage.path}
            alt={showcase.primaryImage.altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover scale-105"
          />
        </div>

        <div
          className={`flex flex-col rounded-3xl border h-full border-[#d7d0c2] bg-[#F5F1E9]/60 p-6 transition-all duration-500 delay-100 sm:p-5 min-w-0 lg:col-span-1 w-1/2 ml-auto max-w-full box-border ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
            {showcase.eyebrow}
            <span className="h-px w-6 bg-[#A65F42]/40" />
          </span>
          <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight text-[#42182F] sm:text-3xl">
            {showcase.title}
          </h3>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#A65F42]/90 sm:text-xs">
            {showcase.subtitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#35312F] sm:text-base">
            {showcase.description}
          </p>
          <div className="mt-auto pt-6">
            <EnquiryButton
              label={showcase.cta.label}
              href={ctaConfig.enquiry.target}
              intent={showcase.cta.intent}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-2 gap-3 transition-all duration-500 delay-200 lg:col-span-1 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {galleryLayout.map(({ img, className }) => (
          <div
            key={img.path}
            className={`relative overflow-hidden rounded-2xl ${className}`}
          >
            <Image
              src={img.path}
              alt={img.altText}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div
        className={`transition-all duration-500 delay-300 lg:col-span-1 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <FactsPanel facts={showcase.facts} isVisible={isVisible} />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showContent = () => {
      if (mediaQuery.matches) {
        setIsVisible(true);
      }
    };

    showContent();

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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";
  const { timeline, villa, farmhouse, location } = projectsData;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-x-hidden bg-[#F5F1E9] py-10 sm:py-14 lg:py-18"
    >
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-5 transition-all duration-500 ${revealClass}`}
          >
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42] sm:text-xs">
              {projectsData.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
          </div>
          <h2
            className={`mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#42182F] transition-all duration-500 delay-100 sm:text-4xl lg:text-5xl ${revealClass}`}
          >
            {projectsData.title}
          </h2>
          <p
            className={`mt-4 font-serif text-lg italic text-[#35312F]/80 transition-all duration-500 delay-200 sm:text-xl lg:text-2xl ${revealClass}`}
          >
            {projectsData.subtitle}
          </p>
        </div>

        <div
          className={`mt-12 transition-all duration-500 delay-300 sm:mt-16 ${revealClass}`}
        >
          <ul className="mx-auto flex w-fit max-w-full snap-x snap-mandatory items-center gap-3 overflow-x-auto pb-4 sm:gap-4 md:gap-5">
            {timeline.map((item, idx) => (
              <li
                key={item.title}
                className="flex shrink-0 snap-start items-center gap-3 sm:gap-4 md:gap-5"
              >
                <div className="flex w-20 flex-col items-center gap-2.5 sm:w-24">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[#42182F]/10 bg-[#E7E9E1] shadow-sm sm:h-20 sm:w-20">
                    {item.imagePath ? (
                      <Image
                        src={item.imagePath}
                        alt={item.imageAlt ?? item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <ProjectImageFrame
                        alt={item.title}
                        className="h-full w-full rounded-full"
                      />
                    )}
                    <span className="absolute -bottom-0.5 left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#A65F42] text-[9px] font-semibold text-[#F5F1E9] ring-[3px] ring-[#F5F1E9] sm:h-6 sm:w-6 sm:text-[10px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-sm font-semibold text-[#42182F] sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#35312F]/70 sm:text-xs">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                {idx < timeline.length - 1 && (
                  <ChevronRight
                    className="hidden h-4 w-4 shrink-0 text-[#A65F42]/70 md:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16 lg:mt-20 lg:space-y-20">
          <ProjectShowcaseRow showcase={villa} isVisible={isVisible} />
          <ProjectShowcaseRow showcase={farmhouse} isVisible={isVisible} />
        </div>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-8">
          <div
            className={`rounded-3xl border border-[#d7d0c2] bg-[#F5F1E9]/60 p-6 transition-all duration-500 delay-100 sm:p-7 lg:col-start-2 lg:row-start-1 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <span className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
              {location.eyebrow}
              <span className="h-px w-6 bg-[#A65F42]/40" />
            </span>
            <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight text-[#42182F] sm:text-3xl">
              {location.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#35312F] sm:text-base">
              {location.description}
            </p>

            <div className="mt-6 grid gap-6 border-t border-[#d7d0c2] pt-5 sm:grid-cols-2 sm:gap-8">
              <div>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
                  {location.locationLabel}
                </h4>
                <p className="mt-2 font-serif text-lg font-semibold leading-snug text-[#42182F]">
                  {location.locationLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A65F42]">
                  {location.travelLabel}
                </h4>
                <ul className="mt-2 space-y-2">
                  {location.travelTimes.map((time) => (
                    <li
                      key={time.place}
                      className="flex items-center justify-between gap-3 pb-2 text-sm last:border-0 last:pb-0"
                    >
                      <span className="text-[#35312F]">{time.place}</span>
                      <span className="font-medium text-[#42182F]">
                        {time.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-[24px] border border-[#d7d0c2] bg-[#F5F1E9]/60 transition-all duration-500 lg:col-start-1 lg:row-start-1 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <iframe
              src={location.map.embedUrl}
              title={location.map.title}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[340px] w-full border-0 md:h-[400px] lg:absolute lg:inset-0 lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
