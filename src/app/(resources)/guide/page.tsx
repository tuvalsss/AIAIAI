import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדריך AI לעסקים בישראל 2025 | AIAIAI",
  description: "המדריך המקיף לשימוש ב-AI בעסק שלך — בוט WhatsApp, אוטומציות, ניהול לידים וסוכני AI. למד איך עסקים ישראלים מכפילים הכנסות עם בינה מלאכותית.",
  keywords: ["AI לעסקים", "בוט WhatsApp", "אוטומציה עסקית", "מדריך AI ישראל", "בינה מלאכותית לעסקים"],
};

const chapters = [
  {
    num: "01",
    title: "מה זה AI לעסקים ולמה זה קריטי ב-2025",
    content: `בינה מלאכותית (AI) כבר לא שמורה לחברות ענק. כיום, עסק קטן יכול להשתמש באותה טכנולוגיה כמו גוגל ואמזון — ובמחיר שמתאים לו.

AI לעסקים משמעותו: מחשב שמסוגל לנהל שיחות, לנתח נתונים, לקבל החלטות ולבצע פעולות — בלי התערבות אנושית. הוא לא עייף, לא שוכח ועובד 24/7.

**מה AI יכול לעשות עבור העסק שלך:**
- לענות ללקוחות בוואטסאפ תוך שניות
- לקבוע תורים אוטומטית ולשלוח תזכורות
- לנתח לידים ולתעדף את הרציניים
- ליצור דוחות שבועיים על ביצועי העסק
- לטפל ב-80% מהפניות השגרתיות בלי עובד`,
    tip: "עסקים שמאמצים AI חוסכים בממוצע 127 שעות עבודה בשבוע",
  },
  {
    num: "02",
    title: "בוט WhatsApp — הכלי הכי חזק לעסקים ישראלים",
    content: `ישראל היא אחת המדינות עם השימוש הגבוה ביותר בוואטסאפ בעולם. 93% מהישראלים משתמשים בו יומיומית. זה אומר שהלקוחות שלך כבר שם — הבוט רק צריך לפגוש אותם.

**מה בוט WhatsApp עושה:**
- עונה לכל הודעה תוך שניות, גם בשבת ובחגים
- מבין עברית טבעית — לא רק מילות מפתח
- מנהל שיחה שלמה עד קביעת תור / סגירת עסקה
- שולח תזכורות ועדכונים אוטומטיים
- מעביר ללקוח אנושי רק כשצריך

**לאילו עסקים זה מתאים:**
מספרות, קליניקות, מסעדות, חנויות, עורכי דין, נדל"ן, שירותי תחזוקה — כל עסק שמקבל פניות מלקוחות.`,
    tip: "לקוח שמקבל מענה תוך 5 דקות — 21 פעמים יותר סיכוי לסגור עסקה",
  },
  {
    num: "03",
    title: "אוטומציות עסקיות — לחסוך שעות כל שבוע",
    content: `אוטומציה היא חיבור המערכות שלך כך שיעבדו ביחד — בלי שתצטרך לעשות כלום ידנית.

**דוגמאות לאוטומציות נפוצות:**
- לקוח ממלא טופס → נפתח כרטיס ב-CRM + נשלח אימייל ברוכים הבאים + SMS
- לקוח שלא ענה 3 ימים → יוצא פולואו-אפ אוטומטי
- הזמנה חדשה → עדכון מלאי + חשבונית + הודעה למחסן
- כל יום שישי → דוח מכירות שבועי נשלח לאימייל שלך

**כלים שנעבוד איתם:**
Make (Integromat), n8n, Zapier, או קוד מלא לפי הצורך. אנחנו מתחברים לכל API.`,
    tip: "עסק ממוצע מבזבז 4+ שעות ביום על משימות שאפשר לאטמט",
  },
  {
    num: "04",
    title: "ניהול לידים עם AI — אף לקוח לא הולך לאיבוד",
    content: `הבעיה הכי גדולה של עסקים צומחים: לידים שנכנסים ולא מטופלים בזמן. מחקרים מראים שאם לא מגיבים תוך 5 דקות — 80% מהלידים הולכים למתחרה.

**מה מערכת ניהול לידים AI עושה:**
- מקבלת לידים מכל מקור: מודעות, אתר, וואטסאפ, טלפון
- מדרגת כל ליד לפי פוטנציאל (0-100)
- שולחת מענה ראשוני אוטומטי תוך 30 שניות
- בונה תוכנית פולואו-אפ מותאמת לכל ליד
- מתריעה לך רק על הלידים החמים שדורשים שיחה

**תוצאה ממוצעת:** +65% בשיעורי הסגירה`,
    tip: "המתנה של 5 דקות לעומת מענה מיידי = פי 21 פחות המרות",
  },
  {
    num: "05",
    title: "איך להתחיל — 3 שלבים פשוטים",
    content: `לא צריך להיות מומחה טכנולוגיה כדי להתחיל עם AI. הנה הדרך הפשוטה:

**שלב 1: זהה את הכאב הגדול ביותר שלך**
איפה אתה מבזבז הכי הרבה זמן? מענה לשאלות חוזרות? קביעת תורים? מעקב אחרי לידים?

**שלב 2: התחל בפתרון אחד**
אל תנסה לאטמט הכל בבת אחת. בחר את הבעיה הכי כואבת ופתור אותה קודם.

**שלב 3: מדוד תוצאות**
אחרי חודש — כמה שעות חסכת? כמה לידים טופלו? כמה לקוחות חדשים? על בסיס זה — הרחב.

**AIAIAI עוזרת לך בדיוק בתהליך הזה** — ייעוץ חינם, תוצאות ראשונות תוך 48 שעות.`,
    tip: "העסקים שמצליחים עם AI מתחילים קטן ומתרחבים בהדרגה",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100" dir="rtl">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#0d1b3e] to-[#030712] py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4 text-sm text-cyan-300">
            📖 מדריך מקצועי · עודכן 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            מדריך AI לעסקים בישראל
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            כל מה שצריך לדעת כדי להפוך את העסק שלך לעסק חכם — בוט WhatsApp, אוטומציות, ניהול לידים וסוכני AI.
          </p>
        </div>
      </div>

      {/* Chapters */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        {chapters.map((ch) => (
          <article key={ch.num} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-cyan-400">{ch.num}</span>
                <h2 className="text-xl font-bold text-white">{ch.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">
                {ch.content}
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">
                <p className="text-cyan-300 text-sm font-medium">💡 {ch.tip}</p>
              </div>
            </div>
          </article>
        ))}

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-cyan-900/20 to-violet-900/20 rounded-2xl border border-white/10 p-10">
          <h3 className="text-2xl font-black text-white mb-3">מוכן להתחיל?</h3>
          <p className="text-slate-400 mb-6">קבל ייעוץ חינם וגלה איזה פתרון AI הכי מתאים לעסק שלך</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-cyan-300 transition-colors">
              קבל ייעוץ חינם
            </Link>
            <Link href="/" className="border border-white/20 text-white font-medium px-8 py-3 rounded-xl hover:border-white/40 transition-colors">
              חזור לאתר הראשי
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
