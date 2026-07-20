import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { sortedPosts } from "@/content/posts";
import { siteUrl } from "@/app/site-config";

export const metadata: Metadata = {
  title: "블로그 — 소식과 AI Agent 자동화 인사이트",
  description:
    "뭉클랩의 새소식과 기업 AI 에이전트 도입 가이드, 자사 제품 운영 사례, 가드레일 설계까지 — 현장에서 검증한 인사이트를 공유합니다.",
  alternates: { canonical: `${siteUrl}/blog` },
};

export default function BlogPage() {
  return (
    <main id="main" className="min-h-screen" style={{ background: "#FAF9F6" }}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-5">
          <span
            className="inline-block text-xs tracking-widest text-violet-700 font-medium px-4 py-1.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.07)" }}
          >
            NEWS &amp; INSIGHTS
          </span>
          <h1
            className="font-display font-bold"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1.15, color: "#1C1B17" }}
          >
            뭉클랩의 소식과
            <br />
            검증된 인사이트
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">
            제품 소식부터 자사 운영에서 배운 도입 가이드, 운영 사례, 엔지니어링 노트까지 — 현장의
            기록을 공유합니다.
          </p>
        </div>

        <BlogList posts={sortedPosts()} />

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-10 lg:p-14 text-center space-y-5" style={{ background: "#191714" }}>
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
