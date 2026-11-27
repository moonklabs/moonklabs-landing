import type { MetadataRoute } from "next";
import { lastUpdated, siteUrl } from "@/app/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/products/", priority: 0.9 },
    { path: "/company/", priority: 0.8 },
    { path: "/news/", priority: 0.7 },
    { path: "/blog/", priority: 0.6 },
    { path: "/careers/", priority: 0.5 },
    { path: "/contact/", priority: 0.8 },
    { path: "/privacy/", priority: 0.2 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: lastUpdated,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
