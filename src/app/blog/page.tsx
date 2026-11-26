import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import NewsBoard from "@/components/NewsBoard";
import type { NewsPost } from "@/components/NewsCard";
import SiteShell from "@/components/SiteShell";
import { sellerkingBlogUrl } from "@/app/site-config";
import blog from "@/content/news.json";

export const metadata: Metadata = {
  title: "블로그",
  description: "셀러 운영 팁, 쇼핑몰 정책 변화, 비즈니스 인사이트, 장사왕 서비스 소식을 전합니다.",
  alternates: { canonical: "/blog/" },
};

const posts: readonly NewsPost[] = blog.posts;

export default function BlogPage() {
  return (
    <SiteShell>
      <header className="container-x pb-12 pt-14 md:pb-16 md:pt-24">
        <Eyebrow>Blog</Eyebrow>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-tight tracking-[-0.03em]">뭉클랩 블로그</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">
              셀러 운영 팁과 쇼핑몰 정책 변화를 정리합니다. 새 글은 빌드할 때마다 장사왕 블로그에서 가져옵니다.
            </p>
          </div>
          <a href={sellerkingBlogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 border-b border-fg pb-0.5 font-medium">
            장사왕 블로그 바로가기 <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </header>
      <section aria-label="블로그 글 목록" className="container-x pb-24 md:pb-36">
        <NewsBoard posts={posts} />
      </section>
    </SiteShell>
  );
}
