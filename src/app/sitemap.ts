import type { MetadataRoute } from "next";
import { lastUpdated, siteUrl } from "@/app/site-config";
import { sortedPosts } from "@/content/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const postList = sortedPosts();

  return [
    {
      url: siteUrl,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: postList[0]?.date ?? lastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postList.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
