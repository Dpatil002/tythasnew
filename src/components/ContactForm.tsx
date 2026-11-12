"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, MessageCircle } from "lucide-react";
import { services } from "@/lib/services";
import { BUDGETS, GOALS, ROLES, STAGES, TIMELINES, scoreLead, type Option } from "@/lib/leads";
import { site, whatsappLink } from "@/lib/site";
import { ServiceIcon } from "./icons";

const SERVICE_OPTIONS = [...services.map((s) => ({ label: s.name, slug: s.slug })), { label: "Not sure yet", slug: "" }];
const STEPS = ["Services", "Goal", "Stage", "Budget", "Timeline", "About you"];
const TOTAL = STEPS.length;

const chip = (on: boolean) =>
  `inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] px-[18px] text-[15px] font-semibold transition-colors ${
    on ? "border-brand bg-brand text-white" : "border-line-strong bg-white text-ink hover:border-ink"
  }`;
const tile = (on: boolean) =>
  `flex min-h-14 flex-col justify-center rounded-2xl border-[1.5px] px-[18px] py-3 text-left text-base font-semibold transition-colors ${
    on ? "border-brand bg-brand text-white" : "border-line-strong bg-white text-ink hover:border-ink"
  }`;
const field =
  "h-[52px] w-full rounded-[14px] border-[1.5px] border-line-strong bg-white px-4 text-base text-ink placeholder:text-[#8A8F96] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export default function ContactForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [idea, setIdea] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const slug = params.get("service");
    const plan = params.get("plan");
    const s = services.find((x) => x.slug === slug);
    if (s) setPicked([s.name]);
    if (s && plan) setIdea(`Interested in the ${s.name} ${plan} plan.`);
  }, [params]);

  useEffect(() => {
    if (step > 1) headingRef.current?.focus();
  }, [step]);

  const toggle = (label: string) =>
    setPicked((list) => (list.includes(label) ? list.filter((l) => l !== label) : [...list, label]));

  const pick = (setter: (v: string) => void, value: string) => {
    setter(value);
    window.setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL)), 180);
  };

  const canSend = name.trim().length > 0 && emailOk(email) && role !== "";

  async function send() {
    setTouched(true);
    if (!canSend || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: picked, goal, stage, budget, timeline, role, name, email, phone, company, idea, website }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("idle");
      setStep(TOTAL + 1);
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStep(1); setPicked([]); setGoal(""); setStage(""); setBudget(""); setTimeline(""); setRole("");
    setName(""); setEmail(""); setPhone(""); setCompany(""); setIdea(""); setTouched(false); setStatus("idle");
  }

  const heading = (text: string, sub: string) => (
    <div className="flex flex-col gap-1.5">
      <h2 ref={headingRef} tabIndex={-1} className="text-[28px] font-bold tracking-[-0.03em] outline-none">{text}</h2>
      <p className="text-subtle">{sub}</p>
    </div>
  );

  const singleChoice = (opts: Option[], value: string, setter: (v: string) => void, legend: string) => (
    <div role="radiogroup" aria-label={legend} className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5">
      {opts.map((o) => (
        <button key={o.label} type="button" role="radio" aria-checked={value === o.label} onClick={() => pick(setter, o.label)} className={tile(value === o.label)}>
          {o.label}
          {o.hint && <span className={`text-[13px] font-medium ${value === o.label ? "text-white/80" : "text-subtle"}`}>{o.hint}</span>}
        </button>
      ))}
    </div>
  );

  /* ---------- Thank-you screen ---------- */
  if (step === TOTAL + 1) {
    const { tier } = scoreLead({ goal, stage, budget, timeline, role, services: picked });
    const first = name.trim().split(" ")[0] || "there";
    const summary = `Hi Tythas, I just sent a request.\nServices: ${picked.join(", ")}\nGoal: ${goal}\nBudget: ${budget}\nStart: ${timeline}`;
    return (
      <div className="fade-up flex flex-col items-start gap-5 py-3" role="status">
        <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white"><Check className="h-7 w-7" strokeWidth={2.6} /></span>
        <h2 className="text-[32px] font-bold tracking-[-0.035em]">Thanks, {first}. We&apos;re on it.</h2>
        {tier === "Hot" ? (
          <p className="text-[17px] text-body">You look like a great fit. Skip the wait and pick a time for a free 30-minute strategy call now.</p>
        ) : (
          <p className="text-[17px] text-body">We&apos;ll review your answers and reply within {site.replyTime} with next steps and a few ideas.</p>
        )}
        <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-2 rounded-2xl bg-paper px-5 py-4 text-[15px]">
          <div className="col-span-2"><dt className="inline text-subtle">Services: </dt><dd className="inline font-bold">{picked.join(", ")}</dd></div>
          <div><dt className="inline text-subtle">Goal: </dt><dd className="inline font-bold">{goal}</dd></div>
          <div><dt className="inline text-subtle">Budget: </dt><dd className="inline font-bold">{budget}</dd></div>
          <div><dt className="inline text-subtle">Stage: </dt><dd className="inline font-bold">{stage}</dd></div>
          <div><dt className="inline text-subtle">Start: </dt><dd className="inline font-bold">{timeline}</dd></div>
        </dl>
        <div className="flex flex-wrap gap-3">
          {tier === "Hot" && (
            <a href={site.calendarUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] border-brand bg-brand px-6 font-semibold text-white">
              <CalendarCheck aria-hidden className="h-5 w-5" /> Book your call
            </a>
          )}
          <a href={whatsappLink(summary)} target="_blank" rel="noreferrer" className={`inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] px-6 font-semibold ${tier === "Hot" ? "border-ink bg-white text-ink" : "border-brand bg-brand text-white"}`}>
            <MessageCircle aria-hidden className="h-5 w-5" /> Chat on WhatsApp
          </a>
          <button type="button" onClick={reset} className="inline-flex h-12 items-center rounded-full px-4 font-semibold text-subtle hover:text-ink">Start over</button>
        </div>
      </div>
    );
  }

  /* ---------- Steps ---------- */
  return (
    <form
      noValidate
      className="flex flex-col gap-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 1 && picked.length) setStep(2);
        if (step === TOTAL) send();
      }}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-sm text-subtle">
          <span>Step {step} of {TOTAL}</span>
          <span>{STEPS[step - 1]}</span>
        </div>
        <div role="progressbar" aria-label="Form progress" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step} className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <span key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < step ? "bg-brand" : "bg-[#EEF0F3]"}`} />
          ))}
        </div>
      </div>

      <div key={step} className="fade-up">
        {step === 1 && (
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">Services</legend>
            {heading("What can we help with?", "Pick one or more.")}
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_OPTIONS.map(({ label, slug }) => (
                <button key={label} type="button" aria-pressed={picked.includes(label)} onClick={() => toggle(label)} className={chip(picked.includes(label))}>
                  {slug && <ServiceIcon slug={slug} className="h-4 w-4" />}
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        )}
        {step === 2 && (<div className="flex flex-col gap-5">{heading("What's the main goal?", "The one result that matters most right now.")}{singleChoice(GOALS, goal, setGoal, "Main goal")}</div>)}
        {step === 3 && (<div className="flex flex-col gap-5">{heading("Where is your business today?", "So we suggest the right starting point.")}{singleChoice(STAGES, stage, setStage, "Business stage")}</div>)}
        {step === 4 && (<div className="flex flex-col gap-5">{heading("What's your budget?", "A rough range is fine. It helps us suggest the right plan.")}{singleChoice(BUDGETS, budget, setBudget, "Budget")}</div>)}
        {step === 5 && (<div className="flex flex-col gap-5">{heading("When do you want to start?", "Helps us plan your slot.")}{singleChoice(TIMELINES, timeline, setTimeline, "Timeline")}</div>)}

        {step === 6 && (
          <div className="flex flex-col gap-[18px]">
            {heading("Last step: about you", "Where should we send your plan?")}
            <div className="grid gap-[18px] sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-name" className="text-sm font-semibold">Your name *</label>
                <input id="f-name" required autoComplete="name" placeholder="Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={touched && !name.trim()} className={field} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-email" className="text-sm font-semibold">Work email *</label>
                <input id="f-email" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={touched && !emailOk(email)} aria-describedby="f-email-err" className={field} />
                {touched && !emailOk(email) && <span id="f-email-err" className="text-sm text-[#B42318]">Please enter a valid email.</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-phone" className="text-sm font-semibold">WhatsApp number <span className="font-normal text-subtle">(optional)</span></label>
                <input id="f-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-company" className="text-sm font-semibold">Company or website <span className="font-normal text-subtle">(optional)</span></label>
                <input id="f-company" autoComplete="organization" placeholder="yourbrand.com" value={company} onChange={(e) => setCompany(e.target.value)} className={field} />
              </div>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-semibold">Your role *</legend>
              <div className="flex flex-wrap gap-2.5">
                {ROLES.map((r) => (
                  <button key={r.label} type="button" aria-pressed={role === r.label} onClick={() => setRole(r.label)} className={chip(role === r.label)}>{r.label}</button>
                ))}
              </div>
              {touched && !role && <span className="text-sm text-[#B42318]">Please pick one.</span>}
            </fieldset>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-idea" className="text-sm font-semibold">Anything else? <span className="font-normal text-subtle">(optional)</span></label>
              <textarea id="f-idea" rows={2} placeholder="e.g. A booking website for my clinic, launching in March" value={idea} onChange={(e) => setIdea(e.target.value)} className={`${field} h-auto resize-y py-3.5`} />
            </div>
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="f-website">Website</label>
              <input id="f-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            {status === "error" && (
              <p role="alert" className="rounded-xl bg-[#FDECEA] px-4 py-3 text-[15px] text-[#9B1C1C]">
                Something went wrong. Please try again, or email us at {site.email}.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#EEF0F3] pt-5">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-ink bg-white px-[22px] font-semibold">Back</button>
        ) : (
          <span className="text-sm text-subtle">Takes about 45 seconds</span>
        )}
        {step === 1 && (
          <button type="submit" disabled={!picked.length} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-brand bg-brand px-[26px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
        )}
        {step > 1 && step < TOTAL && <span className="text-sm text-subtle">Tap an option to continue</span>}
        {step === TOTAL && (
          <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-brand bg-brand px-[26px] font-semibold text-white disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Get my plan"}
          </button>
        )}
      </div>
    </form>
  );
}
