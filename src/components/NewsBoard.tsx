"use client";

import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { withUniqueImages } from "@/lib/thumbnails";
import NewsCard, { type NewsPost } from "@/components/NewsCard";

const ALL = "전체";
const dateFormat = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Seoul" });
const FEATURED_COUNT = 1;
const RECENT_COUNT = 2;

function yearOf(post?: NewsPost): string {
  return post ? String(new Date(post.publishedAt).getFullYear()) : "";
}

function sizedImage(url: string): string {
  return url.includes("image.inblog.dev") ? `${url}&w=1200&q=75` : url;
}

function Featured({ post }: { readonly post: NewsPost }) {
  return (
    <a href={post.url} target="_blank" rel="noopener noreferrer" className="group grid overflow-hidden rounded-3xl bg-card lg:grid-cols-[1.2fr_1fr]">
      <div className="aspect-[120/63] overflow-hidden bg-pill lg:aspect-auto lg:min-h-[22rem]">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sizedImage(post.image)} referrerPolicy="no-referrer" alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : null}
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="text-sm font-medium text-accent">
          LATEST · {post.outlet ?? (post.category || "장사왕 블로그")}
        </p>
        <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-snug tracking-tight group-hover:underline">{post.title}</h2>
        <p className="mt-4 line-clamp-4 leading-relaxed text-mute">{post.summary}</p>
        <p className="mt-6 flex items-center gap-1 text-sm font-medium">
          <time dateTime={post.publishedAt} className="text-mute">
            {dateFormat.format(new Date(post.publishedAt))}
          </time>
          <span className="ml-auto inline-flex items-center gap-1">
            자세히 보기 <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </p>
      </div>
    </a>
  );
}

export default function NewsBoard({ posts }: { readonly posts: readonly NewsPost[] }) {
  const [category, setCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) counts.set(post.category || "기타", (counts.get(post.category || "기타") ?? 0) + 1);
    return [[ALL, posts.length] as const, ...counts.entries()];
  }, [posts]);

  const visible = category === ALL ? posts : posts.filter((post) => (post.category || "기타") === category);
  const withImage = withUniqueImages(visible);
  const featured = withImage.slice(0, FEATURED_COUNT);
  const recent = withImage.slice(FEATURED_COUNT, FEATURED_COUNT + RECENT_COUNT);
  const shown = new Set([...featured, ...recent].map((post) => post.url));
  const rest = visible.filter((post) => !shown.has(post.url));

  return (
    <div>
      <div role="group" aria-label="카테고리" hidden={categories.length <= 2} className="flex flex-wrap gap-2">
        {categories.map(([name, count]) => (
          <button
            key={name}
            type="button"
            onClick={() => setCategory(name)}
            aria-pressed={category === name}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              category === name ? "border-fg bg-fg text-ink" : "border-line-strong hover:border-fg"
            }`}
          >
            {name} <span className={category === name ? "text-ink/60" : "text-mute"}>{count}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-mute">해당 카테고리의 소식이 없습니다.</p>
      ) : (
        <>
          <div className="mt-10">
            {featured.map((post) => (
              <Featured key={post.url} post={post} />
            ))}
          </div>

          {recent.length > 0 ? (
            <div className="mt-16">
              <h2 className="text-sm font-medium tracking-[0.12em] text-mute">최근 소식</h2>
              <ul className="mt-6 grid gap-x-6 gap-y-10 md:grid-cols-2">
                {recent.map((post, i) => (
                  <NewsCard key={post.url} post={post} index={i} />
                ))}
              </ul>
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-16">
              <div className="flex items-baseline justify-between border-b border-fg pb-3">
                <h2 className="text-sm font-medium tracking-[0.12em] text-mute">모든 기사</h2>
                <span className="text-sm text-mute">{rest.length}건</span>
              </div>
              <ul className="divide-y divide-line">
                {rest.map((post, i) => (
                  <li key={post.url} className="list-none">
                    {yearOf(post) !== yearOf(rest[i - 1]) ? (
                      <p className="pt-8 text-sm font-semibold tabular-nums">{yearOf(post)}</p>
                    ) : null}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid items-baseline gap-x-8 gap-y-1 py-6 hover:bg-card md:grid-cols-[7rem_10rem_1fr_auto] md:px-3"
                    >
                      <time dateTime={post.publishedAt} className="text-sm text-mute">
                        {dateFormat.format(new Date(post.publishedAt))}
                      </time>
                      <span className="text-sm text-accent">{post.outlet ?? post.category ?? "장사왕 블로그"}</span>
                      <span className="font-medium leading-snug">{post.title}</span>
                      <ArrowUpRight className="hidden size-4 md:block" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
