"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/home";
import Reveal from "../motion/Reveal";

function Waves({ color, id }: { color: string; id: string }) {
  return (
    <svg aria-hidden viewBox="0 0 800 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="0.5" stopColor={color} stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff6ad5" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {Array.from({ length: 22 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${210 + i * 3} C 180 ${80 + i * 9}, 320 ${330 - i * 6}, 520 ${190 + i * 4} S 760 ${110 + i * 7}, 800 ${160 + i * 5}`}
          fill="none"
          stroke={`url(#${id})`}
          strokeOpacity={0.12 + (i % 5) * 0.06}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function Device({ cs }: { cs: CaseStudy }) {
  if (cs.device === "browser") {
    return (
      <div className="w-[300px] overflow-hidden rounded-xl border border-white/10 bg-[#f4f5f7] shadow-2xl">
        <div className="flex h-6 items-center gap-1 bg-white px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" /><span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" /><span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <span className="h-3 w-3/4 rounded bg-[#141E26]" />
          <span className="h-2 w-full rounded bg-[#d5d9de]" />
          <span className="h-2 w-2/3 rounded bg-[#d5d9de]" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => <span key={i} className="h-12 rounded-md" style={{ background: i === 1 ? cs.accent : "#e6e8ec" }} />)}
          </div>
          <span className="mt-1 h-6 w-24 rounded-full" style={{ background: cs.accent }} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-[150px] rounded-[26px] border-[5px] border-[#2a2b2f] bg-white p-2 shadow-2xl">
      <div className="mx-auto mb-2 h-3 w-12 rounded-full bg-[#2a2b2f]" />
      <div className="flex flex-col gap-2 px-1 pb-3">
        <span className="h-2 w-1/2 rounded bg-[#141E26]" />
        <span className="text-[15px] font-bold" style={{ color: cs.accent }}>{cs.client}</span>
        <span className="h-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${cs.accent}, #141E26)` }} />
        <div className="grid grid-cols-2 gap-1.5">
          <span className="h-8 rounded-md bg-[#eef0f3]" /><span className="h-8 rounded-md bg-[#eef0f3]" />
        </div>
        <span className="h-6 rounded-full" style={{ background: cs.accent }} />
      </div>
    </div>
  );
}

function CaseCard({ cs }: { cs: CaseStudy }) {
  const external = Boolean(cs.url);
  return (
    <article className="w-[min(88vw,880px)] shrink-0 snap-start">
      <Link
        href={cs.url ?? "/contact"}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group block rounded-[34px] bg-[#1b1c20] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-4"
      >
        <div className="relative overflow-hidden rounded-[22px] bg-[#0c0d10] text-white">
          <Waves color={cs.accent} id={`waves-${cs.client.replace(/\W/g, "")}`} />
          <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-3 text-[11px] text-white/50">
            <span className="flex items-center gap-2"><Image src="/brand/mark-white.png" alt="" width={20} height={14} className="h-auto w-5" /> CASE STUDY</span>
            <span className="hidden sm:block">{cs.sector}</span>
          </div>
          <div className="relative grid gap-8 px-6 pb-8 pt-8 sm:px-10 md:grid-cols-[1.25fr_1fr] md:items-center">
            <div className="flex flex-col gap-4">
              <span className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: cs.accent === "#2E62D9" ? "#8FB3F5" : cs.accent }}>{cs.client}</span>
              <h3 className="text-[clamp(26px,3.2vw,40px)] font-bold leading-[1.08] tracking-[-0.035em]">{cs.headline}</h3>
              <p className="max-w-[440px] text-[15px] leading-relaxed text-white/65">{cs.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {cs.tags.map((t) => <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/75">{t}</li>)}
              </ul>
              <span className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors group-hover:border-white group-hover:bg-white group-hover:text-ink">
                {external ? "View website" : "Discuss a similar project"} <ArrowUpRight aria-hidden className="h-4 w-4" />
              </span>
            </div>
            <div className="flex justify-center transition-transform duration-500 group-hover:-translate-y-2">
              <Device cs={cs} />
            </div>
          </div>
          {cs.stats.length > 0 ? (
            <dl className="relative grid border-t border-white/10" style={{ gridTemplateColumns: `repeat(${cs.stats.length}, minmax(0, 1fr))` }}>
              {cs.stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1 px-4 py-6 text-center sm:px-6">
                  <dt className="order-2 text-[12px] text-white/50 sm:text-[13px]">{s.label}</dt>
                  <dd className="order-1 text-[clamp(22px,2.8vw,34px)] font-bold tracking-[-0.03em]" style={{ color: cs.accent === "#2E62D9" ? "#FFFFFF" : undefined }}>{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <ul className="relative flex flex-wrap justify-center gap-3 border-t border-white/10 px-4 py-6">
              {cs.badges?.map((b) => (
                <li key={b} className="rounded-full px-4 py-2 text-[14px] font-semibold" style={{ background: `${cs.accent}26`, color: "#fff", boxShadow: `inset 0 0 0 1px ${cs.accent}80` }}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function CaseStudies() {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector("article");
      const w = (card?.clientWidth ?? 800) + 24;
      setCurrent(Math.min(caseStudies.length - 1, Math.round(el.scrollLeft / w)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 800) + 24), behavior: "smooth" });
  };

  return (
    <section id="work" className="scroll-mt-20 overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#2E62D9_0%,#3b2a9e_55%,#1a1240_100%)] py-20 text-white md:py-28">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <div className="flex max-w-[680px] flex-col gap-4">
          <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-light">Case studies</Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">Results that matter.</Reveal>
          <Reveal as="p" delay={160} className="text-[19px] text-white/70">Healthcare, real estate, AI, SaaS and e-commerce. See how strategy-led design turned each project into measurable results.</Reveal>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Previous case study" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-ink"><ArrowLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => step(1)} aria-label="Next case study" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-ink"><ArrowRight className="h-5 w-5" /></button>
        </div>
      </div>
      <Reveal variant="left" className="mt-12">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scroll-pl-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-pl-6 sm:px-6 lg:scroll-pl-[max(40px,calc((100vw-1160px)/2))] lg:px-[max(40px,calc((100vw-1160px)/2))] [&::-webkit-scrollbar]:hidden"
        >
          {caseStudies.map((cs) => <CaseCard key={cs.client} cs={cs} />)}
        </div>
      </Reveal>
      <p className="mt-8 text-center text-[15px] tabular-nums text-white/60" aria-live="polite">
        <span className="font-bold text-white">{String(current + 1).padStart(2, "0")}</span> / {String(caseStudies.length).padStart(2, "0")}
      </p>
    </section>
  );
}
