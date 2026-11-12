"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Turns the whole page dark while its children are on screen, like the
 * dark-mode block on onlines.com.ar. Adds `is-dark` to <html>; CSS fades the
 * page background and the header.
 */
export default function DarkModeTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      ([entry]) => root.classList.toggle("is-dark", entry.isIntersecting),
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      root.classList.remove("is-dark");
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
