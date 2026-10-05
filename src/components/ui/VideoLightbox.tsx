"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectVideo } from "@/data/videos";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EXIT_DURATION = 200;
const SWIPE_THRESHOLD = 48;

export interface VideoLightboxLabels {
  dialog: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  fullscreen: string;
  hint: string;
}

interface VideoLightboxProps {
  open: boolean;
  videos: ProjectVideo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  labels: VideoLightboxLabels;
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

/**
 * Full screen video slider. Only the selected clip is mounted, so switching
 * videos destroys the previous element (playback stops) and the second video is
 * never fetched until the visitor actually asks for it.
 */
export function VideoLightbox({
  open,
  videos,
  index,
  onIndexChange,
  onClose,
  labels,
}: VideoLightboxProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef({ index, count: videos.length });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  if (open && !isMounted) {
    setIsMounted(true);
    setIsClosing(false);
  } else if (!open && isMounted && !isClosing) {
    setIsClosing(true);
  }

  useEffect(() => {
    navRef.current = { index, count: videos.length };
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
    const syncFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === stageRef.current);
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

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
      'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

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

      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }

      if (trigger && document.contains(trigger)) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [open, onClose, navigate]);

  const toggleFullscreen = useCallback(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
      return;
    }

    void stage.requestFullscreen?.().catch(() => {});
  }, []);

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

  if (!isMounted || videos.length === 0) {
    return null;
  }

  const activeIndex = Math.min(Math.max(index, 0), videos.length - 1);
  const video = videos[activeIndex];
  const mediaAnimation = prefersReducedMotion
    ? undefined
    : direction === 1
      ? "lightbox-media-forward"
      : "lightbox-media-backward";

  const roundButton =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F1E9]/25 bg-[#F5F1E9]/10 text-[#F5F1E9] transition-colors duration-200 hover:bg-[#F5F1E9]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]";

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#241322]/95 backdrop-blur-sm ${
        isClosing ? "animate-[lightbox-backdrop-out_0.2s_ease-out_forwards]" : "animate-[lightbox-backdrop-in_0.25s_ease-out_forwards]"
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.dialog}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-full w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#F5F1E9]/45 sm:text-[11px]">
              <span className="sr-only">{labels.counter} </span>
              <span aria-hidden="true">
                {pad(activeIndex + 1)} / {pad(videos.length)}
              </span>
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold leading-tight text-[#F5F1E9] sm:text-2xl lg:text-3xl">
              {video.title}
            </h2>
            <p className="mt-1 text-xs text-[#F5F1E9]/65 sm:text-sm">{video.subtitle}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={labels.fullscreen}
              aria-pressed={isFullscreen}
              className={roundButton}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={
                    isFullscreen
                      ? "M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
                      : "M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5"
                  }
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className={roundButton}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
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
        </div>

        <div className="relative flex items-center justify-center">
          {videos.length > 1 && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label={labels.previous}
              className={`absolute left-0 z-10 sm:-left-3 ${roundButton}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div
            ref={stageRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ animation: mediaAnimation }}
            className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/40 sm:rounded-2xl"
          >
            <video
              key={video.id}
              src={video.src}
              poster={video.poster}
              autoPlay
              muted
              playsInline
              controls
              allowFullScreen
              preload="metadata"
              aria-label={`${video.label}. ${video.title}.`}
              className="max-h-[62vh] w-auto max-w-full object-contain sm:max-h-[70vh]"
              style={{ aspectRatio: video.aspectRatio }}
            />
          </div>

          {videos.length > 1 && (
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label={labels.next}
              className={`absolute right-0 z-10 sm:-right-3 ${roundButton}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#F5F1E9]/35">
          {labels.hint}
        </p>
      </div>
    </div>,
    document.body
  );
}
