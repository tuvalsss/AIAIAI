import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import {
  chunkText,
  contentDraft,
  leadAnalysis,
  whatsappReply,
  type ChatMsg,
  type DemoKind,
} from "@/lib/demo-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";
const MAX_HISTORY = 16;
const MAX_MSG_CHARS = 1200;
const MAX_INPUT_CHARS = 1500;
const PROVIDER_TIMEOUT_MS = 20_000;

// System prompts live on the server only: the client can pick a demo, never a prompt.
const SYSTEM: Record<DemoKind, string> = {
  whatsapp: `אתה סוכן WhatsApp של 3AI, חברה ישראלית שבונה סוכני AI, בוטים לוואטסאפ, חיבורי API ו-MCP למערכות עסקיות, חיבור למסדי נתונים ואוטומציות.
כללים:
1. ענה בעברית טבעית, קצר וענייני (2-4 משפטים), כמו הודעת WhatsApp. אמוג'י אחד-שניים לכל היותר.
2. כשרלוונטי, הצע שיחת ייעוץ חינם או בקש מספר טלפון.
3. אם שואלים על מחיר: אין מחירון אחיד, הצעה מותאמת אחרי שיחת ייעוץ קצרה.
4. אם שואלים על אבטחה: המידע נשאר במערכות הלקוח, הרשאות מוגבלות, הצפנה, לוג פעולות, עמידה בחוק הגנת הפרטיות ו-GDPR.
5. אל תמציא לקוחות, מחירים או נתונים מספריים. אל תכתוב רשימות ארוכות.
6. אתה AI זמין 24/7 ומעביר לנציג אנושי כשמבקשים.`,
  leads: `אתה מערכת AI לניקוד לידים של 3AI. תקבל תיאור של ליד עסקי ותחזיר JSON בלבד, בלי שום טקסט נוסף, בדיוק בפורמט:
{"score":87,"status":"חם","urgency":"גבוהה","potential":"₪8,000-15,000/חודש","insights":["תובנה קצרה","תובנה קצרה","תובנה קצרה"],"nextAction":"פעולה מיידית אחת","aiMessage":"הודעת WhatsApp קצרה ללקוח (2 שורות)"}
score בין 0-100. status: חם/פושר/קר. urgency: גבוהה/בינונית/נמוכה. insights: 3 תובנות עד 8 מילים כל אחת, בעברית.`,
  content: `אתה קופירייטר לעסקים ישראליים. כתוב בדיוק את הפורמט המבוקש בעברית שיווקית חדה וטבעית, בלי כותרות ובלי הסברים. רק התוכן עצמו.`,
};

const CONTENT_PROMPTS: Record<string, (biz: string) => string> = {
  whatsapp: (biz) => `כתוב הודעת WhatsApp שיווקית לעסק מסוג "${biz}". שורת פתיחה מושכת, 2-3 יתרונות עם אמוג'י, קריאה לפעולה ברורה. עד 90 מילים.`,
  followup: (biz) => `כתוב הודעת פולואו-אפ מ-"${biz}" ללקוח שפנה אתמול ועדיין לא ענה. טון ידידותי, לא לחוץ, עם הצעת ערך חדשה. עד 60 מילים.`,
  review: (biz) => `כתוב הודעת WhatsApp לבקשת ביקורת בגוגל מלקוח מרוצה של "${biz}". תודה, בקשה מנומסת, למה זה חשוב לעסק קטן, ולינק placeholder. עד 60 מילים.`,
  offer: (biz) => `כתוב הודעת WhatsApp על מבצע מיוחד ב-"${biz}". דחיפות, הנחה ספציפית והגיונית, תאריך תפוגה. עד 70 מילים.`,
};

// ─── tiny in-memory rate limit (per warm instance) ───────────────────────
const buckets = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  b.count += 1;
  if (buckets.size > 5000) buckets.clear();
  return b.count > 30;
}

type Body = {
  demo?: DemoKind;
  messages?: ChatMsg[];
  input?: string;
  contentType?: string;
  business?: string;
  seed?: number;
};

