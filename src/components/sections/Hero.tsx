"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Play, ChevronDown, Sparkles, Zap, Bot, CheckCircle,
  Database, MessageSquare, Calendar, Plug, Lock, Workflow,
} from "lucide-react";

const PARTICLE_COUNT = 32;

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 768) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.6 + 0.6,
      color: ["#00f5ff", "#bf00ff", "#7c3aed", "#60a5fa"][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let animId = 0;
    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            ctx.strokeStyle = `rgba(0,245,255,${0.07 * (1 - Math.sqrt(d2) / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onVisibility = () => {
      running = !document.hidden;
      if (running) animate();
      else cancelAnimationFrame(animId);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

const TYPING_TEXTS = [
  "בוט WhatsApp שקובע תורים ביומן",
  "סוכן AI שמחובר ל-CRM שלך",
  "שרת MCP מעל מסד הנתונים",
  "שליפת נתונים בזמן אמת",
  "אוטומציה בין כל המערכות",
];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TYPING_TEXTS[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % TYPING_TEXTS.length);
      }, 150);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return <span className="text-cyan-400 typing-cursor">{displayed}</span>;
}

// ─── Right side: live "agent connected to systems" visual ─────────────
const SYSTEMS = [
  { icon: MessageSquare, label: "WhatsApp", sub: "Business API", color: "text-green-400", border: "border-green-500/30" },
  { icon: Database, label: "מסד נתונים", sub: "Postgres / MySQL", color: "text-violet-400", border: "border-violet-500/30" },
  { icon: Workflow, label: "CRM", sub: "Monday / HubSpot", color: "text-pink-400", border: "border-pink-500/30" },
  { icon: Calendar, label: "יומן", sub: "Google / Outlook", color: "text-orange-400", border: "border-orange-500/30" },
  { icon: Plug, label: "API", sub: "כל מערכת קיימת", color: "text-cyan-400", border: "border-cyan-500/30" },
  { icon: Lock, label: "הרשאות", sub: "RLS + לוג פעולות", color: "text-yellow-400", border: "border-yellow-500/30" },
];

const LOG_LINES = [
  { t: "12:04:11", text: "WhatsApp ← \"מה הסטטוס של הזמנה 4821?\"", tone: "text-green-300" },
  { t: "12:04:11", text: "MCP tool: orders.get(id=4821)", tone: "text-cyan-300" },
  { t: "12:04:12", text: "SELECT status, eta FROM orders WHERE id=4821  ·  38ms", tone: "text-violet-300" },
  { t: "12:04:12", text: "permission check: read:orders ✓  (customer scope)", tone: "text-yellow-300" },
  { t: "12:04:13", text: "WhatsApp → \"ההזמנה יצאה למשלוח, מגיעה מחר עד 14:00 📦\"", tone: "text-green-300" },
  { t: "12:04:13", text: "CRM: ticket #5520 updated · audit log written", tone: "text-pink-300" },
];

function SystemsPanel() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= LOG_LINES.length) {
      const reset = setTimeout(() => setShown(0), 6000);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 1500 : 900);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="relative glass rounded-2xl border border-cyan-500/20 overflow-hidden p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">סוכן AI של העסק</div>
            <div className="text-[10px] text-slate-400">Claude · מחובר ל-6 מערכות</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-300 font-semibold">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {SYSTEMS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.08 }}
            className={`rounded-xl border ${s.border} bg-white/[0.03] p-2.5 flex flex-col items-center text-center gap-1`}
          >
            <s.icon className={`w-4 h-4 ${s.color}`} />
            <div className="text-[11px] font-bold text-white leading-none">{s.label}</div>
            <div className="text-[9px] text-slate-500 leading-none" dir="ltr">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl bg-[#060a16] border border-white/5 p-3 font-mono text-[10px] sm:text-[11px] leading-relaxed min-h-[150px]" dir="ltr">
        <div className="text-slate-600 mb-1">agent.log</div>
        {LOG_LINES.slice(0, shown).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
            <span className="text-slate-600 flex-shrink-0">{l.t}</span>
            <span className={l.tone}>{l.text}</span>
          </motion.div>
        ))}
        {shown < LOG_LINES.length && <span className="text-cyan-400 typing-cursor" />}
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 bg-hero-gradient opacity-60" />
      <div className="absolute inset-0 grid-bg" />
      <ParticleCanvas />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-violet-900/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">סוכני AI · חיבורי API ו-MCP · מסדי נתונים</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black leading-tight mb-4 text-white">
              AI שמחובר למערכות
              <br />
              של <span className="gradient-text">העסק שלך</span>.
              <br />
              לא עוד צ&apos;אטבוט.
            </h1>

            <p className="text-xl text-slate-400 mb-1 font-medium">אנחנו בונים עבורך:</p>
            <div className="text-2xl font-bold mb-6 min-h-[2rem]">
              <TypingText />
            </div>

            <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-lg">
              סוכן AI שעונה ללקוחות בוואטסאפ, שולף נתונים אמיתיים מה-CRM וממסד הנתונים, קובע ביומן ומעדכן את המערכות. בעברית, עם הרשאות, ובלי שהמידע שלך יוצא החוצה.
            </p>

            <div className="flex flex-col gap-2 mb-8">
              {[
                "מתחבר ל-CRM, ליומן, ל-Google Sheets, לפריוריטי ולכל מסד נתונים",
                "אבטחה מובנית: הרשאות לכל פעולה, הצפנה, לוג מלא, עמידה בחוק הגנת הפרטיות",
                "פתרון ראשון עולה לאוויר תוך ימים, לא חודשים",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 justify-start">
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection("#contact")} className="btn-primary flex items-center justify-center gap-2 text-base">
                <Zap className="w-5 h-5" />
                קבל שיחת אפיון חינם
              </button>
              <button onClick={() => scrollToSection("#demo")} className="btn-secondary flex items-center justify-center gap-2 text-base">
                <Play className="w-5 h-5" />
                נסה את הסוכן עכשיו
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a href="tel:0508699828" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:border-green-400 transition-colors">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-green-500/30 pulse-ring" />
                </div>
                <span className="font-bold text-lg" dir="ltr">050-869-9828</span>
              </a>
              <span className="text-slate-500 text-sm">נענה גם בוואטסאפ</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {["Claude · OpenAI · WhatsApp Business API", "עברית טבעית", "תל אביב"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-3xl rounded-3xl" />
              <div className="relative">
                <SystemsPanel />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs">גלול לגלות עוד</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
