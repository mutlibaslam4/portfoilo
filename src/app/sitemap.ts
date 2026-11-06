import type { MetadataRoute } from "next";
import { posts } from "@/data/extra";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/blog`, priority: 0.7 },
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, priority: 0.6, lastModified: p.date })),
  ];
}
