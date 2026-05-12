"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import {
  Globe, MessageSquare, Zap, HeadphonesIcon,
  TrendingUp, CheckCircle, Star, Award
} from "lucide-react";

function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString("he-IL")}{suffix}</span>;
}

const stats = [
  { label: "עסקים שעברו אוטומציה", value: 500, suffix: "+", color: "text-cyan-400" },
  { label: "שעות נחסכות בשבוע לעסק", value: 127, suffix: "ש׳", color: "text-violet-400" },
  { label: "לידים שטופלו ב-AI", value: 85000, suffix: "+", color: "text-green-400" },
  { label: "שביעות רצון לקוחות", value: 98, suffix: "%", color: "text-orange-400" },
];

const advantages = [
  {
    icon: Globe,
    title: "AI בעברית מלאה",
    desc: "הסוכנים שלנו מבינים ניואנסים, ביטויים וסלנג ישראלי. לא תרגום גוגל — AI שבאמת מבין עברית.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: MessageSquare,
    title: "חיבור לוואטסאפ",
    desc: "ישראל עובדת בוואטסאפ. אנחנו מחברים את ה-AI שלך ישירות לערוץ התקשורת שהלקוחות שלך כבר משתמשים בו.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Zap,
    title: "פתרונות מהירים",
    desc: "מ-0 לפועל תוך 48 שעות. לא פרויקטים ארוכים — אנחנו מתחילים ורואים תוצאות מהיום הראשון.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: HeadphonesIcon,
    title: "תמיכה מלאה בעברית",
    desc: "צוות ישראלי זמין בוואטסאפ, טלפון ומייל. אנחנו כאן כשצריך — לא call center בחו\"ל.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: TrendingUp,
    title: "תוצאות מדידות",
    desc: "Dashboard בזמן אמת שמראה כמה לידים טופלו, כמה שעות נחסכו, ומה ה-ROI האמיתי שלך.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: CheckCircle,
    title: "אוטומציה עסקית אמיתית",
    desc: "לא רק chatbot — מערכת שמחברת את כל הכלים העסקיים שלך ועובדת בשבילך 24 שעות ביממה.",
    color: "from-pink-500 to-rose-600",
  },
];

// Visual process flow
const processSteps = [
  { num: "01", label: "ייעוץ ומיפוי", desc: "מבינים את העסק שלך" },
  { num: "02", label: "בנייה מהירה", desc: "48 שעות לפתרון ראשון" },
  { num: "03", label: "השקה חיה", desc: "AI שעובד מהיום הראשון" },
  { num: "04", label: "אופטימיזציה", desc: "שיפור מתמיד על בסיס נתונים" },
];

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="why-us" className="relative py-24 overflow-hidden bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300 font-medium">למה AIAIAI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">הבחירה הברורה</span>
            {" "}לעסקים ישראלים
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            לא עוד כלי AI זר שלא מבין את השוק הישראלי — אנחנו בנויים מהיסוד לעסקים בישראל
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="text-center glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/20 transition-colors"
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
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

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-black text-white text-center mb-8">
            מהיום הראשון ועד לאוטומציה מלאה
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
