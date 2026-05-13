"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MessageSquare, BarChart3, Brain, Send, Bot, User,
  TrendingUp, Users, Zap, Activity, Wifi, Sparkles,
  ChevronDown, RefreshCw, CheckCircle, Star, Target,
  Building2, ShoppingCart, Stethoscope, Scale, Coffee,
  Loader2, ArrowRight, Lightbulb,
} from "lucide-react";

// ─── Helper: call streaming API ──────────────────────────────────
async function streamChat(
  messages: { role: "user" | "assistant"; content: string }[],
  systemPrompt: string,
  onChunk: (text: string) => void
) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt }),
  });
  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}

// ─── WhatsApp Live Chat Demo ──────────────────────────────────────
const WA_SYSTEM = `אתה בוט WhatsApp חכם של עסק ישראלי. השם שלך הוא "AIAI בוט".
תפקידיך:
1. ענה על שאלות לקוחות בעברית מושלמת, בצורה קצרה ועניינית (2-4 משפטים מקסימום)
2. הצע קביעת תור כשרלוונטי
3. כלול אמוג'י מתאים
4. הצג את עצמך כ-AI שזמין 24/7
אל תציג רשימות ארוכות. ענה כמו WhatsApp — קצר, ידידותי, מקצועי.`;

type Msg = { from: "user" | "bot"; text: string };

const QUICK_REPLIES = [
  "מה השירותים שלכם?",
  "כמה עולה בוט WhatsApp?",
  "אפשר לקבוע פגישה?",
  "תן לי דוגמה לאיך זה עובד",
];

function WhatsAppDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "שלום! 👋 אני AIAI בוט — עוזר AI חכם שעובד 24/7.\nשלח לי הודעה ותראה איך AI אמיתי עונה לך!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = [...messages, userMsg]
      .map((m) => ({ role: m.from === "user" ? "user" as const : "assistant" as const, content: m.text }));

    let botText = "";
    const botMsg: Msg = { from: "bot", text: "" };
    setMessages((prev) => [...prev, botMsg]);

    await streamChat(history, WA_SYSTEM, (chunk) => {
      botText += chunk;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: "bot", text: botText };
        return updated;
      });
    });

    setLoading(false);
    inputRef.current?.focus();
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full">
      {/* WA Header */}
      <div className="bg-[#075E54] p-3 flex items-center gap-3 rounded-t-2xl flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
          <Bot className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">AIAI בוט — AI אמיתי</div>
          <div className="text-[11px] text-green-300 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            מחובר ל-Claude AI
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-500/20 rounded-full px-2 py-1">
          <Sparkles className="w-3 h-3 text-green-400" />
          <span className="text-[10px] text-green-300 font-bold">LIVE AI</span>
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0"
        style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\"), #0f1923" }}
        dir="rtl"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}
            >
              <div className={`max-w-[85%] ${msg.from === "user" ? "msg-sent" : "msg-received"} p-3 text-sm text-white`}>
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                <div className="text-[10px] text-slate-500 mt-1 text-left">{new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end"
          >
            <div className="msg-received p-3 flex gap-1 items-center">
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && !loading && (
        <div className="px-3 pb-2 flex gap-1.5 flex-wrap" dir="rtl">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-[11px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full px-2.5 py-1 hover:bg-cyan-500/20 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-2.5 bg-[#1f2c34] flex items-center gap-2 rounded-b-2xl flex-shrink-0">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="שלח הודעה אמיתית..."
          dir="rtl"
          className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-sm text-white placeholder-slate-500 outline-none"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="w-9 h-9 rounded-full bg-[#075E54] flex items-center justify-center hover:bg-[#128C7E] transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

// ─── AI Lead Scorer Demo ──────────────────────────────────────────
const LEAD_SYSTEM = `אתה מערכת AI לניהול לידים של חברת AIAIAI.
כאשר מקבלים תיאור של ליד עסקי, תנתח אותו ותחזיר JSON בדיוק בפורמט הזה (ללא טקסט נוסף):
{
  "score": 87,
  "status": "חם",
  "urgency": "גבוהה",
  "potential": "₪8,000-15,000/חודש",
  "insights": ["תובנה 1 קצרה", "תובנה 2 קצרה", "תובנה 3 קצרה"],
  "nextAction": "פעולה מיידית אחת מומלצת",
  "aiMessage": "הודעת WhatsApp מותאמת ללקוח (2 שורות)"
}
score בין 0-100. status: "חם"/"פושר"/"קר". urgency: "גבוהה"/"בינונית"/"נמוכה".
insights: 3 תובנות קצרות מאוד (עד 8 מילים כל אחת).`;

const BUSINESS_EXAMPLES = [
  { icon: Coffee, label: "מסעדה", prompt: "בעל מסעדה, 15 שולחנות, מתלונן שמפסיד לקוחות בלילה כי אין מי שיענה לטלפון. רוצה פתרון WhatsApp." },
  { icon: Stethoscope, label: "קליניקה", prompt: "רופאת עור פרטית, 3 מטפלות, 80 תורים בשבוע. מבלה 3 שעות ביום על תיאום תורים טלפוני. מחפשת אוטומציה." },
  { icon: ShoppingCart, label: "חנות", prompt: "חנות אופנה אונליין, 500 הזמנות בחודש, 60% מהלקוחות שואלים על סטטוס משלוח. צוות שירות לקוחות עייף." },
  { icon: Scale, label: "עו\"ד", prompt: "משרד עורכי דין, 4 עורכי דין, מאבד לידים כי לא מחזיר שיחות מהר מספיק. רוצה מערכת שתסנן ותתעדף פניות." },
  { icon: Building2, label: "נדל\"ן", prompt: "סוכן נדל\"ן עצמאי, 30 נכסים פעילים, מבקר 20 נכסים בשבוע. צריך מערכת שתנהל פניות לקוחות ותקבע סיורים." },
];

type LeadResult = {
  score: number;
  status: string;
  urgency: string;
  potential: string;
  insights: string[];
  nextAction: string;
  aiMessage: string;
};

function LeadScorerDemo() {
  const [selected, setSelected] = useState<typeof BUSINESS_EXAMPLES[0] | null>(null);
  const [customText, setCustomText] = useState("");
  const [result, setResult] = useState<LeadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async (prompt: string) => {
    setLoading(true);
    setResult(null);
    setError("");
    let raw = "";
    await streamChat(
      [{ role: "user", content: `נתח את הליד הבא:\n${prompt}` }],
      LEAD_SYSTEM,
      (chunk) => { raw += chunk; }
    );
    try {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) setResult(JSON.parse(match[0]));
      else setError("שגיאה בפענוח תוצאה");
    } catch {
      setError("שגיאה בניתוח");
    }
    setLoading(false);
  };

  const scoreColor = (score: number) =>
    score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400";
  const scoreBg = (score: number) =>
    score >= 80 ? "from-green-500 to-emerald-600" : score >= 60 ? "from-yellow-500 to-orange-500" : "from-red-500 to-rose-600";

  return (
    <div className="h-full overflow-y-auto space-y-4" dir="rtl">
      {!result && !loading && (
        <>
          <div className="text-center pb-1">
            <p className="text-xs text-slate-400">בחר סוג עסק לניתוח AI מיידי</p>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {BUSINESS_EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => { setSelected(ex); setCustomText(ex.prompt); }}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                  selected?.label === ex.label
                    ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-300"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <ex.icon className="w-4 h-4" />
                <span className="text-[10px] font-medium">{ex.label}</span>
              </button>
            ))}
          </div>

          {selected && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white resize-none outline-none focus:border-cyan-500/40 placeholder-slate-600"
                placeholder="תאר את הליד..."
              />
              <button
                onClick={() => analyze(customText)}
                className="w-full mt-2 btn-primary flex items-center justify-center gap-2 py-2.5"
              >
                <Brain className="w-4 h-4" />
                נתח עם AI עכשיו
              </button>
            </motion.div>
          )}

          {!selected && (
            <div className="text-center py-6 text-slate-600 text-sm">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-30" />
              בחר סוג עסק למעלה
            </div>
          )}
        </>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center">
              <Brain className="w-8 h-8 text-cyan-400" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400"
            />
          </div>
          <p className="text-sm text-slate-400">AI מנתח את הליד...</p>
          <div className="flex gap-1">
            {["סקירת נתונים", "ניתוח פוטנציאל", "חישוב ציון"].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.4 }}
                className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full px-2 py-0.5"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {result && !loading && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
          {/* Score Hero */}
          <div className="glass rounded-xl p-4 border border-white/10 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="32"
                  fill="none"
                  stroke={result.score >= 80 ? "#22c55e" : result.score >= 60 ? "#eab308" : "#ef4444"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - result.score / 100) }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-black ${scoreColor(result.score)}`}>{result.score}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-lg font-black ${scoreColor(result.score)}`}>ליד {result.status}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${scoreBg(result.score)} text-white font-bold`}>
                  דחיפות {result.urgency}
                </span>
              </div>
              <p className="text-xs text-slate-400">פוטנציאל: <span className="text-white font-bold">{result.potential}</span></p>
            </div>
          </div>

          {/* Insights */}
          <div className="glass rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold text-white">תובנות AI</span>
            </div>
            <div className="space-y-1.5">
              {result.insights.map((ins, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-300">{ins}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Action */}
          <div className="glass rounded-xl p-3 border border-orange-500/20 bg-orange-500/5">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-white">פעולה מיידית</span>
            </div>
            <p className="text-xs text-orange-200">{result.nextAction}</p>
          </div>

          {/* AI Message */}
          <div className="glass rounded-xl p-3 border border-green-500/20 bg-green-500/5">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold text-white">הודעת WhatsApp מוצעת</span>
            </div>
            <p className="text-xs text-green-200 whitespace-pre-line">{result.aiMessage}</p>
          </div>

          <button
            onClick={() => { setResult(null); setSelected(null); setCustomText(""); }}
            className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white py-2 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            נתח ליד חדש
          </button>
        </motion.div>
      )}

      {error && <p className="text-center text-red-400 text-sm py-4">{error}</p>}
    </div>
  );
}

// ─── AI Content Generator Demo ─────────────────────────────────────
const CONTENT_SYSTEM = `אתה מומחה לשיווק דיגיטלי ו-AI לעסקים ישראליים.
כאשר מבקשים ממך לכתוב תוכן, תכתוב בדיוק את הפורמט המבוקש, בעברית שיווקית חדה.
אל תוסיף הסברים — רק את התוכן עצמו.`;

const CONTENT_TYPES = [
  { id: "whatsapp", label: "הודעת WhatsApp", icon: MessageSquare, color: "text-green-400",
    prompt: (biz: string) => `כתוב הודעת WhatsApp שיווקית לעסק מסוג "${biz}".
חייב להיות: שורת פתיחה מושכת, 2-3 יתרונות עם אמוג'י, קריאה לפעולה ברורה.
סה"כ עד 100 מילים. כתוב רק את ההודעה, בלי כותרות.` },
  { id: "followup", label: "פולואו-אפ ליד", icon: ArrowRight, color: "text-cyan-400",
    prompt: (biz: string) => `כתוב הודעת פולואו-אפ ל"${biz}" ללקוח שפנה אתמול ועדיין לא ענה.
טון: ידידותי, לא לחוץ. הוסף הצעת ערך חדשה שלא הוזכרה קודם. עד 60 מילים.` },
  { id: "review", label: "בקשת ביקורת", icon: Star, color: "text-yellow-400",
    prompt: (biz: string) => `כתוב הודעת WhatsApp לבקשת ביקורת Google מלקוח מרוצה של "${biz}".
חייב לכלול: תודה, בקשה מנומסת, הדגשת חשיבות לעסק, לינק placeholder. עד 60 מילים.` },
  { id: "offer", label: "מבצע מיוחד", icon: Zap, color: "text-violet-400",
    prompt: (biz: string) => `כתוב הודעת WhatsApp על מבצע מיוחד לעסק "${biz}".
הוסף: תחושת דחיפות, הנחה ספציפית (המצא אחת שהגיונית), תאריך תפוגה. עד 70 מילים.` },
];

