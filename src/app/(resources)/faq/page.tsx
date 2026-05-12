import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "שאלות נפוצות | AIAIAI — AI לעסקים בישראל",
  description: "תשובות לשאלות הנפוצות ביותר על שירותי AIAIAI — בוט WhatsApp, אוטומציות, מחירים, זמני הקמה ועוד.",
};

const faqs = [
  {
    q: "כמה עולה בוט WhatsApp לעסק?",
    a: "המחיר תלוי במורכבות ובפיצ'רים הנדרשים. מדובר בדרך כלל בדמי הקמה חד-פעמיים ותשלום חודשי לאחסון ותחזוקה. ניצור איתך הצעת מחיר מותאמת לאחר שיחת ייעוץ חינמית. המחיר תמיד מחזיר את עצמו — עסקים שלנו חוסכים בממוצע 10,000-20,000 ש\"ח בחודש בשכר עבודה.",
  },
  {
    q: "כמה זמן לוקח להקים את הבוט?",
    a: "בוט WhatsApp בסיסי — 48 שעות. מערכת מלאה עם אינטגרציות — 3-7 ימי עבודה. אנחנו לא מבטיחים חודשים, אנחנו מבטיחים ימים.",
  },
  {
    q: "האם הבוט מבין עברית טבעית?",
    a: 'כן — זו אחת הסיבות שעסקים בוחרים בנו. הבוט לא עובד לפי מילות מפתח קבועות אלא מבין עברית חופשית, כולל ביטויים מדוברים, ראשי תיבות וסלנג ישראלי. לקוח שכותב "תוכל לקבוע לי תור ל-14 בחודש בצהריים?" — הבוט מבין ומגיב בהתאם.',
  },
  {
    q: "מה קורה כשהבוט לא יודע לענות?",
    a: "הבוט מזהה שאלות מחוץ לתחום שלו ומעביר את השיחה אליך עם סיכום מה הלקוח שאל. אף לקוח לא נשאר ללא מענה.",
  },
  {
    q: "האם אני צריך להתחבר ל-WhatsApp Business API?",
    a: "כן — כל הבוטים שלנו עובדים דרך WhatsApp Business API הרשמי של Meta. אנחנו מטפלים בכל תהליך האישור והחיבור בשבילך.",
  },
  {
    q: "האם ניתן לחבר את הבוט ל-CRM שלי?",
    a: "בהחלט. אנחנו מתחברים ל-Monday, HubSpot, Salesforce, Pipedrive, Google Sheets ועוד. אם יש לך מערכת ייחודית — נבדוק אפשרות חיבור דרך API.",
  },
  {
    q: "מה קורה אם הבוט עושה טעות?",
    a: "אנחנו מקימים מערכת ניטור שמציגה לך את השיחות הבעייתיות. בנוסף, ניתן להגדיר שעסקאות מעל סכום מסוים תמיד יעברו לאדם. הבוט מכיר את גבולות שלו.",
  },
  {
    q: "האם יש חוזה ארוך?",
    a: "לא. אנחנו עובדים ללא חוזים ארוכי טווח. אנחנו רוצים שתשאר כי אתה מרוצה — לא כי אתה כלוא.",
  },
  {
    q: "מה אם אני עסק קטן מאוד?",
    a: "אנחנו עובדים עם עסקים מכל הגדלים — ממספרה עם מספרית אחת ועד חברה עם 200 עובדים. לעסקים קטנים יש לנו חבילות מותאמות שמתחילות ממחיר סביר ומתרחבות עם הצמיחה שלך.",
  },
  {
    q: "האם אנחנו יכולים לנסות לפני שאנחנו משלמים?",
    a: "כן! יש לנו דמו חי באתר שאפשר לנסות עכשיו. ובנוסף — שיחת ייעוץ ראשונה חינמית ב-100%, ללא כל התחייבות.",
  },
  {
    q: "איפה אתם ממוקמים?",
    a: "אנחנו ממוקמים בתל אביב, ישראל. הצוות שלנו ישראלי לגמרי — ניתן לפגוש אותנו פנים אל פנים אם רוצים.",
  },
  {
    q: "מה קורה אחרי ההקמה?",
    a: "אנחנו לא נעלמים. אחרי ההשקה יש לנו מעקב שוטף, שיפורים על בסיס נתונים, ותמיכה מלאה בוואטסאפ ובטלפון. אנחנו שותפים לטווח ארוך.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100" dir="rtl">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#0d1b3e] to-[#030712] py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4 text-sm text-green-300">
            ❓ שאלות ותשובות
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">שאלות נפוצות</h1>
          <p className="text-slate-400 text-lg">כל מה שרצית לדעת על AIAIAI ושירותי ה-AI שלנו</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/20 transition-colors">
            <h2 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
              <span className="text-cyan-400 text-sm font-black mt-0.5 flex-shrink-0">Q.</span>
              {faq.q}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed pr-6">{faq.a}</p>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-cyan-900/20 to-violet-900/20 rounded-2xl border border-white/10 p-10 mt-8">
          <h3 className="text-xl font-black text-white mb-2">יש לך שאלה שלא נענתה?</h3>
          <p className="text-slate-400 text-sm mb-6">דבר ישירות עם הצוות שלנו — נשמח לענות על כל שאלה</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-cyan-300 transition-colors">
              צור קשר
            </Link>
            <a href="https://wa.me/9720508699828" target="_blank" rel="noopener noreferrer" className="border border-green-500/40 text-green-400 font-medium px-8 py-3 rounded-xl hover:border-green-400 transition-colors">
              WhatsApp ישיר
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
