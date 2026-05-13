"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Play, ChevronDown, Sparkles, Zap, Bot, ArrowLeft, CheckCircle } from "lucide-react";

const PARTICLE_COUNT = 60;

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number }[] = [];
    const colors = ["#00f5ff", "#bf00ff", "#7c3aed", "#60a5fa"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,255,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

function TypingText() {
  const texts = ["בוט WhatsApp חכם", "סוכני AI מתקדמים", "אוטומציה עסקית מלאה", "ניהול לידים חכם", "תוכן שיווקי AI"];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, texts]);

  return <span className="text-cyan-400 typing-cursor">{displayed}</span>;
}

// Live chat preview floating card
function LiveChatCard() {
  const msgs = [
    { from: "user", text: "שלום, מעוניין בבוט לעסק" },
    { from: "bot", text: "שלום! 👋 בשמחה! איזה סוג עסק יש לך?" },
    { from: "user", text: "מסעדה, 60 מקומות" },
    { from: "bot", text: "מושלם! 🍽️ אנחנו עוזרים למסעדות לקבל הזמנות 24/7, לשלוח תזכורות ולהגדיל חוזרים ב-35%" },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= msgs.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 800 : 1200);
    return () => clearTimeout(t);
  }, [visible, msgs.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      className="absolute -bottom-6 -left-4 w-64 glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-20"
    >
      <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-[11px] text-white font-medium">AIAI WhatsApp Bot</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-auto" />
      </div>
      <div className="p-2.5 space-y-2" style={{ background: "#0f1923" }} dir="rtl">
        {msgs.slice(0, visible).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}
          >
            <div className={`max-w-[90%] px-2.5 py-1.5 rounded-xl text-[11px] text-white leading-relaxed ${
              msg.from === "user" ? "msg-sent" : "msg-received"
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {visible < msgs.length && (
          <div className="flex justify-end">
            <div className="msg-received px-2.5 py-1.5 rounded-xl flex gap-1">
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Dashboard floating card (top right)
function DashboardCard() {
  const [leads, setLeads] = useState(142);
  useEffect(() => {
    const t = setInterval(() => setLeads((l) => l + Math.floor(Math.random() * 2)), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.5, duration: 0.7 }}
      className="absolute -top-4 -right-4 w-52 glass rounded-2xl border border-cyan-500/20 overflow-hidden shadow-xl z-20"
    >
      <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1e1040] px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">AI Dashboard</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-400">Live</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {[
          { label: "לידים היום", value: leads, color: "text-cyan-400" },
          { label: "שיחות AI פעילות", value: 7, color: "text-violet-400" },
          { label: "המרה", value: "84%", color: "text-green-400" },
        ].map((s) => (
          <div key={s.label} className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500">{s.label}</span>
            <span className={`text-sm font-black ${s.color}`}>{s.value}</span>
          </div>
        ))}
        <div className="flex items-end gap-0.5 h-8 mt-1">
          {[35, 55, 40, 70, 85, 75, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 1.8 + i * 0.05 }}
              className="flex-1 rounded-sm"
              style={{ background: i === 6 ? "linear-gradient(to top,#00f5ff,#7c3aed)" : "rgba(0,245,255,0.15)" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-right order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">פתרונות AI לעסקים בישראל</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 text-white"
            >
              העסק הבא בישראל
              <br />
              שעובד עם{" "}
              <span className="gradient-text">AI</span>
              <br />
              זה שלך
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-slate-400 mb-1 font-medium"
            >
              אנחנו בונים עבורך:
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold mb-8 h-8"
            >
              <TypingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 text-lg leading-relaxed mb-6 max-w-lg"
            >
              אוטומציה מלאה, סוכני AI בעברית, וחיבור לכל מערכות העסק שלך.
              תוצאות אמיתיות תוך ימים, לא חודשים.
            </motion.p>

            {/* Key benefits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col gap-2 mb-8"
            >
              {[
                "עובד 24/7 ועונה תוך שניות",
                "מבין עברית ומניב לידים אמיתיים",
                "תוצאות ראשונות תוך 48 שעות",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-end">
                  <span className="text-slate-300 text-sm">{item}</span>
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-end"
            >
              <button
                onClick={() => scrollToSection("#contact")}
                className="btn-primary flex items-center justify-center gap-2 text-base"
              >
                <Zap className="w-5 h-5" />
                קבל ייעוץ חינם עכשיו
              </button>
              <button
                onClick={() => scrollToSection("#demo")}
                className="btn-secondary flex items-center justify-center gap-2 text-base"
              >
                <Play className="w-5 h-5" />
                נסה AI עכשיו
              </button>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 flex items-center justify-end gap-3"
            >
              <a
                href="tel:0508699828"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors group"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:border-green-400 transition-colors">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-green-500/30 pulse-ring" />
                </div>
                <span className="font-bold text-lg" dir="ltr">050-869-9828</span>
              </a>
              <span className="text-slate-500 text-sm">זמינים עכשיו</span>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex items-center justify-end gap-6 text-sm text-slate-500"
            >
              {["500+ עסקים", "AI בעברית", "תמיכה 24/7"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              style={{ animation: "heroFloat 6s ease-in-out infinite" }}
              className="relative max-w-lg mx-auto"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-3xl rounded-3xl" />

              {/* Main image: business owner with phone */}
              <div className="relative glass rounded-2xl border border-cyan-500/20 overflow-hidden scan-effect aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  alt="Business professional using AI"
                  fill
                  className="object-cover opacity-70"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#030712]/30" />

                {/* Overlay content */}
                <div className="absolute bottom-4 right-4 left-4">
                  <div className="glass rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white">AIAIAI Dashboard</div>
                        <div className="text-[10px] text-cyan-400 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          7 סוכני AI פעילים כרגע
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-cyan-400">+34%</div>
                        <div className="text-[9px] text-slate-500">הכנסות החודש</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <LiveChatCard />
              <DashboardCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs">גלול לגלות עוד</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
