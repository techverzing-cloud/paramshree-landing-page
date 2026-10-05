"use client";

import type { ProjectVideo } from "@/data/videos";

interface VideoCardProps {
  video: ProjectVideo;
  index: number;
  total: number;
  onOpen: (index: number) => void;
}

/**
 * A card that shows the supplied clip as-is: real `<video>`, muted and inline,
 * no autoplay, poster frame until the user opens it. The whole card is the
 * button, so there is no dead zone and no competing click target. The card fills
 * its grid cell, which is how both cards end up the same height on desktop.
 */
export function VideoCard({ video, index, total, onOpen }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${video.label}. ${video.title}. Play video ${index + 1} of ${total}.`}
      className={`group relative block h-full w-full overflow-hidden rounded-[14px] border border-[#e6e1d3] bg-[#42182F] text-left shadow-[0_1px_2px_rgba(66,24,47,0.05)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-[#A65F42]/35 hover:shadow-[0_22px_45px_-28px_rgba(66,24,47,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] motion-reduce:translate-y-0 ${video.frame} xl:rounded-[18px]`}
    >
      <video
        src={video.src}
        poster={video.poster}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:scale-100"
        style={{ objectPosition: video.objectPosition }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#42182F]/20 transition-colors duration-500 group-hover:bg-[#42182F]/10"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F5F1E9]/70 bg-[#42182F]/35 text-[#F5F1E9] backdrop-blur-[3px] transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100 sm:h-16 sm:w-16 xl:h-20 xl:w-20">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="translate-x-[2px] xl:h-6 xl:w-6"
          >
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-gradient-to-t from-[#42182F]/90 via-[#42182F]/40 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-7 sm:pt-20 xl:px-9 xl:pb-9 xl:pt-24"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#A65F42] sm:text-[11px]">
          {video.label}
        </span>
        <span className="font-serif text-xl font-semibold leading-tight text-[#F5F1E9] drop-shadow-[0_1px_8px_rgba(66,24,47,0.7)] sm:text-2xl xl:text-3xl">
          {video.title}
        </span>
        <span className="text-[13px] leading-snug text-[#F5F1E9]/75 sm:text-sm xl:text-[15px]">
          {video.subtitle}
        </span>
      </span>
    </button>
  );
}
