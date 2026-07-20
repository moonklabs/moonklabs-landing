import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MarkdownLite from "@/components/MarkdownLite";
import { getPost, posts, sortedPosts } from "@/content/posts";
import { siteName, siteUrl } from "@/app/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: siteName, url: siteUrl },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <main id="main" className="min-h-screen" style={{ background: "#FAF9F6" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 pt-36 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="브레드크럼" className="mb-8 text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-600 transition-colors">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-zinc-600 transition-colors">
            블로그
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12 space-y-5">
          <div className="flex items-center gap-3 text-xs">
            <span
              className="px-3 py-1 rounded-full font-medium text-violet-700"
              style={{ background: "rgba(124,58,237,0.07)" }}
            >
              {post.category}
            </span>
            <span className="text-zinc-400">{formatDate(post.date)}</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-400">{post.readingMinutes}분 읽기</span>
          </div>
          <h1
            className="font-display font-bold"
            style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: "#1C1B17" }}
          >
            {post.title}
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">{post.description}</p>
        </header>

        <div className="h-px mb-12" style={{ background: "rgba(28,27,23,0.08)" }} />

        {/* Body */}
        <MarkdownLite content={post.content} />

        {/* CTA */}
        <div
          className="mt-16 rounded-3xl p-8 lg:p-10 space-y-4"
          style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.16)" }}
        >
          <h2 className="font-display text-xl font-bold" style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}>
            우리 회사에는 어떻게 적용될까요?
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            무료 진단 워크숍에서 귀사의 업무 구조에 맞는 자동화 대상과 기대 효과를 하루 만에
            정리해드립니다. 보통 1영업일 이내 회신드립니다.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium text-white hover:opacity-85 transition-all hover:-translate-y-0.5"
            style={{ background: "#1C1B17" }}
          >
            도입 상담 신청 →
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 space-y-5">
            <h2 className="font-display text-lg font-bold" style={{ color: "#1C1B17" }}>
              함께 읽으면 좋은 글
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl bg-white p-6 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,27,23,0.08)]"
                  style={{ border: "1px solid rgba(28,27,23,0.08)" }}
                >
                  <span className="text-[11px] text-violet-700 font-medium">{p.category}</span>
                  <h3
                    className="font-display text-[15px] font-bold leading-snug group-hover:text-violet-800 transition-colors"
                    style={{ color: "#1C1B17" }}
                  >
                    {p.title}
                  </h3>
                  <span className="text-xs text-zinc-400">{p.readingMinutes}분 읽기</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
