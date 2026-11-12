"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eye, MessagesSquare, Rocket } from "lucide-react";
import Reveal from "../motion/Reveal";
import { buttonClass } from "../ui";

function Comment({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(20,30,38,0.12)]">
      <span aria-hidden className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink">
        <Image src="/brand/mark-white.png" alt="" width={22} height={15} className="h-auto w-[22px]" />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[13px]"><strong>Tythas</strong> <span className="text-subtle">{time}</span></span>
        <span className="text-[15px]">{text}</span>
      </div>
    </div>
  );
}

/** Deck of project cards that fans open when it scrolls into view (onlines.com.ar portfolio block). */
export default function FanDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { window.setTimeout(() => setOpen(true), 150); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const card = "absolute left-1/2 top-1/2 overflow-hidden rounded-[22px] shadow-[0_30px_60px_-20px_rgba(20,30,38,0.45)] transition-[translate,rotate] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]";

  return (
    <section className="overflow-hidden py-20 md:py-32">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-16 px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
          <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">How we collaborate</Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">
            Built with you, not just for you.
          </Reveal>
          <Reveal as="p" delay={160} className="max-w-[520px] text-[19px] text-body">
            You see the work while it&apos;s happening. Designs, copy and campaigns land in one shared space where you can comment, ask questions and approve.
          </Reveal>
          <ul className="flex flex-col gap-4">
            {[
              { Icon: Eye, t: "Live previews of every design and page" },
              { Icon: MessagesSquare, t: "Comments right on the work, answered in hours" },
              { Icon: Rocket, t: "Nothing goes live until you approve it" },
            ].map(({ Icon, t }, i) => (
              <Reveal as="li" key={t} delay={240 + i * 80} className="flex items-center gap-3 text-[17px]">
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                {t}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={480}><Link href="/contact" className={buttonClass("primary")}>Start a project</Link></Reveal>
        </div>

        <div ref={deckRef} aria-hidden className="group relative h-[420px] min-w-0 flex-[1_1_480px] max-sm:scale-[0.78] sm:h-[540px]">
          {/* left card: numbered list */}
          <div
            className={card}
            style={{
              width: 240, height: 360,
              translate: open ? "-118% -46%" : "-50% -50%",
              rotate: open ? "-9deg" : "0deg",
              background: "radial-gradient(120% 90% at 20% 0%, #c2410c 0%, #7c2d12 45%, #1c0f0a 100%)",
            }}
          >
            <ol className="flex h-full flex-col justify-center gap-2 p-6 text-[23px] font-semibold leading-tight text-white">
              {["Leads", "Bookings", "Sales", "Reviews", "Growth"].map((w, i) => (
                <li key={w}><span className="mr-1 align-top text-xs opacity-70">{i + 1}</span>{w}</li>
              ))}
            </ol>
          </div>

          {/* right card: line art */}
          <div
            className={card}
            style={{
              width: 240, height: 360,
              translate: open ? "18% -54%" : "-50% -50%",
              rotate: open ? "9deg" : "0deg",
              background: "#15171c",
            }}
          >
            <svg viewBox="0 0 240 360" className="h-full w-full">
              {Array.from({ length: 14 }, (_, i) => (
                <path key={i} d={`M-20 ${40 + i * 22} C 60 ${10 + i * 26}, 140 ${120 + i * 14}, 260 ${60 + i * 20}`} fill="none" stroke="#d9f45b" strokeOpacity={0.25 + (i % 4) * 0.18} strokeWidth="1.4" />
              ))}
            </svg>
          </div>

          {/* centre card: MVP screen */}
          <div
            className={`${card} z-10 group-hover:scale-[1.02]`}
            style={{ width: 280, height: 420, translate: open ? "-50% -50%" : "-50% -48%", rotate: "0deg" }}
          >
            <div className="halftone flex h-full w-full flex-col justify-between p-6 text-white">
              <span className="self-start rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">MVP · Week 3</span>
              <div className="flex flex-col gap-2">
                <Image src="/brand/mark-white.png" alt="" width={56} height={38} className="h-auto w-14" />
                <span className="text-[30px] font-bold leading-tight tracking-[-0.03em]">Your idea,<br />live in 30 days.</span>
              </div>
            </div>
          </div>

          {/* comments sliding in from different sides */}
          <div className="absolute right-0 top-[8%] z-20 sm:right-[2%]">
            <Reveal variant="right" delay={500}><Comment time="two weeks ago" text="Let's try a wider grid." /></Reveal>
          </div>
          <div className="absolute bottom-[4%] left-[2%] z-20 sm:left-[14%]">
            <Reveal variant="up" delay={750}><Comment time="yesterday" text="Approved. Ship it on Monday." /></Reveal>
          </div>

          {/* app tiles pop in */}
          <div className="absolute left-[4%] top-[12%] z-20">
            <Reveal variant="pop" delay={300}>
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,38,0.12)]"><Image src="/icons/nextdotjs.svg" alt="" width={32} height={32} /></span>
            </Reveal>
          </div>
          <div className="absolute bottom-[26%] right-[4%] z-20">
            <Reveal variant="pop" delay={450}>
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,38,0.12)]"><Image src="/icons/figma.svg" alt="" width={30} height={30} /></span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
