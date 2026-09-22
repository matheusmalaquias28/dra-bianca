import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/sobre`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/tratamentos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contato`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/links`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const posts = await getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
