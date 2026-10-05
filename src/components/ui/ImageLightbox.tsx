"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ProjectImageFrame } from "@/components/ui/ProjectImageFrame";

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
  /** Renders a neutral frame instead of media when the asset is not supplied yet. */
  pending?: boolean;
}

export interface ImageLightboxLabels {
  dialog: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  unavailable: string;
}

interface ImageLightboxProps {
  open: boolean;
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  labels: ImageLightboxLabels;
}

const SWIPE_THRESHOLD = 48;
const EXIT_DURATION = 200;

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function ImageLightbox({
  open,
  items,
  index,
  onIndexChange,
  onClose,
  labels,
}: ImageLightboxProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef({ index, count: items.length });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  if (open && !isMounted) {
    setIsMounted(true);
    setIsClosing(false);
  } else if (!open && isMounted && !isClosing) {
    setIsClosing(true);
  }

  useEffect(() => {
    navRef.current = { index, count: items.length };
  });

  const navigate = useCallback(
    (step: 1 | -1) => {
      const { index: currentIndex, count } = navRef.current;

      if (count < 2) {
        return;
      }

      setDirection(step);
      onIndexChange((currentIndex + step + count) % count);
    },
    [onIndexChange]
  );

  useEffect(() => {
    if (open || !isMounted || !isClosing) {
      return;
    }

    const timer = window.setTimeout(
      () => setIsMounted(false),
      prefersReducedMotion ? 0 : EXIT_DURATION
    );

    return () => window.clearTimeout(timer);
  }, [open, isMounted, isClosing, prefersReducedMotion]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const trigger = document.activeElement as HTMLElement | null;
    const { body } = document;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;
      window.scrollTo({ top: scrollY, left: scrollX, behavior: "instant" });

      if (trigger && document.contains(trigger)) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [open, onClose, navigate]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    navigate(deltaX < 0 ? 1 : -1);
  };

  if (!isMounted || items.length === 0) {
    return null;
  }

  const activeIndex = Math.min(Math.max(index, 0), items.length - 1);
  const item = items[activeIndex];
  const mediaAnimation = prefersReducedMotion
    ? undefined
    : direction === 1
      ? "lightbox-media-forward"
      : "lightbox-media-backward";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#35312F]/92 backdrop-blur-sm motion-reduce:backdrop-blur-none"
      style={{
        animation: prefersReducedMotion
          ? undefined
          : isClosing
            ? "lightbox-backdrop-out 200ms ease-in both"
            : "lightbox-backdrop-in 220ms ease-out both",
      }}
    >
      <div
        aria-hidden="true"
        onClick={handleBackdropClick}
        className="absolute inset-0 cursor-zoom-out"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.dialog}
        className="relative z-10 flex min-h-0 flex-1 flex-col"
      >
        <div className="relative flex items-center justify-end px-4 py-3 sm:px-6 sm:py-4">
          <p
            aria-live="polite"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-sm tracking-[0.2em] text-[#F5F1E9] tabular-nums sm:text-base"
          >
            <span className="sr-only">
              {`${labels.counter} ${activeIndex + 1} of ${items.length}. `}
            </span>
            <span aria-hidden="true">
              {pad(activeIndex + 1)}
              <span className="mx-1.5 text-[#A65F42]">/</span>
              {pad(items.length)}
            </span>
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F5F1E9]/30 text-[#F5F1E9] transition-colors duration-200 hover:border-[#A65F42] hover:bg-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            key={item.id}
            className="relative flex h-full w-full items-center justify-center"
            style={{ animation: mediaAnimation ? `${mediaAnimation} 260ms ease-out both` : undefined }}
          >
            {item.pending ? (
              <ProjectImageFrame
                label={labels.unavailable}
                alt={item.alt}
                className="h-[46vh] w-full max-w-3xl rounded-xl"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width ?? 1600}
                height={item.height ?? 1100}
                sizes="(min-width: 1024px) 50vw, 94vw"
                priority
                className="h-full max-h-[52vh] w-auto max-w-full rounded-xl object-contain shadow-2xl sm:max-h-[64vh]"
              />
            )}
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label={labels.previous}
                className="absolute left-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F5F1E9]/30 text-[#F5F1E9] transition-colors duration-200 hover:border-[#A65F42] hover:bg-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42] sm:left-2 sm:h-12 sm:w-12"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M15 5l-7 7 7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label={labels.next}
                className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F5F1E9]/30 text-[#F5F1E9] transition-colors duration-200 hover:border-[#A65F42] hover:bg-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42] sm:right-2 sm:h-12 sm:w-12"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-7">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
            {item.title && (
              <h3 className="font-serif text-lg font-semibold text-[#F5F1E9] sm:text-xl">
                {item.title}
              </h3>
            )}
            {item.caption && (
              <p className="max-w-xl text-xs leading-relaxed text-[#F5F1E9]/70 sm:text-sm">
                {item.caption}
              </p>
            )}
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#F5F1E9]/40">
              Swipe or use arrow keys
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}