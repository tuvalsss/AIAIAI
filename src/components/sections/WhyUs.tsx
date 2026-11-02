"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Globe, Plug, Zap, HeadphonesIcon, ShieldCheck, Code2, Award,
} from "lucide-react";

const facts = [
  { label: "ימים עד פתרון ראשון באוויר", value: "2-7", color: "text-cyan-400" },
  { label: "שעות לתשובה על פנייה", value: "24", color: "text-violet-400" },
  { label: "מערכות שחיברנו בפרויקט אחד", value: "6+", color: "text-green-400" },
  { label: "חוזה ארוך טווח", value: "0", color: "text-orange-400" },
];

const advantages = [
  {
    icon: Plug,
    title: "מחברים, לא רק מדברים",
    desc: "רוב הבוטים עונים מתסריט. שלנו שולף סטטוס מהמערכת, קובע ביומן האמיתי ומעדכן את ה-CRM. דרך API, MCP או ישירות ממסד הנתונים.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "אבטחה כברירת מחדל",
    desc: "הרשאות לכל כלי, קריאה בלבד כשאפשר, סודות בכספת, לוג מלא ועמידה בחוק הגנת הפרטיות. גם מחלקת IT תאשר.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Globe,
    title: "עברית שלקוחות מבינים",
    desc: "הסוכנים מבינים \"יאללה, אפשר להזיז את התור?\" ועונים בטון של העסק: פורמלי למשרד עורכי דין, קליל לסטודיו.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "ימים, לא חודשים",
    desc: "מתחילים מהבעיה הכי כואבת, מעלים פתרון ראשון תוך ימים ומרחיבים לפי תוצאות. בלי פרויקט של חצי שנה.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Code2,
    title: "קוד ותיעוד שנשארים אצלך",
    desc: "אתה מקבל את הקוד, הסכמות והתיעוד. אין נעילה לספק ואין קופסה שחורה שרק אנחנו יודעים לתפעל.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: HeadphonesIcon,
    title: "צוות ישראלי שעונה",
    desc: "וואטסאפ, טלפון ומייל בעברית. אחרי ההשקה ממשיכים לכוונן לפי שיחות אמיתיות, לא נעלמים.",
    color: "from-pink-500 to-rose-600",
  },
];

const processSteps = [
  { num: "01", label: "שיחת אפיון", desc: "מה כואב, אילו מערכות יש" },
  { num: "02", label: "מיפוי חיבורים", desc: "API, MCP, מסד נתונים, הרשאות" },
  { num: "03", label: "פתרון ראשון", desc: "באוויר תוך ימים, עם ניטור" },
  { num: "04", label: "הרחבה", desc: "עוד ערוצים, עוד אוטומציות" },
];

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="why-us" className="relative py-24 overflow-hidden bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300 font-medium">למה 3AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">ההבדל</span>
            {" "}בין צ&apos;אטבוט לסוכן שעובד
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            צוות פיתוח שמגיע מעולם המערכות והנתונים, לא מעולם התבניות
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {facts.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08 }}
              className="text-center glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/20 transition-colors"
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color}`} dir="ltr">{stat.value}</div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${adv.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <adv.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{adv.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-black text-white text-center mb-8">
            משיחה ראשונה ועד סוכן שעובד
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.num} className="text-center relative">
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-black gradient-text">{step.num}</span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{step.label}</h4>
                <p className="text-slate-500 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
