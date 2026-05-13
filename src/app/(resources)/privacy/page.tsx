import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | AIAIAI",
  description: "מדיניות הפרטיות של AIAIAI - כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
};

export default function PrivacyPage() {
  const updated = "1 במאי 2025";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100" dir="rtl">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-[#0d1b3e] to-[#030712] py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">מדיניות פרטיות</h1>
          <p className="text-slate-400 text-sm">עודכן לאחרונה: {updated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-sm text-slate-300 leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. מי אנחנו</h2>
          <p>AIAIAI היא חברה ישראלית המספקת פתרונות בינה מלאכותית לעסקים, הממוקמת בתל אביב, ישראל. ניתן לפנות אלינו בכתובת info@3ai.co.il.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. איזה מידע אנו אוספים</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-400">
            <li><strong className="text-white">מידע שאתה מוסר:</strong> שם, טלפון, אימייל ותוכן הפנייה שלך דרך טפסי יצירת הקשר באתר.</li>
            <li><strong className="text-white">מידע שנאסף אוטומטית:</strong> כתובת IP, סוג דפדפן, עמודים שביקרת בהם ומשך הביקור - לצורך ניתוח ושיפור האתר.</li>
            <li><strong className="text-white">מידע מהדמו:</strong> הטקסט שתכתוב בדמו ה-AI עשוי לעבור עיבוד על-ידי מודל AI חיצוני (Claude/Anthropic). אין לשתף בדמו מידע אישי רגיש.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. כיצד אנו משתמשים במידע</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-400">
            <li>יצירת קשר בחזרה לפי בקשתך</li>
            <li>שיפור השירותים והאתר שלנו</li>
            <li>שליחת עדכונים רלוונטיים (בכפוף להסכמתך)</li>
            <li>עמידה בדרישות חוקיות</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. שיתוף מידע עם צדדים שלישיים</h2>
          <p className="text-slate-400">אנו לא מוכרים, משכירים או מעבירים מידע אישי לצדדים שלישיים, למעט:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-400 mt-2">
            <li>ספקי שירות הכרחיים (אחסון, ניתוח, שליחת מיילים) הפועלים מטעמנו בלבד</li>
            <li>Anthropic (מפעילת Claude AI) לצורך עיבוד שאילתות הדמו - לפי מדיניות הפרטיות שלהם</li>
            <li>כאשר נדרש על-פי חוק</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. עוגיות (Cookies)</h2>
          <p className="text-slate-400">האתר משתמש בעוגיות בסיסיות לתפקוד תקין ובעוגיות אנליטיקס אנונימיות (Google Analytics) להבנת אופן השימוש. ניתן להשבית עוגיות בהגדרות הדפדפן שלך.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. אבטחת מידע</h2>
          <p className="text-slate-400">אנו מיישמים אמצעי אבטחה תקניים - הצפנת SSL, גישה מוגבלת למידע, וגיבויים סדירים. עם זאת, אין מערכת שהיא עמידה בפני כל איום.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. הזכויות שלך</h2>
          <p className="text-slate-400">בהתאם לחוק הגנת הפרטיות הישראלי ו-GDPR, יש לך זכות:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-400 mt-2">
            <li>לעיין במידע שמצוי עלייך</li>
            <li>לתקן מידע שגוי</li>
            <li>לבקש מחיקת המידע שלך</li>
            <li>להתנגד לשימוש במידע לשיווק</li>
          </ul>
          <p className="mt-3">לכל בקשה: <a href="mailto:info@3ai.co.il" className="text-cyan-400 hover:underline">info@3ai.co.il</a></p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">8. יצירת קשר</h2>
          <p className="text-slate-400">לשאלות בנוגע למדיניות פרטיות זו:<br />
          אימייל: <a href="mailto:info@3ai.co.il" className="text-cyan-400 hover:underline">info@3ai.co.il</a><br />
          טלפון: <a href="tel:0508699828" className="text-cyan-400 hover:underline" dir="ltr">050-869-9828</a><br />
          כתובת: תל אביב, ישראל</p>
        </section>

        <div className="border-t border-white/10 pt-6 text-center">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
            ← חזור לאתר הראשי
          </Link>
        </div>
      </div>
    </div>
  );
}
