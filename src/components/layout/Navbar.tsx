"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Zap, MapPin, Users, Building2, Heart, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { useAbout } from "@/components/layout/AboutContext";

const navLinks = [
  { label: "בית", href: "/" },
  { label: "שירותים", href: "#services" },
  { label: "דמו", href: "#demo" },
  { label: "למה אנחנו", href: "#why-us" },
  { label: "לקוחות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

function AboutModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const scrollToContact = () => {
    onClose();
    if (pathname === "/") {
      setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      router.push("/#contact");
    }
  };

  return (
    <div dir="rtl">
      {/* Header visual */}
      <div className="relative h-32 bg-gradient-to-br from-[#0d1b3e] via-[#1e1040] to-[#030712] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="3AI לוגו" width={56} height={56} className="rounded-2xl shadow-lg" />
          <div className="text-xs text-slate-400 font-medium">פתרונות AI לעסקים בישראל</div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tagline */}
        <div className="text-center">
          <h2 className="text-xl font-black text-white mb-2">הופכים עסקים ישראליים לעסקים חכמים</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            AIAIAI היא חברת AI ישראלית שמתמחה בבניית פתרונות אוטומציה ובינה מלאכותית לעסקים — מהקטנים ועד הגדולים.
          </p>
        </div>

        {/* Location + info */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: "ממוקמים", value: "תל אביב, ישראל", color: "text-cyan-400" },
            { icon: Users, label: "עובדים עם", value: "עסקים קטנים וגדולים", color: "text-green-400" },
            { icon: Building2, label: "לקוחות", value: "500+ עסקים פעילים", color: "text-violet-400" },
            { icon: Heart, label: "מאז", value: "2022 — 3 שנות ניסיון", color: "text-pink-400" },
          ].map((item) => (
            <div key={item.label} className="glass rounded-xl p-3 border border-white/10 flex items-center gap-3">
              <item.icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
              <div>
                <div className="text-[10px] text-slate-500">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Who we work with */}
        <div className="glass rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            עם מי אנחנו עובדים?
          </h3>
          <div className="space-y-2">
            {[
              "עסקים קטנים ובינוניים — מספרות, קליניקות, מסעדות, חנויות",
              "חברות SaaS וסטארטאפים שצריכים אוטומציה מהירה",
              "עסקי נדל\"ן, עורכי דין, רואי חשבון ומשרדי שירותים",
              "חברות גדולות שצריכות AI פנימי לצוות שלהן",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "ישראלים", desc: "צוות מקומי, תמיכה בעברית" },
            { label: "מהירים", desc: "תוצאות ראשונות ב-48 שעות" },
            { label: "מחויבים", desc: "שותפים לטווח ארוך" },
          ].map((v) => (
            <div key={v.label} className="glass rounded-xl p-3 border border-white/10">
              <div className="text-sm font-black gradient-text mb-1">{v.label}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{v.desc}</div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToContact}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3"
        >
          <Zap className="w-4 h-4" />
          בואו נדבר — ייעוץ ראשון חינם
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: aboutOpen, setOpen: setAboutOpen } = useAbout();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href === "/") {
      router.push("/");
      return;
    }
    if (href.startsWith("#")) {
      if (isHome) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    }
  };

  return (
    <>
      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} maxWidth="max-w-lg">
        <AboutModal onClose={() => setAboutOpen(false)} />
      </Modal>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => isHome ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")}
            >
              <Image src="/logo.png" alt="3AI לוגו" width={48} height={48} className="rounded-xl" priority />
              <div className="text-right">
                <div className="text-lg font-black text-white leading-none tracking-wider">
                  AI<span className="text-cyan-400">AI</span>AI
                </div>
                <div className="text-[10px] text-slate-400 font-medium leading-none">פתרונות AI</div>
              </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {/* About link */}
              <button
                onClick={() => setAboutOpen(true)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium"
              >
                אודות
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Phone */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:0508699828"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium" dir="ltr">050-869-9828</span>
              </a>
              <button
                onClick={() => handleNav("#contact")}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                קבל ייעוץ חינם
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/10"
            >
              <div className="px-4 py-6 space-y-2">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => { setMobileOpen(false); setAboutOpen(true); }}
                  className="w-full text-right px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all font-medium"
                >
                  אודות
                </motion.button>
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.05 }}
                    onClick={() => handleNav(link.href)}
                    className="w-full text-right px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all font-medium"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href="tel:0508699828"
                    className="flex items-center justify-center gap-2 py-3 text-slate-300 bg-white/5 rounded-xl"
                  >
                    <Phone className="w-4 h-4" />
                    <span dir="ltr">050-869-9828</span>
                  </a>
                  <button
                    onClick={() => handleNav("#contact")}
                    className="btn-primary flex items-center justify-center gap-2 w-full"
                  >
                    <Zap className="w-4 h-4" />
                    קבל ייעוץ חינם
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
