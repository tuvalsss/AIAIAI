"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Plug, Database, ShieldCheck, Lock, KeyRound, FileText, Eye, Server, Bot, ArrowDown,
} from "lucide-react";

const INTEGRATIONS: { group: string; items: string[] }[] = [
  { group: "ערוצי שיחה", items: ["WhatsApp Business API", "Telegram", "Slack", "Web chat", "Email", "טלפוניה (Voice)"] },
  { group: "CRM וניהול", items: ["Monday", "HubSpot", "Salesforce", "Pipedrive", "Zoho", "Fireberry"] },
  { group: "ERP וחשבונאות", items: ["Priority", "SAP Business One", "חשבשבת", "iCount", "Morning", "Rivhit"] },
  { group: "מסדי נתונים", items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Supabase", "Firebase"] },
  { group: "כלים ונתונים", items: ["Google Sheets", "Airtable", "Google Calendar", "Outlook", "Notion", "Excel"] },
  { group: "מודלים ותשתית", items: ["Claude (Anthropic)", "OpenAI", "Gemini", "MCP", "n8n / Make", "Vercel / AWS"] },
];

const SECURITY = [
  { icon: Lock, title: "המידע נשאר אצלך", desc: "הסוכן ניגש למערכות שלך דרך הרשאות מוגבלות. לא מעתיקים את מסד הנתונים לשום מקום." },
  { icon: KeyRound, title: "הרשאה לכל פעולה", desc: "קריאה בלבד כברירת מחדל. כתיבה, תשלום או מחיקה רק עם כלל מפורש או אישור אנושי." },
  { icon: Eye, title: "לוג מלא ושקיפות", desc: "כל שאילתה, כל קריאת API וכל תשובה מתועדות. אפשר לראות בדיוק מה הסוכן עשה ולמה." },
  { icon: ShieldCheck, title: "חוק הגנת הפרטיות ו-GDPR", desc: "עמידה בתיקון 13, הסכמי עיבוד נתונים, מחיקה לפי דרישה, והמודלים לא מתאמנים על המידע שלך." },
  { icon: Server, title: "סודות בכספת, הצפנה בכל שלב", desc: "מפתחות API ב-secrets manager, TLS בתעבורה, הצפנה במנוחה, ו-Row Level Security במסד הנתונים." },
  { icon: FileText, title: "בדיקות נגד prompt injection", desc: "הפרדה בין הוראות לנתונים, סינון קלט ופלט, ובדיקות חדירה לפני שעולים לאוויר." },
];

const FLOW = [
  { icon: Bot, label: "לקוח כותב בוואטסאפ", sub: "\"מתי מגיעה ההזמנה שלי?\"" },
  { icon: Plug, label: "הסוכן קורא לכלי MCP", sub: "orders.get · הרשאת קריאה בלבד" },
  { icon: Database, label: "שליפה ממסד הנתונים", sub: "SELECT status, eta · 38ms" },
  { icon: ShieldCheck, label: "בדיקת הרשאה ולוג", sub: "scope: הלקוח רואה רק את עצמו" },
  { icon: Bot, label: "תשובה מדויקת בעברית", sub: "\"יוצא היום, מגיע מחר עד 14:00\"" },
];

export default function Integrations() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="integrations" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#070c1a] to-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <Plug className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">חיבורים ואבטחה</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            מתחבר למה שכבר יש לך.{" "}
            <span className="gradient-text">בלי לפרוץ שום דבר</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            ככה נראית שיחה אחת מאחורי הקלעים: מהודעת WhatsApp ועד שליפה ממסד הנתונים, דרך הרשאות ולוג.
          </p>
        </motion.div>

        {/* Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl border border-white/10 p-5 md:p-6 mb-14"
        >
          <div className="grid md:grid-cols-5 gap-3">
            {FLOW.map((f, i) => (
              <div key={f.label} className="relative flex md:flex-col items-center md:items-stretch gap-3 md:gap-0">
                <div className="flex md:flex-col items-center gap-3 md:gap-2 md:text-center flex-1 rounded-xl bg-white/[0.03] border border-white/5 p-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{f.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{f.sub}</div>
                  </div>
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-cyan-500/50 md:hidden flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Integrations grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {INTEGRATIONS.map((g, i) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass rounded-2xl border border-white/10 p-5"
            >
              <h3 className="text-sm font-bold text-cyan-300 mb-3">{g.group}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span key={item} className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-slate-200" dir="auto">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 -mt-10 mb-14">
          יש לך מערכת שלא ברשימה? אם יש לה API, או אפילו רק גישה למסד הנתונים, אפשר לחבר.
        </p>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center justify-center gap-2">
              <ShieldCheck className="w-7 h-7 text-green-400" />
              אבטחה שבנויה פנימה, לא מודבקת בסוף
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              עסקים נותנים ל-AI גישה לנתונים הכי רגישים שלהם. ככה אנחנו דואגים שזה יישאר בשליטה.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECURITY.map((s) => (
              <div key={s.title} className="glass glass-hover rounded-2xl border border-white/10 p-5 flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm mb-1">{s.title}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
