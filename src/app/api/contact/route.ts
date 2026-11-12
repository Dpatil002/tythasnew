import { NextResponse } from "next/server";
import { scoreLead } from "@/lib/leads";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/**
 * Receives qualified leads from the contact form, scores them and forwards them.
 *
 * Delivery: set CONTACT_WEBHOOK_URL (e.g. a Google Apps Script web app that appends to a Sheet,
 * a Zapier/Make webhook, or a Slack/Discord incoming webhook). The lead is POSTed there as JSON,
 * including `score` (0–100) and `tier` (Hot / Warm / Cold) so you can sort and follow up fast.
 * Without it, leads are only written to the server log.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success and drop it.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const answers = {
    services: Array.isArray(body.services) ? body.services.map((s) => str(s, 60)).filter(Boolean).slice(0, 10) : [],
    goal: str(body.goal, 80),
    stage: str(body.stage, 80),
    budget: str(body.budget, 60),
    timeline: str(body.timeline, 60),
    role: str(body.role, 80),
  };
  const lead = {
    ...answers,
    name: str(body.name, 120),
    email: str(body.email, 160),
    phone: str(body.phone, 40),
    company: str(body.company, 160),
    idea: str(body.idea, 1000),
    ...scoreLead(answers),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !emailOk(lead.email) || lead.services.length === 0) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook delivery failed", err);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.info("[contact] new lead (set CONTACT_WEBHOOK_URL to deliver it):", lead);
  }

  return NextResponse.json({ ok: true, tier: lead.tier });
}
