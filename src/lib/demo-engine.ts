/**
 * Demo engine: produces realistic Hebrew responses for the three site demos
 * without calling an external model. Used by the API route as a fallback when
 * the AI provider is unavailable (missing key, no credit, rate limit, outage)
 * and by the client when the API itself cannot be reached.
 *
 * Everything here is deterministic given the input and a seed, so the same
 * question gives a stable answer while "new version" still produces variety.
 */

export type DemoKind = "whatsapp" | "leads" | "content";
export type ChatMsg = { role: "user" | "assistant"; content: string };

export type LeadResult = {
  score: number;
  status: string;
  urgency: string;
  potential: string;
  insights: string[];
  nextAction: string;
  aiMessage: string;
};

// ─── helpers ──────────────────────────────────────────────────────────────
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function has(text: string, words: string[]): boolean {
  return words.some((w) => text.includes(w));
}

// ─── industry detection (shared by all demos) ─────────────────────────────
type Industry = {
  id: string;
  label: string;
  keywords: string[];
  emoji: string;
  painPoint: string;
  solution: string;
  monthly: [number, number];
  baseScore: number;
};

const INDUSTRIES: Industry[] = [
  {
    id: "restaurant", label: "מסעדה", emoji: "🍽️",
    keywords: ["מסעד", "בית קפה", "קפה", "שף", "שולחנות", "סועד", "תפריט", "משלוחים", "בר ", "פיצ"],
    painPoint: "שיחות שלא נענות בשעות העומס הופכות להזמנות אצל המתחרים",
    solution: "בוט WhatsApp שמקבל הזמנות שולחן, עונה על תפריט ואלרגנים ושולח תזכורת לפני ההגעה",
    monthly: [6000, 14000], baseScore: 78,
  },
  {
    id: "clinic", label: "קליניקה", emoji: "🩺",
    keywords: ["קליניק", "רופא", "מרפא", "מטפל", "תורים", "טיפול", "שיניים", "עור", "פיזיו", "קוסמט", "יופי", "מספר"],
    painPoint: "שעות של תיאום תורים טלפוני במקום לטפל במטופלים",
    solution: "בוט שמציג זמינות מהיומן, קובע ומזיז תורים ושולח תזכורות שמורידות אי-הגעות",
    monthly: [8000, 18000], baseScore: 84,
  },
  {
    id: "ecommerce", label: "חנות אונליין", emoji: "🛍️",
    keywords: ["חנות", "אונליין", "הזמנות", "משלוח", "מוצר", "מלאי", "אופנה", "ecommerce", "shopify", "ווקומרס", "woocommerce"],
    painPoint: "אותן שאלות על סטטוס משלוח והחזרות חוזרות עשרות פעמים ביום",
    solution: "סוכן שמחובר למערכת ההזמנות דרך API ועונה על סטטוס משלוח, החזרות ומוצרים בלי נציג",
    monthly: [7000, 20000], baseScore: 80,
  },
  {
    id: "law", label: "משרד עורכי דין", emoji: "⚖️",
    keywords: ["עורך דין", "עורכי דין", "עו\"ד", "עוד ", "משפט", "רואה חשבון", "רו\"ח", "יועץ מס", "משרד"],
    painPoint: "לידים שמחכים יותר מדי זמן לחזרה ועוברים למשרד אחר",
    solution: "סינון ותיעדוף פניות אוטומטי, איסוף פרטים ראשוניים ותיאום פגישה עם עורך הדין הנכון",
    monthly: [10000, 25000], baseScore: 82,
  },
  {
    id: "realestate", label: "נדל\"ן", emoji: "🏠",
    keywords: ["נדל", "נכס", "דירה", "דירות", "סיור", "תיווך", "מתווך", "השכרה", "פרויקט"],
    painPoint: "פניות רבות על נכסים שאינן מסווגות, ורוכשים רציניים שהולכים לאיבוד",
    solution: "סוכן שמסנן לפי תקציב ואזור, שולח פרטי נכסים מתוך מסד הנתונים ומתאם סיורים ביומן",
    monthly: [9000, 22000], baseScore: 80,
  },
  {
    id: "services", label: "חברת שירות", emoji: "🔧",
    keywords: ["טכנאי", "שיפוצ", "תחזוק", "אינסטל", "חשמלא", "מיזוג", "קריאת שירות", "קריאות", "הובל", "ניקיון"],
    painPoint: "קריאות שירות שמנוהלות בטלפון וב-WhatsApp בלי מערכת מסודרת",
    solution: "קליטת קריאות אוטומטית, שיבוץ טכנאי לפי אזור ו-Dashboard שמציג כל קריאה בזמן אמת",
    monthly: [7000, 16000], baseScore: 76,
  },
  {
    id: "fitness", label: "סטודיו / מכון כושר", emoji: "💪",
    keywords: ["כושר", "סטודיו", "מאמן", "יוגה", "פילאטיס", "חוג", "מנוי"],
    painPoint: "מתעניינים שלא מקבלים מענה מהיר ולא מגיעים לאימון ניסיון",
    solution: "בוט שקובע אימון ניסיון, מזכיר לפני האימון ומחדש מנויים אוטומטית",
    monthly: [5000, 12000], baseScore: 74,
  },
  {
    id: "saas", label: "חברת טכנולוגיה / SaaS", emoji: "💻",
    keywords: ["saas", "סטארט", "תוכנה", "אפליקצי", "פלטפורמ", "מערכת פנימ", "צוות פיתוח", "b2b"],
    painPoint: "נתונים פזורים בכמה מערכות וצוות שמבזבז זמן על שליפות ידניות",
    solution: "שרת MCP שמחבר את ה-AI למסד הנתונים ול-API הקיימים, עם הרשאות לכל משתמש",
    monthly: [12000, 35000], baseScore: 86,
  },
];

