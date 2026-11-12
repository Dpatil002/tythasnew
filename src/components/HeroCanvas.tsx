"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChatIcon } from "./ui";

/* ------------------------------------------------------------------
   Interactive "Figma canvas" hero, modelled on onlines.com.ar:
   1. Grid cells light up in a trail behind the mouse
   2. Role cursors fly in, then wander along looping paths and "click"
   3. Tool tiles pop in, everything else fades in, staggered
   4. Idle floating + scroll parallax on cards and tiles
   5. The headline + selection box can be dragged around
   6. Autopilot toggle flips on its own (and on click)
   7. A Tythas chat bubble types out status updates
   All continuous motion runs in one requestAnimationFrame loop that
   pauses when the hero is off-screen. Reduced-motion users get a
   static, fully visible hero.
------------------------------------------------------------------- */

const CELL = 72;
const TRAIL = 12;

type Pt = [number, number];
type CursorDef = { label: string; color: string; dark?: boolean; pos: CSSProperties; from: Pt; path: Pt[]; delay: number };

const CURSORS: CursorDef[] = [
  { label: "Growth Strategist", color: "#1E8A4C", pos: { left: "25%", top: "7%" }, from: [-500, -400], delay: 0,
    path: [[0, 0], [160, 120], [260, 40], [120, -20], [-60, 60], [0, 0]] },
  { label: "SEO Specialist", color: "#2E62D9", pos: { right: "27%", top: "16%" }, from: [500, -400], delay: 150,
    path: [[0, 0], [-180, 80], [-80, 200], [120, 140], [60, -30], [0, 0]] },
  { label: "UI Designer", color: "#5B4BD6", pos: { left: "3%", top: "53%" }, from: [-600, 0], delay: 300,
    path: [[0, 0], [200, -120], [300, 60], [140, 160], [-20, 80], [0, 0]] },
  { label: "Ads Manager", color: "#C2329E", pos: { left: "42%", bottom: "25%" }, from: [0, 600], delay: 450,
    path: [[0, 0], [-160, -60], [-60, -180], [140, -120], [200, 20], [0, 0]] },
  { label: "Developer", color: "#1C7F99", pos: { left: "21%", bottom: "7%" }, from: [-500, 500], delay: 600,
    path: [[0, 0], [140, -200], [-60, -260], [-120, -100], [60, -40], [0, 0]] },
  { label: "AI Engineer", color: "#F2C230", dark: true, pos: { left: "39%", bottom: "8%" }, from: [300, 600], delay: 750,
    path: [[0, 0], [180, -140], [320, -60], [200, 0], [60, -80], [0, 0]] },
  { label: "You, approving", color: "#D9480F", pos: { right: "13%", bottom: "28%" }, from: [600, 400], delay: 900,
    path: [[0, 0], [-220, -40], [-300, -200], [-120, -260], [-40, -100], [0, 0]] },
];

const MESSAGES = [
  "Let's grow your business online.",
  "Dewaxify: appointment enquiries up 200%.",
  "SB Patil Group: enquiries up from 40 to 250 a month.",
  "Gixel Labs: organic enquiries up 300%.",
];

const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* -------- small presentational pieces -------- */

function Bubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3.5 rounded-[22px] bg-white py-4 pl-4 pr-5 shadow-[0_10px_30px_rgba(20,30,38,0.08)]">
      <span aria-hidden className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-ink">
        <Image src="/brand/mark-white.png" alt="" width={26} height={18} className="h-auto w-[26px]" />
      </span>
      <div className="flex flex-col">
        <span className="text-[15px]">
          <strong>Tythas</strong> <span className="text-subtle">right now</span>
        </span>
        <span className="text-base">{children}</span>
      </div>
    </div>
  );
}

function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[72px] min-w-[72px] items-center justify-center gap-2.5 rounded-[18px] bg-white px-4 shadow-[0_8px_24px_rgba(20,30,38,0.08)]">
      {children}
    </div>
  );
}

const wireBar = "flex h-[30px] items-center gap-1.5 border-b border-[#EEEEEE] px-3";
const wireDot = "h-2 w-2 rounded-full border border-[#BDBDBD]";

/* -------- the hero -------- */

