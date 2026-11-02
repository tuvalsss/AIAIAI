"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAbout } from "@/components/layout/AboutContext";

type FooterLink = { label: string; href: string; internal: boolean; isAbout?: boolean };

const footerLinks: Record<string, FooterLink[]> = {
  "שירותים": [
    { label: "בוט WhatsApp", href: "#services", internal: true },
    { label: "חיבורי API ו-MCP", href: "#services", internal: true },
    { label: "חיבור למסד נתונים", href: "#services", internal: true },
    { label: "אוטומציות", href: "#services", internal: true },
    { label: "חיבורים ואבטחה", href: "#integrations", internal: true },
  ],
  "חברה": [
    { label: "אודות", href: "", internal: false, isAbout: true },
    { label: "לקוחות", href: "#testimonials", internal: true },
    { label: "דמו", href: "#demo", internal: true },
    { label: "צור קשר", href: "#contact", internal: true },
  ],
  "משאבים": [
    { label: "מדריך AI לעסקים", href: "/guide", internal: false },
    { label: "בלוג", href: "/blog", internal: false },
    { label: "שאלות נפוצות", href: "/faq", internal: false },
    { label: "פרטיות", href: "/privacy", internal: false },
  ],
};

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/972508699828",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: "hover:text-green-400",
  },
];

export default function Footer() {
  const { setOpen: setAboutOpen } = useAbout();
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = (href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      if (pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    }
  };

  return (
    <footer className="relative bg-[#030712] border-t border-white/5">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-violet-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              מוכן לשנות את העסק שלך?
            </h3>
            <p className="text-slate-400 text-lg mb-8">
              שיחת אפיון של 20 דקות, בלי עלות. נגיד לך בדיוק מה אפשר לחבר ומה זה ידרוש.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary inline-flex items-center justify-center gap-2 text-base"
              >
                קבל שיחת אפיון חינם
              </button>
              <a
                href="tel:0508699828"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
              >
                <span dir="ltr">050-869-9828</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="3AI לוגו" width={44} height={44} className="rounded-xl" sizes="44px" />
              <div>
                <div className="text-lg font-black text-white">AI<span className="text-cyan-400">AI</span>AI</div>
                <div className="text-[10px] text-slate-400">סוכני AI לעסקים</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              3AI (AIAIAI): חברת פיתוח מתל אביב שבונה סוכני AI, בוטים לוואטסאפ, שרתי MCP וחיבורים ל-API ולמסדי נתונים לעסקים בישראל.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-500 ${s.color} transition-colors duration-200`}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isAbout ? (
                      <button
                        onClick={() => setAboutOpen(true)}
                        className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.label}
                      </button>
                    ) : link.internal ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div>© 2026 3AI (AIAIAI). כל הזכויות שמורות.</div>
          <div className="flex items-center gap-1">
            <span>נבנה עם</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
            <span>בתל אביב, ישראל</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/972508699828" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a>
            <a href="tel:0508699828" className="hover:text-cyan-400 transition-colors" dir="ltr">050-869-9828</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
