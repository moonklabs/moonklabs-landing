import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { withUniqueImages } from "@/lib/thumbnails";
import { pressPosts } from "@/content/press";

const VISIBLE_POSTS = 3;
const press = withUniqueImages([...pressPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))).slice(0, VISIBLE_POSTS);

export default function NewsSection() {
  if (press.length === 0) return null;

  return (
    <section id="news" aria-labelledby="news-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="news-title" className="display-md">
              언론 속 뭉클랩
            </h2>
            <p className="mt-3 text-lg leading-relaxed">수상과 지원사업 선정, 특허 등 뭉클랩의 소식을 전합니다.</p>
          </div>
          <Link href="/news/" className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline">
            뉴스 더보기 <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-10 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden [&>*]:w-[82%] [&>*]:shrink-0 [&>*]:snap-start md:[&>*]:w-auto">
          {press.map((post, i) => (
            <NewsCard key={post.url} post={post} index={i} revealMargin="0px" />
          ))}
        </ul>
      </div>
    </section>
  );
}
