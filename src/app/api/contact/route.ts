import { NextResponse } from "next/server";

type Lead = {
  services?: unknown;
  budget?: unknown;
  timeline?: unknown;
  name?: unknown;
  contact?: unknown;
  idea?: unknown;
  website?: unknown; // honeypot
};

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Receives contact-form leads.
 *
 * Delivery: set CONTACT_WEBHOOK_URL (e.g. a Google Apps Script web app that appends to a Sheet,
 * a Zapier/Make webhook, or a Slack/Discord incoming webhook). The lead is POSTed there as JSON.
 * Without it, leads are only written to the server log.
 */
export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success and drop it.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    services: Array.isArray(body.services) ? body.services.map((s) => str(s, 60)).filter(Boolean).slice(0, 10) : [],
    budget: str(body.budget, 60),
    timeline: str(body.timeline, 60),
    name: str(body.name, 120),
    contact: str(body.contact, 160),
    idea: str(body.idea, 1000),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || lead.contact.length < 4 || lead.services.length === 0) {
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

  return NextResponse.json({ ok: true });
}
