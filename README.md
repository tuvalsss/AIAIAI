# 3AI (AIAIAI) – www.3ai.co.il

אתר החברה: סוכני AI, בוט וואטסאפ, חיבורי API ו-MCP, חיבור למסדי נתונים ואוטומציות לעסקים בישראל.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- TailwindCSS עם RTL מלא, Framer Motion, Lucide
- `@anthropic-ai/sdk` לדמו החי, `resend` לשליחת לידים, `@vercel/analytics`

## הרצה

```bash
npm install
cp .env.example .env.local   # ומלא את מה שצריך
npm run dev
```

`npm run build` לבנייה, `npm run lint` ל-ESLint.

## משתני סביבה

ראה `.env.example`. חשוב לדעת:

- **ANTHROPIC_API_KEY**: בלי מפתח (או עם מפתח בלי קרדיט) הדמואים עדיין עובדים: ה-API ב-`src/app/api/chat/route.ts` נופל אוטומטית למנוע המקומי ב-`src/lib/demo-engine.ts`, והמבקר רואה תשובה כאילו ה-AI מחובר. ההדר `X-Demo-Mode` מציין `live` או `fallback`.
- **RESEND_API_KEY + CONTACT_TO_EMAIL** או **LEADS_WEBHOOK_URL**: בלי אחד מהם טופס יצירת הקשר לא מגיע לאף אחד במייל. במצב כזה המבקר מקבל אחרי השליחה כפתור "שלח את הפרטים בוואטסאפ" עם כל הפרטים ממולאים, וכל ליד נרשם גם בלוגים של Vercel.
- **NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION**: קוד האימות של Google Search Console (אפשר גם לאמת דרך DNS).

## מבנה

- `src/app/page.tsx` – עמוד הבית: Hero, שירותים, חיבורים ואבטחה, דמו, למה אנחנו, לקוחות, צור קשר
- `src/app/(resources)/` – מדריך, בלוג, שאלות נפוצות, פרטיות
- `src/app/api/chat` – דמו AI (עם fallback), `src/app/api/contact` – קליטת לידים
- `src/lib/demo-engine.ts` – תשובות הדמו ללא AI, `src/lib/blog-posts.ts` – תוכן הבלוג
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx` – SEO

## פריסה

הפרויקט מחובר ל-Vercel (פרויקט `aiaiai`, דומיין `www.3ai.co.il`). כל push ל-`main` נפרס אוטומטית.

## פרטי יצירת קשר

- טלפון / WhatsApp: 050-869-9828 (https://wa.me/972508699828)
