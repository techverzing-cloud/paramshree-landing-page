"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  useEffect(() => {
    // ponytail: no lenis.stop()/start() around modal scroll locks - Lenis resyncs from native scroll events; add stop/start if lock jitter shows up.
    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
