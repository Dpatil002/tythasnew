import type { Metadata } from "next";
import DarkModeTrigger from "@/components/motion/DarkModeTrigger";
import Reveal from "@/components/motion/Reveal";
import Waves from "@/components/work/Waves";
import WorkGrid from "@/components/work/WorkGrid";
import ProjectCollage from "@/components/ProjectCollage";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Client success stories from Tythas: SEO, lead generation, websites and product design that moved the numbers.",
};

export default function WorkIndex() {
  return (
    <>
      <DarkModeTrigger className="bg-black text-white">
        <section className="relative overflow-hidden">
          <Waves className="absolute inset-0 h-full w-full opacity-60 md:opacity-90" />
          <div className="relative mx-auto flex max-w-[1240px] flex-col gap-6 px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-32 lg:px-10">
            <Reveal as="span" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">Client success stories</Reveal>
            <Reveal as="h1" delay={80} className="text-[clamp(48px,7vw,104px)] font-bold leading-none tracking-tightest">Case Studies</Reveal>
            <Reveal as="p" delay={160} className="max-w-[560px] text-[19px] leading-relaxed text-white/70">
              Good marketing isn&apos;t about looking busy. It&apos;s about creating measurable business impact. Here&apos;s a look at what we&apos;ve been building.
            </Reveal>
          </div>
        </section>
        <section className="pb-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
            <WorkGrid />
          </div>
        </section>
      </DarkModeTrigger>
      <ProjectCollage />
    </>
  );
}
