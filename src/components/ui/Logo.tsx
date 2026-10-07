import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 min-w-0" aria-label={`${siteConfig.name} home`}>
      <div className="flex items-center justify-center">
        {siteConfig.logo.image ? (
          <Image
            src={siteConfig.logo.image.src}
            alt={siteConfig.logo.image.alt}
            width={siteConfig.logo.image.width ?? 120}
            height={siteConfig.logo.image.height ?? 80}
            className="h-10 w-auto object-contain"
            priority
          />
        ) : siteConfig.logo.svgMark ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A65F42] bg-[#F5F1E9] text-[#42182F]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 3c-2 2-4 3-6 3 0 4 2 6 4 8 2-2 4-4 4-8-2 0-4-1-6-3z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M12 3c2 2 4 3 6 3 0 4-2 6-4 8-2-2-4-4-4-8 2 0 4-1 6-3z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="12" cy="11" r="1" fill="currentColor" />
            </svg>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A65F42] bg-[#F5F1E9] text-[#42182F]">
            <span className="text-xs font-semibold">{siteConfig.logo.markText}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-serif text-xl font-semibold tracking-tight text-[#A65F42] sm:text-2xl truncate tracking-[0.3em]">
          {siteConfig.logo.wordmark}
        </span>
        <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-[#A65F42]">
          {siteConfig.logo.channelPartner}
        </span>
      </div>
    </Link>
  );
}
