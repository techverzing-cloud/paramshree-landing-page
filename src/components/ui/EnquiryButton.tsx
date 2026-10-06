"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";

export function EnquiryButton({
  label = siteConfig.enquiry.label,
  href = siteConfig.enquiry.href,
  variant = "primary",
  className = "",
  intent,
  tone = "white",
  onNavigate,
}: {
  label?: string;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  intent?: string;
  tone?: "white" | "ivory";
  /** Runs after the click, so a mobile menu can close before the scroll. */
  onNavigate?: () => void;
}) {
const finalHref = intent ? `${href}${href.includes("?") ? "&" : "?"}intent=${intent}` : href;
  const primaryText = tone === "ivory" ? "text-[#F5F1E9]" : "text-white";

  const shared =
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9]";

  const arrow = (
    <span className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
      <svg
        width="16"
        height="16"
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
    </span>
  );

  const [fragmentPath, fragmentQuery] = finalHref.replace(/^#/, "").split("?");
  const hasIntentInFragment = finalHref.startsWith("#") && Boolean(fragmentQuery);

  /**
   * Fragments carrying an intent ("#enquiry?intent=site-visit") match no element,
   * so the browser cannot scroll to them and client routers do not emit a
   * hashchange. We therefore update the URL, notify the enquiry form and scroll
   * the target section into view ourselves.
   */
  const handleFragmentClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasIntentInFragment) {
      return;
    }

    const target = document.getElementById(fragmentPath);

    if (!target) {
      return;
    }

    event.preventDefault();
    onNavigate?.();
    window.history.pushState(null, "", finalHref);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleFragmentClick(event);

    if (event.defaultPrevented) {
      return;
    }

    onNavigate?.();
  };

  const linkProps = { onClick: handleClick };

  if (variant === "primary") {
    const primaryClassName = `${shared} bg-[#A65F42] ${primaryText} shadow-sm hover:bg-[#8d5235] hover:shadow-md ${className}`;

    return hasIntentInFragment ? (
      <a href={finalHref} {...linkProps} className={primaryClassName}>
        {label}
        {arrow}
      </a>
    ) : (
      <Link href={finalHref} {...linkProps} className={primaryClassName}>
        {label}
        {arrow}
      </Link>
    );
  }

  const secondaryClassName = `${shared} border border-[#A65F42] text-[#42182F] hover:bg-[#A65F42]/10 ${className}`;

  return hasIntentInFragment ? (
    <a href={finalHref} {...linkProps} className={secondaryClassName}>
      {label}
      {arrow}
    </a>
  ) : (
<Link href={finalHref} {...linkProps} className={secondaryClassName}>
      {label}
      {arrow}
    </Link>
  );
}
