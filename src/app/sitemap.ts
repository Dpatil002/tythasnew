import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { caseStudies } from "@/lib/home";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getPosts();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/contact`, lastModified: now, priority: 0.8 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
    { url: `${site.url}/work`, lastModified: now, priority: 0.8 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, priority: 0.7 })),
    { url: `${site.url}/blog`, lastModified: now, priority: 0.7 },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
  ];
}
