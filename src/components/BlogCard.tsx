import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, Code, Megaphone, PenTool, Rocket, Search, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { formatDate, type Post } from "@/lib/posts";

const coverIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles, code: Code, rocket: Rocket, search: Search, megaphone: Megaphone, pen: PenTool, bot: Bot, trending: TrendingUp,
};

export function PostCover({ post, className = "" }: { post: Post; className?: string }) {
  const Icon = coverIcons[post.cover.icon] ?? Sparkles;
  if (post.image) {
    return (
      <div className={`relative overflow-hidden bg-paper ${className}`}>
        <Image src={post.image.src} alt={post.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-6 top-6 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{post.category}</span>
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 120% at 100% 100%, ${post.cover.to} 0%, ${post.cover.from} 70%)` }}
    >
      <div className="absolute inset-0 [background:radial-gradient(circle,rgb(255_255_255/0.16)_1px,transparent_1.5px)_0_0/12px_12px]" />
      <Icon className="absolute bottom-6 right-6 h-20 w-20 text-white/80" strokeWidth={1.2} />
      <span className="absolute left-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{post.category}</span>
    </div>
  );
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,30,38,0.25)]">
      <PostCover post={post} className="aspect-[16/10] transition-transform duration-500" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-[13px] text-subtle">{formatDate(post.date)} · {post.readMins} min read</span>
        <h3 className="text-[22px] font-bold leading-snug tracking-[-0.02em] group-hover:text-brand">{post.title}</h3>
        <p className="text-body">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[15px] font-semibold">Read article <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  );
}
