"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  MessageSquare, Bot, BarChart3, Zap, Settings, Users,
  Phone, Mail, Database, Workflow, Target, Brain,
  ShieldCheck, TrendingUp, Calendar, Star, ArrowLeft,
  CheckCircle, Clock, Headphones, BarChart2, MessageCircle,
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
  image: string;
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
    title: "בוט WhatsApp לעסקים",
    description: "סוכן AI חכם בוואטסאפ שעונה ללקוחות 24/7, קובע תורים, מטפל בפניות ומוכר בשמך. בעברית מושלמת.",
    features: ["מענה אוטומטי", "קביעת תורים", "מכירות AI", "CRM מובנה"],
    color: "from-green-500 to-emerald-600",
    glow: "rgba(34,197,94,0.2)",
    badge: "הכי פופולרי",
    image: "https://images.unsplash.com/photo-1611746869696-d09bce200020?w=600&q=80",
    stat: { value: "+40%", label: "הכנסות בממוצע" },
    details: {
      headline: "הלקוחות שלך מחכים לתשובה. הבוט שלנו לא ישן",
      body: "בוט ה-WhatsApp שלנו הוא סוכן AI מלא המשולב ישירות לחשבון הוואטסאפ העסקי שלך. הוא מבין עברית טבעית, עונה בתוך שניות, ומנהל שיחה מלאה מהפנייה הראשונה ועד קביעת תור וסגירת עסקה.",
      bullets: [
        "מענה מיידי 24/7, גם בשישי בלילה וגם בחגים",
        "קביעת תורים אוטומטית עם שליחת אישור ותזכורות",
        "זיהוי לקוח חוזר ומענה מותאם אישית",
        "העברה חלקה לנציג אנושי כשנדרש",
        "דוחות שבועיים: כמה שיחות, כמה תורים, כמה לידים",
        "אינטגרציה ל-CRM קיים (Monday, HubSpot, Salesforce ועוד)",
      ],
      process: [
        { step: "ייעוץ", desc: "מבינים את העסק שלך ומה הלקוחות שואלים הכי הרבה" },
        { step: "הגדרה", desc: "בונים את ה-flows, תשובות ואישיות הבוט" },
        { step: "48 שעות", desc: "הבוט חי ועובד, ראשון להגיב בכל שיחה" },
        { step: "אופטימיזציה", desc: "שיפור שוטף על בסיס נתוני שיחות אמיתיים" },
      ],
      cta: "רוצה בוט לעסק שלך?",
    },
  },
  {
    icon: Bot,
    title: "סוכני AI לעסקים",
    description: "מערכת סוכנים חכמים שעובדת בשבילך: מנתחת נתונים, מנהלת לקוחות, מתאמת פגישות ועוד.",
    features: ["סוכן נתונים", "סוכן מכירות", "סוכן שירות", "סוכן אנליטיקס"],
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(0,245,255,0.2)",
    badge: null,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    stat: { value: "127ש׳", label: "חיסכון שבועי" },
    details: {
      headline: "צבא של AI שעובד בשבילך. בלי שכר, בלי חופשות",
      body: "במקום לשכור עובדים נוספים לכל משימה, אנחנו בונים לך מערכת של סוכנים חכמים שמתמחים כל אחד בתחומו. הם עובדים ביחד, מעדכנים אחד את השני, ומדווחים לך רק על מה שצריך את תשומת לבך.",
      bullets: [
        "סוכן מכירות: עונה ללידים, שולח הצעות מחיר, מעקב אוטומטי",
        "סוכן שירות: פותר בעיות, מחזיר לקוחות, מסנן תלונות",
        "סוכן אנליטיקס: מנתח נתונים ושולח דוח שבועי בפורמט פשוט",
        "סוכן תיאום: מסדר פגישות, שולח תזכורות, מנהל לוח זמנים",
        "כל הסוכנים מדברים ביניהם ועובדים בתיאום מלא",
        "Dashboard אחד לשליטה על כולם",
      ],
      process: [
        { step: "מיפוי", desc: "מזהים אילו משימות אפשר לאוטמט אצלך" },
        { step: "בנייה", desc: "בונים ומאמנים את הסוכנים לעסק שלך" },
        { step: "חיבור", desc: "מחברים לכל הכלים הקיימים שלך" },
        { step: "ניהול", desc: "מוניטור שוטף ושיפור מתמיד" },
      ],
      cta: "רוצה לראות דמו של הסוכנים?",
    },
  },
  {
    icon: Workflow,
    title: "אוטומציות עסקיות",
    description: "הפסק לבזבז שעות על משימות חוזרות. אנחנו מחברים את כל המערכות שלך ומאפשרים להן לעבוד אוטומטית.",
    features: ["API חיבורים", "זרמי עבודה", "טריגרים חכמים", "דוחות אוטומטיים"],
    color: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.2)",
    badge: null,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    stat: { value: "80%", label: "פחות עבודה ידנית" },
    details: {
      headline: "כשמערכת אחת מסיימת, השנייה מתחילה אוטומטית",
      body: "אנחנו מחברים את כל הכלים שלך: CRM, Gmail, WhatsApp, Google Sheets, Monday, Slack ועוד - ובונים flows חכמים שעובדים לבד. לקוח ממלא טופס? יוצא אימייל, נפתח כרטיס, ומשלוח SMS. הכל תוך שניות.",
      bullets: [
        "חיבור לכל מערכת דרך API: Make, Zapier, n8n, קוד מלא",
        "טריגרים אוטומטיים: טופס / תשלום / הודעה = פעולה מיידית",
        "דוחות אוטומטיים כל שבוע/חודש לאימייל שלך",
        "גיבוי וסנכרון נתונים בין מערכות",
        "התראות חכמות כשמשהו דורש תשומת לבך",
        "בנייה מותאמת לכל סדר עבודה ייחודי",
      ],
      process: [
        { step: "אבחון", desc: "מזהים איפה אתה מבזבז הכי הרבה זמן" },
        { step: "מיפוי flows", desc: "מתכננים את זרמי העבודה החדשים" },
        { step: "חיבור", desc: "מחברים את המערכות ובונים את האוטומציות" },
        { step: "בדיקה", desc: "ריצה מלאה + תיקונים לפני השקה" },
      ],
      cta: "רוצה לחסוך 20+ שעות בשבוע?",
    },
  },
  {
    icon: BarChart3,
    title: "Dashboard AI",
    description: "לוח בקרה בזמן אמת עם AI analytics שמסביר לך מה קורה בעסק ומה לעשות הלאה.",
    features: ["BI אמיתי", "תחזיות AI", "KPIs חכמים", "התראות חכמות"],
    color: "from-orange-500 to-red-600",
    glow: "rgba(249,115,22,0.2)",
    badge: null,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    stat: { value: "3×", label: "מהירות קבלת החלטות" },
    details: {
      headline: "תפסיק לנחש. תתחיל לדעת.",
      body: "ה-Dashboard שלנו אוסף נתונים מכל מקורות העסק שלך: מכירות, שיחות, לידים ותורים - ומציג לך תמונה ברורה בזמן אמת. ה-AI לא רק מציג גרפים. הוא מסביר מה המשמעות ומה לעשות הלאה.",
      bullets: [
        "KPIs בזמן אמת: הכנסות, לידים, המרה, שביעות רצון",
        "תחזיות AI: מה צפוי להיות בחודש הבא בהתבסס על מגמות",
        "התראות חכמות: משהו ירד? מקבל הודעה מיידית",
        "השוואה לתקופות קודמות בלחיצה אחת",
        "גישה ממחשב, טאבלט וסמארטפון",
        "דוח שבועי אוטומטי לאימייל שלך",
      ],
      process: [
        { step: "מקורות", desc: "מחברים את כל מקורות הנתונים שלך" },
        { step: "עיצוב", desc: "בונים dashboard מותאם לעסק שלך" },
        { step: "AI layers", desc: "מוסיפים ניתוח חכם ותחזיות" },
        { step: "הדרכה", desc: "מלמדים אותך לקרוא ולהשתמש בנתונים" },
      ],
      cta: "רוצה dashboard לעסק שלך?",
    },
  },
  {
    icon: Users,
    title: "ניהול לידים AI",
    description: "AI שמסנן, מדרג ומטפל בלידים שלך ומוודא שאף לקוח פוטנציאלי לא הולך לאיבוד.",
    features: ["סיווג לידים", "פולואו אפ אוטומטי", "CRM חיבור", "AI scoring"],
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.2)",
    badge: null,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    stat: { value: "+65%", label: "אחוזי סגירה" },
    details: {
      headline: "אף ליד לא הולך לאיבוד. AI עוקב אחרי כולם",
      body: "כשליד נכנס - ממודעה, מאתר או מוואטסאפ - ה-AI שלנו מסווג אותו מיד לפי פוטנציאל, שולח הודעת פתיחה, ובונה תוכנית מעקב מותאמת. אף ליד לא נשכח בגלל עומס.",
      bullets: [
        "AI scoring: כל ליד מקבל ציון 0-100 לפי פוטנציאל",
        "מענה אוטומטי ראשוני תוך 30 שניות מהפנייה",
        "פולואו-אפ חכם: SMS, WhatsApp ואימייל לפי מה שעובד",
        "חיבור ל-CRM: Monday, HubSpot, Pipedrive ועוד",
        "התראה כשליד חם, תדע בדיוק מתי לחייג",
        "סטטיסטיקות: איפה הלידים הטובים ביותר מגיעים",
      ],
      process: [
        { step: "מקורות", desc: "מחברים את כל ערוצי הלידים שלך" },
        { step: "הגדרת קריטריונים", desc: "מה מגדיר 'ליד טוב' בעסק שלך" },
        { step: "אוטומציות", desc: "בונים flows מותאמים לכל סוג ליד" },
        { step: "ניטור", desc: "עוקבים אחר תוצאות ומשפרים" },
      ],
      cta: "רוצה לסגור יותר עסקאות?",
    },
  },
  {
    icon: Brain,
    title: "מערכות AI מותאמות",
    description: "פיתוח מערכות AI על-פי הצרכים הייחודיים שלך: SaaS פנימי, ממשקים, לוגיקה עסקית מותאמת.",
    features: ["פיתוח מלא", "SaaS פרטי", "API מותאם", "אינטגרציות"],
    color: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.2)",
    badge: "חדש",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    stat: { value: "∞", label: "אפשרויות" },
    details: {
      headline: "יש לך רעיון? אנחנו הופכים אותו למציאות",
      body: "לא כל עסק מתאים לפתרון קיים. אם יש לך צורך ייחודי: מערכת ניהול פנימית, כלי AI לצוות או ממשק מיוחד ללקוחות - אנחנו בונים אותו מאפס. מהרעיון ועד למוצר עובד.",
      bullets: [
        "בניית SaaS פנימי לצוות שלך עם AI מובנה",
        "פיתוח API מותאם לחיבור בין מערכות שלך",
        "ממשק ניהול ייחודי לתהליכים מורכבים",
        "אינטגרציה עם כל מערכת קיימת",
        "אבטחה מלאה ועמידה בתקנות",
        "תמיכה שוטפת ועדכונים לאחר השקה",
      ],
      process: [
        { step: "Discovery", desc: "מבינים לעומק מה אתה צריך ולמה" },
        { step: "עיצוב", desc: "מתכננים את הארכיטקטורה והחוויה" },
        { step: "פיתוח", desc: "בונים במהירות עם sprints קצרים" },
        { step: "השקה", desc: "בדיקות, השקה ותמיכה מלאה" },
      ],
      cta: "ספר לנו על הרעיון שלך",
    },
  },
];

