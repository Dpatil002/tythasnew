import Link from "next/link";
import { posts } from "@/lib/posts";
import BlogCard from "../BlogCard";
import Reveal from "../motion/Reveal";
import { buttonClass } from "../ui";

export default function BlogTeaser() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-4">
            <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">From the blog</Reveal>
            <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">Ideas to grow faster.</Reveal>
          </div>
          <Reveal delay={160}><Link href="/blog" className={buttonClass("secondary")}>All articles</Link></Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 150}><BlogCard post={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
