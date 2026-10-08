"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";

const columnHeadingClass =
  "text-sm font-semibold uppercase tracking-wider text-[#F5F1E9]";
const linkClass =
  "transition-colors duration-200 hover:text-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#42182F]";
const contactRowClass =
  "inline-flex items-start gap-2.5 text-sm text-[#F5F1E9]/80 transition-colors duration-200 hover:text-[#A65F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#42182F]";

const services = [
  "Site Visit",
  "Property Consultation",
  "Project Information",
  "Channel Partner Assistance",
];

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotion = () => {
      if (mediaQuery.matches) {
        setIsVisible(true);
      }
    };

    handleReducedMotion();

    if (mediaQuery.matches) {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <footer ref={footerRef} className="bg-[#42182F] text-[#F5F1E9] overflow-x-hidden">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-10 sm:py-12">
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          <div className={`min-w-0 transition-all duration-500 sm:col-span-2 lg:col-span-4 ${revealClass}`}>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F5F1E9]/80 break-words">
              {siteConfig.footer.description}
            </p>
            {siteConfig.footer.social && siteConfig.footer.social.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-4">
                {siteConfig.footer.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={linkClass}
                    aria-label={social.label}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className={`min-w-0 transition-all duration-500 delay-100 lg:col-span-2 ${revealClass}`}>
            <h3 className={columnHeadingClass}>Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F5F1E9]/80">
              {siteConfig.footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                    className={`inline-block break-words ${linkClass}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`min-w-0 transition-all duration-500 delay-200 lg:col-span-2 ${revealClass}`}>
            <h3 className={columnHeadingClass}>Our Projects</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F5F1E9]/80">
              {siteConfig.footer.projects.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                    className={`inline-block break-words ${linkClass}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`min-w-0 transition-all duration-500 delay-300 lg:col-span-2 ${revealClass}`}>
            <h3 className={columnHeadingClass}>Our Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F5F1E9]/80">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/#contact" className={`inline-block break-words ${linkClass}`}>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`min-w-0 transition-all duration-500 delay-500 lg:col-span-2 ${revealClass}`}>
            <h3 className={columnHeadingClass}>Contact Us</h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.contact.whatsapp && (
                <li>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactRowClass}
                  >
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#A65F42]" aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
              )}
              {siteConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                    className={contactRowClass}
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#A65F42]" aria-hidden="true" />
                    Call Us
                  </a>
                </li>
              )}
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className={`${contactRowClass} break-all`}
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#A65F42]" aria-hidden="true" />
                    Email
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5 text-sm text-[#F5F1E9]/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A65F42]" aria-hidden="true" />
                <span className="break-words">
                  {siteConfig.contact.officeLocation ??
                    projectsData.location.locationLines.join(" ")}
                </span>
              </li>
            </ul>

            {siteConfig.footer.newsletter.enabled && (
              <div className="mt-6">
                <h3 className={columnHeadingClass}>
                  {siteConfig.footer.newsletter.heading}
                </h3>
                <p className="mt-2 text-sm text-[#F5F1E9]/80 break-words">
                  {siteConfig.footer.newsletter.description}
                </p>
                <form
                  className="mt-3 flex flex-col sm:flex-row gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-full border border-[#F5F1E9]/30 bg-transparent px-4 py-2 text-sm text-[#F5F1E9] placeholder:text-[#F5F1E9]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40 min-w-0"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#A65F42] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#8d5235] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40 whitespace-nowrap"
                    aria-label="Subscribe to newsletter"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-[#F5F1E9]/15 pt-6 sm:mt-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="w-full text-xs sm:text-sm text-[#F5F1E9]/70 text-center sm:w-auto sm:text-left break-words">
              © {siteConfig.footer.copyrightYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:w-auto sm:gap-3 text-xs sm:text-sm text-[#F5F1E9]/70">
              {siteConfig.footer.bottomLinks.map((link, index) => (
                <span key={link.label} className="inline-flex items-center gap-3 sm:gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-[#F5F1E9]/30">
                      |
                    </span>
                  )}
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
