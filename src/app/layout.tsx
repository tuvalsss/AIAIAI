import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, KEYWORDS, PHONE_E164, SITE_NAME, SITE_URL } from "@/lib/site";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: `${SITE_NAME} – סוכני AI לעסקים`,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: { "geo.region": "IL", "geo.placename": "Tel Aviv" },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["AIAIAI", "אייאייאיי", "3AI פתרונות AI"],
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/og-square.jpg`,
      description: DEFAULT_DESCRIPTION,
      telephone: PHONE_E164,
      address: { "@type": "PostalAddress", addressLocality: "Tel Aviv", addressCountry: "IL" },
      areaServed: { "@type": "Country", name: "Israel" },
      priceRange: "₪₪",
      knowsLanguage: ["he", "en"],
      sameAs: ["https://wa.me/972508699828"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "שירותי AI לעסקים",
        itemListElement: [
          "בוט WhatsApp לעסקים",
          "סוכני AI מחוברים למערכות",
          "חיבורי API ושרתי MCP",
          "חיבור AI למסדי נתונים ושליפת נתונים",
          "אוטומציות עסקיות",
          "Dashboard AI",
          "פיתוח מערכות AI מותאמות",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "he-IL",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || "AW-18158835511";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <body suppressHydrationWarning className={`${heebo.variable} font-heebo bg-[#030712] text-slate-100 antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:font-bold"
        >
          דלג לתוכן הראשי
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GTAG_ID}');`}
        </Script>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
