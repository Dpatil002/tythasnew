/* Lead qualification: the options shown in the contact form, and how each answer is scored.
   Shared by the form (client) and the API route (server), so scoring can't drift. */

export type Option = { label: string; points: number; hint?: string };

export const GOALS: Option[] = [
  { label: "Get more leads or enquiries", points: 15 },
  { label: "Launch a new product or MVP", points: 15 },
  { label: "Sell more online", points: 15 },
  { label: "Redesign or rebrand", points: 10 },
  { label: "Save time with automation", points: 10 },
  { label: "Just exploring", points: 0 },
];

export const STAGES: Option[] = [
  { label: "Just an idea", points: 5, hint: "Pre-launch" },
  { label: "New business", points: 10, hint: "Under 1 year" },
  { label: "Growing business", points: 15, hint: "1 to 5 years" },
  { label: "Established company", points: 15, hint: "5+ years" },
];

export const BUDGETS: Option[] = [
  { label: "Under ₹10k", points: 5 },
  { label: "₹10k to ₹25k", points: 15 },
  { label: "₹25k to ₹50k", points: 25 },
  { label: "₹50k to ₹1 lakh", points: 30 },
  { label: "₹1 lakh+", points: 35 },
  { label: "Not sure yet", points: 8 },
];

export const TIMELINES: Option[] = [
  { label: "As soon as possible", points: 20 },
  { label: "This month", points: 15 },
  { label: "In 1 to 3 months", points: 8 },
  { label: "Just exploring", points: 0 },
];

export const ROLES: Option[] = [
  { label: "Founder / owner", points: 15 },
  { label: "I'm part of the decision", points: 8 },
  { label: "Researching for someone else", points: 2 },
];

export type LeadAnswers = { goal: string; stage: string; budget: string; timeline: string; role: string; services: string[] };

const pts = (list: Option[], v: string) => list.find((o) => o.label === v)?.points ?? 0;

/** 0–100. Hot ≥ 70, Warm ≥ 45, else Cold. */
export function scoreLead(a: LeadAnswers) {
  const raw =
    pts(GOALS, a.goal) + pts(STAGES, a.stage) + pts(BUDGETS, a.budget) + pts(TIMELINES, a.timeline) + pts(ROLES, a.role);
  const score = Math.min(100, raw + (a.services.length > 1 ? 5 : 0));
  const tier = score >= 70 ? "Hot" : score >= 45 ? "Warm" : "Cold";
  return { score, tier } as const;
}
