"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/home";
import Reveal from "../motion/Reveal";
import Waves from "../work/Waves";

const N = caseStudies.length;

/** Simple browser wireframe in the client's colour. */
function MiniBrowser({ accent }: { accent: string }) {
  return (
    <div className="w-full max-w-[300px] rounded-lg bg-white p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="mb-3 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" /><span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" /><span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
      </div>
      <span className="block h-2.5 w-[85%] rounded-full bg-ink" />
      <span className="mt-2 block h-1.5 w-full rounded-full bg-[#E3E6EA]" />
      <span className="mt-1.5 block h-1.5 w-[75%] rounded-full bg-[#E3E6EA]" />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <span className="h-12 rounded bg-[#E9EBEE]" />
        <span className="h-12 rounded" style={{ background: accent }} />
        <span className="h-12 rounded bg-[#E9EBEE]" />
      </div>
      <span className="mt-4 block h-5 w-[38%] rounded-full" style={{ background: accent }} />
    </div>
  );
}

function Card({ cs, active }: { cs: CaseStudy; active: boolean }) {
  const external = Boolean(cs.url);
  const tab = active ? 0 : -1;
  return (
    <article className="flex h-full flex-col rounded-[28px] bg-[#1B1D22] p-2 shadow-[0_40px_80px_-30px_rgba(10,10,40,0.7)]">
      <div className="flex h-full flex-col overflow-hidden rounded-[22px] bg-[#0B0C0F] text-white">
        <div className="flex items-center justify-between gap-4 px-6 pt-5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/50 md:px-8">
          <span className="flex items-center gap-2"><Image src="/brand/mark-white.png" alt="" width={20} height={14} className="h-3.5 w-auto" /> Case study</span>
          <span className="truncate normal-case tracking-normal">{cs.sector}</span>
        </div>

        <div className="relative grid flex-1 gap-6 px-6 pb-8 pt-6 md:grid-cols-[1.25fr_1fr] md:px-8">
          <Waves accent={cs.accent} className="absolute inset-y-0 right-0 hidden h-full w-[70%] opacity-70 md:block" />
          <div className="relative flex flex-col gap-4">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: cs.accent }}>{cs.client}</span>
            <h3 className="text-[clamp(26px,3vw,38px)] font-bold leading-[1.08] tracking-[-0.03em]">
              <Link href={`/work/${cs.slug}`} tabIndex={tab} className="hover:underline hover:decoration-2 hover:underline-offset-4">{cs.headline}</Link>
            </h3>
            <p className="max-w-[420px] text-[15px] leading-relaxed text-white/65">{cs.short}</p>
            <ul className="flex flex-wrap gap-1.5">
              {cs.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/80">{t}</li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={cs.url ?? "/contact"}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                tabIndex={tab}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/25 px-4 text-[14px] font-semibold transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                {external ? "View website" : "Discuss a similar project"} <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href={`/work/${cs.slug}`} tabIndex={tab} className="text-[14px] font-semibold text-white/70 hover:text-white">Read case study →</Link>
            </div>
          </div>
          <div className="relative hidden items-center justify-center md:flex">
            <MiniBrowser accent={cs.accent} />
          </div>
        </div>

        <dl className="grid grid-cols-3 border-t border-white/10">
          {(cs.stats.length > 0 ? cs.stats : (cs.badges ?? []).map((b) => ({ value: b, label: "" }))).slice(0, 3).map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1 px-2 py-6 text-center">
              {s.label ? (
                <>
                  <dd className="text-[clamp(22px,2.6vw,34px)] font-bold leading-none tracking-[-0.03em]">{s.value}</dd>
                  <dt className="text-[12px] text-white/50">{s.label}</dt>
                </>
              ) : (
                <>
                  <dd className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: `${cs.accent}33`, color: cs.accent }}><Check aria-hidden className="h-4 w-4" /></dd>
                  <dt className="text-[13px] font-semibold text-white/85 md:text-[15px]">{s.value}</dt>
                </>
              )}
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/** Blue-violet band with wide device-style case study cards in a snap carousel. */
export default function CaseStudies() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.children[0] as HTMLElement).offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.children[0] as HTMLElement;
      const step = (el.children[1] as HTMLElement).offsetLeft - first.offsetLeft;
      setActive(Math.max(0, Math.min(N - 1, Math.round(el.scrollLeft / step))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const edge = "max(16px, calc((100vw - 1240px) / 2 + 40px))";

  return (
    <section
      id="work"
      className="scroll-mt-20 overflow-hidden pb-16 pt-20 text-white md:pb-20 md:pt-28"
      style={{ background: "linear-gradient(160deg, #2156D6 0%, #3A3FC4 40%, #3B2A9E 75%, #2A1C78 100%)" }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <div className="flex max-w-[640px] flex-col gap-4">
          <Reveal as="span" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">Case studies</Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,60px)] font-bold leading-[1.05] tracking-tighter">Results that matter.</Reveal>
          <Reveal as="p" delay={160} className="text-[17px] leading-relaxed text-white/75">
            Healthcare, real estate, AI, SaaS and e-commerce. See how strategy-led design turned each project into measurable results.
          </Reveal>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous case study"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10 disabled:opacity-40">
            <ArrowLeft aria-hidden className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scrollTo(Math.min(N - 1, active + 1))} disabled={active === N - 1} aria-label="Next case study"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105 disabled:opacity-40">
            <ArrowRight aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client case studies"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2"
        style={{ paddingInline: edge, scrollPaddingInline: edge }}
      >
        {caseStudies.map((cs, i) => (
          <div key={cs.slug} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${N}: ${cs.client}`}
            className="w-[min(860px,88vw)] shrink-0 snap-start">
            <Card cs={cs} active={i === active} />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-4 flex max-w-[1240px] flex-col items-center gap-5 px-4">
        <p className="text-[14px] tabular-nums text-white/60" aria-live="polite">
          <span className="font-bold text-white">{String(active + 1).padStart(2, "0")}</span> / {String(N).padStart(2, "0")}
        </p>
        <Link href="/work" className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/30 px-5 text-[15px] font-semibold hover:bg-white hover:text-ink">
          View all case studies <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
