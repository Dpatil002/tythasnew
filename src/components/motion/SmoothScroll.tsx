"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling, like onlines.com.ar. Off for reduced-motion and touch-first devices. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