const GENERIC_INDUSTRY: Industry = {
  id: "general", label: "העסק", emoji: "🏢",
  keywords: [],
  painPoint: "משימות חוזרות שגוזלות שעות מהצוות כל יום",
  solution: "סוכן AI שמחובר למערכות הקיימות ועונה, מתעד ומבצע פעולות אוטומטית",
  monthly: [5000, 15000], baseScore: 70,
};

export function detectIndustry(text: string): Industry {
  const t = text.toLowerCase();
  return INDUSTRIES.find((ind) => has(t, ind.keywords)) ?? GENERIC_INDUSTRY;
}

// ─── WhatsApp demo ────────────────────────────────────────────────────────
type Intent = {
  id: string;
  match: (t: string) => boolean;
  replies: string[];
};

const INTENTS: Intent[] = [
  {
    id: "phone",
    match: (t) => /0\d{1,2}[-\s]?\d{3}[-\s]?\d{4}/.test(t) || /\+972/.test(t),
    replies: [
      "מעולה, רשמתי את המספר 📝\nנציג מהצוות יחזור אליך תוך שעה בשעות הפעילות.\nרוצה שנכין לך בינתיים הצעה ראשונית לפי סוג העסק?",
      "קיבלתי 👍 שמרתי את הפרטים במערכת ופתחתי לך כרטיס ליד.\nבאיזה תחום העסק שלך? ככה נגיע לשיחה מוכנים.",
    ],
  },
  {
    id: "human",
    match: (t) => has(t, ["נציג", "בן אדם", "אנושי", "מישהו אמיתי", "לדבר עם"]),
    replies: [
      "בטח 🙂 אני מעביר את השיחה לנציג אנושי ומצרף לו סיכום של מה שדיברנו.\nתשאיר מספר טלפון ונחזור אליך תוך שעה בשעות הפעילות.",
      "אין בעיה, כך בדיוק זה עובד גם אצל הלקוחות שלנו: אני מטפל בשגרה ומעביר לאדם כשצריך 🤝\nמה המספר שלך?",
    ],
  },
  {
    id: "price",
    match: (t) => has(t, ["מחיר", "עולה", "כמה זה", "עלות", "תמחור", "תשלום", "חבילה", "₪"]),
    replies: [
      "שאלה טובה 💬 המחיר תלוי במה שמחברים: בוט WhatsApp בסיסי מתחיל בהקמה חד-פעמית ותשלום חודשי קטן, ופתרון עם חיבור ל-CRM או למסד נתונים מתומחר לפי היקף.\nרוצה שאקבע לך שיחת ייעוץ חינם ל-15 דקות? תקבל הצעה מדויקת תוך 24 שעות.",
      "ברור 🙂 אין מחירון אחיד כי כל עסק מחבר דברים אחרים. בשיחת ייעוץ קצרה (חינם, בלי התחייבות) נבין מה צריך ונשלח הצעה מסודרת.\nמתי נוח לך, בוקר או אחה\"צ?",
    ],
  },
  {
    id: "meeting",
    match: (t) => has(t, ["פגישה", "לקבוע", "תור", "שיחה", "ייעוץ", "להיפגש", "זמין", "מתי אפשר"]),
    replies: [
      "בשמחה 📅 יש לי זמינות מחר ב-10:30 או ב-16:00 לשיחת ייעוץ של 15 דקות.\nאיזה מהם מתאים לך? אחרי האישור תקבל תזכורת אוטומטית.",
      "סבבה, בואו נקבע 📅\nתכתוב לי יום ושעה שנוחים לך, ואני אבדוק מול היומן ואחזיר אישור מיידי.",
    ],
  },
  {
    id: "services",
    match: (t) => has(t, ["שירות", "מה אתם", "מה יש", "מה אתה יודע", "מה אפשר", "אפשרויות", "מה עושים"]),
    replies: [
      "אנחנו בונים AI שמחובר לעסק באמת 🔌\n• בוט WhatsApp שעונה, קובע תורים ומוכר\n• סוכני AI עם גישה ל-CRM, ליומן ולמסד הנתונים שלך\n• חיבורי API ו-MCP לכל מערכת קיימת\n• Dashboard שמושך נתונים בזמן אמת\nמה הכי כואב לך היום?",
      "בקצרה: הופכים משימות שחוזרות על עצמן לאוטומטיות 🤖\nמענה ללקוחות, תיאום תורים, שליפת נתונים ממערכות, דוחות ופולואו-אפ ללידים.\nספר לי על העסק ואגיד לך מה הכי משתלם להתחיל איתו.",
    ],
  },
  {
    id: "integrations",
    match: (t) => has(t, ["crm", "מערכת", "חיבור", "api", "מסד", "נתונים", "דאטה", "database", "mcp", "אינטגרצי", "monday", "hubspot", "sheets", "אקסל", "פריוריטי", "priority", "sap", "יומן", "calendar"]),
    replies: [
      "כן, זה בדיוק ההתמחות שלנו 🔗\nאנחנו מחברים את ה-AI ישירות למערכות דרך API או שרת MCP: CRM (Monday, HubSpot, Salesforce, Pipedrive), יומנים, Google Sheets, פריוריטי ומסדי נתונים כמו Postgres, MySQL ו-Supabase.\nהסוכן שולף רק את מה שמותר לו לראות, בהרשאות שאתם מגדירים. איזו מערכת יש אצלך?",
      "בהחלט 🛠️ הסוכן שלנו לא רק מדבר, הוא גם שולף ומעדכן נתונים: סטטוס הזמנה, יתרה, זמינות ביומן, היסטוריית לקוח.\nהכל דרך חיבור מאובטח, בלי שהמידע שלך יוצא מהמערכות שלך. על איזו מערכת מדובר?",
    ],
  },
  {
    id: "security",
    match: (t) => has(t, ["אבטח", "פרטיות", "מאובטח", "בטוח", "מידע רגיש", "gdpr", "הגנת הפרטיות", "סיסמ"]),
    replies: [
      "שאלה חשובה 🔒 המידע נשאר במערכות שלך, הסוכן ניגש דרך הרשאות מוגבלות (קריאה בלבד כשאפשר), כל תעבורה מוצפנת, ויש לוג מלא של כל פעולה.\nאנחנו עובדים לפי תיקון 13 לחוק הגנת הפרטיות ו-GDPR, והמודלים לא מתאמנים על הנתונים שלך.",
      "לגמרי 🔐 מפתחות ו-API Keys נשמרים בכספת ולא בקוד, גישה לפי תפקיד, ואפשר להגדיר שפעולות רגישות (תשלום, מחיקה) תמיד יעברו אישור אנושי.\nרוצה שאשלח לך את מסמך האבטחה המלא?",
    ],
  },
  {
    id: "example",
    match: (t) => has(t, ["דוגמה", "דוגמא", "איך זה עובד", "תסביר", "הסבר", "תראה לי"]),
    replies: [
      "דוגמה אמיתית 👇\nלקוח כותב למסעדה: \"יש מקום לארבעה מחר ב-20:00?\"\nהבוט בודק זמינות במערכת ההזמנות, מאשר תוך 3 שניות, שולח אישור ותזכורת למחרת.\nבעל המסעדה רואה את ההזמנה ב-Dashboard בלי להרים טלפון. ככה זה עובד גם אצלך, עם המערכות שלך.",
      "הנה איך זה נראה בפועל 👇\nליד נכנס מהאתר → הסוכן עונה ב-WhatsApp תוך 30 שניות → שואל 3 שאלות סינון → פותח כרטיס ב-CRM עם ציון → מתזכר אותך כשהליד חם.\nאפס עבודה ידנית. רוצה שנבנה לך כזה?",
    ],
  },
  {
    id: "hours",
    match: (t) => has(t, ["שעות", "פתוח", "מתי אתם", "זמינים"]),
    replies: [
      "אני זמין 24/7 כאן בוואטסאפ 🌙 הצוות האנושי עונה א'-ה' 9:00-18:00.\nאפשר להשאיר הודעה בכל שעה ואני כבר מתעד אותה במערכת.",
    ],
  },
  {
    id: "who",
    match: (t) => has(t, ["מי אתה", "מה אתה", "אתה בוט", "אתה אמיתי", "אתה רובוט"]),
    replies: [
      "אני סוכן AI של 3AI 🤖 עונה תוך שניות, מבין עברית טבעית, ומחובר למערכות של העסק.\nבדיוק כזה אפשר להקים גם לעסק שלך. רוצה לראות איך?",
    ],
  },
  {
    id: "thanks",
    match: (t) => has(t, ["תודה", "מעולה", "סבבה", "אחלה", "מושלם", "יופי"]),
    replies: [
      "בכיף 🙌 אם תרצה, אפשר לקבוע שיחת ייעוץ חינם או פשוט לכתוב לי כל שאלה.",
      "בשמחה 😊 אני כאן 24/7. מתי שתרצה, נמשיך.",
    ],
  },
  {
    id: "greeting",
    match: (t) => has(t, ["שלום", "היי", "הי ", "הלו", "בוקר טוב", "ערב טוב", "צהריים טובים", "מה נשמע", "מה קורה"]) && t.length < 25,
    replies: [
      "היי 👋 כיף שכתבת. אני סוכן ה-AI של 3AI.\nאפשר לשאול אותי על בוטים, חיבורים למערכות, מחירים, או פשוט לספר לי על העסק שלך ואגיד מה אפשר לאטמט.",
      "שלום! 😊 אני כאן לעזור. איזה סוג עסק יש לך? ככה אוכל להציע משהו רלוונטי.",
    ],
  },
];

