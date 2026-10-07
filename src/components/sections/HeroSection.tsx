import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { SiteVisitCta } from "@/components/ui/SiteVisitCta";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";
import { ctaConfig } from "@/data/cta";
import { siteConfig } from "@/data/site";

const { hero } = siteConfig;

/**
 * One class string for all three hero CTAs so they stay identical.
 * The `!` suffixes (Tailwind v4 important) override the padding, weight,
 * transition, shadow and focus ring baked into the shared button components,
 * which also serve the navbar and other sections.
 */
const CTA_CLASS =
  "h-12 w-full whitespace-nowrap rounded-full bg-[#A65F42] px-4! text-sm font-semibold! text-[#F5F1E9] transition-all! duration-300! hover:-translate-y-0.5 hover:shadow-lg! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F1E9]! focus-visible:ring-offset-2 focus-visible:ring-offset-[#42182F]!";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F1E9] pt-[72px]">
      <div className="absolute inset-0 z-0">
        {hero.backgroundImage ? (
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
            aria-hidden="true"
          />
        ) : null}
        {hero.backgroundVideo ? (
          <video
            className="h-full w-full object-cover object-center"
            src={hero.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1a0f14]/85 via-[#1a0f14]/60 to-[#1a0f14]/30"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 pb-10 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-10 lg:pb-16 lg:pt-24 xl:px-14 2xl:px-16">
        <div className="max-w-3xl">
          {hero.badge ? (
            <p className="mb-3 inline-flex animate-fade-in-up items-center rounded-full border border-[#A65F42]/70 bg-[#A65F42]/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5F1E9] sm:text-xs">
              {hero.badge}
            </p>
          ) : null}

          <h1 className="mb-4 max-w-[18ch] animate-fade-in-up text-balance font-serif text-[2rem] font-semibold leading-[1.1] tracking-tight text-[#F5F1E9] min-[400px]:text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl">
            {hero.heading}
          </h1>

          <p className="mb-2 max-w-[70ch] animate-fade-in-up text-sm font-semibold uppercase leading-relaxed tracking-wide text-[#F5F1E9] sm:text-base md:text-lg">
            {hero.subheading}
          </p>

          <p className="mb-6 max-w-[46ch] animate-fade-in-up text-xs leading-relaxed text-[#F5F1E9]/85 sm:text-sm md:text-base">
            {hero.brandLine}
          </p>

          <div className="mb-6 max-w-xl animate-fade-in-up rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5F1E9] sm:text-xs">
              {hero.offer.heading}
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-3">
              {hero.offer.items.map((item) => {
                const splitAt = item.lastIndexOf(" ");
                const head = splitAt > 0 ? item.slice(0, splitAt) : item;
                const tail = splitAt > 0 ? item.slice(splitAt + 1) : "";

                return (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-snug text-[#F5F1E9]/95 sm:text-sm"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>
                      {head}{" "}
                      <br className="hidden sm:block" />
                      {tail}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <EnquiryButton
              href={ctaConfig.enquiry.target}
              intent="enquire"
              label={hero.primaryCta.label}
              tone="ivory"
              className={CTA_CLASS}
            />
            <WhatsAppCta
              label={hero.secondaryCta.label}
              showNote={false}
              message={hero.whatsapp.message}
              unconfiguredNotice={hero.whatsapp.unconfiguredNotice}
              className="w-full"
              buttonClassName={CTA_CLASS}
            />
            <SiteVisitCta
              label={hero.tertiaryCta.label}
              variant="primary"
              tone="ivory"
              className={`${CTA_CLASS} sm:col-span-2 lg:col-span-1`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
