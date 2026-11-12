import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, posts, type Block } from "@/lib/posts";
import { site } from "@/lib/site";
import BlogCard, { PostCover } from "@/components/BlogCard";
import ProjectCollage from "@/components/ProjectCollage";
import Reveal from "@/components/motion/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, openGraph: { type: "article", publishedTime: p.date } };
}

function Render({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return <h2 className="mt-6 text-[clamp(26px,2.6vw,34px)] font-bold leading-tight tracking-[-0.03em]">{b.text}</h2>;
    case "ul":
      return (
        <ul className="flex flex-col gap-3 pl-1">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3"><span aria-hidden className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-brand" />{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote className="my-4 border-l-4 border-brand pl-6 text-[clamp(22px,2.2vw,28px)] font-semibold leading-snug tracking-[-0.02em]">{b.text}</blockquote>;
    default:
      return <p>{b.text}</p>;
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="mx-auto flex max-w-[820px] flex-col gap-6 px-4 pb-10 pt-12 md:pt-20">
          <Link href="/blog" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-subtle hover:text-brand">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All articles
          </Link>
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{post.category}</span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] tracking-tighter">{post.title}</h1>
          <p className="text-xl text-body">{post.excerpt}</p>
          <p className="text-sm text-subtle">By the Tythas team · {formatDate(post.date)} · {post.readMins} min read</p>
        </header>
        <Reveal className="mx-auto max-w-[1040px] px-4">
          <PostCover post={post} className="aspect-[16/7] rounded-[28px]" />
        </Reveal>
        <div className="mx-auto flex max-w-[720px] flex-col gap-5 px-4 py-14 text-[19px] leading-[1.7] text-[#2B3036]">
          {post.body.map((b, i) => <Render key={i} b={b} />)}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-paper p-7">
            <span className="text-lg font-semibold">Want this done for your business?</span>
            <Link href="/contact" className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-base font-semibold text-white">Get a free growth audit</Link>
          </div>
        </div>
      </article>

      <section className="border-t border-[#EDEDED] py-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <h2 className="mb-8 text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-2">{more.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
        </div>
      </section>

      <ProjectCollage />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          }),
        }}
      />
    </>
  );
}