const BUSINESS_REPLIES = (ind: Industry, seed: number) =>
  pick(
    [
      `${ind.emoji} ${ind.label}, מצוין. אצל לקוחות בתחום הזה הבעיה הכי נפוצה היא ש${ind.painPoint}.\nהפתרון שבנינו: ${ind.solution}.\nרוצה לשמוע איך זה נראה אצלך?`,
      `${ind.emoji} אנחנו עובדים עם לא מעט עסקים בתחום ${ind.label}.\nבדרך כלל מתחילים מ${ind.solution.replace(/^(בוט|סוכן|שרת|סינון|קליטת)/, (m) => m)}, ורואים תוצאה תוך ימים.\nכמה פניות בערך אתם מקבלים ביום?`,
    ],
    seed
  );

const DEFAULT_REPLIES = [
  "הבנתי 🙂 כדי שאוכל לכוון אותך נכון: איזה סוג עסק יש לך, ומה המשימה שגוזלת הכי הרבה זמן היום?",
  "תודה על הפירוט 👌 נשמע כמו משהו שאפשר לאטמט. הדרך הכי טובה להמשיך היא שיחת ייעוץ קצרה וחינמית. לקבוע לך?",
  "רשמתי לפניי ✍️ רוצה שאסביר איך סוכן AI היה מטפל בזה אצלך, או שנקבע ישירות שיחה עם הצוות?",
  "שאלה טובה. בקצרה: אנחנו מחברים AI למערכות הקיימות שלך (WhatsApp, CRM, יומן, מסד נתונים) כדי שיענה ויבצע פעולות לבד.\nמה הכי רלוונטי לך מביניהם?",
];

