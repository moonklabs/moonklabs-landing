import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import PressMilestones from "@/components/PressMilestones";
import NewsBoard from "@/components/NewsBoard";
import type { NewsPost } from "@/components/NewsCard";
import SiteShell from "@/components/SiteShell";
import { pressPosts } from "@/content/press";

export const metadata: Metadata = {
  title: "뉴스",
  description: "뭉클랩의 언론 보도와 수상·지원사업 선정 소식을 모았습니다.",
  alternates: { canonical: "/news/" },
};

const posts: readonly NewsPost[] = [...pressPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export default function NewsPage() {
  return (
    <SiteShell>
      <header className="container-x pb-12 pt-14 md:pb-16 md:pt-24">
        <Eyebrow>Newsroom</Eyebrow>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-tight tracking-[-0.03em]">뭉클랩 뉴스</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">
              뭉클랩을 다룬 언론 보도를 모았습니다.
            </p>
          </div>
        </div>
      </header>
      <PressMilestones />
      <section aria-label="뉴스 목록" className="container-x pb-24 md:pb-36">
        <NewsBoard posts={posts} />
      </section>
    </SiteShell>
  );
}
