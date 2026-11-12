import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services, type Plan, type Service } from "@/lib/services";
import {
  ApproveTag,
  ButtonLink,
  ChatBubble,

  Check,
  Container,
  CursorTag,
  SelectionBox,
  ToolTile,
  buttonClass,
} from "@/components/ui";
import { PartnerBand } from "@/components/Sections";
import { site } from "@/lib/site";
import ProjectCollage from "@/components/ProjectCollage";
import Faq from "@/components/Faq";
import Reveal from "@/components/motion/Reveal";
import { IconBadge } from "@/components/icons";
import {
  BarChart3, BellRing, Bot, CalendarCheck, CircleDollarSign, Clock, Code, Database, Eye, FileText, Gauge, Layers, 
  ListChecks, MapPin, Megaphone, MessageCircle, MousePointerClick, Palette, PenTool, Printer, 
  Repeat, Search, ShieldCheck, Smartphone, Sparkles, Target, Users, Workflow, Zap, type LucideIcon,
} from "lucide-react";

const benefitIcons: Record<string, LucideIcon[]> = {
  "websites-and-apps": [MousePointerClick, Smartphone, Search, MessageCircle, BarChart3, PenTool],
  "ui-ux-design": [Workflow, Palette, MousePointerClick, Layers, Code, Smartphone],
  seo: [Search, FileText, Gauge, MapPin, PenTool, Sparkles],
  "google-ads": [Target, Megaphone, BarChart3, Repeat, CircleDollarSign, FileText],
  "meta-ads": [Target, Palette, BarChart3, Repeat, Zap, FileText],
  "conversion-optimisation": [Search, Eye, MousePointerClick, Zap, ShieldCheck, Gauge],
  "ai-automation": [Bot, Clock, Repeat, Database, CalendarCheck, BellRing],
};
const stepIcons: LucideIcon[] = [ListChecks, Eye, Printer, Users];

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: `${s.name} from ${s.fromPrice}`, description: s.metaDescription };
}

function HeroVisual({ s }: { s: Service }) {
  if (s.slug === "ai-automation") {
    return (
      <div className="flex flex-col gap-2.5 rounded-[22px] bg-white p-[18px] shadow-[0_10px_30px_rgba(20,30,38,0.08)]">
        <span className="text-[13px] text-subtle">WhatsApp · 11:42 pm</span>
        <span className="max-w-[85%] self-end rounded-[14px_14px_4px_14px] bg-[#F1F2F4] px-3.5 py-2.5 text-[15px]">Hi, do you have a slot this Saturday?</span>
        <span className="max-w-[90%] self-start rounded-[14px_14px_14px_4px] bg-ink px-3.5 py-2.5 text-[15px] text-white">Yes! 11 am or 4 pm are free. Shall I book one for you?</span>
        <span className="self-end rounded-[14px_14px_4px_14px] bg-[#F1F2F4] px-3.5 py-2.5 text-[15px]">4 pm please</span>
        <span className="self-start text-[13px] font-bold text-brand">Booked and added to your calendar</span>
      </div>
    );
  }
  return <ChatBubble text={s.bubble} />;
}

