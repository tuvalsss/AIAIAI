"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Phone, Mail, MessageSquare, Send, CheckCircle, Zap, MapPin } from "lucide-react";

const businessTypes = [
  "מסעדה / קפה", "קליניקה / רפואה", "נדל\"ן", "עורך דין / חשבון",
  "חנות / eCommerce", "שירותי תחזוקה", "יופי / קוסמטיקה", "אחר",
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-900/15 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">בואו נכניס AI לעסק שלכם</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            מוכן להתחיל?{" "}
            <span className="gradient-text">דבר איתנו</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            ייעוץ ראשון חינם — נבין את הצרכים שלך ונציג פתרון מותאם תוך 24 שעות
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center border border-green-500/20"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">קיבלנו! 🎉</h3>
                <p className="text-slate-400 text-lg mb-6">
                  ניצור איתך קשר תוך 24 שעות.<br />בינתיים, אפשר לכתוב לנו ישירות בוואטסאפ.
                </p>
                <a
                  href="https://wa.me/9720508699828?text=שלום! זה עתה שלחתי טופס באתר"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  המשך בוואטסאפ
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/10 space-y-5">
                <h3 className="text-xl font-bold text-white mb-6">שלח לנו פרטים</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">שם מלא *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all text-right"
                      placeholder="ישראל ישראלי"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">טלפון *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-right"
                      placeholder="050-0000000"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">אימייל</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-right"
                    placeholder="you@example.com"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">סוג עסק</label>
                  <select
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-right appearance-none"
                  >
                    <option value="" className="bg-[#0a0f1e]">בחר סוג עסק...</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#0a0f1e]">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">ספר לנו על העסק שלך</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none text-right"
                    placeholder="מה הצורך העיקרי שלך? כמה עובדים? כמה לקוחות ביום? ..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#030712] border-t-transparent rounded-full animate-spin" />
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      שלח ונקבע שיחה חינם
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500">
                  ⚡ מגיבים תוך 24 שעות בימי עסקים
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Direct contact cards */}
            <div className="space-y-4">
              <a
                href="https://wa.me/9720508699828?text=שלום! אני מעוניין לשמוע על פתרונות AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass glass-hover rounded-2xl p-5 border border-green-500/20 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-green-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">שלח הודעת WhatsApp</div>
                  <div className="text-green-400 font-medium" dir="ltr">050-869-9828</div>
                  <div className="text-slate-500 text-sm">זמין 24/7 — עונים תוך דקות</div>
                </div>
              </a>

              <a
                href="tel:0508699828"
                className="flex items-center gap-4 glass glass-hover rounded-2xl p-5 border border-cyan-500/20 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">התקשר עכשיו</div>
                  <div className="text-cyan-400 font-medium" dir="ltr">050-869-9828</div>
                  <div className="text-slate-500 text-sm">א׳-ה׳ 9:00–18:00</div>
                </div>
              </a>

              <a
                href="mailto:info@3ai.co.il"
                className="flex items-center gap-4 glass glass-hover rounded-2xl p-5 border border-violet-500/20 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-violet-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">שלח מייל</div>
                  <div className="text-violet-400 font-medium">info@3ai.co.il</div>
                  <div className="text-slate-500 text-sm">מגיבים תוך 24 שעות</div>
                </div>
              </a>
            </div>

            {/* Guarantee box */}
            <div className="glass rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">🔒</div>
                <h4 className="font-bold text-white">הבטחת AIAIAI</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  "ייעוץ ראשון חינם לגמרי",
                  "ללא התחייבות לאחר הייעוץ",
                  "הפתרון הראשון מוכן תוך 48 שעות",
                  "תמיכה מלאה בעברית",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>מרכז הארץ, ישראל | עובדים עם עסקים בכל הארץ</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
