import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { caseStudies } from "@/lib/home";
import DarkModeTrigger from "@/components/motion/DarkModeTrigger";
import Reveal from "@/components/motion/Reveal";
import Waves from "@/components/work/Waves";
import Mockup from "@/components/work/Mockup";
import WorkCard from "@/components/work/WorkCard";
import ProjectCollage from "@/components/ProjectCollage";

type Params = { slug: string };

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: `${cs.client} case study`, description: `${cs.headline}. ${cs.summary}`.slice(0, 160) };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const cs = caseStudies[i];
  const more = [1, 2, 3].map((k) => caseStudies[(i + k) % caseStudies.length]);
  const results = cs.stats.length > 0 ? cs.stats : (cs.badges ?? []).map((b) => ({ value: b, label: "" }));

  return (
    <>
      <DarkModeTrigger className="bg-black text-white">
        <section className="relative overflow-hidden">
          <Waves accent={cs.accent} className="absolute inset-x-0 top-0 h-full w-full opacity-40 lg:opacity-90" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 pb-16 pt-14 sm:px-6 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:px-10">
            <div className="flex flex-col gap-6">
              <Link href="/work" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-white/60 hover:text-white">
                <ArrowLeft aria-hidden className="h-4 w-4" /> All case studies
              </Link>
              <Reveal as="span" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">Case study</Reveal>
              <Reveal delay={60} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-extrabold text-white" style={{ background: cs.accent }}>
                  {cs.client.replace(/^The /, "").charAt(0)}
                </span>
                <span className="text-[18px] font-bold">{cs.client}</span>
              </Reveal>
              <Reveal as="h1" delay={120} className="max-w-[600px] text-[clamp(34px,4.2vw,56px)] font-bold leading-[1.06] tracking-tighter">{cs.headline}</Reveal>
              <Reveal as="p" delay={180} className="max-w-[520px] text-[18px] leading-relaxed text-white/70">{cs.summary}</Reveal>
              <Reveal as="ul" delay={240} className="flex flex-wrap gap-2">
                {cs.tags.map((t) => (
                  <li key={t} className="rounded-md border border-white/20 px-3 py-1 text-[13px] font-semibold text-white/80">{t}</li>
                ))}
              </Reveal>
            </div>
            <Reveal variant="right" delay={200} className="relative">
              <Mockup cs={cs} />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/10">
          <dl className={`mx-auto grid max-w-[1240px] gap-10 px-4 py-14 text-center sm:px-6 lg:px-10 ${results.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {results.map((r, k) => (
              <Reveal key={r.value} delay={k * 120} className="flex flex-col items-center gap-2">
                {r.label ? (
                  <>
                    <dd className="text-[clamp(40px,5vw,64px)] font-bold leading-none tracking-[-0.04em]">{r.value}</dd>
                    <dt className="text-[15px] text-white/60">{r.label}</dt>
                  </>
                ) : (
                  <>
                    <dd className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${cs.accent}33`, color: cs.accent }}><Check aria-hidden className="h-6 w-6" /></dd>
                    <dt className="text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-0.02em]">{r.value}</dt>
                  </>
                )}
              </Reveal>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:px-10">
          <dl className="grid gap-8 text-[15px] sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-white/50">Client</dt><dd className="mt-1 font-semibold">{cs.client}</dd></div>
            <div><dt className="text-white/50">Industry</dt><dd className="mt-1 font-semibold">{cs.sector}</dd></div>
            <div><dt className="text-white/50">Project</dt><dd className="mt-1 font-semibold">{cs.title}</dd></div>
            <div>
              <dt className="text-white/50">{cs.url ? "Website" : "Want results like this?"}</dt>
              <dd className="mt-1">
                <Link
                  href={cs.url ?? "/contact"}
                  {...(cs.url ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="inline-flex items-center gap-1 font-semibold hover:underline"
                  style={{ color: cs.accent }}
                >
                  {cs.url ? cs.url.replace(/^https?:\/\//, "") : "Discuss a similar project"} <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Link>
              </dd>
            </div>
          </dl>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(30px,3.4vw,46px)] font-bold tracking-[-0.03em]">More case studies</h2>
              <Link href="/work" className="inline-flex items-center gap-1 font-semibold text-white/80 hover:text-white">View all <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {more.map((c) => <WorkCard key={c.slug} cs={c} />)}
            </div>
          </div>
        </section>
      </DarkModeTrigger>
      <ProjectCollage />
    </>
  );
}