export function whatsappReply(history: ChatMsg[]): string {
  const last = [...history].reverse().find((m) => m.role === "user")?.content ?? "";
  const t = last.toLowerCase();
  const seed = hash(last) + history.length;

  for (const intent of INTENTS) {
    if (intent.match(t)) return pick(intent.replies, seed);
  }

  const ind = detectIndustry(t);
  if (ind.id !== "general") return BUSINESS_REPLIES(ind, seed);

  return pick(DEFAULT_REPLIES, seed);
}

// ─── Lead scorer demo ─────────────────────────────────────────────────────
export function leadAnalysis(description: string): LeadResult {
  const t = description.toLowerCase();
  const ind = detectIndustry(t);
  const seed = hash(description);

  let score = ind.baseScore;
  const insights: string[] = [];

  const numbers = (t.match(/\d+/g) ?? []).map(Number).filter((n) => n > 0 && n < 100000);
  const biggest = numbers.length ? Math.max(...numbers) : 0;
  if (biggest >= 100) { score += 6; insights.push(`היקף פעילות גבוה (${biggest}+), ROI מהיר`); }
  else if (biggest >= 10) { score += 3; insights.push(`עסק פעיל עם היקף שמצדיק אוטומציה`); }

  const pain = ["מפסיד", "מאבד", "מתלונן", "עייף", "לא מספיק", "עומס", "לא עונה", "מבזבז", "שעות ביום", "no-show", "לא מגיע"];
  const painHits = pain.filter((w) => t.includes(w)).length;
  if (painHits) { score += Math.min(painHits * 4, 10); insights.push("כאב עסקי מוגדר וברור, מוטיבציה גבוהה"); }

  const intent = ["רוצה", "מחפש", "צריך", "מעוניין", "דחוף", "מיידי", "כבר", "עכשיו"];
  const intentHits = intent.filter((w) => t.includes(w)).length;
  if (intentHits) { score += Math.min(intentHits * 3, 8); insights.push("כוונת רכישה מפורשת בפנייה"); }

  if (has(t, ["whatsapp", "וואטסאפ", "בוט"])) insights.push("מתאים לבוט WhatsApp כשלב ראשון");
  if (has(t, ["crm", "מערכת", "api", "נתונים", "מסד", "יומן", "אוטומצי"])) { score += 3; insights.push("נדרש חיבור למערכות קיימות (API / MCP)"); }
  if (has(t, ["תור", "תיאום", "פגיש"])) insights.push("תיאום תורים: חיסכון של 2-3 שעות ביום");
  if (t.length < 40) { score -= 8; insights.push("פנייה קצרה, כדאי לאסוף עוד פרטים"); }

  score = Math.max(35, Math.min(97, score + (seed % 5) - 2));

  while (insights.length < 3) {
    const extra = [
      `${ind.label}: תחום עם החזר השקעה מהיר`,
      "ניתן להתחיל בפיילוט ולהרחיב בהדרגה",
      "מענה תוך 5 דקות מכפיל סיכויי סגירה",
      "פתרון ראשון יכול לעלות לאוויר תוך 48 שעות",
    ];
    const cand = pick(extra, seed + insights.length);
    if (!insights.includes(cand)) insights.push(cand);
  }

  const status = score >= 80 ? "חם" : score >= 60 ? "פושר" : "קר";
  const urgency = score >= 80 ? "גבוהה" : score >= 60 ? "בינונית" : "נמוכה";
  const scale = biggest >= 100 ? 1.4 : biggest >= 20 ? 1.1 : 1;
  const lo = Math.round((ind.monthly[0] * scale) / 500) * 500;
  const hi = Math.round((ind.monthly[1] * scale) / 500) * 500;

  const nextAction = pick(
    [
      `להתקשר תוך שעה ולהציע שיחת אפיון של 20 דקות עם דגש על ${ind.painPoint.split(" ").slice(0, 4).join(" ")}`,
      `לשלוח הצעת פיילוט ל-${ind.label}: ${ind.solution.split(",")[0]}`,
      "לקבוע דמו חי ב-WhatsApp מחר בבוקר ולהציג מקרה דומה מהתחום",
    ],
    seed
  );

  const aiMessage = pick(
    [
      `היי, ראיתי שפנית אלינו בנושא ${ind.label} ${ind.emoji} יש לנו פתרון שמטפל בדיוק בזה: ${ind.solution.split(",")[0]}.\nמתאים לך שיחה קצרה מחר ב-10:00?`,
      `שלום! תודה על הפנייה 🙏 ב-3AI כבר עזרנו לעסקים בתחום ${ind.label} עם ${ind.solution.split(",")[0]}.\nאשמח להראות לך דמו של 15 דקות, מתי נוח?`,
    ],
    seed + 1
  );

  return {
    score,
    status,
    urgency,
    potential: `₪${lo.toLocaleString("he-IL")}-${hi.toLocaleString("he-IL")}/חודש`,
    insights: insights.slice(0, 3),
    nextAction,
    aiMessage,
  };
}

