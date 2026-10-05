import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { SiteVisitCta } from "@/components/ui/SiteVisitCta";
import { ctaConfig } from "@/data/cta";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh] w-full overflow-hidden bg-[#F5F1E9]">
      <div className="absolute inset-0 z-0">
        {siteConfig.hero.backgroundImage ? (
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${siteConfig.hero.backgroundImage})` }}
            aria-hidden="true"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-[#42182F]/90 via-[#42182F]/60 to-transparent" aria-hidden="true" />
        )}
        {siteConfig.hero.backgroundVideo && (
          <video
            className="h-full w-full object-cover object-center"
            src={siteConfig.hero.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f14]/80 via-[#1a0f14]/50 to-transparent" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh] w-full max-w-screen-2xl flex-col justify-center px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
          <p className="mb-3 sm:mb-4 animate-fade-in-up text-xs font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em] text-[#F5F1E9]/80">
            {siteConfig.hero.eyebrow}
          </p>
          <h1 className="mb-4 sm:mb-6 animate-fade-in-up animation-delay-100 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight tracking-tight text-[#F5F1E9] break-words">
            {siteConfig.hero.heading}
          </h1>
          <p className="mb-4 sm:mb-6 animate-fade-in-up animation-delay-200 text-lg sm:text-xl md:text-2xl font-medium text-[#F5F1E9]/95">
            {siteConfig.hero.subheading}
          </p>
          <p className="mb-6 sm:mb-8 animate-fade-in-up animation-delay-300 max-w-lg sm:max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#F5F1E9]/90">
            {siteConfig.hero.description}
          </p>

          <div className="mb-8 sm:mb-10 animate-fade-in-up animation-delay-400 flex flex-col gap-3 sm:flex-row sm:gap-4">
<EnquiryButton
              href={ctaConfig.enquiry.target}
              intent="enquire"
              className="w-full sm:w-auto justify-center transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3"
            />
            <SiteVisitCta
              label={siteConfig.hero.secondaryCta.label}
              variant="secondary"
              className="w-full sm:w-auto justify-center border-white text-[#F5F1E9] hover:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animation-delay-500">
            {siteConfig.hero.features.map((feature, idx) => (
              <div
                key={feature.label}
                className="flex items-start sm:items-center gap-2 text-xs sm:text-sm text-[#F5F1E9]/90 animation-delay-600 animate-fade-in-up"
                style={{ animationDelay: `${600 + idx * 100}ms` }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5 sm:mt-0"
                >
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="break-words">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
