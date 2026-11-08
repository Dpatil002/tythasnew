import Link from "next/link";
import { services } from "@/lib/services";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";
import HeroCanvas from "@/components/HeroCanvas";
import { ContactCta } from "@/components/Sections";

const process = [
  { n: "01", title: "Plan", text: "We study your business and map a 90-day growth plan.", approve: true },
  { n: "02", title: "Build", text: "Design, code, content and campaigns. All in one place.", approve: true },
  { n: "03", title: "Launch", text: "We go live on web, search, ads and AI.", approve: true },
  { n: "04", title: "Grow", text: "We test, improve and report results every month.", approve: false },
];

const team = [
  { role: "Growth strategist", tint: "#DDF1E5" },
  { role: "UI/UX designer", tint: "#E6E2FA" },
  { role: "Developer", tint: "#DCEFF4" },
  { role: "SEO specialist", tint: "#DFE8FB" },
  { role: "Ads manager", tint: "#F8DFF1" },
  { role: "AI engineer", tint: "#FBF0CC" },
];

const work = [
  { name: "HireSprint", meta: "Staffing · UK", text: "A website built around enquiries.", result: "[+XX% leads]", tint: "#ECEAF7" },
  { name: "Sydney Decors", meta: "Events & decor · Australia", text: "A booking-first site that makes enquiring easy.", result: "[XX enquiries / month]", tint: "#F6E9DD" },
  { name: "Soché", meta: "D2C spices · UK", text: "Brand and online store for a premium spice label.", result: "[+XX% conversion]", tint: "#E1F0E6" },
];

const clients = ["Soché", "HireSprint", "Sydney Decors", "Amary Beauté", "Finansh", "Sunday Hospitality", "Elixir Helps"];

export default function Home() {
  return (
    <>
      <HeroCanvas />

      <section className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-4 pb-12 pt-16 text-center md:pb-20 md:pt-32">
        <h1 className="text-[clamp(36px,5vw,68px)] font-bold leading-[1.05] tracking-tighter">
          We build and grow digital businesses. <span className="text-brand">You just approve.</span>
        </h1>
        <p className="max-w-[680px] text-[clamp(18px,1.6vw,21px)] text-body">
          Strategy, design, development, marketing and AI. One team runs it all, from first idea to steady sales.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">Let&apos;s talk</ButtonLink>
          <ButtonLink href="/#work" variant="secondary">See our work</ButtonLink>
        </div>
      </section>

      <section id="services" className="scroll-mt-24">
        <Container className="pb-16 md:pb-32">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] border-l border-t border-line">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex min-h-[220px] flex-col gap-3 border-b border-r border-line p-8 transition-colors hover:bg-paper"
              >
                <span className="flex items-center justify-between text-sm text-subtle">
                  <span>{s.number}</span>
                  <span>from {s.fromPrice}</span>
                </span>
                <span className="text-[26px] font-bold leading-[1.15] tracking-[-0.03em]">{s.name}</span>
                <span className="text-body">{s.cardLine}</span>
                <span className="mt-auto text-[15px] font-semibold group-hover:text-brand">Learn more →</span>
              </Link>
            ))}
            <Link href="/contact" className="flex min-h-[220px] flex-col gap-3 border-b border-r border-line bg-ink p-8 text-white">
              <span className="text-sm text-brand-light">Free</span>
              <span className="text-[26px] font-bold leading-[1.15] tracking-[-0.03em]">Not sure where to start?</span>
              <span className="text-on-dark">Get a free growth audit. We&apos;ll show you what to fix first.</span>
              <span className="mt-auto text-[15px] font-semibold text-brand-light">Get my audit →</span>
            </Link>
          </div>
        </Container>
      </section>

      <section id="how" className="scroll-mt-20 bg-ink text-white">
        <Container className="flex flex-wrap items-center gap-16 py-16 md:py-32">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
            <h2 className="text-[clamp(40px,5vw,72px)] font-bold leading-none tracking-[-0.05em]">From idea to revenue.</h2>
            <p className="text-[19px] text-on-dark">We work as your growth partner, not another vendor. We plan, build, launch and keep improving.</p>
            <p className="text-[19px] text-on-dark">You approve the key moments. We handle everything else.</p>
            <ButtonLink href="/contact" variant="inverse" className="self-start">Book a free call</ButtonLink>
          </div>
          <ol className="flex min-w-0 flex-[1_1_420px] flex-col border-t border-dark-line">
            {process.map((p) => (
              <li key={p.n} className="flex items-baseline gap-5 border-b border-dark-line py-5">
                <span className="w-7 text-[15px] text-[#8E9198]">{p.n}</span>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-2xl font-semibold tracking-[-0.02em]">{p.title}</span>
                  <span className="text-[#A9ACB3]">{p.text}</span>
                </div>
                {p.approve ? (
                  <span className="whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[13px] font-bold text-white">You approve</span>
                ) : (
                  <span className="whitespace-nowrap rounded-full border border-[#45484F] px-3 py-1 text-[13px] font-semibold text-on-dark">We handle it</span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="flex flex-col gap-12 py-16 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle className="max-w-[720px]">One team. Every skill your growth needs.</SectionTitle>
          <p className="max-w-[380px] text-lg text-body">5+ years helping founders and brands across India, the UK and Australia.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {team.map((t) => (
            <div key={t.role} className="flex min-h-[170px] flex-col justify-between gap-8 rounded-[20px] border border-line p-5">
              <span aria-hidden className="h-12 w-12 rounded-full" style={{ background: t.tint }} />
              <span className="text-lg font-semibold leading-tight">{t.role}</span>
            </div>
          ))}
        </div>
      </Container>

      <section id="work" className="scroll-mt-20 border-t border-[#EDEDED] bg-[#FAFAF9]">
        <Container className="flex flex-col gap-12 py-16 md:py-32">
          <div className="flex max-w-[760px] flex-col gap-4">
            <SectionTitle>Results that matter.</SectionTitle>
            <p className="text-[19px] text-body">Design and growth work together on every project. That&apos;s why the numbers move.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {work.map((w) => (
              <article key={w.name} className="flex flex-col overflow-hidden rounded-[22px] border border-line bg-white">
                <div className="flex h-60 items-center justify-center text-sm text-subtle" style={{ background: w.tint }}>[Project image]</div>
                <div className="flex flex-col gap-2 p-6">
                  <span className="text-[13px] text-subtle">{w.meta}</span>
                  <h3 className="text-2xl font-bold tracking-[-0.03em]">{w.name}</h3>
                  <p className="text-body">{w.text}</p>
                  <span className="mt-2 self-start rounded-md bg-brand-soft px-2.5 py-1 text-[15px] font-bold text-brand">{w.result}</span>
                </div>
              </article>
            ))}
          </div>
          <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-8 text-[22px] font-bold tracking-[-0.03em] text-body">
            {clients.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
