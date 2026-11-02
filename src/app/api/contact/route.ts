import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead intake. Delivery channels, all optional and used together when set:
 *  - RESEND_API_KEY + CONTACT_TO_EMAIL: email via Resend (CONTACT_FROM_EMAIL optional)
 *  - LEADS_WEBHOOK_URL: JSON POST to Make / Zapier / n8n / Google Sheets webhook
 * Every lead is also written to the function log as a last-resort record.
 */

type Lead = {
  name: string;
  phone: string;
  email: string;
  business: string;
  message: string;
  source: string;
};

const buckets = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) {
    buckets.set(ip, { count: 1, reset: now + 10 * 60_000 });
    return false;
  }
  b.count += 1;
  return b.count > 5;
}

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

async function sendEmail(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return false;
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const rows = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["אימייל", lead.email || "-"],
    ["סוג עסק", lead.business || "-"],
    ["הודעה", lead.message || "-"],
    ["מקור", lead.source],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 10px;color:#64748b">${k}</td><td style="padding:6px 10px;font-weight:600">${escapeHtml(v)}</td></tr>`)
    .join("");
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "3AI Leads <onboarding@resend.dev>",
    to: to.split(",").map((s) => s.trim()),
    replyTo: lead.email || undefined,
    subject: `ליד חדש מהאתר: ${lead.name} (${lead.business || "לא צוין"})`,
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px"><h2>ליד חדש מ-3ai.co.il</h2><table>${rows}</table><p><a href="https://wa.me/972${lead.phone.replace(/\D/g, "").replace(/^0/, "")}">פתח שיחת WhatsApp עם הליד</a></p></div>`,
  });
  if (error) {
    console.error("[contact] resend error", error);
    return false;
  }
  return true;
}

async function sendWebhook(lead: Lead): Promise<boolean> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (err) {
    console.error("[contact] webhook error", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: real users never fill this field.
  if (clean(raw.website, 50)) return NextResponse.json({ ok: true, delivered: true });

  const lead: Lead = {
    name: clean(raw.name, 80),
    phone: clean(raw.phone, 30),
    email: clean(raw.email, 120),
    business: clean(raw.business, 60),
    message: clean(raw.message, 2000),
    source: clean(raw.source, 60) || "website-form",
  };

  if (lead.name.length < 2 || lead.phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  console.info("[contact] new lead", JSON.stringify({ ...lead, ip }));

  const [emailed, hooked] = await Promise.all([sendEmail(lead), sendWebhook(lead)]);
  return NextResponse.json({ ok: true, delivered: emailed || hooked });
}
