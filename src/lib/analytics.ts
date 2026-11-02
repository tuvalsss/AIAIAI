/**
 * Lightweight conversion tracking. Fires a Google Ads / GA4 style event when
 * gtag is present, and a Vercel Analytics custom event when that is loaded.
 * Safe to call anywhere: it never throws if neither script is on the page.
 */
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    va?: (event: "event", data: { name: string; data?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackLead(channel: string, business?: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { channel, business: business || "unknown" });
    const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION;
    if (label) window.gtag?.("event", "conversion", { send_to: label });
    window.va?.("event", { name: "lead", data: { channel, business: business || "unknown" } });
  } catch {
    // analytics must never break the UI
  }
}

export function trackDemo(demo: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "demo_used", { demo });
    window.va?.("event", { name: "demo_used", data: { demo } });
  } catch {
    // ignore
  }
}