function sanitizeHistory(messages: unknown): ChatMsg[] {
  if (!Array.isArray(messages)) return [];
  const clean: ChatMsg[] = [];
  for (const m of messages.slice(-MAX_HISTORY)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as ChatMsg).role;
    const content = String((m as ChatMsg).content ?? "").slice(0, MAX_MSG_CHARS).trim();
    if ((role === "user" || role === "assistant") && content) clean.push({ role, content });
  }
  // The API requires the conversation to start with a user turn.
  while (clean.length && clean[0].role !== "user") clean.shift();
  return clean;
}

function streamText(text: string, mode: "live" | "fallback", pacing: boolean) {
  const encoder = new TextEncoder();
  const chunks = pacing ? chunkText(text) : [text];
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      if (pacing) await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
      for (const c of chunks) {
        controller.enqueue(encoder.encode(c));
        if (pacing) await new Promise((r) => setTimeout(r, 18 + Math.random() * 30));
      }
      controller.close();
    },
  });
  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Demo-Mode": mode,
    },
  });
}

function fallbackFor(body: Body, history: ChatMsg[], input: string): { text: string; pacing: boolean } {
  switch (body.demo) {
    case "leads":
      return { text: JSON.stringify(leadAnalysis(input)), pacing: false };
    case "content":
      return { text: contentDraft(body.contentType ?? "whatsapp", body.business ?? "", body.seed ?? 0), pacing: true };
    default:
      return { text: whatsappReply(history), pacing: true };
  }
}

function buildProviderMessages(body: Body, history: ChatMsg[], input: string): Anthropic.MessageParam[] {
  switch (body.demo) {
    case "leads":
      return [{ role: "user", content: `נתח את הליד הבא:\n${input}` }];
    case "content": {
      const builder = CONTENT_PROMPTS[body.contentType ?? "whatsapp"] ?? CONTENT_PROMPTS.whatsapp;
      const extra = body.seed ? `\nגרסה מספר ${body.seed + 1}: כתוב ניסוח שונה מהקודם.` : "";
      return [{ role: "user", content: builder(body.business || "עסק מקומי") + extra }];
    }
    default:
      return history;
  }
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const demo: DemoKind = body.demo === "leads" || body.demo === "content" ? body.demo : "whatsapp";
  body.demo = demo;
  const history = sanitizeHistory(body.messages);
  const input = String(body.input ?? "").slice(0, MAX_INPUT_CHARS).trim();
  body.business = String(body.business ?? "").slice(0, 60);
  body.contentType = String(body.contentType ?? "whatsapp").slice(0, 20);

  if (demo === "whatsapp" && history.length === 0) return new Response("Bad request", { status: 400 });
  if (demo === "leads" && !input) return new Response("Bad request", { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const fallback = fallbackFor(body, history, input);

  // Over the limit, or no provider configured: answer from the local engine.
  if (rateLimited(ip) || !process.env.ANTHROPIC_API_KEY) {
    return streamText(fallback.text, "fallback", fallback.pacing);
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: PROVIDER_TIMEOUT_MS });
  const encoder = new TextEncoder();

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: demo === "leads" ? 700 : 500,
      system: SYSTEM[demo],
      messages: buildProviderMessages(body, history, input),
      output_config: { effort: "low" },
    });

    // Wait for the first text delta before committing to the live stream, so an
    // auth / credit / overload failure can still be swapped for the fallback.
    const iterator = stream[Symbol.asyncIterator]();
    let first = "";
    while (!first) {
      const { value, done } = await iterator.next();
      if (done) break;
      if (value.type === "content_block_delta" && value.delta.type === "text_delta") first = value.delta.text;
    }
    if (!first) return streamText(fallback.text, "fallback", fallback.pacing);

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        controller.enqueue(encoder.encode(first));
        try {
          for (;;) {
            const { value, done } = await iterator.next();
            if (done) break;
            if (value.type === "content_block_delta" && value.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(value.delta.text));
            }
          }
        } catch {
          // Provider dropped mid-way: close what we have.
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Demo-Mode": "live",
      },
    });
  } catch (err) {
    // Any provider failure (401 bad key, 400 billing, 429, 529, network) falls back.
    if (err instanceof Anthropic.APIError) {
      console.warn(`[demo] provider error ${err.status ?? "?"}: ${err.message}`);
    } else {
      console.warn("[demo] provider unreachable", err);
    }
    return streamText(fallback.text, "fallback", fallback.pacing);
  }
}
