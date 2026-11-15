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

export type AuthorRef = { slug: string; name: string; role: string; photo?: string };

export type Author = AuthorRef & {
  shortBio: string;
  bio: string[];
  expertise: string[];
  links: { label: string; href: string }[];
};

const FALLBACK_AUTHOR: AuthorRef = { slug: "", name: "Tythas team", role: "Tythas Digital" };

/** All authors, keyed by slug */
export const getAuthors = cache(async (): Promise<Map<string, Author>> => {
  const all = await reader.collections.authors.all();
  return new Map(
    all.map(({ slug, entry: a }) => [
      slug,
      {
        slug,
        name: a.name,
        role: a.role,
        photo: a.photo || undefined,
        shortBio: a.shortBio,
        bio: a.bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
        expertise: a.expertise.filter(Boolean),
        links: [
          a.linkedin && { label: "LinkedIn", href: a.linkedin },
          a.x && { label: "X", href: a.x },
          a.website && { label: "Website", href: a.website },
        ].filter(Boolean) as { label: string; href: string }[],
      },
    ]),
  );
});

export const getAuthor = async (slug: string) => (await getAuthors()).get(slug) ?? null;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMins: number;
  author: AuthorRef;
  seoTitle?: string;
  image?: { src: string; alt: string };
  cover: { from: string; to: string; icon: string };
};

type Entry = NonNullable<Awaited<ReturnType<typeof reader.collections.posts.read>>>;

function toPost(slug: string, e: Entry, authors: Map<string, Author>): Post {
  const a = e.author ? authors.get(e.author) : undefined;
  return {
    slug,
    title: e.title,
    excerpt: e.excerpt,
    category: e.category,
    date: e.date ?? "",
    readMins: e.readMins ?? 5,
    author: a ? { slug: a.slug, name: a.name, role: a.role, photo: a.photo } : FALLBACK_AUTHOR,
    seoTitle: e.seoTitle || undefined,
    image: e.cover ? { src: e.cover, alt: e.coverAlt || "" } : undefined,
    cover: COVERS[e.category] ?? COVERS.Growth,
  };
}

/** Published posts, newest first */
export const getPosts = cache(async (): Promise<Post[]> => {
  const [all, authors] = await Promise.all([reader.collections.posts.all(), getAuthors()]);
  return all
    .filter((p) => !p.entry.draft)
    .map((p) => toPost(p.slug, p.entry, authors))
    .sort((a, b) => b.date.localeCompare(a.date));
});

/** One published post with its article body (Markdoc AST) */
export const getPost = cache(async (slug: string) => {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || entry.draft) return null;
  const [{ node }, authors] = await Promise.all([entry.content(), getAuthors()]);
  return { post: toPost(slug, entry, authors), node };
});

export const formatDate = (iso: string) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
