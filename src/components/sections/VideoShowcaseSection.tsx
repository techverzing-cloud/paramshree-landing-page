"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SiteVisitCta } from "@/components/ui/SiteVisitCta";
import { VideoCard } from "@/components/ui/VideoCard";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { videoShowcaseData } from "@/data/videos";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STAGGER_STEP = 110;

export function VideoShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { videos, cta, lightbox: labels } = videoShowcaseData;

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
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const handleOpen = useCallback((index: number) => setActiveIndex(index), []);
  const handleClose = useCallback(() => setActiveIndex(null), []);
  const handleIndexChange = useCallback((index: number) => setActiveIndex(index), []);

  const revealState =
    isVisible || prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section
      id={videoShowcaseData.id}
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-x-hidden bg-[#F5F1E9] py-14 sm:py-18 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute right-4 top-24 h-44 w-28 text-[#87917B]/35"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute bottom-16 left-4 h-52 w-32 -rotate-180 text-[#87917B]/25"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className={`flex items-center justify-center gap-3 transition-all duration-500 sm:gap-5 ${revealState}`}>
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42] sm:text-xs sm:tracking-[0.4em]">
              {videoShowcaseData.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
          </div>

          <h2
            style={{ transitionDelay: "100ms" }}
            className={`mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#42182F] transition-all duration-500 sm:text-4xl lg:text-5xl ${revealState}`}
          >
            {videoShowcaseData.heading}
          </h2>

          <p
            style={{ transitionDelay: "200ms" }}
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#35312F]/80 transition-all duration-500 sm:text-lg ${revealState}`}
          >
            {videoShowcaseData.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl sm:mt-12 lg:mt-14">
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 lg:items-stretch xl:gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                style={{ transitionDelay: `${300 + index * STAGGER_STEP}ms` }}
                className={`transition-all duration-500 lg:h-[26rem] xl:h-[34rem] ${video.span} ${revealState}`}
              >
                <VideoCard
                  video={video}
                  index={index}
                  total={videos.length}
                  onOpen={handleOpen}
                />
              </div>
            ))}
          </div>

          <div
            style={{ transitionDelay: `${300 + videos.length * STAGGER_STEP}ms` }}
            className={`mt-10 flex justify-center transition-all duration-500 sm:mt-12 lg:mt-14 ${revealState}`}
          >
            <SiteVisitCta
              label={cta.label}
              tone="ivory"
              className="px-7 py-3 text-[15px] shadow-[0_10px_24px_-14px_rgba(166,95,66,0.9)] hover:shadow-[0_16px_32px_-14px_rgba(166,95,66,0.95)]"
            />
          </div>
        </div>
      </div>

      <VideoLightbox
        open={activeIndex !== null}
        videos={videos}
        index={activeIndex ?? 0}
        onIndexChange={handleIndexChange}
        onClose={handleClose}
        labels={labels}
      />
    </section>
  );
}