export default function HeroCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [autopilot, setAutopilot] = useState(true);
  const [typed, setTyped] = useState(MESSAGES[0]);
  const [dragging, setDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  /* Kick off the intro shortly after mount */
  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), 150);
    return () => window.clearTimeout(t);
  }, []);

  /* Autopilot toggle flips every 4s */
  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => setAutopilot((v) => !v), 4000);
    return () => window.clearInterval(id);
  }, [started]);

  /* Typing chat bubble */
  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let msg = 0, i = MESSAGES[0].length, deleting = true, timer = 0;
    const tick = () => {
      const text = MESSAGES[msg];
      if (deleting) {
        i--;
        setTyped(text.slice(0, Math.max(i, 0)));
        if (i <= 0) { deleting = false; msg = (msg + 1) % MESSAGES.length; timer = window.setTimeout(tick, 500); return; }
        timer = window.setTimeout(tick, 18);
      } else {
        i++;
        const next = MESSAGES[msg];
        setTyped(next.slice(0, i));
        if (i >= next.length) { deleting = true; timer = window.setTimeout(tick, 2800); return; }
        timer = window.setTimeout(tick, 34 + Math.random() * 25);
      }
    };
    timer = window.setTimeout(tick, 3200);
    return () => window.clearTimeout(timer);
  }, [started]);

  /* Grid trail on hover devices */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(hover: hover)").matches) return;
    const pool = Array.from({ length: TRAIL }, () => {
      const el = document.createElement("div");
      el.className = "hero-lit";
      grid.appendChild(el);
      return { el, t: 0 as number };
    });
    let next = 0, last = "", raf = 0, px = 0, py = 0;
    const light = (c: number, r: number) => {
      const item = pool[next];
      next = (next + 1) % pool.length;
      window.clearTimeout(item.t);
      item.el.style.transition = "none";
      item.el.classList.remove("is-lit");
      item.el.style.transform = `translate(${c * CELL}px, ${r * CELL}px)`;
      requestAnimationFrame(() => {
        item.el.style.transition = "";
        item.el.classList.add("is-lit");
      });
      item.t = window.setTimeout(() => item.el.classList.remove("is-lit"), 600);
    };
    const section = sectionRef.current!;
    const onMove = (e: MouseEvent) => {
      px = e.clientX; py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = grid.getBoundingClientRect();
        const c = Math.floor((px - rect.left) / CELL), r = Math.floor((py - rect.top) / CELL);
        const key = `${c}:${r}`;
        if (key === last) return;
        last = key;
        light(c, r);
      });
    };
    const onLeave = () => { last = ""; };
    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      pool.forEach((p) => { window.clearTimeout(p.t); p.el.remove(); });
    };
  }, []);

  /* One RAF loop: cursors wandering + floating/parallax. Paused off-screen. */
  useEffect(() => {
    if (!started) return;
    const section = sectionRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursorEls = Array.from(section.querySelectorAll<HTMLElement>("[data-cursor]"));
    const floatEls = Array.from(section.querySelectorAll<HTMLElement>("[data-float]"));

    if (reduce) {
      cursorEls.forEach((el) => { el.style.transform = "none"; el.style.opacity = "1"; });
      return;
    }

    type CState = { el: HTMLElement; arrow: Element | null; path: Pt[]; i: number; phase: "move" | "pause"; t0: number | null; from: Pt; to: Pt; idx: number; clicked: boolean; startAt: number };
    const t0 = performance.now();
    const cursors: CState[] = cursorEls.map((el, idx) => {
      const def = CURSORS[idx];
      el.style.transform = `translate(${def.from[0]}px, ${def.from[1]}px)`;
      return { el, arrow: el.querySelector("svg"), path: def.path, i: 0, phase: "move", t0: null, from: def.from, to: def.path[1], idx, clicked: false, startAt: t0 + def.delay };
    });

    const floats = floatEls.map((el, i) => ({
      el,
      rot: parseFloat(el.dataset.rot || "0"),
      parallax: parseFloat(el.dataset.parallax || "0"),
      phase: (i * 1.7) % (Math.PI * 2),
      speed: 0.0006 + (i % 4) * 0.00009,
      amp: 6 + (i % 3),
      ampX: 1.5 + (i % 2),
      rotAmp: 0.5 + (i % 3) * 0.15,
    }));

    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const heroTop = section.getBoundingClientRect().top + window.scrollY;

    let raf = 0, visible = true, floatStart: number | null = null;

    const frame = (now: number) => {
      /* cursors */
      for (const c of cursors) {
        if (now < c.startAt) continue;
        if (c.t0 === null) { c.t0 = now; c.el.style.opacity = "1"; }
        if (c.phase === "move") {
          const dur = 1500 + c.idx * 130 + (c.i % 2) * 180;
          const p = Math.min((now - c.t0) / dur, 1), e = ease(p);
          c.el.style.transform = `translate(${lerp(c.from[0], c.to[0], e).toFixed(1)}px, ${lerp(c.from[1], c.to[1], e).toFixed(1)}px)`;
          if (p >= 1) { c.i = (c.i + 1) % c.path.length; c.phase = "pause"; c.t0 = now; c.clicked = false; }
        } else {
          const elapsed = now - c.t0;
          if (!c.clicked && elapsed > 90 && c.i !== 0 && c.i % 2 === c.idx % 2) {
            c.clicked = true;
            c.arrow?.classList.add("cursor-click");
            window.setTimeout(() => c.arrow?.classList.remove("cursor-click"), 220);
          }
          if (elapsed >= 420 + ((c.idx + c.i) % 3) * 140) {
            c.from = c.path[c.i];
            c.to = c.path[(c.i + 1) % c.path.length];
            c.phase = "move"; c.t0 = now;
          }
        }
      }
      /* floating + parallax */
      if (floatStart === null) floatStart = now;
      const ramp = Math.min((now - floatStart) / 800, 1);
      const scrolled = scrollY - heroTop;
      for (const f of floats) {
        const fy = Math.sin(now * f.speed + f.phase) * f.amp * ramp;
        const fx = Math.cos(now * f.speed * 0.8 + f.phase) * f.ampX * ramp;
        const fr = Math.sin(now * f.speed * 0.6 + f.phase) * f.rotAmp * ramp;
        const py = Math.max(-56, Math.min(56, scrolled * f.parallax));
        f.el.style.transform = `translate(${fx.toFixed(2)}px, ${(fy + py).toFixed(2)}px) rotate(${(f.rot + fr).toFixed(2)}deg)`;
      }
      if (visible) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
      if (!visible) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [started]);

  /* Drag the headline + selection box around the canvas */
  useEffect(() => {
    const el = dragRef.current, section = sectionRef.current;
    if (!el || !section) return;
    let ox = 0, oy = 0, sx = 0, sy = 0, startOx = 0, startOy = 0;
    let bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    let active = false, raf = 0, px = 0, py = 0;
    const apply = () => {
      raf = 0;
      ox = Math.max(bounds.minX, Math.min(bounds.maxX, startOx + px - sx));
      oy = Math.max(bounds.minY, Math.min(bounds.maxY, startOy + py - sy));
      el.style.transform = `translate(${ox}px, ${oy}px)`;
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // keep page scroll on phones
      e.preventDefault();
      active = true;
      setDragging(true);
      setHasDragged(true);
      const s = section.getBoundingClientRect(), r = el.getBoundingClientRect();
      startOx = ox; startOy = oy; sx = px = e.clientX; sy = py = e.clientY;
      bounds = { minX: ox - (r.left - s.left), maxX: ox + (s.right - r.right), minY: oy - (r.top - s.top), maxY: oy + (s.bottom - r.bottom) };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!active) return;
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const up = () => { active = false; setDragging(false); };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* entrance helpers */
  const fade = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms` });
  const fadeCls = `transition-[opacity,translate] duration-700 ease-out ${started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`;
  const popCls = `transition-[opacity,scale] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${started ? "opacity-100 scale-100" : "opacity-0 scale-50"}`;

  return (
    <section
      ref={sectionRef}
      aria-label="Intro"
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden border-b border-[#EDEDED] bg-white md:min-h-[clamp(620px,60vw,860px)]"
    >
      {/* Grid + lit-cell layer */}
      <div ref={gridRef} aria-hidden className="grid-canvas absolute inset-0" />

      {/* Draggable headline */}
      <div
        ref={dragRef}
        className={`relative z-[5] touch-pan-y select-none ${dragging ? "cursor-grabbing" : "md:cursor-grab"}`}
      >
        <div className={`relative px-[clamp(16px,3vw,44px)] py-[clamp(8px,1.5vw,20px)] transition-[border-color] duration-500 border-[1.5px] border-dashed ${started ? "border-[#B8BCC2]" : "border-transparent"}`}>
          {(["-left-1.5 -top-1.5", "left-1/2 -translate-x-1/2 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "left-1/2 -translate-x-1/2 -bottom-1.5", "-right-1.5 -bottom-1.5"] as const).map((p) => (
            <span key={p} aria-hidden className={`absolute h-2.5 w-2.5 border-[1.5px] border-[#B8BCC2] bg-white transition-opacity duration-500 ${p} ${started ? "opacity-100" : "opacity-0"}`} style={fade(500)} />
          ))}
          <h1 className="text-[clamp(72px,15vw,240px)] font-extrabold leading-[0.95] tracking-[-0.065em]">Growth.</h1>
        </div>
        {!hasDragged && (
          <span aria-hidden className={`absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-medium text-white md:block ${fadeCls}`} style={fade(2200)}>
            Drag me
          </span>
        )}
      </div>

      {/* Autopilot toggle */}
      <div className={`absolute left-1/2 top-[12%] z-[6] -translate-x-1/2 md:top-[15%] ${fadeCls}`} style={fade(900)}>
        <button
          type="button"
          aria-pressed={autopilot}
          onClick={() => setAutopilot((v) => !v)}
          className="flex items-center gap-4 rounded-[18px] bg-white px-[18px] py-3.5 shadow-[0_10px_30px_rgba(20,30,38,0.08)]"
        >
          <span className="text-[17px] font-medium">Autopilot</span>
          <span aria-hidden className={`relative block h-8 w-[54px] rounded-full transition-colors duration-300 ${autopilot ? "bg-brand" : "bg-[#D5D9DE]"}`}>
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-[left] duration-300 ${autopilot ? "left-[26px]" : "left-1"}`} />
          </span>
        </button>
      </div>

      {/* Phone: one typing bubble under the word */}
      <div className={`absolute bottom-[10%] left-1/2 z-[6] w-[92%] max-w-[380px] -translate-x-1/2 md:hidden ${fadeCls}`} style={fade(1200)}>
        <Bubble><span aria-live="off">{typed}<span className="typing-caret" /></span></Bubble>
      </div>

      {/* Desktop canvas objects */}
      <div className="hidden md:contents">
        {/* wireframe, top-left */}
        <div className={`absolute left-[2%] top-[12%] z-[1] ${fadeCls}`} style={fade(200)}>
          <div data-float data-rot="-4" data-parallax="0.12" aria-hidden style={{ transform: "rotate(-4deg)" }} className="flex h-[230px] w-[300px] flex-col overflow-hidden rounded-[14px] border border-[#E3E3E3] bg-white shadow-[0_8px_24px_rgba(22,23,26,0.05)]">
            <div className={wireBar}><span className={wireDot} /><span className={wireDot} /><span className={wireDot} /></div>
            <div className="flex flex-1 gap-3 p-[18px]">
              <div className="flex flex-1 flex-col gap-2"><span className="h-11 w-11 rounded-full bg-[#F0F0F0]" /><span className="h-2 rounded bg-[#EEE]" /><span className="h-2 w-[70%] rounded bg-[#EEE]" /></div>
              <div className="grid flex-[2] grid-cols-2 gap-2"><span className="rounded-md bg-[#F0F0F0]" /><span className="rounded-md bg-[#F0F0F0]" /><span className="rounded-md bg-[#F0F0F0]" /><span className="rounded-md bg-[#F0F0F0]" /></div>
            </div>
          </div>
        </div>

        {/* growth report, top-right */}
        <div className={`absolute -right-10 top-[9%] z-[1] ${fadeCls}`} style={fade(350)}>
          <div data-float data-rot="-3" data-parallax="0.08" aria-hidden style={{ transform: "rotate(-3deg)" }} className="flex h-[230px] w-[340px] flex-col justify-between rounded-2xl bg-ink px-[26px] py-[22px]">
            <span className="text-[15px] font-semibold text-white">Monthly growth report</span>
            <div className="flex h-[120px] items-end gap-2.5">
              {[28, 38, 46, 60, 74, 96].map((h, i) => (
                <span
                  key={h}
                  className={`flex-1 origin-bottom rounded transition-transform duration-700 ease-out ${i > 3 ? "bg-brand" : "bg-[#3A3C42]"} ${started ? "scale-y-100" : "scale-y-0"}`}
                  style={{ height: `${h}%`, transitionDelay: `${700 + i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* typing bubble, right */}
        <div className={`absolute right-[9%] top-[35%] z-[6] ${fadeCls}`} style={fade(1200)}>
          <div data-float data-parallax="0.04">
            <Bubble><span className="inline-block min-w-[290px]" aria-live="off">{typed}<span className="typing-caret" /></span></Bubble>
          </div>
        </div>

        {/* phone, bottom-right */}
        <div className={`absolute -bottom-10 -right-[30px] z-[1] ${fadeCls}`} style={fade(500)}>
          <div data-float data-rot="4" data-parallax="-0.1" aria-hidden style={{ transform: "rotate(4deg)" }} className="flex h-[340px] w-[190px] flex-col gap-2.5 rounded-[34px] border-[6px] border-ink bg-white px-3.5 pb-3.5 pt-[34px] text-xs">
            <span className="self-start rounded-[12px_12px_12px_4px] bg-[#F1F1F1] px-2.5 py-2">Hi! Want to book a free demo?</span>
            <span className="self-end rounded-[12px_12px_4px_12px] bg-ink px-2.5 py-2 text-white">Yes, tomorrow 11am</span>
            <span className="self-start rounded-[12px_12px_12px_4px] bg-[#F1F1F1] px-2.5 py-2">Booked. See you then.</span>
          </div>
        </div>

        {/* laptop, bottom-left */}
        <div className={`absolute -left-[50px] bottom-[6%] z-[1] ${fadeCls}`} style={fade(650)}>
          <div data-float data-rot="-5" data-parallax="-0.14" aria-hidden style={{ transform: "rotate(-5deg)" }} className="h-[210px] w-[330px] rounded-[14px] bg-ink p-3.5">
            <div className="flex h-full w-full flex-col gap-2.5 rounded-md bg-[#F7F7F5] py-[18px] pl-16 pr-[18px]">
              <span className="h-3.5 w-[70%] rounded-sm bg-ink" />
              <span className="h-2 w-[90%] rounded-sm bg-[#DADADA]" />
              <span className="h-2 w-[60%] rounded-sm bg-[#DADADA]" />
              <span className="mt-1.5 h-[26px] w-[90px] rounded-full bg-brand" />
            </div>
          </div>
        </div>

        {/* wireframe, bottom-centre */}
        <div className={`absolute -bottom-[30px] left-[24%] z-[1] ${fadeCls}`} style={fade(800)}>
          <div data-float data-rot="3" data-parallax="-0.06" aria-hidden style={{ transform: "rotate(3deg)" }} className="h-[220px] w-[300px] overflow-hidden rounded-[14px] border border-[#E3E3E3] bg-white">
            <div className={wireBar}><span className={wireDot} /><span className={wireDot} /><span className={wireDot} /></div>
            <div className="flex flex-col gap-3 p-[18px]"><span className="h-2 w-[60%] rounded bg-[#EEE]" /><span className="h-2 w-[80%] rounded bg-[#EEE]" /><span className="h-[34px] rounded-lg border border-[#E3E3E3]" /></div>
          </div>
        </div>

        {/* static bubble, bottom */}
        <div className={`absolute bottom-[13%] left-1/2 z-[6] ${fadeCls}`} style={fade(1500)}>
          <div data-float data-parallax="-0.03"><Bubble>Planned, built and run for you.</Bubble></div>
        </div>

        {/* tool tiles pop in */}
        {[
          { pos: "left-[30%] top-[12%]", node: <Image src="/icons/nextdotjs.svg" alt="" width={36} height={36} /> },
          { pos: "right-[22%] top-[9%]", node: <Image src="/icons/figma.svg" alt="" width={34} height={34} /> },
          { pos: "left-[17%] top-[44%]", node: <Image src="/icons/notion.svg" alt="" width={36} height={36} /> },
          { pos: "bottom-[3%] left-[47%]", node: <Image src="/icons/googleads.svg" alt="" width={36} height={36} /> },
          { pos: "bottom-[5%] right-[30%]", node: <><ChatIcon /><span className="text-[15px] font-semibold">ChatGPT</span></> },
        ].map((t, i) => (
          <div key={t.pos} aria-hidden className={`absolute z-[3] ${t.pos} ${popCls}`} style={fade(300 + i * 120)}>
            <div data-float data-parallax={i % 2 ? "0.1" : "-0.08"}><Tile>{t.node}</Tile></div>
          </div>
        ))}

        {/* wandering cursors */}
        {CURSORS.map((c) => (
          <div key={c.label} aria-hidden className="pointer-events-none absolute z-[7]" style={c.pos}>
            <div data-cursor className="flex flex-col gap-0.5 opacity-0 transition-opacity duration-500 will-change-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" className="origin-top-left transition-transform duration-150">
                <path d="M3 2l18 8-8 2.5L10 21z" fill={c.color} />
              </svg>
              <span className="ml-2.5 whitespace-nowrap rounded px-2 py-0.5 text-[15px] font-medium" style={{ background: c.color, color: c.dark ? "#141E26" : "#FFFFFF" }}>
                {c.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
