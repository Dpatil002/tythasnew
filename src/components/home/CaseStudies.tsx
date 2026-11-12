"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/home";
import Reveal from "../motion/Reveal";

const N = caseStudies.length;
/** Wrap an offset into the range that keeps the carousel circular, e.g. -3..2 for 6 cards */
const wrap = (d: number) => {
  const half = Math.floor(N / 2);
  return ((((d + half) % N) + N) % N) - half;
};

function Card({ cs, active }: { cs: CaseStudy; active: boolean }) {
  const top = cs.stats.slice(0, 2);
  const external = Boolean(cs.url);
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[22px] border bg-[#FAFBFC] transition-shadow duration-500 ${
        active ? "border-[#DCE0E6] shadow-[0_30px_60px_-30px_rgba(20,30,38,0.35)]" : "border-[#E8EAEE]"
      }`}
    >
      <header className="flex min-h-[112px] flex-col justify-center gap-3 border-b px-6 py-5" style={{ background: `${cs.accent}14`, borderColor: `${cs.accent}26` }}>
        <span className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: cs.accent }}>{cs.client}</span>
        {top.length > 0 ? (
          <dl className="flex flex-wrap gap-x-7 gap-y-2">
            {top.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 text-[13px] text-body">{s.label}</dt>
                <dd className="order-1 text-[28px] font-extrabold leading-none tracking-[-0.03em]" style={{ color: cs.accent }}>{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {cs.badges?.slice(0, 2).map((b) => (
              <li key={b} className="rounded-full border bg-white px-3.5 py-1.5 text-[14px] font-semibold" style={{ color: cs.accent, borderColor: `${cs.accent}40` }}>{b}</li>
            ))}
          </ul>
        )}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <ul className="flex flex-wrap gap-1.5">
          {cs.tags.map((t) => (
            <li key={t} className="rounded-full border border-[#E3E5E8] bg-white px-3 py-1 text-[12px] font-semibold text-[#45484F]">{t}</li>
          ))}
        </ul>
        <h3 className="text-[19px] font-bold leading-snug tracking-[-0.01em]">{cs.title}</h3>
        <p className="line-clamp-4 text-[15px] leading-relaxed text-body">{cs.summary}</p>
        <Link
          href={cs.url ?? "/contact"}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          tabIndex={active ? 0 : -1}
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-2 text-[15px] font-semibold hover:underline"
          style={{ color: cs.accent }}
        >
          {external ? "View website" : "Discuss a similar project"} <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/** Centred-card carousel like the reference: active card raised, neighbours faded, circular. */
export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(372);
  const startX = useRef<number | null>(null);

  const go = useCallback((dir: number) => setActive((a) => (a + dir + N) % N), []);

  useEffect(() => {
    const measure = () => setCardW(Math.min(372, Math.round(window.innerWidth * 0.84)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const gap = cardW < 372 ? 16 : 32;
  const arrowOffset = `max(8px, calc(50% - ${Math.round(cardW * 1.5 + gap + 24)}px))`;

  return (
    <section id="work" className="scroll-mt-20 overflow-hidden py-20 md:py-32">
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-5 px-4 text-center">
        <Reveal as="span" className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-brand">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" /> Client success stories
        </Reveal>
        <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,60px)] font-bold leading-[1.05] tracking-tighter">Work that moves businesses forward.</Reveal>
        <Reveal as="p" delay={160} className="max-w-[640px] text-[19px] leading-relaxed text-body">
          Good marketing isn&apos;t about looking busy. It&apos;s about creating measurable business impact. Here&apos;s a look at what we&apos;ve been building.
        </Reveal>
      </div>

      <Reveal delay={200} className="relative mx-auto mt-14 max-w-[1240px]">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client case studies"
          tabIndex={0}
          className="relative h-[480px] touch-pan-y select-none outline-none"
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          {caseStudies.map((cs, i) => {
            const d = wrap(i - active);
            const abs = Math.abs(d);
            const isActive = d === 0;
            return (
              <div
                key={cs.client}
                aria-hidden={!isActive}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${N}: ${cs.client}`}
                onClick={() => { if (abs === 1) go(d); }}
                className={`absolute left-1/2 top-0 h-[440px] transition-[translate,scale,opacity] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${abs === 1 ? "cursor-pointer" : ""}`}
                style={{
                  width: cardW,
                  marginLeft: -cardW / 2,
                  translate: `${d * (cardW + gap)}px ${isActive ? -12 : 0}px`,
                  scale: isActive ? "1" : "0.95",
                  opacity: abs > 1 ? 0 : isActive ? 1 : 0.55,
                  zIndex: 10 - abs,
                  pointerEvents: abs > 1 ? "none" : "auto",
                }}
              >
                <Card cs={cs} active={isActive} />
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous case study"
            className="absolute top-[42%] z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#E8EAEE] bg-white shadow-[0_8px_24px_rgba(20,30,38,0.12)] transition-transform hover:scale-105"
            style={{ left: arrowOffset }}
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next case study"
            className="absolute top-[42%] z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#E8EAEE] bg-white shadow-[0_8px_24px_rgba(20,87,203,0.25)] transition-transform hover:scale-105"
            style={{ right: arrowOffset }}
          >
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2 text-center text-[15px] tabular-nums text-subtle" aria-live="polite">
          <span className="font-bold text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(N).padStart(2, "0")}
        </p>
      </Reveal>
    </section>
  );
}
