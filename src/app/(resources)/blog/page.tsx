import Link from "next/link";
import { posts } from "@/lib/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בלוג: סוכני AI, MCP, חיבור למסדי נתונים ואוטומציה לעסקים",
  description: "מדריכים ומקרי בוחן על סוכני AI לעסקים בישראל: שרתי MCP, חיבור AI למסד נתונים, בוט וואטסאפ, אבטחת מידע ואוטומציות.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "בלוג 3AI: סוכני AI וחיבורי מערכות לעסקים", type: "website" },
};

export default function BlogPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b3e] via-[#1e1040] to-[#030712]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            בלוג AI
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            ידע שמניע <span className="gradient-text">עסקים קדימה</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            מדריכים על MCP, חיבור AI למסדי נתונים, אבטחת מידע ומקרי בוחן מעסקים בישראל
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group glass rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col"
            >
              {/* Gradient top bar */}
              <div className={`h-2 bg-gradient-to-r ${post.color.replace("/20", "")}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-slate-300">
                    {post.badge}
                  </span>
                  <time dateTime={post.isoDate} className="text-xs text-slate-500">{post.date}</time>
                </div>

                <h2 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-400 leading-relaxed flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                  <span className="text-xs text-cyan-400 font-medium group-hover:underline">
                    קרא עוד ←
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
