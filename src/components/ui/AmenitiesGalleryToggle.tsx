"use client";

import { useRef } from "react";
import type { AmenitiesGalleryView, AmenitiesGalleryViewOption } from "@/data/amenities-gallery";

interface AmenitiesGalleryToggleProps {
  baseId: string;
  options: AmenitiesGalleryViewOption[];
  activeView: AmenitiesGalleryView;
  onChange: (view: AmenitiesGalleryView) => void;
  className?: string;
}

export function AmenitiesGalleryToggle({
  baseId,
  options,
  activeView,
  onChange,
  className = "",
}: AmenitiesGalleryToggleProps) {
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    options.findIndex((option) => option.id === activeView),
    0
  );

  const focusTab = (index: number) => {
    const next = (index + options.length) % options.length;
    tabsRef.current[next]?.focus();
    onChange(options[next].id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(activeIndex + 1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(activeIndex - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTab(options.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Amenities and gallery"
      onKeyDown={handleKeyDown}
      className={`relative inline-flex w-full max-w-[19rem] items-center rounded-full border border-[#d7d0c2] bg-[#F5F1E9] p-1.5 shadow-[0_1px_2px_rgba(66,24,47,0.06)] sm:w-auto sm:min-w-[20rem] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 left-1.5 top-1.5 rounded-full bg-[#A65F42] shadow-[0_6px_16px_rgba(166,95,66,0.28)] transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{
          width: `calc(${100 / options.length}% - 0.375rem)`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {options.map((option, index) => {
        const isActive = option.id === activeView;

        return (
          <button
            key={option.id}
            ref={(node) => {
              tabsRef.current[index] = node;
            }}
            id={`${baseId}-tab-${option.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${option.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={`relative z-10 min-h-11 flex-1 rounded-full px-4 py-2.5 text-[13px] font-medium leading-none tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] sm:px-8 sm:text-sm ${
              isActive ? "text-[#F5F1E9]" : "text-[#42182F]/80 hover:text-[#42182F]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}