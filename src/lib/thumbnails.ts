import type { NewsPost } from "@/components/NewsCard";

/** 이미지가 있는 글만, 같은 이미지 주소는 처음 한 번만 남깁니다. 입력 순서를 유지합니다. */
export function withUniqueImages(posts: readonly NewsPost[]): readonly NewsPost[] {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (!post.image || seen.has(post.image)) return false;
    seen.add(post.image);
    return true;
  });
}
