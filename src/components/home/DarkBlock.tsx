"use client";

import { useEffect, useRef } from "react";
import { Bot, ChartNoAxesCombined, Globe, Megaphone, MousePointerClick, Users } from "lucide-react";
import DarkModeTrigger from "../motion/DarkModeTrigger";

const PILLARS = [
  { Icon: ChartNoAxesCombined, label: "Revenue Strategy" },
  { Icon: Users, label: "Customer Acquisition" },
  { Icon: Globe, label: "Digital Presence" },
  { Icon: MousePointerClick, label: "Conversion Optimisation" },
  { Icon: Megaphone, label: "Performance Marketing" },
  { Icon: Bot, label: "AI & Automation" },
];
import Reveal from "../motion/Reveal";
import { buttonClass } from "../ui";
import { site } from "@/lib/site";

/**
 * Dark section (onlines.com.ar "From zero to one"): the whole page turns dark
 * while it's on screen, and the headline can be dragged around inside the card.
 */
export default function DarkBlock() {
  const areaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current, el = titleRef.current;
    if (!area || !el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let x = 0, y = 0, sx = 0, sy = 0, ox = 0, oy = 0, px = 0, py = 0, raf = 0, active = false;
    let b = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const apply = () => {
      raf = 0;
      x = Math.max(b.minX, Math.min(b.maxX, ox + px - sx));
      y = Math.max(b.minY, Math.min(b.maxY, oy + py - sy));
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const down = (e: PointerEvent) => {
      if (!mq.matches || e.pointerType === "touch" || e.button !== 0) return;
      e.preventDefault();
      active = true;
      el.classList.add("cursor-grabbing");
      const a = area.getBoundingClientRect(), r = el.getBoundingClientRect();
      ox = x; oy = y; sx = px = e.clientX; sy = py = e.clientY;
      b = { minX: x - (r.left - a.left), maxX: x + (a.right - r.right), minY: y - (r.top - a.top), maxY: y + (a.bottom - r.bottom) };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!active) return;
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const up = () => { active = false; el.classList.remove("cursor-grabbing"); };
    const reset = () => { if (!mq.matches) { x = y = 0; el.style.transform = ""; } };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    mq.addEventListener("change", reset);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      mq.removeEventListener("change", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handle = "absolute h-2 w-2 border border-[#6b7079] bg-[#141414]";

  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] bg-[#141414] text-white">
          <div className="flex flex-wrap items-center">
            <div ref={areaRef} className="relative flex min-w-0 flex-[1_1_480px] flex-col gap-8 p-8 sm:p-12 lg:p-16">
              <div ref={titleRef} className="relative z-10 self-start select-none lg:cursor-grab">
                <div className="relative border border-dashed border-[#6b7079] px-4 py-2">
                  <span aria-hidden className={`${handle} -left-1 -top-1`} />
                  <span aria-hidden className={`${handle} left-1/2 -top-1 -translate-x-1/2`} />
                  <span aria-hidden className={`${handle} -right-1 -top-1`} />
                  <span aria-hidden className={`${handle} -bottom-1 -left-1`} />
                  <span aria-hidden className={`${handle} -bottom-1 left-1/2 -translate-x-1/2`} />
                  <span aria-hidden className={`${handle} -bottom-1 -right-1`} />
                  <h2 className="max-w-[520px] text-[clamp(34px,4vw,58px)] font-bold leading-none tracking-[-0.045em]">Your next customer is out there.</h2>
                </div>
              </div>
              <DarkModeTrigger className="flex flex-col gap-5">
                <Reveal as="p" className="max-w-[540px] text-[clamp(20px,2vw,26px)] font-medium leading-[1.3] tracking-[-0.02em]">
                  We help you reach them, earn their trust and turn their interest into business through thoughtful strategy and effective digital marketing.
                </Reveal>
                <ul className="grid max-w-[560px] grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {PILLARS.map(({ Icon, label }, i) => (
                    <Reveal as="li" key={label} delay={80 + i * 70} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[16px] font-medium">
                      <span aria-hidden className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-brand/20 text-brand-light"><Icon className="h-[18px] w-[18px]" strokeWidth={1.9} /></span>
                      {label}
                    </Reveal>
                  ))}
                </ul>
              </DarkModeTrigger>
              <Reveal delay={200}><a href={site.introCallUrl} target="_blank" rel="noreferrer" className={buttonClass("primary", "px-10")}>Book a free call</a></Reveal>
            </div>

            {/* laptop with animated halftone screen, bleeding off the card edge */}
            <Reveal variant="right" className="relative min-w-0 flex-[1_1_420px] self-stretch pb-10 pl-8 lg:py-16 lg:pl-0">
              <div aria-hidden className="relative ml-auto w-[min(640px,120%)] translate-x-[12%]">
                <div className="rounded-t-[22px] border-[10px] border-b-0 border-[#2a2b2f] bg-[#0b0b0c] p-0">
                  <div className="relative aspect-[16/10.4] overflow-hidden rounded-t-[10px]">
                    <div className="halftone absolute inset-0" />
                    <span className="absolute left-1/2 top-0 h-4 w-24 -translate-x-1/2 rounded-b-lg bg-[#0b0b0c]" />
                  </div>
                </div>
                <div className="h-4 rounded-b-[14px] bg-gradient-to-b from-[#3a3b40] to-[#18191c]" />
                <div className="mx-auto -mt-[6px] h-1.5 w-1/4 rounded-b-md bg-[#55575d]" />
              </div>
            </Reveal>
          </div>
        </div>
        <p className="dark-fade mt-6 max-w-[460px] text-[15px] text-[#8A8F96]">
          We work with businesses across India, the United Kingdom, Australia and beyond.
        </p>
      </div>
    </section>
  );
}
