import { NextResponse } from "next/server";
import { scoreLead } from "@/lib/leads";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/**
 * Receives qualified leads from the contact form, scores them and forwards them.
 *
 * Delivery (any that are configured; the lead counts as delivered if one succeeds):
 * - Supabase: SUPABASE_URL + SUPABASE_SECRET_KEY, table from supabase/leads.sql
 * - Webhook: CONTACT_WEBHOOK_URL (e.g. a Google Apps Script web app that appends to a Sheet,
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

  type Lead = typeof lead;
  const deliveries: { name: string; run: (l: Lead) => Promise<void> }[] = [];

  // 1. Supabase table `leads` (see supabase/leads.sql)
  const sbUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const sbKey = process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (sbUrl && sbKey) {
    deliveries.push({
      name: "supabase",
      run: async (l) => {
        const headers: Record<string, string> = { apikey: sbKey, "Content-Type": "application/json", Prefer: "return=minimal" };
        if (sbKey.startsWith("eyJ")) headers.Authorization = `Bearer ${sbKey}`; // legacy service_role JWT
        const { receivedAt, ...row } = l;
        const res = await fetch(`${sbUrl}/rest/v1/leads`, { method: "POST", headers, body: JSON.stringify({ ...row, created_at: receivedAt }) });
        if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
      },
    });
  }

  // 2. Webhook, e.g. Google Apps Script → Sheet + email
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhook) {
    deliveries.push({
      name: "webhook",
      run: async (l) => {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" }, // Apps Script reads e.postData.contents
          body: JSON.stringify(l),
          redirect: "follow",
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`Webhook ${res.status}: ${text.slice(0, 200)}`);
      },
    });
  }

  if (deliveries.length === 0) {
    console.info("[contact] new lead (set SUPABASE_URL + SUPABASE_SECRET_KEY or CONTACT_WEBHOOK_URL to store it):", lead);
    return NextResponse.json({ ok: true, tier: lead.tier });
  }

  const results = await Promise.allSettled(deliveries.map((d) => d.run(lead)));
  const failed = results
    .map((r, i) => (r.status === "rejected" ? `${deliveries[i].name}: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}` : null))
    .filter(Boolean) as string[];
  failed.forEach((f) => console.error("[contact] delivery failed", f));
  if (failed.length === deliveries.length) {
    return NextResponse.json({ ok: false, error: "Delivery failed", detail: failed.join(" | ").slice(0, 400) }, { status: 502 });
  }

  return NextResponse.json({ ok: true, tier: lead.tier });
}
