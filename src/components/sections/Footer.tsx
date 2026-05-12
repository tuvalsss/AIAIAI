"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAbout } from "@/components/layout/AboutContext";

type FooterLink = { label: string; href: string; internal: boolean; isAbout?: boolean };

const footerLinks: Record<string, FooterLink[]> = {
  "שירותים": [
    { label: "בוט WhatsApp", href: "#services", internal: true },
    { label: "סוכני AI", href: "#services", internal: true },
    { label: "אוטומציות", href: "#services", internal: true },
    { label: "Dashboard AI", href: "#services", internal: true },
    { label: "ניהול לידים", href: "#services", internal: true },
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
    href: "https://wa.me/9720508699828",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: "hover:text-green-400",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "hover:text-blue-400",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: "hover:text-pink-400",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:text-blue-500",
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
              הצטרף ל-500+ עסקים ישראלים שכבר עובדים עם AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary inline-flex items-center justify-center gap-2 text-base"
              >
                קבל ייעוץ חינם עכשיו
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                <span className="text-[13px] font-black text-black tracking-tight leading-none">AI</span>
              </div>
              <div>
                <div className="text-lg font-black text-white">AI<span className="text-cyan-400">AI</span>AI</div>
                <div className="text-[10px] text-slate-400">פתרונות AI</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              חברת AI ישראלית המובילה אוטומציה עסקית חכמה לעסקים קטנים ובינוניים בישראל. ממוקמים בתל אביב.
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
          <div>© 2025 AIAIAI. כל הזכויות שמורות.</div>
          <div className="flex items-center gap-1">
            <span>נבנה עם</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
            <span>בתל אביב, ישראל</span>
          </div>
          <div className="flex items-center gap-4">
            <span>info@3ai.co.il</span>
            <span dir="ltr">050-869-9828</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
