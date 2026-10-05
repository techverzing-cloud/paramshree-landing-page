"use client";

import Image from "next/image";
import type { Amenity } from "@/data/amenities-gallery";
import { projectIcons } from "@/components/ui/ProjectIcons";

interface AmenityCardProps {
  amenity: Amenity;
  index: number;
  total: number;
  viewLabel: string;
  revealState: string;
  revealDelay?: number;
  onOpen: (index: number) => void;
}

/**
 * One uniform card for every amenity: same image height, same rounded corners,
 * same content rhythm. Height equalisation comes from the grid row stretch plus
 * a clamped title and a fixed minimum block for the description, so a longer
 * description can never make one card taller than its neighbours.
 */
export function AmenityCard({
  amenity,
  index,
  total,
  viewLabel,
  revealState,
  revealDelay = 0,
  onOpen,
}: AmenityCardProps) {
  return (
    <div
      className={`min-w-0 transition-all duration-500 ${revealState}`}
      style={{ transitionDelay: `${revealDelay}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`${amenity.name}. ${viewLabel} ${index + 1} of ${total}.`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#e6e1d3] bg-[#F5F1E9] text-left shadow-[0_1px_2px_rgba(66,24,47,0.05)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-[#A65F42]/35 hover:shadow-[0_22px_45px_-28px_rgba(66,24,47,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] motion-reduce:translate-y-0"
      >
        <div className="relative h-[13rem] w-full shrink-0 overflow-hidden rounded-t-[inherit] sm:h-[14rem] lg:h-[15rem] xl:h-[16rem]">
          <Image
            src={amenity.image.src}
            alt={amenity.image.alt}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 15vw, (min-width: 640px) 32vw, (min-width: 360px) 47vw, 90vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] motion-reduce:scale-100"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#42182F]/55 via-[#42182F]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="pointer-events-none absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F5F1E9]/55 bg-[#42182F]/25 text-[#F5F1E9] opacity-80 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
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
        </div>

        <div className="flex flex-1 flex-col p-3.5 sm:p-5 xl:p-6">
          <span className="flex items-center gap-1.5 text-[#A65F42] sm:gap-2">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/40 sm:h-7 sm:w-7">
              {projectIcons[amenity.icon]}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.24em] xl:tracking-[0.28em]">
              {amenity.category}
            </span>
          </span>

          <h3 className="mt-2.5 line-clamp-2 font-serif text-[15px] font-semibold leading-tight text-[#42182F] sm:mt-3 sm:text-[19px] xl:text-xl">
            {amenity.name}
          </h3>

          <p className="mt-2 min-h-[4.5rem] text-[12px] leading-relaxed text-[#35312F]/80 sm:text-[13px] xl:min-h-[5.25rem] xl:text-sm">
            {amenity.description}
          </p>

          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#A65F42] opacity-70 transition-opacity duration-500 group-hover:opacity-100 sm:text-[11px]">
            {viewLabel}
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-0.5 motion-reduce:transition-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </div>
      </button>
    </div>
  );
}
