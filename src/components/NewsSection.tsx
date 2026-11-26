import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { sellerkingBlogUrl } from "@/app/site-config";
import news from "@/content/news.json";

interface NewsPost {
  readonly title: string;
  readonly summary: string;
  readonly url: string;
  readonly category: string;
  readonly publishedAt: string;
  readonly image: string | null;
}

const VISIBLE_POSTS = 3;
const IMAGE_WIDTH = 960;
const posts: readonly NewsPost[] = news.posts.slice(0, VISIBLE_POSTS);

const dateFormat = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Seoul" });

function sizedImage(url: string): string {
  return `${url}&w=${IMAGE_WIDTH}&q=75`;
}

export default function NewsSection() {
  if (posts.length === 0) return null;

  return (
    <section id="news" aria-labelledby="news-title" className="container-x pb-24 md:pb-36">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="news-title" className="display-md">
              소식과 블로그
            </h2>
            <p className="mt-3 text-lg leading-relaxed">셀러 운영 팁과 쇼핑몰 정책 변화, 장사왕 소식을 블로그에서 전합니다.</p>
          </div>
          <a href={sellerkingBlogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
            블로그 전체 보기 <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="mt-10 grid gap-x-6 gap-y-10 md:mt-12 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.url} delay={i * 0.06}>
              <li className="list-none">
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="aspect-[120/63] overflow-hidden rounded-2xl bg-card">
                    {post.image ? (
                      // The blog serves its own resized images; the static export has no image optimizer.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sizedImage(post.image)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-5 text-sm text-mute">{post.category || "장사왕 블로그"}</p>
                  <h3 className="mt-1.5 text-lg font-medium leading-snug tracking-tight group-hover:underline">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 leading-relaxed text-mute">{post.summary}</p>
                  <time dateTime={post.publishedAt} className="mt-3 block text-sm text-mute">
                    {dateFormat.format(new Date(post.publishedAt))}
                  </time>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
