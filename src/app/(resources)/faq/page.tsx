import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "שאלות נפוצות: בוט וואטסאפ, MCP, חיבור למסד נתונים ואבטחה",
  description: "תשובות על שירותי 3AI: כמה עולה בוט WhatsApp, מה זה MCP, איך מחברים AI ל-CRM ולמסד הנתונים, איך שומרים על המידע, זמני הקמה ועוד.",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", title: "שאלות נפוצות | 3AI", type: "website" },
};

const faqs = [
  {
    q: "מה ההבדל בין צ'אטבוט רגיל לסוכן AI שאתם בונים?",
    a: "צ'אטבוט רגיל עונה מתסריט או מידע כללי. הסוכן שלנו מחובר למערכות של העסק: הוא בודק זמינות ביומן האמיתי, שולף סטטוס הזמנה ממסד הנתונים, פותח כרטיס ב-CRM ומעדכן אותך. החיבור נעשה דרך API או שרת MCP עם הרשאות מוגדרות לכל פעולה.",
  },
  {
    q: "מה זה MCP ולמה זה חשוב לי?",
    a: "MCP (Model Context Protocol) הוא תקן פתוח שבו מודלים כמו Claude ו-ChatGPT מתחברים למערכות חיצוניות דרך \"כלים\" מוגדרים מראש. אנחנו בונים שרת MCP מעל המערכות שלך, כך שכל סוכן AI, בוואטסאפ, ב-Slack או ב-Claude Desktop, יכול לשלוף ולבצע פעולות בגבולות שאתה קובע. בונים פעם אחת ומחברים לכל ערוץ.",
  },
  {
    q: "האם אפשר לחבר את ה-AI למסד הנתונים שלנו?",
    a: "כן. אנחנו מחברים ל-PostgreSQL, MySQL, SQL Server, MongoDB, Supabase, Firebase, Google Sheets ו-Airtable. הגישה היא קריאה בלבד כברירת מחדל, עם רשימת טבלאות מאושרת, Row Level Security כך שכל לקוח או עובד רואה רק מה שמותר לו, ולוג של כל שאילתה. למסמכים (נהלים, מחירונים, חוזים) מוסיפים חיפוש סמנטי (RAG) עם ציטוט המקור.",
  },
  {
    q: "לאילו מערכות אתם מתחברים?",
    a: "WhatsApp Business API, Monday, HubSpot, Salesforce, Pipedrive, Zoho, Fireberry, Priority, SAP Business One, חשבשבת, iCount, Google Calendar, Outlook, Google Sheets, Slack, Notion ועוד. כל מערכת עם API ניתנת לחיבור, וגם מערכות בלי API אם יש גישה למסד הנתונים.",
  },
  {
    q: "איך אתם שומרים על המידע שלנו?",
    a: "המידע נשאר במערכות שלך: הסוכן ניגש דרך הרשאות מוגבלות ולא מעתיק את מסד הנתונים. מפתחות API נשמרים בכספת סודות, כל התעבורה מוצפנת, יש לוג מלא של כל פעולה, ופעולות רגישות (תשלום, מחיקה) דורשות אישור אנושי. אנחנו עובדים לפי חוק הגנת הפרטיות (תיקון 13) ו-GDPR, עם הסכמי עיבוד נתונים, והמודלים לא מתאמנים על הנתונים שלך.",
  },
  {
    q: "כמה עולה בוט WhatsApp לעסק?",
    a: "המחיר תלוי במה שמחברים. בוט WhatsApp בסיסי כולל הקמה חד-פעמית ותשלום חודשי לתחזוקה ולשימוש במודל. פתרון עם חיבור ל-CRM, ליומן או למסד הנתונים מתומחר לפי היקף העבודה. אחרי שיחת אפיון של 20 דקות (בלי עלות) תקבל הצעה מסודרת תוך 24 שעות.",
  },
  {
    q: "כמה זמן לוקח להקים?",
    a: "בוט WhatsApp בסיסי: ימים בודדים. חיבור ל-CRM או ליומן: שבוע עד שבועיים. שרת MCP מעל מערכת קיימת עם 5-10 כלים: שבוע עד שלושה שבועות כולל בדיקות אבטחה. אנחנו מעדיפים להעלות פתרון ראשון מהר ולהרחיב לפי תוצאות.",
  },
  {
    q: "האם הבוט מבין עברית טבעית?",
    a: "כן. הבוט לא עובד לפי מילות מפתח אלא מבין עברית חופשית, כולל ביטויים מדוברים, ראשי תיבות וסלנג. לקוח שכותב \"יאללה, אפשר להזיז לי את התור ליום חמישי בצהריים?\" מקבל תשובה מדויקת, מול היומן האמיתי. אפשר לנסות בדמו החי באתר.",
  },
  {
    q: "מה קורה כשהבוט לא יודע לענות או כשלקוח מבקש נציג?",
    a: "הבוט מזהה שאלות מחוץ לתחום או בקשה לנציג, מעביר את השיחה לאדם עם סיכום של מה שנאמר, ומתעד הכל. אף לקוח לא נשאר בלי מענה, ואף פעולה רגישה לא מתבצעת בלי אישור.",
  },
  {
    q: "האם אני צריך WhatsApp Business API?",
    a: "כן. כל הבוטים שלנו עובדים דרך WhatsApp Business API הרשמי של Meta, כדי שהחשבון לא ייחסם ושאפשר יהיה לשלוח תבניות מאושרות. אנחנו מטפלים בכל תהליך האישור והחיבור.",
  },
  {
    q: "עם אילו מודלים אתם עובדים?",
    a: "Claude של Anthropic, מודלי OpenAI ו-Gemini של Google, לפי המשימה: מודל מהיר וזול לשיחות שגרתיות, מודל חזק לניתוח ולמשימות מורכבות. את האינטגרציה בונים כך שאפשר להחליף מודל בלי לשכתב את המערכת.",
  },
  {
    q: "האם יש חוזה ארוך או נעילה לספק?",
    a: "לא. אין חוזים ארוכי טווח. הקוד, הסכמות והתיעוד נשארים אצלך, כך שאין תלות בנו. אנחנו רוצים שתישאר כי זה עובד, לא כי אין ברירה.",
  },
  {
    q: "איפה אתם ממוקמים?",
    a: "בתל אביב. עובדים עם עסקים בכל הארץ, מרחוק ופרונטלית. הצוות ישראלי והתמיכה בעברית, בוואטסאפ, בטלפון ובמייל.",
  },
  {
    q: "מה קורה אחרי ההקמה?",
    a: "ניטור שוטף של השיחות והקריאות למערכות, כיוונון לפי מקרים אמיתיים, התראות על תקלות, ותמיכה בעברית. אפשר גם להרחיב בהדרגה: עוד ערוצים, עוד כלים, עוד אוטומציות.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "בית", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "שאלות נפוצות", item: `${SITE_URL}/faq` },
  ],
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="relative bg-gradient-to-b from-[#0d1b3e] to-[#030712] py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4 text-sm text-green-300">
            ❓ שאלות ותשובות
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">שאלות נפוצות</h1>
          <p className="text-slate-400 text-lg">על בוטים לוואטסאפ, MCP, חיבור למסדי נתונים, אבטחה ומחירים</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/20 transition-colors" open={i < 3}>
            <summary className="text-lg font-bold text-white flex items-start gap-3 cursor-pointer list-none">
              <span className="text-cyan-400 text-sm font-black mt-0.5 flex-shrink-0">Q.</span>
              <span className="flex-1">{faq.q}</span>
              <span className="text-slate-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <p className="text-slate-400 text-sm leading-relaxed pr-6 mt-3">{faq.a}</p>
          </details>
        ))}

        <div className="text-center bg-gradient-to-r from-cyan-900/20 to-violet-900/20 rounded-2xl border border-white/10 p-10 mt-8">
          <h3 className="text-xl font-black text-white mb-2">יש לך שאלה שלא נענתה?</h3>
          <p className="text-slate-400 text-sm mb-6">דבר ישירות עם הצוות, נשמח לענות</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-cyan-300 transition-colors">
              צור קשר
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="border border-green-500/40 text-green-400 font-medium px-8 py-3 rounded-xl hover:border-green-400 transition-colors">
              WhatsApp ישיר
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
