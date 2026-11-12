"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { buttonClass } from "../ui";

const LINE_1 = "We build and grow digital businesses.";
const LINE_2 = "You just approve.";
const SUB = "Strategy, design, development, marketing and AI. One team runs it all, from first idea to steady sales.";

/**
 * The statement stays pinned while its words colour in one by one as you scroll,
 * like the quote block on onlines.com.ar. Fully reversible: progress is a pure
 * function of scroll position.
 */
export default function ScrollWords() {
  const outer = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".scroll-word"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      words.forEach((w) => w.classList.add("is-on"));
      return;
    }
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-r.top / travel, 0), 1) : 1;
      const lit = Math.ceil(p * 1.15 * words.length);
      words.forEach((w, i) => w.classList.toggle("is-on", i < lit));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const split = (text: string, accent = false) =>
    text.split(" ").map((w, i) => (
      <span key={`${w}-${i}`} className={`scroll-word ${accent ? "accent" : ""}`}>
        {w}{" "}
      </span>
    ));

  return (
    <section ref={outer} className="relative h-[180vh]">
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 px-4 text-center">
          <h1 className="text-[clamp(38px,5.6vw,80px)] font-bold leading-[1.04] tracking-tighter">
            {split(LINE_1)}
            <br className="hidden md:block" />
            {split(LINE_2, true)}
          </h1>
          <p className="max-w-[680px] text-[clamp(18px,1.6vw,22px)] leading-relaxed">{split(SUB)}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={buttonClass("primary")}>Let&apos;s talk</Link>
            <Link href="/#work" className={buttonClass("secondary")}>See our work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