function PlanCard({ plan, slug }: { plan: Plan; slug: string }) {
  const dark = plan.featured;
  return (
    <div
      className={`relative flex w-full flex-col gap-5 rounded-3xl p-8 ${
        dark ? "bg-ink text-white" : "border border-[#E3E5E8] bg-white"
      }`}
    >
      {dark && (
        <span className="absolute right-6 top-6 rounded-full bg-brand px-3 py-1 text-[13px] font-bold text-white">Most picked</span>
      )}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold">{plan.name}</h3>
        <p className={dark ? "text-on-dark" : "text-subtle"}>{plan.blurb}</p>
      </div>
      <p className="flex items-baseline gap-2">
        <span className="text-5xl font-extrabold leading-none tracking-[-0.045em]">{plan.price}</span>
        <span className={dark ? "text-on-dark" : "text-subtle"}>{plan.unit}</span>
      </p>
      <ul className="flex flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5"><Check light={dark} />{f}</li>
        ))}
        {plan.excluded?.map((f) => (
          <li key={f} className={`flex items-start gap-2.5 ${dark ? "text-[#A9B0B8]" : "text-subtle"}`}>
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-[3px] flex-none"><path d="M6 12h12" /></svg>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={`/contact?service=${slug}&plan=${encodeURIComponent(plan.name)}`}
        className={buttonClass(dark ? "primary" : "secondary", "mt-auto")}
      >
        Choose {plan.name}
      </Link>
    </div>
  );
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      {/* HERO */}
      <section className="grid-canvas relative overflow-hidden border-b border-[#EDEDED]">
        <Container className="relative z-[2] flex flex-wrap items-center gap-14 py-14 md:py-28">
          <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-6">
            <div className="flex items-center gap-3">
              <IconBadge slug={s.slug} />
              <nav aria-label="Breadcrumb" className="text-sm text-subtle">
                <Link href="/#services" className="hover:text-brand">Services</Link> / {s.name}
              </nav>
            </div>
            <SelectionBox className="self-start px-[18px] py-1.5">
              <h1 className="text-[clamp(44px,7vw,104px)] font-extrabold leading-none tracking-tightest">{s.heroWord}</h1>
            </SelectionBox>
            <p className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.035em]">{s.hook}</p>
            <p className="max-w-[560px] text-[19px] text-body">{s.intro}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#plans">See plans</ButtonLink>
              <ButtonLink href={site.introCallUrl} target="_blank" rel="noreferrer" variant="secondary">Book a free call</ButtonLink>
            </div>
          </div>
          <div className="flex min-w-0 flex-[0_1_380px] flex-col gap-3.5">
            <HeroVisual s={s} />
            <div className="flex flex-col gap-1.5 rounded-[22px] bg-ink p-[26px] text-white">
              <span className="text-sm text-[#A9B0B8]">Starting from</span>
              <span className="text-[44px] font-extrabold leading-none tracking-[-0.04em]">{s.fromPrice}</span>
              <span className="text-[15px] text-on-dark">{s.fromUnit}</span>
            </div>
          </div>
        </Container>
        <div className="hidden md:contents">
          {s.icon ? (
            <ToolTile className="absolute right-[6%] top-[10%]"><Image src={s.icon} alt="" width={36} height={36} /></ToolTile>
          ) : null}
          <CursorTag {...s.cursors[0]} className="absolute bottom-[7%] right-[34%]" />
          <CursorTag {...s.cursors[1]} className="absolute bottom-[10%] right-[3%]" />
        </div>
      </section>

      {/* BENEFITS */}
      <Container className="flex flex-col gap-10 py-16 md:py-28">
        <h2 className="max-w-[760px] text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.05] tracking-tighter">{s.benefitsTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] border-l border-t border-line">
          {s.benefits.map((b, i) => {
            const Icon = benefitIcons[s.slug]?.[i] ?? Sparkles;
            return (
              <Reveal key={b.title} delay={(i % 3) * 150} className="flex flex-col gap-3 border-b border-r border-line p-7">
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                <h3 className="text-xl font-bold tracking-[-0.02em]">{b.title}</h3>
                <p className="text-body">{b.text}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* PLANS */}
      <section id="plans" className="scroll-mt-20 border-y border-[#EDEDED] bg-paper">
        <Container className="flex flex-col gap-10 py-16 md:py-28">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.05] tracking-tighter">Pick a plan. We&apos;ll handle the rest.</h2>
            <p className="text-lg text-body">{s.plansNote}</p>
          </div>
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {s.plans.map((p, i) => <Reveal key={p.name} delay={i * 150} className="flex"><PlanCard plan={p} slug={s.slug} /></Reveal>)}
          </div>
          {s.extra && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#E3E5E8] bg-white px-7 py-6">
              <div className="flex flex-col gap-1">
                <span className="text-[19px] font-bold">{s.extra.title}</span>
                <span className="text-body">{s.extra.text}</span>
              </div>
              <ButtonLink href={`/contact?service=${s.slug}`} variant="secondary">{s.extra.cta}</ButtonLink>
            </div>
          )}
          {s.plansFootnote && <p className="text-center text-body">{s.plansFootnote}</p>}
        </Container>
      </section>

      {/* HOW */}
      <Container className="flex flex-col gap-10 py-16 md:py-28">
        <h2 className="text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.05] tracking-tighter">How it works</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 120} className="flex flex-col gap-2.5 rounded-[20px] border border-line p-6">
              <span className="flex items-center justify-between">
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">{(() => { const I = stepIcons[i] ?? ListChecks; return <I className="h-5 w-5" strokeWidth={1.8} />; })()}</span>
                <span className="text-[15px] text-subtle">0{i + 1}</span>
              </span>
              <h3 className="text-[22px] font-bold tracking-[-0.02em]">{st.title}</h3>
              <p className="text-body">{st.text}</p>
              {st.approve && <div className="mt-auto pt-2"><ApproveTag /></div>}
            </Reveal>
          ))}
        </ol>
      </Container>

      <Faq items={s.faqs} title={`${s.name}: questions`} />

      <PartnerBand />
      <ProjectCollage title={["Ready when", "you are."]} text="Message us the plan you want. We'll reply with the next step and a clear quote." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            provider: { "@type": "Organization", name: "Tythas Digital" },
            areaServed: "IN",
            offers: s.plans.map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: p.price.replace(/[^\d]/g, ""),
              priceCurrency: "INR",
            })),
          }),
        }}
      />
    </>
  );
}
