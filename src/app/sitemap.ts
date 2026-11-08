import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/contact`, lastModified: now, priority: 0.8 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
  ];
}
