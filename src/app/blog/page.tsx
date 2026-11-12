import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, getPosts } from "@/lib/posts";
import BlogCard, { PostCover } from "@/components/BlogCard";
import Reveal from "@/components/motion/Reveal";
import { SelectionBox } from "@/components/ui";
import ProjectCollage from "@/components/ProjectCollage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical guides on websites, AI search, ads and building MVPs, from the Tythas team in Pune.",
};

export default async function BlogIndex() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="grid-canvas border-b border-[#EDEDED]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 py-14 sm:px-6 md:py-24 lg:px-10">
          <SelectionBox className="self-start px-[18px] py-1.5">
            <h1 className="text-[clamp(48px,7vw,104px)] font-extrabold leading-none tracking-tightest">Blog.</h1>
          </SelectionBox>
          <p className="max-w-[620px] text-[clamp(20px,2vw,26px)] font-medium leading-snug tracking-[-0.02em] text-body">
            Practical ideas on websites, AI search, ads and building products. No fluff, just what works.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          {featured && <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] border border-line bg-white transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(20,30,38,0.3)] md:grid-cols-2">
              <PostCover post={featured} className="min-h-[260px] md:min-h-[380px]" />
              <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">Latest</span>
                <h2 className="text-[clamp(28px,3vw,40px)] font-bold leading-tight tracking-[-0.03em] group-hover:text-brand">{featured.title}</h2>
                <p className="text-lg text-body">{featured.excerpt}</p>
                <span className="text-sm text-subtle">{formatDate(featured.date)} · {featured.readMins} min read</span>
                <span className="inline-flex items-center gap-1 font-semibold">Read article <ArrowUpRight aria-hidden className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 150}><BlogCard post={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectCollage />
    </>
  );
}
