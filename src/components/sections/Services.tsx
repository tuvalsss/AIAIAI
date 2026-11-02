"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MessageSquare, BarChart3, Zap, Settings, Users,
  Database, Workflow, Brain, ShieldCheck, Calendar, Star, ArrowLeft,
  CheckCircle, Clock, Plug, FileSearch, Lock, Server,
} from "lucide-react";
import Modal from "@/components/ui/Modal";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color: string;
  glow: string;
  badge: string | null;
  stat: { value: string; label: string };
  details: {
    headline: string;
    body: string;
    bullets: string[];
    process: { step: string; desc: string }[];
    cta: string;
  };
};

const services: Service[] = [
  {
    icon: MessageSquare,
    title: "בוט WhatsApp מחובר לעסק",
    description: "סוכן AI בוואטסאפ שעונה בעברית טבעית, קובע תורים ביומן האמיתי שלך, בודק סטטוס הזמנה במערכת ומעביר לנציג כשצריך.",
    features: ["WhatsApp Business API", "קביעת תורים ביומן", "סטטוס מהמערכת", "העברה לנציג"],
    color: "from-green-500 to-emerald-600",
    glow: "rgba(34,197,94,0.2)",
    badge: "הכי מבוקש",
    stat: { value: "24/7", label: "מענה תוך שניות" },
    details: {
      headline: "לא בוט של תפריטים. סוכן שיודע מה קורה אצלך במערכת",
      body: "הבוט מחובר לחשבון ה-WhatsApp Business הרשמי שלך ולמערכות שמאחוריו: יומן, CRM, מערכת הזמנות או מסד נתונים. כשלקוח שואל \"יש תור ביום חמישי?\" הוא בודק זמינות אמיתית, קובע, שולח אישור ומעדכן את היומן. כשהשאלה חורגת מההרשאות שלו, הוא מעביר לאדם עם סיכום.",
      bullets: [
        "חיבור רשמי ל-WhatsApp Business API של Meta, כולל אישור התבניות",
        "קביעה, שינוי וביטול תורים מול Google Calendar, Outlook או מערכת התורים שלך",
        "שליפת סטטוס הזמנה, יתרה או היסטוריית לקוח ממסד הנתונים בזמן אמת",
        "זיהוי לקוח חוזר לפי מספר הטלפון ומענה מותאם",
        "העברה לנציג אנושי עם תמלול וסיכום השיחה",
        "דוח שבועי: שיחות, תורים, לידים ושאלות שלא נענו",
      ],
      process: [
        { step: "אפיון", desc: "מה הלקוחות שואלים ואילו מערכות צריך לחבר" },
        { step: "חיבור", desc: "WhatsApp API, יומן, CRM ומסד הנתונים" },
        { step: "השקה", desc: "הבוט חי, עם ניטור של כל שיחה" },
        { step: "שיפור", desc: "כיוונון לפי שיחות אמיתיות" },
      ],
      cta: "רוצה בוט שמחובר למערכות שלך?",
    },
  },
  {
    icon: Server,
    title: "חיבורי API ושרתי MCP",
    description: "אנחנו בונים שרת MCP (Model Context Protocol) מעל המערכות שלך, כך שסוכני AI, Claude ו-ChatGPT יכולים לקרוא ולבצע פעולות בצורה מבוקרת.",
    features: ["שרת MCP מותאם", "REST / GraphQL", "Webhooks", "הרשאות לכל כלי"],
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(0,245,255,0.2)",
    badge: "התמחות",
    stat: { value: "MCP", label: "תקן חיבור פתוח" },
    details: {
      headline: "ה-AI מקבל ידיים: כלים מוגדרים, לא גישה חופשית",
      body: "MCP הוא התקן הפתוח שבו מודלים כמו Claude מתחברים למערכות חיצוניות. אנחנו ממפים את ה-API של המערכות שלך (CRM, ERP, חנות, מערכת פנימית) לכלים מוגדרים: \"חפש לקוח\", \"פתח קריאת שירות\", \"בדוק מלאי\". כל כלי מקבל הרשאה משלו, ולוג של כל קריאה.",
      bullets: [
        "שרת MCP שעובד עם Claude, ChatGPT, Cursor וכל סוכן שתומך בתקן",
        "עטיפת API קיים (REST, GraphQL, SOAP) לכלים ברורים עם סכמות",
        "Webhooks ו-event triggers: הזמנה חדשה, תשלום, טופס, הודעה",
        "חיבור לפריוריטי, SAP Business One, Monday, HubSpot, Salesforce, Pipedrive",
        "הרשאות per-tool: קריאה בלבד, כתיבה עם אישור, או אוטומטי לפי כללים",
        "Rate limiting, retries ו-audit log על כל קריאה",
      ],
      process: [
        { step: "מיפוי API", desc: "אילו פעולות ה-AI צריך לבצע" },
        { step: "עיצוב כלים", desc: "סכמות, הרשאות וגבולות" },
        { step: "פיתוח", desc: "שרת MCP ובדיקות אוטומטיות" },
        { step: "ניטור", desc: "לוגים, התראות ושיפור" },
      ],
      cta: "רוצה לחבר AI למערכת שלך?",
    },
  },
  {
    icon: Database,
    title: "חיבור למסד נתונים ושליפת נתונים",
    description: "סוכן AI ששואל את מסד הנתונים שלך בשפה טבעית: \"כמה הזמנות פתוחות יש מחיפה?\" ומקבל תשובה מדויקת, בהרשאות שהגדרת.",
    features: ["Postgres / MySQL / Mongo", "Supabase / Firebase", "RAG על מסמכים", "Text-to-SQL מבוקר"],
    color: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.2)",
    badge: null,
    stat: { value: "Live", label: "נתונים אמיתיים, לא ניחוש" },
    details: {
      headline: "תשובות מהנתונים שלך, לא מהדמיון של המודל",
      body: "במקום שה-AI \"ינחש\", הוא שולף: שאילתות SQL מבוקרות על Postgres, MySQL, SQL Server או MongoDB, חיפוש סמנטי (RAG) על מסמכים, חוזים ונהלים, וחיבור ל-Supabase, Firebase או Google Sheets. כל שאילתה עוברת בשכבת הרשאות, ואפשר להגביל טבלאות, עמודות ושורות לכל משתמש.",
      bullets: [
        "Text-to-SQL עם רשימת טבלאות מאושרת ו-read-only כברירת מחדל",
        "Row Level Security: כל לקוח או עובד רואה רק את מה שמותר לו",
        "RAG: חיפוש במסמכים פנימיים, נהלים, מחירונים וחוזים עם ציטוט המקור",
        "חיבור ל-Supabase, Firebase, Google Sheets, Airtable ו-Excel",
        "סנכרון נתונים בין מערכות, עם זיהוי כפילויות וניקוי",
        "שכבת מטמון כדי שהתשובות יהיו מהירות וזולות",
      ],
      process: [
        { step: "סכמה", desc: "מיפוי הטבלאות והנתונים הרגישים" },
        { step: "הרשאות", desc: "מי רואה מה, ומה אסור" },
        { step: "חיבור", desc: "שאילתות, RAG ובדיקות דיוק" },
        { step: "ממשק", desc: "WhatsApp, Slack, דשבורד או API" },
      ],
      cta: "רוצה ש-AI יענה מהנתונים שלך?",
    },
  },
  {
    icon: Workflow,
    title: "אוטומציות בין מערכות",
    description: "טופס באתר פותח כרטיס ב-CRM, שולח WhatsApp, מעדכן גיליון ומתזכר אותך. אנחנו בונים את הזרימות ב-n8n, Make או בקוד.",
    features: ["n8n / Make / Zapier", "קוד מותאם", "טריגרים חכמים", "דוחות אוטומטיים"],
    color: "from-orange-500 to-red-600",
    glow: "rgba(249,115,22,0.2)",
    badge: null,
    stat: { value: "0", label: "הקלדה ידנית כפולה" },
    details: {
      headline: "כשמערכת אחת מסיימת, השנייה מתחילה לבד",
      body: "אנחנו מחברים את הכלים שכבר יש לך: CRM, Gmail, WhatsApp, Google Sheets, Monday, Slack, מערכת חשבוניות, ובונים זרימות שעובדות לבד. כשהלוגיקה מורכבת מדי ל-Make או n8n, כותבים קוד. בכל מקרה: ניטור, התראות על כשלים ו-retry אוטומטי.",
      bullets: [
        "ליד נכנס → ציון AI → כרטיס ב-CRM → הודעת WhatsApp → תזכורת לנציג",
        "תשלום מאושר → חשבונית → עדכון מלאי → הודעה ללקוח",
        "דוח שבועי אוטומטי ל-WhatsApp או למייל עם ניתוח AI",
        "סנכרון דו-כיווני בין מערכות שלא מדברות זו עם זו",
        "התראה כשמשהו נתקע, ולא גילוי בעוד חודש",
        "תיעוד מלא של כל זרימה כדי שלא תהיה תלוי בנו",
      ],
      process: [
        { step: "אבחון", desc: "איפה הזמן הולך לאיבוד" },
        { step: "תכנון", desc: "מיפוי הזרימות והטריגרים" },
        { step: "בנייה", desc: "n8n / Make / קוד + בדיקות" },
        { step: "השקה", desc: "ניטור והתראות" },
      ],
      cta: "רוצה לחסוך שעות כל שבוע?",
    },
  },
  {
    icon: BarChart3,
    title: "Dashboard AI על הנתונים שלך",
    description: "לוח בקרה שמושך נתונים מכל המערכות ומסביר בעברית מה קרה, למה, ומה כדאי לעשות. לא רק גרפים.",
    features: ["נתונים בזמן אמת", "ניתוח AI בעברית", "התראות חכמות", "תחזיות"],
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.2)",
    badge: null,
    stat: { value: "1", label: "מסך אחד לכל העסק" },
    details: {
      headline: "תפסיק לנחש. תתחיל לדעת",
      body: "ה-Dashboard מתחבר למקורות הנתונים שלך (מכירות, שיחות, לידים, תורים, חשבונאות) ומציג תמונה אחת. שכבת ה-AI מוסיפה הסבר: \"ההמרה ירדה השבוע כי 40% מהלידים הגיעו מקמפיין חדש עם איכות נמוכה\". עם התראות ב-WhatsApp כשמשהו חורג.",
      bullets: [
        "KPIs בזמן אמת: הכנסות, לידים, המרה, זמני מענה, שביעות רצון",
        "ניתוח AI בעברית שמסביר את המספרים ומציע פעולה",
        "התראות ב-WhatsApp או Slack כשמדד חורג מהצפוי",
        "תחזיות לחודש הבא על בסיס מגמות",
        "גישה לפי תפקיד: בעלים, מנהל, נציג",
        "דוח שבועי אוטומטי בפורמט שאפשר להעביר הלאה",
      ],
      process: [
        { step: "מקורות", desc: "חיבור לכל מקורות הנתונים" },
        { step: "מודל", desc: "הגדרת המדדים שחשובים לך" },
        { step: "AI", desc: "הסברים, התראות ותחזיות" },
        { step: "הדרכה", desc: "איך לקרוא ולפעול לפי הנתונים" },
      ],
      cta: "רוצה לראות את העסק במסך אחד?",
    },
  },
  {
    icon: Brain,
    title: "מערכות AI מותאמות ואבטחה",
    description: "פיתוח מלא של מערכת AI פנימית: ממשק לצוות, API משלך, סוכנים מרובים, עם אבטחה שמתאימה גם לארגונים מפוקחים.",
    features: ["פיתוח מלא", "סוכנים מרובים", "SSO והרשאות", "חוק הגנת הפרטיות"],
    color: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.2)",
    badge: "לארגונים",
    stat: { value: "RLS", label: "הרשאות ברמת שורה" },
    details: {
      headline: "AI שמחלקת האבטחה שלך תאשר",
      body: "כשפתרון מדף לא מספיק, אנחנו בונים מאפס: מערכת פנימית לצוות עם AI מובנה, סוכנים שעובדים ביחד, ממשק ללקוחות או API משלכם. האבטחה מובנית מהיום הראשון: הרשאות לפי תפקיד, הצפנה במנוחה ובתעבורה, סודות בכספת, לוג מלא, ואפשרות להריץ על תשתית שלכם.",
      bullets: [
        "ארכיטקטורה: Next.js, Node, Python, Postgres, Supabase, Vercel או ענן שלכם",
        "הרשאות לפי תפקיד, Row Level Security ו-SSO (Google, Microsoft)",
        "המידע לא משמש לאימון מודלים, עם הסכמי עיבוד נתונים (DPA)",
        "עמידה בחוק הגנת הפרטיות (תיקון 13) ו-GDPR, כולל מחיקה לפי דרישה",
        "בדיקות אבטחה: prompt injection, הזרקת SQL, דליפת סודות",
        "תיעוד, העברת ידע ותמיכה שוטפת אחרי ההשקה",
      ],
      process: [
        { step: "Discovery", desc: "צרכים, נתונים ודרישות אבטחה" },
        { step: "ארכיטקטורה", desc: "תכנון המערכת וההרשאות" },
        { step: "פיתוח", desc: "ספרינטים קצרים עם דמו כל שבוע" },
        { step: "השקה", desc: "בדיקות אבטחה, הדרכה ותמיכה" },
      ],
      cta: "ספר לנו על המערכת שאתה צריך",
    },
  },
];

