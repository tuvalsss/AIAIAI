"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Phone, Mail, MessageSquare, Send, CheckCircle, Zap, MapPin, ShieldCheck } from "lucide-react";
import { trackLead } from "@/lib/analytics";

const businessTypes = [
  "מסעדה / קפה", "קליניקה / רפואה", "נדל\"ן", "עורך דין / רו\"ח",
  "חנות / eCommerce", "שירותי תחזוקה", "חברת תוכנה / SaaS", "אחר",
];

type FormState = { name: string; phone: string; email: string; business: string; message: string; website: string };
const EMPTY: FormState = { name: "", phone: "", email: "", business: "", message: "", website: "" };

function whatsappLink(form: FormState) {
  const lines = [
    "שלום, שלחתי פנייה דרך האתר 3ai.co.il:",
    `שם: ${form.name}`,
    `טלפון: ${form.phone}`,
    form.email ? `אימייל: ${form.email}` : "",
    form.business ? `סוג עסק: ${form.business}` : "",
    form.message ? `על העסק: ${form.message}` : "",
  ].filter(Boolean);
  return `https://wa.me/972508699828?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [delivered, setDelivered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website-form" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; delivered?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMsg(
          data.error === "invalid"
            ? "בדוק בבקשה שהשם ומספר הטלפון תקינים."
            : data.error === "rate_limited"
              ? "קיבלנו כבר כמה פניות מהכתובת הזו. אפשר להמשיך ישירות בוואטסאפ."
              : "משהו השתבש בשליחה. אפשר להמשיך ישירות בוואטסאפ."
        );
        setStatus("error");
        return;
      }
      setDelivered(Boolean(data.delivered));
      setStatus("sent");
      trackLead("contact_form", form.business);
    } catch {
      setErrorMsg("לא הצלחנו להתחבר לשרת. אפשר להמשיך ישירות בוואטסאפ.");
      setStatus("error");
    }
  };

  const field =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-right";

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-900/15 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">שיחת אפיון ראשונה, בלי עלות</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            ספר לנו מה כואב.{" "}
            <span className="gradient-text">נחזור עם פתרון</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            בשיחה של 20 דקות נמפה את המערכות שלך, נגיד מה אפשר לחבר ונשלח הצעה מסודרת תוך 24 שעות.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center border border-green-500/20"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">קיבלנו, {form.name.split(" ")[0]} 🎉</h3>
                <p className="text-slate-400 text-lg mb-6">
                  {delivered
                    ? "הפנייה הגיעה לצוות. נחזור אליך תוך 24 שעות בימי עסקים."
                    : "כדי שנחזור אליך הכי מהר, שלח את הפרטים גם בוואטסאפ בלחיצה אחת:"}
                </p>
                <a
                  href={whatsappLink(form)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead("whatsapp_after_form", form.business)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  {delivered ? "להמשיך בוואטסאפ" : "שלח את הפרטים בוואטסאפ"}
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/10 space-y-5" noValidate>
                <h3 className="text-xl font-bold text-white mb-6">שלח לנו פרטים</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-name" className="block text-sm text-slate-400 mb-2">שם מלא *</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={field}
                      placeholder="ישראל ישראלי"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="block text-sm text-slate-400 mb-2">טלפון *</label>
                    <input
                      id="c-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={field}
                      placeholder="050-0000000"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-email" className="block text-sm text-slate-400 mb-2">אימייל</label>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={field}
                    placeholder="you@example.com"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label htmlFor="c-business" className="block text-sm text-slate-400 mb-2">סוג עסק</label>
                  <select
                    id="c-business"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className={`${field} appearance-none`}
                  >
                    <option value="" className="bg-[#0a0f1e]">בחר סוג עסק...</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#0a0f1e]">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="c-message" className="block text-sm text-slate-400 mb-2">מה היית רוצה לאטמט? אילו מערכות יש לך היום?</label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field} resize-none`}
                    placeholder="לדוגמה: יש לנו Monday ויומן Google, רוצים בוט שיקבע תורים ויעדכן את ה-CRM..."
                  />
                </div>

                {/* Honeypot: hidden from people, filled only by bots */}
                <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="c-website">אתר</label>
                  <input id="c-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-sm text-orange-200 flex flex-col gap-2">
                    <span>{errorMsg}</span>
                    <a href={whatsappLink(form)} target="_blank" rel="noopener noreferrer" className="text-green-300 font-semibold underline">
                      שלח את הפרטים בוואטסאפ
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#030712] border-t-transparent rounded-full animate-spin" />
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      שלח ונקבע שיחת אפיון
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  הפרטים משמשים רק לחזרה אליך. לא נשלח ספאם ולא נעביר לצד שלישי.
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
            <div className="space-y-4">
              <a
                href="https://wa.me/972508699828?text=שלום! אני מעוניין לשמוע על פתרונות AI לעסק שלי"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead("whatsapp_contact_card")}
                className="flex items-center gap-4 glass glass-hover rounded-2xl p-5 border border-green-500/20 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-green-400" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">שלח הודעת WhatsApp</div>
                  <div className="text-green-400 font-medium" dir="ltr">050-869-9828</div>
                  <div className="text-slate-500 text-sm">הדרך הכי מהירה לקבל תשובה</div>
                </div>
              </a>

              <a
                href="tel:0508699828"
                onClick={() => trackLead("phone_call")}
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

            <div className="glass rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">🤝</div>
                <h4 className="font-bold text-white">מה תקבל בשיחת האפיון</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {[
                  "מיפוי של המערכות הקיימות (CRM, יומן, אתר, מסד נתונים) ומה אפשר לחבר",
                  "המלצה על הפתרון הראשון שכדאי להתחיל ממנו, עם לוח זמנים",
                  "הצעת מחיר מסודרת תוך 24 שעות, בלי התחייבות",
                  "ליווי בעברית גם אחרי ההשקה",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>תל אביב, ישראל | עובדים עם עסקים בכל הארץ, מרחוק ופרונטלית</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