const highlights = [
  { icon: Calendar, text: "קביעת תורים אוטומטית" },
  { icon: Phone, text: "שיחות AI קוליות" },
  { icon: Mail, text: "אימיילים אוטומטיים" },
  { icon: Database, text: "חיבור למסד נתונים" },
  { icon: Target, text: "מיקוד קהל חכם" },
  { icon: ShieldCheck, text: "אבטחה מלאה" },
  { icon: TrendingUp, text: "אנליטיקס מתקדם" },
  { icon: Settings, text: "הגדרות מלאות" },
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
      {/* Hero image */}
      <div className="relative h-48 overflow-hidden">
        <Image src={service.image} alt={service.title} fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1e]" />
        <div className="absolute bottom-4 right-6">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl`}>
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
        {/* Title + stat */}
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

        {/* Body */}
        <p className="text-slate-300 text-sm leading-relaxed">{service.details.body}</p>

        {/* Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {service.details.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-300">{b}</span>
            </div>
          ))}
        </div>

        {/* Process */}
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

        {/* CTA */}
        <button
          onClick={scrollToContact}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3"
        >
          <Zap className="w-4 h-4" />
          {service.details.cta}
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Service Modal */}
      <Modal open={!!activeService} onClose={() => setActiveService(null)}>
        {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
      </Modal>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">הפתרונות שלנו</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI שעובד בשביל{" "}
            <span className="gradient-text">העסק שלך</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            מהבוט הראשון ועד לאוטומציה מלאה. אנחנו בונים את מערכת ה-AI שתשנה את הדרך שבה העסק שלך עובד.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="service-card glass glass-hover rounded-2xl overflow-hidden relative group"
            >
              {/* Image Header */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1e]" />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{ background: `linear-gradient(135deg, ${service.glow.replace("0.2", "0.3")}, transparent)` }}
                />

                {service.badge && (
                  <div className="absolute top-3 right-3 bg-cyan-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] text-white font-bold">
                    {service.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 glass rounded-xl px-3 py-1.5 border border-white/20">
                  <div className={`text-lg font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>{service.stat.value}</div>
                  <div className="text-[9px] text-slate-400">{service.stat.label}</div>
                </div>

                <div className="absolute bottom-3 right-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 30%, ${service.glow} 0%, transparent 70%)` }}
              />

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>

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
                  למידע נוסף
                  <ArrowLeft className="w-4 h-4" style={{ color: "rgba(0,245,255,0.8)" }} />
                </button>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-5">
            <Star className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">מה כלול בכל הפתרונות</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.05 }}
                className="flex items-center gap-2 text-slate-300 text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-4 h-4 text-cyan-400" />
                </div>
                {h.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
