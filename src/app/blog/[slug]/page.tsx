import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import Article from "@/components/Article";
import BlogCard, { PostCover } from "@/components/BlogCard";
import ProjectCollage from "@/components/ProjectCollage";
import Reveal from "@/components/motion/Reveal";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) return {};
  const { post } = data;
  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date, ...(post.image ? { images: [post.image.src] } : {}) },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) notFound();
  const { post, node } = data;
  const more = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 2);

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
          <p className="text-sm text-subtle">By {post.author} · {formatDate(post.date)} · {post.readMins} min read</p>
        </header>
        <Reveal className="mx-auto max-w-[1040px] px-4">
          <PostCover post={post} className="aspect-[16/7] rounded-[28px]" />
        </Reveal>
        <div className="mx-auto flex max-w-[720px] flex-col gap-5 px-4 py-14">
          <Article node={node} />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-paper p-7">
            <span className="text-lg font-semibold">Want this done for your business?</span>
            <Link href="/contact" className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-base font-semibold text-white">Get a free growth consultation</Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-[#EDEDED] py-16">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
            <h2 className="mb-8 text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em]">Keep reading</h2>
            <div className="grid gap-6 md:grid-cols-2">{more.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

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
            author: { "@type": "Organization", name: post.author || site.name },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/blog/${post.slug}`,
            ...(post.image ? { image: `${site.url}${post.image.src}` } : {}),
          }),
        }}
      />
    </>
  );
}
