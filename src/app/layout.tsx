import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AIAIAI – פתרונות AI לעסקים בישראל | בוט וואטסאפ, סוכני AI, אוטומציה עסקית",
  description: "AIAIAI מספקת פתרונות בינה מלאכותית מתקדמים לעסקים בישראל. בוט וואטסאפ חכם, סוכני AI, אוטומציה עסקית מלאה, CRM AI ומערכות דיגיטל. AI בעברית מלאה.",
  keywords: [
    "בוט וואטסאפ לעסק",
    "AI לעסקים בישראל",
    "סוכני AI",
    "אוטומציה עסקית",
    "בינה מלאכותית לעסקים",
    "צ'אטבוט לעסק",
    "WhatsApp AI ישראל",
    "פתרונות AI לעסקים קטנים",
    "אייאייאיי",
    "AIAIAI",
  ],
  authors: [{ name: "AIAIAI" }],
  creator: "AIAIAI",
  publisher: "AIAIAI",
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://3ai.co.il",
    siteName: "AIAIAI – פתרונות AI",
    title: "AIAIAI – AI לעסקים בישראל",
    description: "פתרונות AI מתקדמים לעסקים בישראל. בוט וואטסאפ, סוכני AI, אוטומציה עסקית.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIAIAI – AI לעסקים בישראל",
    description: "פתרונות AI מתקדמים לעסקים בישראל",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18158835511"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18158835511');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className={`${heebo.variable} ${rubik.variable} font-heebo bg-[#030712] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
