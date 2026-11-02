"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronRight, ChevronLeft } from "lucide-react";

const testimonials = [
  {
    name: "דוד כהן",
    role: "בעל מסעדת השף",
    business: "מסעדנות",
    avatar: "ד",
    color: "from-orange-500 to-red-600",
    rating: 5,
    text: "לפני AIAIAI הייתי מפסיד לפחות 30 שיחות ביום כי לא הספקתי לענות. היום הבוט עונה לכולם, מקבל הזמנות, ועוד שולח תזכורות. הכנסות המסעדה עלו ב-40% תוך 3 חודשים.",
    metric: "+40% הכנסות",
  },
  {
    name: "רחל לוי",
    role: "מנהלת קליניקת יופי",
    business: "קוסמטיקה ויופי",
    avatar: "ר",
    color: "from-pink-500 to-rose-600",
    rating: 5,
    text: "הבנתי שאני מבזבזת 3 שעות ביום רק על קביעת תורים. עם AIAIAI כל זה קורה אוטומטית בוואטסאפ. עכשיו אני מתרכזת בלקוחות שלפניי ולא בטלפון.",
    metric: "3 שעות נחסכות יומיות",
  },
  {
    name: "יוסי מזרחי",
    role: "מתווך נדל\"ן",
    business: "נדל\"ן",
    avatar: "י",
    color: "from-blue-500 to-indigo-600",
    rating: 5,
    text: "בנדל\"ן הכל עניין של מהירות. הסוכן AI שלי עונה ללידים תוך 30 שניות, מסנן רציניים מלא-רציניים, ומעביר אלי רק את הלקוחות החמים. אחוזי הסגירה שלי קפצו ב-65%.",
    metric: "+65% אחוזי סגירה",
  },
  {
    name: "מיכל שרעבי",
    role: "עורכת דין",
    business: "משרד עורכי דין",
    avatar: "מ",
    color: "from-violet-500 to-purple-600",
    rating: 5,
    text: "הלקוחות שלי צריכים מענה מהיר ומקצועי. ה-AI של 3AI עונה על שאלות שגרתיות, אוסף פרטים ראשוניים ומתאם פגישות. הכל לפני שאני בכלל מסתכלת על הטלפון.",
    metric: "80% פחות שיחות שגרתיות",
  },
  {
    name: "אמיר בן דוד",
    role: "מנכ\"ל חברת שירות",
    business: "שירותי תחזוקה",
    avatar: "א",
    color: "from-teal-500 to-cyan-600",
    rating: 5,
    text: "ניהלתי 15 טכנאים בלי מערכת סדורה. היום יש לי dashboard שמראה כל קריאה, כל טכנאי וכל לקוח. הבוט בוואטסאפ מטפל ב-80% מהפניות לבד. שינוי חיים ממש.",
    metric: "80% אוטומציה מלאה",
  },
  {
    name: "שירי אביב",
    role: "מנהלת חנות אונליין",
    business: "eCommerce",
    avatar: "ש",
    color: "from-green-500 to-emerald-600",
    rating: 5,
    text: "פתחתי חנות אונליין ולא ידעתי איך לנהל את שירות הלקוחות. 3AI הקים לי בוט שעונה על שאלות על מוצרים, משלוחים והחזרות. 24/7 ובלי להוסיף עובדים.",
    metric: "שירות 24/7 ללא עלות נוספת",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [active, setActive] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1e] to-[#030712]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-yellow-300 font-medium">הלקוחות מדברים</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            עסקים ישראלים שכבר{" "}
            <span className="gradient-text">שינו את הדרך</span>
          </h2>
          <p className="text-slate-400 text-lg">מה בעלי עסקים מספרים אחרי שחיברנו להם AI למערכות</p>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative glass rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 opacity-30">
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[active].color} opacity-10`} />
            </div>

            <Quote className="w-10 h-10 text-cyan-500/40 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[active].color} flex items-center justify-center flex-shrink-0 text-2xl font-black text-white`} aria-hidden="true">
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonials[active].name}</div>
                      <div className="text-slate-400 text-sm">{testimonials[active].role}</div>
                      <div className="mt-1"><StarRating rating={testimonials[active].rating} /></div>
                    </div>
                  </div>
                  <div className="glass rounded-xl px-4 py-3 border border-green-500/20 text-center">
                    <div className="text-green-400 font-black text-lg">{testimonials[active].metric}</div>
                    <div className="text-slate-500 text-xs">התוצאה שדווחה</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === active ? "w-8 h-2 bg-cyan-400" : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mini cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.05 }}
              onClick={() => setActive(i)}
              className={`glass rounded-xl p-3 text-center border transition-all duration-300 ${
                i === active ? "border-cyan-500/40 bg-cyan-500/5" : "border-white/5 hover:border-white/20"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-2 text-lg font-black text-white`} aria-hidden="true">
                {t.avatar}
              </div>
              <div className="text-xs font-bold text-white">{t.name}</div>
              <div className="text-[10px] text-slate-500">{t.business}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
