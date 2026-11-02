import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "3AI – סוכני AI, חיבורי API ו-MCP ובוט וואטסאפ לעסקים בישראל";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadHeebo(): Promise<ArrayBuffer | null> {
  // Bundled copy first (works offline and at build time), Google Fonts as a backup.
  try {
    const buf = await readFile(path.join(process.cwd(), "src/assets/Heebo-Bold.ttf"));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    // fall through to the network
  }
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Heebo:wght@800&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((https:[^)]+\.(?:ttf|woff))\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}


// Satori lays text out left-to-right only, so Hebrew strings are reordered
// visually here: word order reversed, Hebrew words mirrored, Latin kept as-is.
const HEB = /[\u0590-\u05FF]/;
function rtl(text: string): string {
  return text
    .split(" ")
    .reverse()
    .map((w) => (HEB.test(w) ? Array.from(w).reverse().join("") : w))
    .join(" ");
}

export default async function OpenGraphImage() {
  const font = await loadHeebo();
  const hebrew = Boolean(font);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0d1b3e 0%, #030712 55%, #1e1040 100%)",
          color: "white",
          fontFamily: hebrew ? "Heebo" : "sans-serif",
          alignItems: hebrew ? "flex-end" : "flex-start",
          textAlign: hebrew ? "right" : "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexDirection: hebrew ? "row-reverse" : "row" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "white",
              color: "#030712",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            3AI
          </div>
          <div style={{ fontSize: 28, color: "#94a3b8" }}>www.3ai.co.il</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: hebrew ? "flex-end" : "flex-start" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.15 }}>
            {hebrew ? rtl("סוכני AI שמחוברים לעסק שלך") : "AI agents connected to your business"}
          </div>
          <div style={{ fontSize: 34, color: "#22d3ee" }}>
            {hebrew ? rtl("WhatsApp · API · MCP · מסדי נתונים · אוטומציות") : "WhatsApp · API · MCP · Databases · Automation"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexDirection: hebrew ? "row-reverse" : "row" }}>
          {(hebrew
            ? ["עברית טבעית", "מאובטח", "תוצאות תוך ימים", "תל אביב"].map(rtl)
            : ["Hebrew", "Secure", "Days, not months", "Tel Aviv"]
          ).map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid rgba(34,211,238,0.5)",
                color: "#e2e8f0",
                fontSize: 24,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Heebo", data: font, weight: 800, style: "normal" }] : undefined,
    }
  );
}
