"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AmenitiesGalleryToggle } from "@/components/ui/AmenitiesGalleryToggle";
import { AmenityCard } from "@/components/ui/AmenityCard";
import { SiteVisitCta } from "@/components/ui/SiteVisitCta";
import { GalleryCollage } from "@/components/ui/GalleryCollage";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import type { LightboxItem } from "@/components/ui/ImageLightbox";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";
import { amenitiesGalleryData } from "@/data/amenities-gallery";
import type { AmenitiesGalleryView } from "@/data/amenities-gallery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BASE_ID = "amenities-gallery";
const SWITCH_DURATION = 200;
const CONTENT_DELAY = 420;
const STAGGER_STEP = 90;

interface LightboxState {
  items: LightboxItem[];
  index: number;
}

export function AmenitiesGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const switchTimer = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isVisible, setIsVisible] = useState(false);
  const [activeView, setActiveView] = useState<AmenitiesGalleryView>("amenities");
  const [visibleView, setVisibleView] = useState<AmenitiesGalleryView>("amenities");
  const [isSwitching, setIsSwitching] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const { amenities, gallery, views, amenitiesCta, galleryCta, lightbox: labels } =
    amenitiesGalleryData;

  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
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

  useEffect(() => {
    return () => {
      if (switchTimer.current) {
        window.clearTimeout(switchTimer.current);
      }
    };
  }, []);

  const revealState =
    isVisible || prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  const amenityItems = useMemo<LightboxItem[]>(
    () =>
      amenities.map((amenity) => ({
        id: amenity.id,
        src: amenity.image.src,
        alt: amenity.image.alt,
        title: amenity.name,
        caption: amenity.description,
        width: amenity.image.width,
        height: amenity.image.height,
      })),
    [amenities]
  );

  const galleryItems = useMemo<LightboxItem[]>(
    () =>
      gallery.map((entry) => ({
        id: entry.id,
        src: entry.image.src,
        alt: entry.image.alt,
        title: entry.title,
        caption: entry.caption,
        width: entry.image.width,
        height: entry.image.height,
      })),
    [gallery]
  );

  const handleViewChange = useCallback(
    (nextView: AmenitiesGalleryView) => {
      if (nextView === activeView) {
        return;
      }

      setActiveView(nextView);

      if (prefersReducedMotion) {
        setVisibleView(nextView);
        setIsSwitching(false);
        return;
      }

      setIsSwitching(true);

      if (switchTimer.current) {
        window.clearTimeout(switchTimer.current);
      }

      switchTimer.current = window.setTimeout(() => {
        setVisibleView(nextView);
        setIsSwitching(false);
      }, SWITCH_DURATION);
    },
    [activeView, prefersReducedMotion]
  );

  const handleAmenityOpen = useCallback(
    (index: number) => setLightbox({ items: amenityItems, index }),
    [amenityItems]
  );

  const handleGalleryOpen = useCallback(
    (index: number) => setLightbox({ items: galleryItems, index }),
    [galleryItems]
  );

  const handleCloseLightbox = useCallback(() => setLightbox(null), []);

  const handleLightboxIndexChange = useCallback((index: number) => {
    setLightbox((current) => (current ? { ...current, index } : current));
  }, []);

  const isAmenitiesView = visibleView === "amenities";
  const activeItems = isAmenitiesView ? amenityItems : galleryItems;
  const activeOption = views.find((option) => option.id === visibleView) ?? views[0];

  // The toggle owns the CTA too: amenities shows only WhatsApp, gallery only the
  // site-visit modal. The two are never rendered together.
  const contextualAction = isAmenitiesView ? (
    <WhatsAppCta
      label={amenitiesCta.label}
      message={amenitiesCta.message}
      unconfiguredNotice={amenitiesCta.unconfiguredNotice}
    />
  ) : (
    <SiteVisitCta label={galleryCta.label} />
  );

  return (
    <section
      id={amenitiesGalleryData.id}
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-x-hidden bg-[#F5F1E9] py-14 sm:py-18 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute left-4 top-24 h-44 w-28 text-[#87917B]/35"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 120 200"
          fill="none"
          className="absolute bottom-16 right-4 h-52 w-32 rotate-180 text-[#87917B]/25"
        >
          <path d="M62 190C62 140 60 96 34 46" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-[110rem] px-4 sm:px-5 lg:px-6 xl:px-8 2xl:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className={`flex items-center justify-center gap-3 transition-all duration-500 sm:gap-5 ${revealState}`}>
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42] sm:text-xs sm:tracking-[0.4em]">
              {amenitiesGalleryData.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#A65F42]/50 sm:w-14" />
          </div>
          <h2
            style={{ transitionDelay: "100ms" }}
            className={`mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance text-[#42182F] transition-all duration-500 sm:text-4xl lg:text-5xl ${revealState}`}
          >
            {amenitiesGalleryData.heading}
          </h2>
          <p
            style={{ transitionDelay: "200ms" }}
            className={`mx-auto mt-4 max-w-2xl font-serif text-lg italic leading-relaxed text-[#35312F]/80 transition-all duration-500 sm:text-xl lg:text-2xl ${revealState}`}
          >
            {amenitiesGalleryData.description}
          </p>
          <div
            style={{ transitionDelay: "300ms" }}
            className={`mt-8 flex justify-center transition-all duration-500 sm:mt-10 ${revealState}`}
          >
            <AmenitiesGalleryToggle
              baseId={BASE_ID}
              options={views}
              activeView={activeView}
              onChange={handleViewChange}
            />
          </div>
        </div>

        <div
          style={{ transitionDelay: `${CONTENT_DELAY}ms` }}
          className={`mt-8 transition-all duration-500 sm:mt-10 lg:mt-14 ${revealState}`}
        >
          <div
            id={`${BASE_ID}-panel-${visibleView}`}
            role="tabpanel"
            aria-labelledby={`${BASE_ID}-tab-${visibleView}`}
            inert={isSwitching}
            className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
              isSwitching ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <p className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-[#87917B] sm:mb-8 sm:tracking-[0.35em]">
              {activeOption.description}
            </p>

            {isAmenitiesView ? (
              <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3 xl:gap-4">
                {amenities.map((amenity, index) => (
                  <AmenityCard
                    key={amenity.id}
                    amenity={amenity}
                    index={index}
                    total={amenities.length}
                    viewLabel="View"
                    revealState={revealState}
                    revealDelay={CONTENT_DELAY + index * STAGGER_STEP}
                    onOpen={handleAmenityOpen}
                  />
                ))}
              </div>
            ) : (
              <GalleryCollage
                images={gallery}
                viewLabel="View image"
                revealState={revealState}
                revealDelay={CONTENT_DELAY}
                onOpen={handleGalleryOpen}
              />
            )}

            <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 lg:mt-14">
              {contextualAction}
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        open={lightbox !== null}
        items={lightbox?.items ?? activeItems}
        index={lightbox?.index ?? 0}
        onIndexChange={handleLightboxIndexChange}
        onClose={handleCloseLightbox}
        labels={labels}
      />
    </section>
  );
}