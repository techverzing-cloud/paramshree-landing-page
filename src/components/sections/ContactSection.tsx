"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { contactData, locationData } from "@/data/contact";
import type { ContactFeatureItem } from "@/data/contact";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const featureIcons: Record<string, ReactNode> = {
  "message-clock": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 5.5h16v11H9l-5 3.5v-14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "user-heart": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.8 19c0-3 2.8-5.2 6.2-5.2 1.2 0 2.3.3 3.2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 20.3l-.9-.8C14.8 17.4 13 15.8 13 13.7c0-1.4 1.1-2.5 2.5-2.5 1 0 2 .6 2.5 1.5.5-.9 1.5-1.5 2.5-1.5 1.4 0 2.5 1.1 2.5 2.5 0 2.1-1.8 3.7-4.1 5.8l-.9.8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "calendar-pin": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18.5s3-1.8 3-3.7a3 3 0 10-6 0c0 1.9 3 3.7 3 3.7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

const locationIcons: Record<ContactFeatureItem["icon"], ReactNode> = {
  pin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 21.5s7-6.2 7-11.1a7 7 0 10-14 0c0 4.9 7 11.1 7 11.1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10.2" r="2.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  route: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 6.5H13a3.5 3.5 0 010 7h-2a3.5 3.5 0 000 7h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  landmark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 9.5L12 4l8.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 20.5h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const locationKeys: Record<ContactFeatureItem["icon"], "address" | "gettingHere" | "landmarks"> = {
  pin: "address",
  route: "gettingHere",
  landmark: "landmarks",
};

export function ContactSection() {
  const { ref, state } = useSectionReveal<HTMLElement>();
  const { office } = locationData;

  const addressIsAvailable = office.addressLines.length > 0 || Boolean(office.city);
  const mapIsAvailable = Boolean(office.mapEmbedUrl);
  const format = office.pinCode ? `${office.city}${office.state ? `, ${office.state}` : ""} ${office.pinCode}` : `${office.city}${office.state ? `, ${office.state}` : ""}`;

  const locationValue = (key: "address" | "gettingHere" | "landmarks") => {
    if (key === "address") {
      if (!addressIsAvailable) {
        return locationData.pendingValueLabel;
      }
      return office.addressLines.join(", ") || format;
    }

    if (key === "gettingHere") {
      return office.gettingHere ?? locationData.pendingValueLabel;
    }

    return office.nearbyLandmarks?.length
      ? office.nearbyLandmarks.join(", ")
      : "See map for nearby landmarks";
  };

  return (
    <section id="contact" ref={ref} className="relative scroll-mt-20 overflow-x-hidden bg-[#F5F1E9] py-10 sm:py-14 lg:py-18">
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className={`lg:col-span-4 transition-all duration-500 ${state}`}>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#A65F42]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42]">
                {contactData.eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-[#42182F]">
              {contactData.heading}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-[#A65F42]">
              {contactData.subtitle}
            </p>
            <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-[#35312F]">
              {contactData.description}
            </p>

            <ul className="mt-7 space-y-5">
              {contactData.features.map((feature, idx) => (
                <li
                  key={feature.title}
                  className={`flex gap-4 transition-all duration-500 ${state}`}
                  style={{ transitionDelay: `${120 * (idx + 1)}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/45 text-[#A65F42]">
                    {featureIcons[feature.icon]}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#42182F]">{feature.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#35312F]/80">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* <div className="group relative mt-8 overflow-hidden rounded-2xl rounded-tl-[2.5rem]">
              <Image
                src={contactData.image.path}
                alt={contactData.image.altText}
                width={contactData.image.width}
                height={contactData.image.height}
                className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[260px]"
              />
            </div> */}
          </div>

          <div className="lg:col-span-5">
            <EnquiryForm />
          </div>

          <div className={`lg:col-span-3 transition-all duration-500 delay-200 ${state}`}>
            <div
              id={locationData.id}
              className="scroll-mt-20 rounded-2xl border border-[#d7d0c2] bg-[#F5F1E9] p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#A65F42]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42]">
                  {locationData.eyebrow}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#42182F]">
                {locationData.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#35312F]/85">{locationData.description}</p>

              <div className="mt-6">
                {mapIsAvailable ? (
                  <div className="overflow-hidden rounded-xl border border-[#d7d0c2]">
                    <iframe
                      src={office.mapEmbedUrl}
                      title={`${office.name} map`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      className="h-[220px] w-full border-0"
                    />
                  </div>
                ) : (
                  <div className="flex h-[180px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#d7d0c2] bg-[#F5F1E9] px-4 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A65F42]/45 text-[#A65F42]">
                      {locationIcons.pin}
                    </span>
                    <p className="text-xs leading-relaxed text-[#35312F]/75">
                      {locationData.pendingNotice}
                    </p>
                  </div>
                )}
              </div>

              <dl className="mt-6 space-y-5">
                {locationData.items.map((item) => {
                  const value = locationValue(locationKeys[item.icon]);
                  const isPending = value === locationData.pendingValueLabel;

                  return (
                    <div key={item.label} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#A65F42]/45 text-[#A65F42]">
                        {locationIcons[item.icon]}
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
                          {item.label}
                        </dt>
                        <dd
                          className={`mt-1 text-sm leading-relaxed ${
                            isPending ? "text-[#35312F]/60" : "text-[#35312F]/85"
                          }`}
                        >
                          {value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