// ─── Content generator demo ───────────────────────────────────────────────
type BizProfile = { emoji: string; benefit1: string; benefit2: string; benefit3: string; offer: string; service: string };

const BIZ_PROFILES: Record<string, BizProfile> = {
  restaurant: { emoji: "🍽️", benefit1: "הזמנת שולחן תוך 10 שניות, בלי להמתין על הקו", benefit2: "תפריט מעודכן, כולל מנות ללא גלוטן וטבעוניות", benefit3: "תזכורת אוטומטית לפני ההגעה", offer: "קינוח מתנה לכל הזמנה דרך WhatsApp", service: "הזמנת שולחן" },
  clinic: { emoji: "🩺", benefit1: "קביעת תור בוואטסאפ, 24/7, בלי טלפונים", benefit2: "תזכורת 24 שעות לפני התור", benefit3: "שינוי או ביטול בלחיצה אחת", offer: "15% הנחה על הטיפול הראשון", service: "תור" },
  ecommerce: { emoji: "🛍️", benefit1: "מעקב משלוח בזמן אמת ישירות בצ'אט", benefit2: "החזרות והחלפות בלי טפסים", benefit3: "המלצות על מוצרים שמתאימים לך", offer: "משלוח חינם להזמנה הבאה", service: "הזמנה" },
  law: { emoji: "⚖️", benefit1: "מענה ראשוני דיסקרטי תוך דקות", benefit2: "תיאום פגישת ייעוץ בלי המתנה", benefit3: "עדכון שוטף על סטטוס התיק", offer: "פגישת ייעוץ ראשונה ללא עלות", service: "פגישת ייעוץ" },
  realestate: { emoji: "🏠", benefit1: "נכסים שמתאימים בדיוק לתקציב ולאזור שלך", benefit2: "תיאום סיור בנכס תוך דקה", benefit3: "עדכון מיידי על נכסים חדשים", offer: "ליווי מלא עד החתימה, ללא עמלת תיווך על השכרה", service: "סיור בנכס" },
  services: { emoji: "🔧", benefit1: "קריאת שירות נפתחת תוך 30 שניות", benefit2: "טכנאי משובץ לפי האזור שלך", benefit3: "עדכון על זמן הגעה משוער", offer: "ביקור אבחון חינם השבוע", service: "קריאת שירות" },
  fitness: { emoji: "💪", benefit1: "אימון ניסיון חינם, נרשמים בהודעה אחת", benefit2: "לוח חוגים מעודכן תמיד", benefit3: "תזכורת לפני כל אימון", offer: "חודש ראשון ב-50% הנחה", service: "אימון ניסיון" },
  saas: { emoji: "💻", benefit1: "אונבורדינג מודרך ב-WhatsApp", benefit2: "תמיכה טכנית 24/7 שמחוברת למערכת שלכם", benefit3: "עדכוני מוצר ממוקדים", offer: "14 ימי ניסיון בחינם", service: "דמו" },
  general: { emoji: "✨", benefit1: "מענה תוך שניות, 24/7", benefit2: "תיאום פגישה בלי טלפונים", benefit3: "שירות אישי שמכיר אותך", offer: "הטבה מיוחדת לפונים השבוע", service: "פגישה" },
};

