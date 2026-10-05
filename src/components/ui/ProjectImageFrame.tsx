import type { ReactNode } from "react";

interface ProjectImageFrameProps {
  /** Describes the media the frame stands in for. */
  alt: string;
  label?: string;
  className?: string;
  tone?: "ivory" | "sage";
  icon?: ReactNode;
}

/**
 * Neutral frame used wherever a verified project photograph has not been
 * supplied yet. It never invents content: it shows the pending label only.
 */
export function ProjectImageFrame({
  alt,
  label,
  className = "",
  tone = "ivory",
  icon,
}: ProjectImageFrameProps) {
  const background =
    tone === "sage"
      ? "bg-gradient-to-br from-[#EDE9DF] via-[#E7E9E1] to-[#DCE0D6]"
      : "bg-gradient-to-br from-[#F1ECE3] via-[#F5F1E9] to-[#E9E4D8]";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative isolate flex items-center justify-center overflow-hidden border border-[#d7d0c2] ${background} ${className}`}
    >
      <svg
        viewBox="0 0 120 200"
        fill="none"
        aria-hidden="true"
        className="absolute -bottom-4 -right-3 h-3/4 w-2/5 rotate-12 text-[#87917B]/25"
      >
        <path
          d="M62 190C62 140 60 96 34 46"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M52 132c-16-4-26-16-30-32 16 2 27 13 31 29"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 104c14-6 22-18 24-34-14 4-23 15-25 30"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        viewBox="0 0 120 200"
        fill="none"
        aria-hidden="true"
        className="absolute -left-3 -top-4 h-2/5 w-1/3 -rotate-12 text-[#87917B]/20"
      >
        <path
          d="M62 190C62 140 60 96 34 46"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M44 74c-10-4-16-12-18-22 10 2 17 9 19 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span
        aria-hidden="true"
        className="absolute left-3 top-3 h-6 w-6 border-l border-t border-[#A65F42]/30"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[#A65F42]/30"
      />

      <span className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="text-[#A65F42]/70">
          {icon ?? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 8.5h3l1.6-2.4h6.8L17 8.5h3v9.5H4z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="3.1" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          )}
        </span>
        {label && (
          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#35312F]/50 sm:text-[10px]">
            {label}
          </span>
        )}
      </span>
    </div>
  );
}