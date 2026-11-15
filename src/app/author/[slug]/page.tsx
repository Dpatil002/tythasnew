import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getAuthor, getAuthors, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import Avatar from "@/components/blog/Avatar";
import BookCallCard from "@/components/blog/BookCallCard";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/motion/Reveal";
import ProjectCollage from "@/components/ProjectCollage";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams() {
  return [...(await getAuthors()).keys()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAuthor(slug);
  if (!a) return {};
  return {
    title: `${a.name}, ${a.role}`,
    description: a.shortBio,
    alternates: { canonical: `/author/${a.slug}` },
    openGraph: { type: "profile", ...(a.photo ? { images: [a.photo] } : {}) },
  };
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();
  const posts = (await getPosts()).filter((p) => p.author.slug === slug);

  return (
    <>
      <section className="grid-canvas border-b border-[#EDEDED]">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-10">
          <div className="flex flex-col gap-6">
            <Link href="/blog" className="self-start text-sm font-semibold text-subtle hover:text-brand">← Blog</Link>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar name={author.name} photo={author.photo} size={112} className="ring-4 ring-white shadow-[0_20px_40px_-20px_rgba(20,30,38,0.4)]" />
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">Author</span>
                <h1 className="text-[clamp(40px,5vw,64px)] font-bold leading-[1.02] tracking-tighter">{author.name}</h1>
                <p className="text-lg text-subtle">{author.role}</p>
              </div>
            </div>
            <div className="flex max-w-[680px] flex-col gap-4 text-[18px] leading-relaxed text-body">
              {author.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {author.expertise.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-ink">Writes about</span>
                <ul className="flex flex-wrap gap-2">
                  {author.expertise.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong bg-white px-4 py-1.5 text-[14px] font-medium">{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {author.links.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {author.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer me" className="inline-flex items-center gap-1 font-semibold hover:text-brand">
                      {l.label} <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:pt-24">
            <BookCallCard className="lg:sticky lg:top-28" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <h2 className="mb-8 text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">
            Articles by {author.name} <span className="text-subtle">({posts.length})</span>
          </h2>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => <Reveal key={p.slug} delay={i * 120}><BlogCard post={p} /></Reveal>)}
            </div>
          ) : (
            <p className="text-body">No articles yet.</p>
          )}
        </div>
      </section>

      <ProjectCollage />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": /^tythas\b/i.test(author.name) ? "Organization" : "Person",
              name: author.name,
              description: author.shortBio,
              url: `${site.url}/author/${author.slug}`,
              worksFor: { "@type": "Organization", name: site.name, url: site.url },
              knowsAbout: author.expertise,
              ...(author.photo ? { image: `${site.url}${author.photo}` } : {}),
              ...(author.links.length ? { sameAs: author.links.map((l) => l.href) } : {}),
            },
          }),
        }}
      />
    </>
  );
}
