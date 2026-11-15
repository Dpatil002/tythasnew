import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getAuthor, getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import Article, { prepareArticle } from "@/components/Article";
import Toc from "@/components/blog/Toc";
import BookCallCard from "@/components/blog/BookCallCard";
import Avatar from "@/components/blog/Avatar";
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
  const { content, toc } = prepareArticle(node);
  const author = post.author;
  const authorBio = author.slug ? (await getAuthor(author.slug))?.shortBio : undefined;
  const authorHref = author.slug ? `/author/${author.slug}` : null;
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
          <div className="flex items-center gap-3 text-sm text-subtle">
            <Avatar name={author.name} photo={author.photo} size={40} />
            <p>
              By{" "}
              {authorHref ? (
                <Link href={authorHref} rel="author" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:text-brand hover:decoration-brand">{author.name}</Link>
              ) : (
                <span className="font-semibold text-ink">{author.name}</span>
              )}
              <br />
              {formatDate(post.date)} · {post.readMins} min read
            </p>
          </div>
        </header>
        <Reveal className="mx-auto max-w-[1040px] px-4">
          <PostCover post={post} className="aspect-[16/7] rounded-[28px]" />
        </Reveal>
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[210px_minmax(0,1fr)_270px] lg:px-10 xl:gap-14">
          <aside className="hidden lg:block">
            <Toc items={toc} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6" />
          </aside>

          <div className="mx-auto flex w-full min-w-0 max-w-[720px] flex-col gap-8">
            {toc.length > 0 && (
              <details className="rounded-2xl border border-line bg-paper px-5 py-4 lg:hidden">
                <summary className="cursor-pointer text-[13px] font-bold uppercase tracking-[0.08em]">On this page</summary>
                <ol className="mt-3 flex flex-col gap-2 text-[15px]">
                  {toc.map((i) => (
                    <li key={i.id} className={i.level === 3 ? "pl-4" : ""}><a href={`#${i.id}`} className="text-subtle hover:text-brand">{i.text}</a></li>
                  ))}
                </ol>
              </details>
            )}

            <Article content={content} />

            <BookCallCard className="lg:hidden" />

            <section aria-label="About the author" className="mt-4 flex flex-col gap-4 rounded-3xl border border-line p-6 sm:flex-row sm:items-start">
              <Avatar name={author.name} photo={author.photo} size={64} />
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-subtle">Written by</span>
                {authorHref ? (
                  <Link href={authorHref} rel="author" className="text-xl font-bold hover:text-brand">{author.name}</Link>
                ) : (
                  <span className="text-xl font-bold">{author.name}</span>
                )}
                <span className="text-sm text-subtle">{author.role}</span>
                {authorBio && <p className="mt-1 text-[16px] leading-relaxed text-body">{authorBio}</p>}
                {authorHref && <Link href={authorHref} className="mt-1 text-sm font-semibold text-brand hover:underline">More from {author.name.split(" ")[0]} →</Link>}
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <BookCallCard className="sticky top-28" />
          </aside>
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
            author: author.slug
              ? { "@type": "Person", name: author.name, jobTitle: author.role, url: `${site.url}/author/${author.slug}` }
              : { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/blog/${post.slug}`,
            ...(post.image ? { image: `${site.url}${post.image.src}` } : {}),
          }),
        }}
      />
    </>
  );
}
