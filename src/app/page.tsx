import Link from "next/link";
import { ArrowUpRight, Bot, ChartColumn, ClipboardList, CodeXml, Megaphone, PencilRuler, Rocket, Search, Target, TrendingUp } from "lucide-react";
import { services } from "@/lib/services";
import { homeFaqs } from "@/lib/home";
import { site } from "@/lib/site";
import { ApproveTag, ButtonLink } from "@/components/ui";
import { IconBadge } from "@/components/icons";
import HeroCanvas from "@/components/HeroCanvas";
import Reveal from "@/components/motion/Reveal";
import LogoMarquee from "@/components/home/LogoMarquee";
import ScrollWords from "@/components/home/ScrollWords";
import FanDeck from "@/components/home/FanDeck";
import DarkBlock from "@/components/home/DarkBlock";
import CaseStudies from "@/components/home/CaseStudies";
import Reviews from "@/components/home/Reviews";
import BlogTeaser from "@/components/home/BlogTeaser";
import Faq from "@/components/Faq";
import ProjectCollage from "@/components/ProjectCollage";

const process = [
  { Icon: ClipboardList, title: "Plan", text: "We study your business and map a 90-day growth plan.", approve: true },
  { Icon: PencilRuler, title: "Build", text: "Design, code, content and campaigns. All in one place.", approve: true },
  { Icon: Rocket, title: "Launch", text: "We go live on web, search, ads and AI.", approve: true },
  { Icon: TrendingUp, title: "Grow", text: "We test, improve and report results every month.", approve: false },
];

const team = [
  { Icon: Target, role: "Growth strategist", tint: "#DDF1E5", fg: "#1E8A4C" },
  { Icon: PencilRuler, role: "UI/UX designer", tint: "#E6E2FA", fg: "#5B4BD6" },
  { Icon: CodeXml, role: "Developer", tint: "#DCEFF4", fg: "#1C7F99" },
  { Icon: Search, role: "SEO specialist", tint: "#DFE8FB", fg: "#2E62D9" },
  { Icon: Megaphone, role: "Ads manager", tint: "#F8DFF1", fg: "#C2329E" },
  { Icon: Bot, role: "AI engineer", tint: "#FBF0CC", fg: "#9A6B00" },
];

export default function Home() {
  return (
    <>
      <HeroCanvas />
      <LogoMarquee />
      <ScrollWords />

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24 pb-20 md:pb-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-4">
              <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">Services</Reveal>
              <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">Everything your growth needs. Under one roof.</Reveal>
            </div>
            <Reveal as="p" delay={160} className="max-w-[380px] text-lg text-body">Pick one service, or hand us the whole engine. Every piece is built to bring you customers.</Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 150}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full min-h-[260px] flex-col gap-4 rounded-3xl border border-line bg-white p-7 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_48px_-24px_rgba(20,87,203,0.35)]"
                >
                  <span className="flex items-start justify-between">
                    <IconBadge slug={s.slug} />
                    <ArrowUpRight aria-hidden className="h-5 w-5 text-subtle transition-[translate,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </span>
                  <span className="text-[24px] font-bold leading-[1.15] tracking-[-0.03em]">{s.name}</span>
                  <span className="text-body">{s.cardLine}</span>
                  <span className="mt-auto text-sm font-semibold text-subtle">from <span className="text-ink">{s.fromPrice}</span></span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={150}>
              <Link href="/contact" className="flex h-full min-h-[260px] flex-col gap-4 rounded-3xl bg-ink p-7 text-white transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-light"><ChartColumn className="h-6 w-6" strokeWidth={1.8} /></span>
                <span className="text-[24px] font-bold leading-[1.15] tracking-[-0.03em]">Not sure where to start?</span>
                <span className="text-on-dark">Get a free growth audit. We&apos;ll show you what to fix first.</span>
                <span className="mt-auto text-sm font-semibold text-brand-light">Get my audit →</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-white"><FanDeck /></div>
      <DarkBlock />

      {/* HOW WE WORK */}
      <section id="how" className="grid-canvas scroll-mt-20 border-y border-[#EDEDED] py-20 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-4">
              <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">How we work</Reveal>
              <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">From idea to revenue. You approve, we execute.</Reveal>
            </div>
            <Reveal delay={160}><ButtonLink href={site.introCallUrl} target="_blank" rel="noreferrer">Book a free call</ButtonLink></Reveal>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ Icon, title, text, approve }, i) => (
              <Reveal as="li" key={title} delay={i * 120} className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-7">
                <span className="flex items-center justify-between">
                  <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"><Icon className="h-6 w-6" strokeWidth={1.8} /></span>
                  <span className="text-sm text-subtle">0{i + 1}</span>
                </span>
                <h3 className="text-[24px] font-bold tracking-[-0.02em]">{title}</h3>
                <p className="text-body">{text}</p>
                <div className="mt-auto pt-2">
                  {approve ? <ApproveTag /> : <span className="rounded-full border border-line px-3 py-1 text-[13px] font-semibold text-body">We handle it</span>}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CaseStudies />

      {/* TEAM */}
      <section className="py-20 md:py-32">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12 px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal as="h2" className="max-w-[720px] text-[clamp(36px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter">One team. Every skill your growth needs.</Reveal>
            <Reveal as="p" delay={120} className="max-w-[380px] text-lg text-body">5+ years helping founders and brands across India, the UK and Australia.</Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {team.map(({ Icon, role, tint, fg }, i) => (
              <Reveal key={role} variant="pop" delay={i * 90}>
                <div className="flex min-h-[170px] flex-col justify-between gap-8 rounded-[20px] border border-line bg-white p-5">
                  <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: tint, color: fg }}><Icon className="h-5 w-5" strokeWidth={1.9} /></span>
                  <span className="text-lg font-semibold leading-tight">{role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <BlogTeaser />
      <Faq items={homeFaqs} intro="Still unsure? Ask us anything on a free 30-minute call." />
      <ProjectCollage />
    </>
  );
}
