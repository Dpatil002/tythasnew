import { CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";

/** Book-a-call banner shown beside (desktop) or inside (mobile) articles. */
export default function BookCallCard({ className = "" }: { className?: string }) {
  return (
    <aside className={`relative overflow-hidden rounded-3xl bg-ink p-6 text-white ${className}`}>
      <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/40 blur-2xl" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-light">
        <CalendarCheck aria-hidden className="h-5 w-5" />
      </span>
      <p className="relative mt-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60">Real advice, no sales pitch</p>
      <p className="relative mt-1.5 text-[21px] font-bold leading-tight tracking-[-0.02em]">Get a free 15-min growth plan</p>
      <p className="relative mt-2 text-[14px] leading-relaxed text-white/70">Tell us where you are. Leave with clear next steps for your website, SEO or ads.</p>
      <a
        href={site.introCallUrl}
        target="_blank"
        rel="noreferrer"
        className="relative mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
      >
        Book a free call
      </a>
    </aside>
  );
}
