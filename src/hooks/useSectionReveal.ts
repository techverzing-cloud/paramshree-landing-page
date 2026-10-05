import { useEffect, useRef, useState } from "react";

export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          } else {
            setIsPending(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const hidden = isPending && !isVisible;
  const state = hidden ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0";

  return { ref, state };
}
