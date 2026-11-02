import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPostBySlug } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.isoDate,
      authors: [SITE_NAME],
      locale: "he_IL",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**") && para.indexOf("**", 2) === para.length - 2) {
      return (
        <h2 key={i} className="text-xl font-black text-white mt-8 mb-3">
          {para.slice(2, -2)}
        </h2>
      );
    }
    if (para.split("\n").every((l) => l.startsWith("- ")) ) {
      return (
        <ul key={i} className="list-disc pr-6 space-y-1.5 mb-4 text-slate-300 leading-relaxed">
          {para.split("\n").map((l, j) => (
            <li key={j}>{inline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
        {inline(para)}
      </p>
    );
  });
}

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} className="text-white font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        inLanguage: "he-IL",
        articleSection: post.category,
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
        image: `${SITE_URL}/opengraph-image`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "בית", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "בלוג", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#030712]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030712]" />
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-8">
            → חזור לבלוג
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-slate-300">{post.badge}</span>
            <time dateTime={post.isoDate} className="text-xs text-slate-500">{post.date}</time>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-500">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">{post.title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed">{post.excerpt}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="glass rounded-2xl border border-white/10 p-8 mb-12">{renderContent(post.content)}</div>

        <div className="glass rounded-2xl border border-cyan-500/20 p-8 text-center mb-12">
          <h3 className="text-xl font-black text-white mb-3">רוצה לראות איך זה עובד עם המערכות שלך?</h3>
          <p className="text-slate-400 mb-6">שיחת אפיון של 20 דקות, בלי עלות. נמפה את החיבורים ונשלח הצעה תוך 24 שעות.</p>
          <Link href="/#contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
            קבל שיחת אפיון חינם
          </Link>
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-5">מאמרים נוספים</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="glass rounded-xl border border-white/10 p-4 hover:border-cyan-500/30 transition-all hover:-translate-y-0.5 group"
                >
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${p.color.replace("/20", "")} mb-3`} />
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-2">{p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
