"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EXIT_DURATION = 200;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Tailwind classes for the dialog panel. */
  className?: string;
  /** Extra classes for the fixed backdrop wrapper. */
  backdropClassName?: string;
  /** Element to focus once opened. Defaults to the first focusable child. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Refocused after closing. Defaults to whatever was focused when it opened. */
  restoreFocusRef?: RefObject<HTMLElement | null>;
  /** `aria-label` fallback when no heading is supplied via `labelledBy`. */
  ariaLabel?: string;
  /** `id` of the element labelling the dialog. */
  labelledBy?: string;
}

/**
 * The single modal foundation for the landing page: portal, backdrop, focus
 * trap, Escape, scroll lock and the shared open/close animations. Forms supply
 * their own contents so no dialog markup or trap logic is duplicated.
 */
export function ModalShell({
  open,
  onClose,
  children,
  className = "",
  backdropClassName = "",
  initialFocusRef,
  restoreFocusRef,
  ariaLabel,
  labelledBy,
}: ModalShellProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isMounted, setIsMounted] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  if (open && !isMounted) {
    setIsMounted(true);
    setIsClosing(false);
  } else if (!open && isMounted && !isClosing) {
    setIsClosing(true);
  }

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
    if (!isMounted || !open) {
      return;
    }

    // Captured here so every close path (Escape, backdrop, x, confirm button)
    // returns focus, since only this effect knows when the dialog really went.
    const trigger = restoreFocusRef?.current ?? (document.activeElement as HTMLElement | null);

    // Fixed-position lock, otherwise mobile browsers scroll the page behind.
    const { body } = document;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const previous = {
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

    const focusFirst = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }

      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);

      (first ?? dialogRef.current)?.focus();
    };

    focusFirst();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
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
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo({ top: scrollY, left: scrollX, behavior: "instant" });

      if (trigger && document.contains(trigger)) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [isMounted, open, onClose, initialFocusRef, restoreFocusRef]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-[#241322]/70 px-4 py-6 backdrop-blur-sm sm:items-center ${backdropClassName} ${
        isClosing ? "modal-backdrop-out" : "modal-backdrop-in"
      }`}
      onClick={() => onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : (ariaLabel ?? "Dialog")}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`relative my-auto w-full ${isClosing ? "modal-out" : "modal-in"} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}