function profileFor(biz: string): BizProfile {
  const ind = detectIndustry(biz.toLowerCase());
  return BIZ_PROFILES[ind.id] ?? BIZ_PROFILES.general;
}

export function contentDraft(contentType: string, biz: string, seed = 0): string {
  const p = profileFor(biz);
  const s = hash(biz + contentType) + seed;
  const name = biz.trim() || "העסק";

  switch (contentType) {
    case "followup":
      return pick(
        [
          `היי 👋 זה ${name}. פנית אלינו אתמול ולא הספקנו לסגור פרטים.\nרק רציתי לעדכן שיש לנו השבוע ${p.offer} 🎁\nרוצה שאקבע לך ${p.service} בזמן שנוח לך?`,
          `שלום! 😊 שמנו לב שפנית ל-${name} ועוד לא קבענו.\nאין לחץ, אבל שווה לדעת: ${p.benefit1}.\nתכתוב "כן" ואדאג לכל השאר.`,
        ],
        s
      );
    case "review":
      return pick(
        [
          `היי, תודה שבחרת ב-${name} ${p.emoji}\nהיה לנו כיף לשרת אותך. אם היית מרוצה, נשמח מאוד לביקורת קצרה בגוגל, זה עוזר לעסק קטן יותר ממה שנדמה 🙏\nhttps://g.page/r/XXXXX/review\nתודה ענקית!`,
          `שלום! 🌟 איך היה אצלנו ב-${name}?\nאם חווית שירות טוב, 30 שניות של ביקורת בגוגל יעשו לנו את היום 💙\nhttps://g.page/r/XXXXX/review`,
        ],
        s
      );
    case "offer":
      return pick(
        [
          `${p.emoji} מבצע לשבוע הזה בלבד ב-${name}!\n${p.offer} לכל מי שקובע ${p.service} עד יום חמישי.\n⏳ נשארו מקומות ספורים.\nתכתוב "אני בפנים" ואקבע לך מיד.`,
          `🔥 ${name} מפנק: ${p.offer}\nתקף ל-48 השעות הקרובות בלבד.\n${p.benefit2} ✅\nהשב "מבצע" לפרטים ולהרשמה.`,
        ],
        s
      );
    case "whatsapp":
    default:
      return pick(
        [
          `היי 👋 כאן ${name} ${p.emoji}\nעכשיו אפשר לעשות הכל ישירות בוואטסאפ:\n✅ ${p.benefit1}\n✅ ${p.benefit2}\n✅ ${p.benefit3}\nרוצה לנסות? תכתוב "${p.service}" ואני אסדר הכל.`,
          `${p.emoji} ${name} עבר ל-WhatsApp חכם!\n• ${p.benefit1}\n• ${p.benefit3}\n• זמינים 24/7, גם בסופ"ש\nתשלח "היי" ונתחיל 🙂`,
        ],
        s
      );
  }
}

// ─── Streaming helper (used by both server and client) ────────────────────
/** Splits text into word-ish chunks so a canned answer can be "typed" out. */
export function chunkText(text: string): string[] {
  const out: string[] = [];
  const parts = text.split(/(?<=\s)/);
  let buf = "";
  for (const part of parts) {
    buf += part;
    if (buf.length >= 6) { out.push(buf); buf = ""; }
  }
  if (buf) out.push(buf);
  return out;
}