const BUSINESSES = ["מסעדה", "קליניקת יופי", "עורך דין", "חנות בגדים", "מכון כושר", "שיפוצניק"];

function ContentDemo() {
  const [bizType, setBizType] = useState("");
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!bizType || loading) return;
    setLoading(true);
    setResult("");
    await streamChat(
      [{ role: "user", content: contentType.prompt(bizType) }],
      CONTENT_SYSTEM,
      (chunk) => setResult((prev) => prev + chunk)
    );
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-y-auto space-y-3" dir="rtl">
      {/* Business type selector */}
      <div>
        <p className="text-xs text-slate-400 mb-2">סוג עסק:</p>
        <div className="flex flex-wrap gap-1.5">
          {BUSINESSES.map((b) => (
            <button
              key={b}
              onClick={() => setBizType(b)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                bizType === b
                  ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-300"
                  : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {b}
            </button>
          ))}
          <input
            value={BUSINESSES.includes(bizType) ? "" : bizType}
            onChange={(e) => setBizType(e.target.value)}
            placeholder="עסק אחר..."
            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 w-24"
          />
        </div>
      </div>

      {/* Content type */}
      <div>
        <p className="text-xs text-slate-400 mb-2">סוג תוכן:</p>
        <div className="grid grid-cols-2 gap-1.5">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct.id}
              onClick={() => setContentType(ct)}
              className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-right ${
                contentType.id === ct.id
                  ? "border-violet-500/50 bg-violet-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <ct.icon className={`w-4 h-4 flex-shrink-0 ${ct.color}`} />
              <span className="text-xs text-white">{ct.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        disabled={!bizType || loading}
        className="w-full btn-primary flex items-center justify-center gap-2 py-2.5 disabled:opacity-40"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "יוצר תוכן..." : "צור תוכן AI"}
      </button>

      {/* Result */}
      <AnimatePresence>
        {(result || loading) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl border border-white/10 overflow-hidden"
          >
            {/* Mock WhatsApp preview */}
            <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-300" />
              <span className="text-xs text-white font-medium">{contentType.label} — תצוגה מקדימה</span>
            </div>
            <div className="p-3" style={{ background: "#0f1923" }}>
              <div className="msg-received inline-block max-w-full p-3 text-sm text-white">
                {loading && !result ? (
                  <div className="flex gap-1 items-center">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
                    ))}
                  </div>
                ) : (
                  <p className="whitespace-pre-line leading-relaxed">{result}</p>
                )}
              </div>
            </div>

            {result && (
              <div className="px-3 pb-3 flex gap-2">
                <button
                  onClick={copy}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    copied ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {copied ? "הועתק!" : "העתק"}
                </button>
                <button
                  onClick={generate}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/20 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  גרסה חדשה
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Demo Section ────────────────────────────────────────────
const TABS = [
  {
    id: "whatsapp",
    label: "בוט WhatsApp",
    sublabel: "שוחח עם AI אמיתי",
    icon: MessageSquare,
    color: "text-green-400",
    bg: "from-green-500/20 to-emerald-600/10",
    border: "border-green-500/30",
  },
  {
    id: "leads",
    label: "ניתוח לידים AI",
    sublabel: "ציון + המלצות מיידיות",
    icon: Target,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/30",
  },
  {
    id: "content",
    label: "יוצר תוכן AI",
    sublabel: "הודעות שיווקיות חכמות",
    icon: Sparkles,
    color: "text-violet-400",
    bg: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/30",
  },
];

export default function Demo() {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="demo" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300 font-medium">דמו חי עם Claude AI — תנסה עכשיו</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI שעובד{" "}
            <span className="gradient-text">בזמן אמת</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            לא סימולציה — AI אמיתי שמגיב לך עכשיו. תכתוב, תשאל, ותראה בעצמך.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.bg} border ${tab.border} text-white shadow-lg`
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ""}`} />
              <div className="text-right">
                <div className="font-semibold leading-none">{tab.label}</div>
                {activeTab === tab.id && (
                  <div className="text-[10px] opacity-70 mt-0.5">{tab.sublabel}</div>
                )}
              </div>
            </button>
          ))}
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <div
            className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            style={{ height: "560px" }}
          >
            {/* Window chrome */}
            <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1e1040] px-4 py-2.5 flex items-center gap-3 border-b border-white/10 flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-slate-400 mx-auto font-medium">
                {TABS.find((t) => t.id === activeTab)?.label} — AIAIAI
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400">Claude AI</span>
              </div>
            </div>

            {/* Demo content */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "whatsapp" && (
                  <motion.div key="wa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                    <WhatsAppDemo />
                  </motion.div>
                )}
                {activeTab === "leads" && (
                  <motion.div key="leads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-hidden">
                    <div className="h-full p-4 overflow-y-auto">
                      <LeadScorerDemo />
                    </div>
                  </motion.div>
                )}
                {activeTab === "content" && (
                  <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-hidden">
                    <div className="h-full p-4 overflow-y-auto">
                      <ContentDemo />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Below demo note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-4 text-center"
          >
            <p className="text-xs text-slate-500">
              מופעל על ידי <span className="text-cyan-400 font-medium">Claude AI</span> של Anthropic — אותה טכנולוגיה שנבנה עבור העסק שלך
            </p>
          </motion.div>
        </motion.div>

        {/* Stats below demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "עסקים פעילים", value: "500+", icon: Building2, color: "text-cyan-400" },
            { label: "שיחות AI ביום", value: "12K+", icon: MessageSquare, color: "text-green-400" },
            { label: "חיסכון שעות/שבוע", value: "40+", icon: Zap, color: "text-violet-400" },
            { label: "שביעות רצון", value: "98%", icon: Star, color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 border border-white/5 text-center">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
