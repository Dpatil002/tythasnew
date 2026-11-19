import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/home";
import Image from "next/image";
import Mockup from "./Mockup";

export default function WorkCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1013] transition-colors hover:border-white/25">
      {cs.image ? (
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={cs.image}
            alt={cs.imageAlt ?? `${cs.client} case study`}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
      <div
        className="flex aspect-[4/3] items-center justify-center overflow-hidden px-[10%] pt-8"
        style={{ background: `radial-gradient(120% 90% at 50% 100%, ${cs.accent}55, ${cs.accent}12 55%, transparent 80%)` }}
      >
        <div className="w-full translate-y-6 transition-transform duration-500 group-hover:translate-y-2">
          <Mockup cs={cs} compact />
        </div>
      </div>
      )}
      <div className="flex flex-1 flex-col gap-2 border-t border-white/10 p-6">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/50">{cs.sector}</span>
        <h3 className="text-[20px] font-bold leading-snug tracking-[-0.01em] text-white">{cs.headline}</h3>
        <p className="line-clamp-2 text-[15px] leading-relaxed text-white/60">{cs.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[15px] font-semibold text-white">
          Read case study <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