const highlights = [
  { icon: Plug, text: "חיבור לכל API קיים" },
  { icon: Database, text: "שליפה ממסד הנתונים" },
  { icon: Calendar, text: "תיאום ביומן אמיתי" },
  { icon: FileSearch, text: "חיפוש במסמכים (RAG)" },
  { icon: Lock, text: "הרשאות ולוג פעולות" },
  { icon: ShieldCheck, text: "חוק הגנת הפרטיות + GDPR" },
  { icon: Users, text: "העברה לנציג אנושי" },
  { icon: Settings, text: "ניטור והתראות" },
];

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div dir="rtl">
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${service.color}`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1e]" />
        <div className="absolute bottom-4 right-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0a0f1e]/80 border border-white/20 flex items-center justify-center shadow-xl">
            <service.icon className="w-6 h-6 text-white" />
          </div>
        </div>
        {service.badge && (
          <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-bold">
            {service.badge}
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">{service.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{service.details.headline}</p>
          </div>
          <div className="text-center flex-shrink-0 glass rounded-xl px-3 py-2 border border-white/10">
            <div className={`text-xl font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>{service.stat.value}</div>
            <div className="text-[10px] text-slate-500">{service.stat.label}</div>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">{service.details.body}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {service.details.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-300">{b}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-400" />
            איך זה עובד
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {service.details.process.map((p, i) => (
              <div key={i} className="text-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-black text-cyan-400">{i + 1}</span>
                </div>
                <div className="text-[11px] font-bold text-white mb-0.5">{p.step}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={scrollToContact} className="w-full btn-primary flex items-center justify-center gap-2 py-3">
          <Zap className="w-4 h-4" />
          {service.details.cta}
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <Modal open={!!activeService} onClose={() => setActiveService(null)}>
        {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
      </Modal>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">מה אנחנו בונים</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI שמדבר עם{" "}
            <span className="gradient-text">המערכות שלך</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            מבוט WhatsApp ועד שרת MCP מעל ה-ERP. כל פתרון מחובר לנתונים האמיתיים של העסק, עם הרשאות ואבטחה מהיום הראשון.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="service-card glass glass-hover rounded-2xl overflow-hidden relative group flex flex-col"
            >
              <div className="relative h-28 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-25 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1e]" />

                {service.badge && (
                  <div className="absolute top-3 right-3 bg-cyan-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] text-white font-bold">
                    {service.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 glass rounded-xl px-3 py-1.5 border border-white/20">
                  <div className={`text-lg font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} dir="ltr">{service.stat.value}</div>
                  <div className="text-[9px] text-slate-400">{service.stat.label}</div>
                </div>

                <div className="absolute bottom-3 right-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.features.map((f) => (
                    <span key={f} className="text-[11px] bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveService(service)}
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 bg-gradient-to-r ${service.color} bg-clip-text text-transparent hover:opacity-80`}
                >
                  איך זה עובד
                  <ArrowLeft className="w-4 h-4" style={{ color: "rgba(0,245,255,0.8)" }} />
                </button>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-5">
            <Star className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">כלול בכל פרויקט</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-2 text-slate-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-4 h-4 text-cyan-400" />
                </div>
                {h.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
