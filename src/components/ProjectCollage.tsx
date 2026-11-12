"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "./motion/Reveal";
import { ChatIcon, buttonClass } from "./ui";

const WAYPOINTS = [
  { x: 0.41, y: 0.35, pause: 450 },
  { x: 0.2, y: 0.16, pause: 760, click: true },
  { x: 0.57, y: 0.17, pause: 540 },
  { x: 0.86, y: 0.22, pause: 720, click: true },
  { x: 0.8, y: 0.52, pause: 460 },
  { x: 0.62, y: 0.66, pause: 700, click: true },
  { x: 0.23, y: 0.66, pause: 420 },
  { x: 0.12, y: 0.82, pause: 760, click: true },
  { x: 0.33, y: 0.49, pause: 500 },
];
const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

function Tile({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <Reveal variant="pop" delay={delay} threshold={0.3}>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,38,0.12)] sm:h-16 sm:w-16">{children}</span>
      </Reveal>
    </div>
  );
}

/**
 * "Let's do a project together" (onlines.com.ar contact block):
 * dot pattern that lights up around the mouse, cards that fade in as they
 * enter, app tiles that pop in, and a cursor that tours the scene clicking.
 */
export default function ProjectCollage({
  title = ["Ready to grow", "your business?"],
  text = "Tell us what you're building and where you want to go. We'll figure out how to get you there.",
}: {
  title?: [string, string];
  text?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* dots light up around the mouse */
  useEffect(() => {
    const area = areaRef.current;
    if (!area || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = area.getBoundingClientRect();
      area.style.setProperty("--mx", `${e.clientX - r.left}px`);
      area.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onLeave = () => { area.style.setProperty("--mx", "-999px"); area.style.setProperty("--my", "-999px"); };
    area.addEventListener("mousemove", onMove, { passive: true });
    area.addEventListener("mouseleave", onLeave);
    return () => { area.removeEventListener("mousemove", onMove); area.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* cursor tour, starts when the area is on screen */
  useEffect(() => {
    const area = areaRef.current, cur = cursorRef.current;
    if (!area || !cur) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cur.style.opacity = "1"; cur.style.left = "62%"; cur.style.top = "66%";
      return;
    }
    let raf = 0, idx = 0, phase: "pause" | "move" = "pause", t0: number | null = null, clicked = false, running = false;
    let from = { x: 0, y: 0 }, to = { x: 0, y: 0 };
    const px = (w: (typeof WAYPOINTS)[number]) => ({ x: area.offsetWidth * w.x, y: area.offsetHeight * w.y });
    const set = (p: { x: number; y: number }) => { cur.style.left = `${p.x}px`; cur.style.top = `${p.y}px`; };
    const tick = (now: number) => {
      if (t0 === null) { t0 = now; set(px(WAYPOINTS[idx])); }
      if (phase === "pause") {
        const wp = WAYPOINTS[idx];
        if (wp.click && !clicked && now - t0 > 90) {
          clicked = true;
          cur.classList.add("cursor-click");
          window.setTimeout(() => cur.classList.remove("cursor-click"), 220);
        }
        if (now - t0 >= wp.pause) {
          const next = (idx + 1) % WAYPOINTS.length;
          from = px(WAYPOINTS[idx]); to = px(WAYPOINTS[next]);
          phase = "move"; t0 = now; clicked = false;
        }
      } else {
        const next = (idx + 1) % WAYPOINTS.length;
        const p = Math.min((now - t0) / (WAYPOINTS[next].click ? 1380 : 1100), 1), e = ease(p);
        set({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e });
        if (p >= 1) { idx = next; phase = "pause"; t0 = now; }
      }
      if (running) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true; cur.style.opacity = "1"; raf = requestAnimationFrame(tick);
      } else if (!e.isIntersecting && running) {
        running = false; cancelAnimationFrame(raf);
      }
    }, { threshold: 0.3 });
    io.observe(area);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const card = "rounded-xl border border-[#E3E5E8] bg-white shadow-[0_18px_40px_-18px_rgba(20,30,38,0.25)]";

  return (
    <section className="overflow-hidden border-t border-[#EDEDED] py-20 md:py-28">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-12 px-4 sm:px-6 lg:px-10">
        {/* animation area */}
        <div ref={areaRef} aria-hidden className="relative h-[440px] min-w-0 flex-[1_1_460px] select-none sm:h-[540px]">
          <div className="dots-base absolute inset-0 rounded-3xl" />
          <div className="dots-glow absolute inset-0 rounded-3xl" />
          <span className="absolute left-[18%] top-[12%] text-[clamp(160px,22vw,300px)] font-extrabold leading-none tracking-[-0.06em] text-[#F1F2F4]">Aa</span>

          {/* search-console style chart */}
          <div className="absolute left-[2%] top-[4%] z-10 w-[64%] -rotate-1">
            <Reveal variant="fade" delay={0} threshold={0.3}>
              <div className={`${card} p-4`}>
                <div className="mb-1 flex justify-between text-[10px] text-subtle"><span>Clicks</span><span>Impressions</span></div>
                <svg viewBox="0 0 300 120" className="h-auto w-full">
                  {[20, 50, 80, 110].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#EEF0F3" />)}
                  <polyline fill="none" stroke="#5B4BD6" strokeWidth="1.6" points="0,108 20,104 35,100 50,92 62,96 75,70 85,84 100,62 112,76 125,58 140,66 152,44 165,58 180,40 192,50 205,34 220,46 232,30 248,38 260,24 275,30 300,14" />
                  <polyline fill="none" stroke="#3B8DF5" strokeWidth="1.6" points="0,112 20,110 35,106 50,102 62,104 75,86 85,96 100,80 112,90 125,74 140,82 152,66 165,78 180,62 192,70 205,56 220,66 232,52 248,60 260,46 275,58 300,40" />
                </svg>
              </div>
            </Reveal>
          </div>

          {/* strategy call card */}
          <div className="absolute right-[2%] top-[10%] z-10 w-[40%] rotate-[4deg]">
            <Reveal variant="fade" delay={150} threshold={0.3}>
              <div className={`${card} overflow-hidden p-2`}>
                <div className="flex aspect-[4/3] flex-col justify-between rounded-lg bg-[radial-gradient(120%_120%_at_0%_0%,#2E62D9,#141E26)] p-3 text-white">
                  <span className="self-start rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">Strategy call · 30 min</span>
                  <div className="flex items-end gap-2">
                    <span className="h-10 w-10 rounded-full bg-[#F8DFF1]" /><span className="h-10 w-10 rounded-full bg-[#DCEFF4]" />
                    <span className="ml-auto rounded-md bg-[#D9480F] px-1.5 py-0.5 text-[10px]">● REC</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* new lead notification */}
          <div className="absolute bottom-[4%] left-[6%] z-10 w-[46%] -rotate-[5deg]">
            <Reveal variant="fade" delay={300} threshold={0.3}>
              <div className={`${card} flex flex-col gap-2 p-4`}>
                <span className="flex items-center gap-2 text-[11px] font-semibold text-[#1E8A4C]"><span className="h-2 w-2 rounded-full bg-[#1E8A4C]" /> New lead · Hot</span>
                <span className="text-[15px] font-bold">Priya S. wants a new website</span>
                <span className="text-[12px] text-subtle">Budget ₹25k–50k · Starting this month</span>
                <span className="mt-1 h-7 w-28 rounded-full bg-brand" />
              </div>
            </Reveal>
          </div>

          {/* browser wireframe */}
          <div className="absolute bottom-[8%] right-[4%] z-10 w-[44%] -rotate-[3deg]">
            <Reveal variant="fade" delay={450} threshold={0.3}>
              <div className={`${card} overflow-hidden`}>
                <div className="flex h-6 items-center gap-1 border-b border-[#EEE] px-2"><span className="h-1.5 w-1.5 rounded-full border border-[#BDBDBD]" /><span className="h-1.5 w-1.5 rounded-full border border-[#BDBDBD]" /><span className="h-1.5 w-1.5 rounded-full border border-[#BDBDBD]" /></div>
                <div className="flex flex-col gap-2 p-3">
                  <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#EEE]" /><span className="h-1.5 w-1/3 rounded bg-[#EEE]" /></span>
                  <span className="flex items-center gap-2 pl-5"><span className="h-3 w-3 rounded-full bg-[#EEE]" /><span className="h-1.5 w-1/2 rounded bg-[#EEE]" /></span>
                  <span className="flex items-center gap-2 pl-5"><span className="h-3 w-3 rounded-full bg-[#EEE]" /><span className="h-1.5 w-2/5 rounded bg-[#EEE]" /></span>
                  <span className="mt-1 h-6 rounded-md border border-[#EEE]" />
                </div>
              </div>
            </Reveal>
          </div>

          <Tile className="left-[14%] top-[44%]" delay={200}><Image src="/icons/nextdotjs.svg" alt="" width={30} height={30} /></Tile>
          <Tile className="right-[30%] top-[40%]" delay={320}><Image src="/icons/figma.svg" alt="" width={28} height={28} /></Tile>
          <Tile className="max-sm:hidden left-[1%] top-[62%]" delay={440}><Image src="/icons/googlesearchconsole.svg" alt="" width={30} height={30} /></Tile>
          <Tile className="max-sm:hidden bottom-[30%] left-[30%]" delay={560}><Image src="/icons/notion.svg" alt="" width={30} height={30} /></Tile>
          <Tile className="max-sm:hidden right-[1%] top-[50%]" delay={680}><ChatIcon size={26} /></Tile>

          {/* touring cursor */}
          <div ref={cursorRef} className="pointer-events-none absolute z-30 flex flex-col gap-0.5 opacity-0 transition-opacity duration-500" style={{ left: "41%", top: "35%" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" className="origin-top-left transition-transform duration-150"><path d="M3 2l18 8-8 2.5L10 21z" fill="#D9480F" /></svg>
            <span className="ml-2.5 whitespace-nowrap rounded bg-[#D9480F] px-2 py-0.5 text-[14px] font-medium text-white">Customer</span>
          </div>
        </div>

        {/* copy */}
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
          <Reveal as="h2" className="text-[clamp(40px,4.4vw,64px)] font-bold leading-[1.02] tracking-[-0.045em]">
            <span className="block border-b border-dotted border-[#C9CED4] pb-1">{title[0]}</span>
            <span className="block border-b border-dotted border-[#C9CED4] pb-1">{title[1]}</span>
          </Reveal>
          <Reveal as="p" delay={120} className="max-w-[500px] text-[19px] text-body">{text}</Reveal>
          <Reveal delay={220} className="flex flex-wrap items-center gap-5">
            <Link href="/contact" className={buttonClass("primary", "min-w-[200px]")}>Let&apos;s talk</Link>
            <a href={whatsappLink("Hi Tythas, I'd like to grow my business.")} target="_blank" rel="noreferrer" className={buttonClass("secondary", "gap-2")}>
              <Image src="/icons/whatsapp.svg" alt="" width={20} height={20} /> Chat on WhatsApp
            </a>
          </Reveal>
          <Reveal as="p" delay={300} className="text-sm text-subtle">We reply within {site.replyTime}. Or email <a href={`mailto:${site.email}`} className="font-semibold text-ink underline-offset-4 hover:underline">{site.email}</a></Reveal>
        </div>
      </div>
    </section>
  );
}
