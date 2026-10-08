"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { CallbackRequestModal } from "@/components/ui/CallbackRequestModal";
import { ctaConfig } from "@/data/cta";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [returnFocusTarget, setReturnFocusTarget] = useState<"callNow" | "menu">("callNow");

  const desktopCallNowRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // The mobile trigger disappears with the menu, so focus goes back to the
  // hamburger instead of a collapsed button.
  const returnFocusRef = returnFocusTarget === "menu" ? menuToggleRef : desktopCallNowRef;

  const openCallback = (from: "desktop" | "mobile") => {
    setReturnFocusTarget(from === "mobile" ? "menu" : "callNow");
    setIsCallbackOpen(true);
  };

  const callNowClassName =
    "group inline-flex items-center gap-2 rounded-full border border-[#A65F42] bg-transparent text-[#A65F42] transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#A65F42] hover:text-[#F5F1E9] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 animate-fade-in border-b border-[#d7d0c2] bg-[#F5F1E9]/95 backdrop-blur-sm transition-colors duration-300">
      <nav className="mx-auto flex w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 items-center justify-between py-3 sm:py-4">
        <div className="flex items-center min-w-0">
          <Logo />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <ul className="flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#42182F]">
            {siteConfig.navLinks.map((link) => (
              <li key={link.label} className="group">
                <Link
                  href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  className="relative transition-colors duration-200 group-hover:text-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E9] after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-0 after:bg-[#A65F42] after:transition-all after:duration-200 group-hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 xl:gap-3 lg:flex">
          <EnquiryButton
            href={ctaConfig.enquiry.target}
            className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm px-4 xl:px-5 py-2.5"
          />
          <button
            ref={desktopCallNowRef}
            type="button"
            onClick={() => openCallback("desktop")}
            className={`${callNowClassName} min-h-11 px-4 xl:px-5 py-2.5 text-sm font-medium whitespace-nowrap`}
          >
            <Phone className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12" />
            Call Now
          </button>
        </div>

        <button
          ref={menuToggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#42182F] transition-transform duration-200 hover:scale-105 active:scale-95 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-6 w-6 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
            />
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`border-t border-[#d7d0c2] bg-[#F5F1E9] lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="space-y-4 px-4 sm:px-6 py-4">
          <ul className="space-y-3 text-base font-medium text-[#42182F]">
            {siteConfig.navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  className="block py-2 transition-colors duration-200 hover:text-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2">
            <EnquiryButton
              href={ctaConfig.enquiry.target}
              onNavigate={() => setIsMenuOpen(false)}
              className="w-full justify-center transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openCallback("mobile");
              }}
              className={`${callNowClassName} min-h-11 w-full justify-center px-5 py-2.5 text-sm font-medium`}
            >
              <Phone className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      <CallbackRequestModal
        open={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        returnFocusRef={returnFocusRef}
      />
    </header>
  );
}