import Reveal from "@/components/Reveal";

export interface NewsPost {
  readonly title: string;
  readonly summary: string;
  readonly url: string;
  readonly category: string;
  readonly publishedAt: string;
  readonly image: string | null;
  readonly outlet?: string;
}

const IMAGE_WIDTH = 960;
const dateFormat = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Seoul" });

const RESIZABLE_HOST = "image.inblog.dev";

function sizedImage(url: string): string {
  return url.includes(RESIZABLE_HOST) ? `${url}&w=${IMAGE_WIDTH}&q=75` : url;
}

interface NewsCardProps {
  readonly post: NewsPost;
  readonly index: number;
  /** Pass "0px" when cards sit in a swipeable row so the peeking card is already visible. */
  readonly revealMargin?: string;
}

export default function NewsCard({ post, index, revealMargin }: NewsCardProps) {
  return (
    <Reveal delay={(index % 3) * 0.06} margin={revealMargin}>
      <li className="list-none">
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block">
          <div className="aspect-[120/63] overflow-hidden rounded-2xl bg-card">
            {post.image ? (
              // The blog serves its own resized images; the static export has no image optimizer.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                referrerPolicy="no-referrer"
                src={sizedImage(post.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : null}
          </div>
          <p className="mt-5 text-sm text-mute">{post.outlet ?? (post.category || "장사왕 블로그")}</p>
          <h3 className="mt-1.5 text-lg font-medium leading-snug tracking-tight group-hover:underline">{post.title}</h3>
          <p className="mt-2 line-clamp-2 leading-relaxed text-mute">{post.summary}</p>
          <time dateTime={post.publishedAt} className="mt-3 block text-sm text-mute">
            {dateFormat.format(new Date(post.publishedAt))}
          </time>
        </a>
      </li>
    </Reveal>
  );
}
