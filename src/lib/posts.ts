import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

/* Blog posts are edited in Keystatic (/keystatic) and stored as files in content/posts. */

const reader = createReader(process.cwd(), keystaticConfig);

/** Branded gradient covers used when a post has no cover image */
const COVERS: Record<string, { from: string; to: string; icon: string }> = {
  "AI Search": { from: "#0B1F4D", to: "#1457CB", icon: "sparkles" },
  Websites: { from: "#141E26", to: "#2E62D9", icon: "code" },
  Founders: { from: "#1A1033", to: "#7C5CFF", icon: "rocket" },
  SEO: { from: "#0B2E26", to: "#1E8A4C", icon: "search" },
  Ads: { from: "#3A0F2B", to: "#C2329E", icon: "megaphone" },
  Design: { from: "#1A1033", to: "#5B4BD6", icon: "pen" },
  Automation: { from: "#2B2105", to: "#C99A06", icon: "bot" },
  Growth: { from: "#0B1F4D", to: "#3B8DF5", icon: "trending" },
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMins: number;
  author: string;
  seoTitle?: string;
  image?: { src: string; alt: string };
  cover: { from: string; to: string; icon: string };
};

type Entry = NonNullable<Awaited<ReturnType<typeof reader.collections.posts.read>>>;

function toPost(slug: string, e: Entry): Post {
  return {
    slug,
    title: e.title,
    excerpt: e.excerpt,
    category: e.category,
    date: e.date ?? "",
    readMins: e.readMins ?? 5,
    author: e.author || "Tythas team",
    seoTitle: e.seoTitle || undefined,
    image: e.cover ? { src: e.cover, alt: e.coverAlt || "" } : undefined,
    cover: COVERS[e.category] ?? COVERS.Growth,
  };
}

/** Published posts, newest first */
export const getPosts = cache(async (): Promise<Post[]> => {
  const all = await reader.collections.posts.all();
  return all
    .filter((p) => !p.entry.draft)
    .map((p) => toPost(p.slug, p.entry))
    .sort((a, b) => b.date.localeCompare(a.date));
});

/** One published post with its article body (Markdoc AST) */
export const getPost = cache(async (slug: string) => {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.draft) return null;
  const { node } = await entry.content();
  return { post: toPost(slug, entry), node };
});

export const formatDate = (iso: string) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
