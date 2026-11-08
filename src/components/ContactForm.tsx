"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";

const SERVICE_OPTIONS = [...services.map((s) => s.name), "Not sure yet"];
const BUDGETS = ["Under ₹10k", "₹10k to ₹25k", "₹25k to ₹50k", "₹50k and above", "Not sure yet"];
const TIMES = ["As soon as possible", "This month", "In 1 to 3 months", "Just exploring"];
const LABELS = ["Services", "Budget", "Timeline", "Contact"];

const chip = (on: boolean) =>
  `min-h-12 rounded-full border-[1.5px] px-[18px] text-[15px] font-semibold transition-colors ${
    on ? "border-brand bg-brand text-white" : "border-line-strong bg-white text-ink hover:border-ink"
  }`;
const tile = (on: boolean) =>
  `min-h-14 rounded-2xl border-[1.5px] px-[18px] text-left text-base font-semibold transition-colors ${
    on ? "border-brand bg-brand text-white" : "border-line-strong bg-white text-ink hover:border-ink"
  }`;
const field =
  "h-[52px] w-full rounded-[14px] border-[1.5px] border-line-strong bg-white px-4 text-base text-ink placeholder:text-[#8A8F96] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function ContactForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [idea, setIdea] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Pre-select a service (and note the plan) when arriving from a service page
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

  const canSend = name.trim().length > 0 && contact.trim().length > 3;

  async function send() {
    if (!canSend || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: picked, budget, timeline: time, name, contact, idea, website }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("idle");
      setStep(5);
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStep(1); setPicked([]); setBudget(""); setTime(""); setName(""); setContact(""); setIdea(""); setStatus("idle");
  }

  const heading = (text: string, sub: string) => (
    <div className="flex flex-col gap-1.5">
      <h2 ref={headingRef} tabIndex={-1} className="text-[28px] font-bold tracking-[-0.03em] outline-none">{text}</h2>
      <p className="text-subtle">{sub}</p>
    </div>
  );

  if (step === 5) {
    const first = name.trim().split(" ")[0] || "there";
    const summary = `Hi Tythas, I just sent a request.\nServices: ${picked.join(", ")}\nBudget: ${budget}\nStart: ${time}`;
    return (
      <div className="fade-up flex flex-col items-start gap-5 py-3" role="status">
        <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
        </span>
        <h2 className="text-[32px] font-bold tracking-[-0.035em]">Thanks, {first}. We&apos;re on it.</h2>
        <p className="text-[17px] text-body">Our team will reply within {site.replyTime} with next steps and a few ideas for you.</p>
        <dl className="flex w-full flex-col gap-2 rounded-2xl bg-paper px-5 py-4 text-[15px]">
          <div><dt className="inline text-subtle">Services: </dt><dd className="inline font-bold">{picked.join(", ")}</dd></div>
          <div><dt className="inline text-subtle">Budget: </dt><dd className="inline font-bold">{budget}</dd></div>
          <div><dt className="inline text-subtle">Start: </dt><dd className="inline font-bold">{time}</dd></div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink(summary)} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center rounded-full border-[1.5px] border-brand bg-brand px-6 font-semibold text-white">Chat on WhatsApp now</a>
          <button type="button" onClick={reset} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-ink bg-white px-6 font-semibold">Start over</button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 1 && picked.length) setStep(2);
        if (step === 4) send();
      }}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-sm text-subtle">
          <span>Step {step} of 4</span>
          <span>{LABELS[step - 1]}</span>
        </div>
        <div role="progressbar" aria-label="Form progress" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step} className="h-1.5 overflow-hidden rounded-full bg-[#EEF0F3]">
          <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${step * 25}%` }} />
        </div>
      </div>

      <div key={step} className="fade-up">
        {step === 1 && (
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">Services</legend>
            {heading("What can we help with?", "Pick one or more.")}
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_OPTIONS.map((label) => (
                <button key={label} type="button" aria-pressed={picked.includes(label)} onClick={() => toggle(label)} className={chip(picked.includes(label))}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">Budget</legend>
            {heading("What's your budget?", "A rough range is fine.")}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-2.5">
              {BUDGETS.map((label) => (
                <button key={label} type="button" aria-pressed={budget === label} onClick={() => { setBudget(label); setStep(3); }} className={tile(budget === label)}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">Timeline</legend>
            {heading("When do you want to start?", "Helps us plan your slot.")}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-2.5">
              {TIMES.map((label) => (
                <button key={label} type="button" aria-pressed={time === label} onClick={() => { setTime(label); setStep(4); }} className={tile(time === label)}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-[18px]">
            {heading("Where should we reply?", "Last step. Just two fields.")}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-name" className="text-sm font-semibold">Your name</label>
              <input id="f-name" required autoComplete="name" placeholder="e.g. Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-contact" className="text-sm font-semibold">Email or WhatsApp number</label>
              <input id="f-contact" required autoComplete="email" placeholder="you@company.com or +91 98765 43210" value={contact} onChange={(e) => setContact(e.target.value)} className={field} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-idea" className="text-sm font-semibold">Your idea in a line <span className="font-normal text-subtle">(optional)</span></label>
              <textarea id="f-idea" rows={2} placeholder="e.g. A booking website for my clinic" value={idea} onChange={(e) => setIdea(e.target.value)} className={`${field} h-auto resize-y py-3.5`} />
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
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-ink bg-white px-[22px] font-semibold">
            Back
          </button>
        ) : (
          <span className="text-sm text-subtle">Takes under 30 seconds</span>
        )}
        {step === 1 && (
          <button type="submit" disabled={!picked.length} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-brand bg-brand px-[26px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
            Next
          </button>
        )}
        {(step === 2 || step === 3) && <span className="text-sm text-subtle">Tap an option to continue</span>}
        {step === 4 && (
          <button type="submit" disabled={!canSend || status === "sending"} className="inline-flex h-12 items-center rounded-full border-[1.5px] border-brand bg-brand px-[26px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
            {status === "sending" ? "Sending…" : "Send"}
          </button>
        )}
      </div>
    </form>
  );
}
