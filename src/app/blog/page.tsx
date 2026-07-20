import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { sortedPosts } from "@/content/posts";
import { siteUrl } from "@/app/site-config";

export const metadata: Metadata = {
  title: "블로그 — AI Agent 자동화 인사이트",
  description:
    "기업 AI 에이전트 도입 가이드, 자사 제품 운영 사례, 가드레일 설계까지 — 뭉클랩이 현장에서 검증한 인사이트를 공유합니다.",
  alternates: { canonical: `${siteUrl}/blog` },
};

const categoryColor: Record<string, string> = {
  "도입 가이드": "text-violet-700",
  "운영 사례": "text-amber-700",
  엔지니어링: "text-emerald-700",
};

const categoryBg: Record<string, string> = {
  "도입 가이드": "rgba(124,58,237,0.07)",
  "운영 사례": "rgba(217,119,6,0.08)",
  엔지니어링: "rgba(5,150,105,0.08)",
};

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

export default function BlogPage() {
  const list = sortedPosts();
  const [featured, ...rest] = list;

  return (
    <main id="main" className="min-h-screen" style={{ background: "#FAF9F6" }}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-5">
          <span
            className="inline-block text-xs tracking-widest text-violet-700 font-medium px-4 py-1.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.07)" }}
          >
            INSIGHTS
          </span>
          <h1
            className="font-display font-bold"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "#1C1B17" }}
          >
            현장에서 검증한
            <br />
            에이전트 자동화 인사이트
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">
            뭉클랩이 자사 제품을 직접 운영하며 배운 것들 — 도입 가이드, 운영 사례, 엔지니어링 노트를
            공유합니다.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-3xl bg-white p-8 lg:p-12 mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(28,27,23,0.10)]"
          style={{ border: "1px solid rgba(28,27,23,0.08)", boxShadow: "0 2px 10px rgba(28,27,23,0.03)" }}
        >
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <span
                className={`px-3 py-1 rounded-full font-medium ${categoryColor[featured.category]}`}
                style={{ background: categoryBg[featured.category] }}
              >
                {featured.category}
              </span>
              <span className="text-zinc-400">{formatDate(featured.date)}</span>
              <span className="text-zinc-300">·</span>
              <span className="text-zinc-400">{featured.readingMinutes}분 읽기</span>
            </div>
            <h2
              className="font-display font-bold group-hover:text-violet-800 transition-colors"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em", lineHeight: 1.25, color: "#1C1B17" }}
            >
              {featured.title}
            </h2>
            <p className="text-zinc-500 text-[15px] leading-relaxed">{featured.description}</p>
            <span className="inline-block text-sm font-medium text-violet-700 pt-1">
              읽어보기 →
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-2xl bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(28,27,23,0.10)]"
              style={{ border: "1px solid rgba(28,27,23,0.08)", boxShadow: "0 2px 10px rgba(28,27,23,0.03)" }}
            >
              <div className="flex items-center gap-3 text-xs">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${categoryColor[post.category]}`}
                  style={{ background: categoryBg[post.category] }}
                >
                  {post.category}
                </span>
                <span className="text-zinc-400">{formatDate(post.date)}</span>
              </div>
              <h2
                className="font-display text-xl font-bold leading-snug group-hover:text-violet-800 transition-colors"
                style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}
              >
                {post.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed flex-1">{post.description}</p>
              <span className="text-xs text-zinc-400">{post.readingMinutes}분 읽기</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-16 rounded-3xl p-10 lg:p-14 text-center space-y-5"
          style={{ background: "#191714" }}
        >
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.015em", lineHeight: 1.25 }}
          >
            읽는 것보다 빠른 방법이 있습니다
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
            귀사의 업무에 맞는 자동화 대상과 기대 효과를 무료 진단 워크숍에서 하루 만에 정리해드립니다.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-7 py-3.5 rounded-full text-sm font-medium text-black bg-white hover:opacity-85 transition-all hover:-translate-y-0.5"
          >
            무료 진단 워크숍 신청 →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
