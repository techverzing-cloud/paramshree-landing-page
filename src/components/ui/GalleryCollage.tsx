"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { GalleryImage } from "@/data/amenities-gallery";

interface GalleryCollageProps {
  images: GalleryImage[];
  viewLabel: string;
  revealState: string;
  revealDelay?: number;
  onOpen: (index: number) => void;
}

const STAGGER_STEP = 70;

/**
 * Editorial collage for the supplied villa and farmhouse photographs.
 *
 * Every tile reserves its own space with `aspect-ratio` before the image loads,
 * so the grid never reflows. The `<Image>` keeps the file's intrinsic width and
 * height for correct source metadata and fills its tile with `object-cover`,
 * which crops rather than stretches. Widths are capped so a tile is never asked
 * to render wider than the file actually is.
 */
export function GalleryCollage({
  images,
  viewLabel,
  revealState,
  revealDelay = 0,
  onOpen,
}: GalleryCollageProps) {
  return (
    <div className="mx-auto grid max-w-[46rem] grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:max-w-[92rem] lg:grid-cols-4">
      {images.map((entry, index) => {
        const { span, ratio, sizes } = entry.layout;

        return (
          <div
            key={entry.id}
            style={
              {
                transitionDelay: `${revealDelay + index * STAGGER_STEP}ms`,
                "--ar-base": ratio.base,
                "--ar-md": ratio.md,
                "--ar-lg": ratio.lg,
              } as CSSProperties
            }
            className={`min-w-0 ${span} aspect-[var(--ar-base)] transition-all duration-500 md:aspect-[var(--ar-md)] lg:aspect-[var(--ar-lg)] ${revealState}`}
          >
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`${entry.title}. ${viewLabel} ${index + 1} of ${images.length}.`}
              className="group relative block h-full w-full overflow-hidden rounded-[14px] border border-[#e6e1d3] bg-[#F5F1E9] shadow-[0_1px_2px_rgba(66,24,47,0.05)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-[#A65F42]/35 hover:shadow-[0_22px_45px_-28px_rgba(66,24,47,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] motion-reduce:translate-y-0"
            >
              <Image
                src={entry.image.src}
                alt={entry.image.alt}
                width={entry.image.width}
                height={entry.image.height}
                sizes={sizes}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:scale-100"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#42182F]/80 via-[#42182F]/15 to-transparent"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3.5 pb-3.5 pt-12 sm:px-5 sm:pb-5"
              >
                <span className="text-left font-serif text-[15px] leading-tight text-[#F5F1E9] text-balance drop-shadow-[0_1px_6px_rgba(66,24,47,0.6)] sm:text-lg xl:text-xl">
                  {entry.title}
                </span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5F1E9]/55 bg-[#42182F]/30 text-[#F5F1E9] backdrop-blur-[2px] transition-[transform,background-color] duration-500 group-hover:-translate-y-0.5 group-hover:bg-[#A65F42]/80 motion-reduce:transform-none">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 5h5v5M19 5l-7 7M10 19H5v-5M5 19l7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}