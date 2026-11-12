import { Quote, Star } from "lucide-react";
import { reviews, reviewSummary } from "@/lib/home";
import Reveal from "../motion/Reveal";

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className={`h-4 w-4 ${i < n ? "fill-[#F5B301] text-[#F5B301]" : "text-line-strong"}`} />
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="grid-canvas border-y border-[#EDEDED] py-20 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[680px] flex-col gap-4">
            <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">Reviews</Reveal>
            <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">
              Founders don&apos;t just say thanks. They stay.
            </Reveal>
          </div>
          <Reveal delay={160} className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4">
            <span className="text-[40px] font-extrabold leading-none tracking-[-0.04em]">{reviewSummary.rating}</span>
            <span className="flex flex-col gap-1">
              <Stars n={5} />
              <span className="text-sm text-subtle">from {reviewSummary.count} reviews on {reviewSummary.source}</span>
            </span>
          </Reveal>
        </div>

        <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.company}
              as="figure"
              delay={(i % 3) * 120}
              className="mb-5 flex break-inside-avoid flex-col gap-5 rounded-3xl border border-line bg-white p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,30,38,0.25)]"
            >
              <div className="flex items-center justify-between">
                <Stars n={r.rating} />
                <Quote aria-hidden className="h-7 w-7 text-brand-soft" fill="currentColor" />
              </div>
              <blockquote className="text-[17px] leading-relaxed">{r.quote}</blockquote>
              <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {r.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-sm text-subtle">{r.role}, {r.company}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
