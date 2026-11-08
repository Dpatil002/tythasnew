import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { ButtonLink, ChatBubble, ChatIcon, Container, CursorTag, SectionTitle, SelectionBox, ToolTile } from "@/components/ui";
import { ContactCta } from "@/components/Sections";

const handleWire = "flex h-[30px] items-center gap-1.5 border-b border-[#EEEEEE] px-3";
const dot = "h-2 w-2 rounded-full border border-[#BDBDBD]";

function Hero() {
  return (
    <section
      aria-label="Intro"
      className="grid-canvas relative flex min-h-[520px] items-center justify-center overflow-hidden border-b border-[#EDEDED] md:min-h-[clamp(620px,60vw,860px)]"
    >
      <SelectionBox className="relative z-[2] px-[clamp(16px,3vw,44px)] py-[clamp(8px,1.5vw,20px)]">
        <p className="text-[clamp(72px,15vw,240px)] font-extrabold leading-[0.95] tracking-[-0.065em]">Growth.</p>
      </SelectionBox>

      {/* Autopilot toggle */}
      <div className="absolute left-1/2 top-[12%] z-[3] flex -translate-x-1/2 items-center gap-4 rounded-[18px] bg-white px-[18px] py-3.5 shadow-[0_10px_30px_rgba(20,30,38,0.08)] md:top-[15%]">
        <span className="text-[17px] font-medium">Autopilot</span>
        <span aria-hidden className="relative block h-8 w-[54px] rounded-full bg-brand">
          <span className="absolute right-1 top-1 h-6 w-6 rounded-full bg-white" />
        </span>
      </div>

      {/* Mobile-only bubble under the word */}
      <ChatBubble text="Let's grow your business online." className="absolute bottom-[10%] left-1/2 z-[3] w-[max-content] max-w-[92%] -translate-x-1/2 md:hidden" />

      {/* Desktop decorations */}
      <div className="hidden md:contents">
        <div aria-hidden className="absolute left-[2%] top-[12%] flex h-[230px] w-[300px] -rotate-[4deg] flex-col overflow-hidden rounded-[14px] border border-[#E3E3E3] bg-white shadow-[0_8px_24px_rgba(22,23,26,0.05)]">
          <div className={handleWire}><span className={dot} /><span className={dot} /><span className={dot} /></div>
          <div className="flex flex-1 gap-3 p-[18px]">
            <div className="flex flex-1 flex-col gap-2"><span className="h-11 w-11 rounded-full bg-[#F0F0F0]" /><span className="h-2 rounded bg-[#EEE]" /><span className="h-2 w-[70%] rounded bg-[#EEE]" /></div>
            <div className="grid flex-[2] grid-cols-2 gap-2"><span className="rounded-md bg-[#F0F0F0]" /><span className="rounded-md bg-[#F0F0F0]" /><span className="rounded-md bg-[#F0F0F0]" /><span className="rounded-md bg-[#F0F0F0]" /></div>
          </div>
        </div>

        <div aria-hidden className="absolute -right-10 top-[9%] flex h-[230px] w-[340px] -rotate-[3deg] flex-col justify-between rounded-2xl bg-ink px-[26px] py-[22px]">
          <span className="text-[15px] font-semibold text-white">Monthly growth report</span>
          <div className="flex h-[120px] items-end gap-2.5">
            {[28, 38, 46, 60].map((h) => <span key={h} className="flex-1 rounded bg-[#3A3C42]" style={{ height: `${h}%` }} />)}
            {[74, 96].map((h) => <span key={h} className="flex-1 rounded bg-brand" style={{ height: `${h}%` }} />)}
          </div>
        </div>

        <ChatBubble text="Let's grow your business online." className="absolute right-[9%] top-[35%] z-[3] float-a" />

        <div aria-hidden className="absolute -bottom-10 -right-[30px] flex h-[340px] w-[190px] rotate-[4deg] flex-col gap-2.5 rounded-[34px] border-[6px] border-ink bg-white px-3.5 pb-3.5 pt-[34px] text-xs">
          <span className="self-start rounded-[12px_12px_12px_4px] bg-[#F1F1F1] px-2.5 py-2">Hi! Want to book a free demo?</span>
          <span className="self-end rounded-[12px_12px_4px_12px] bg-ink px-2.5 py-2 text-white">Yes, tomorrow 11am</span>
          <span className="self-start rounded-[12px_12px_12px_4px] bg-[#F1F1F1] px-2.5 py-2">Booked. See you then.</span>
        </div>

        <div aria-hidden className="absolute -left-[50px] bottom-[6%] h-[210px] w-[330px] -rotate-[5deg] rounded-[14px] bg-ink p-3.5">
          <div className="flex h-full w-full flex-col gap-2.5 rounded-md bg-[#F7F7F5] py-[18px] pl-16 pr-[18px]">
            <span className="h-3.5 w-[70%] rounded-sm bg-ink" />
            <span className="h-2 w-[90%] rounded-sm bg-[#DADADA]" />
            <span className="h-2 w-[60%] rounded-sm bg-[#DADADA]" />
            <span className="mt-1.5 h-[26px] w-[90px] rounded-full bg-brand" />
          </div>
        </div>

        <div aria-hidden className="absolute -bottom-[30px] left-[24%] h-[220px] w-[300px] rotate-[3deg] overflow-hidden rounded-[14px] border border-[#E3E3E3] bg-white">
          <div className={handleWire}><span className={dot} /><span className={dot} /><span className={dot} /></div>
          <div className="flex flex-col gap-3 p-[18px]"><span className="h-2 w-[60%] rounded bg-[#EEE]" /><span className="h-2 w-[80%] rounded bg-[#EEE]" /><span className="h-[34px] rounded-lg border border-[#E3E3E3]" /></div>
        </div>

        <ChatBubble text="Planned, built and run for you." className="absolute bottom-[13%] left-1/2 z-[3] float-b" />

        <ToolTile className="absolute left-[30%] top-[12%]"><Image src="/icons/nextdotjs.svg" alt="" width={36} height={36} /></ToolTile>
        <ToolTile className="absolute right-[22%] top-[9%]"><Image src="/icons/figma.svg" alt="" width={34} height={34} /></ToolTile>
        <ToolTile className="absolute left-[17%] top-[44%]"><Image src="/icons/notion.svg" alt="" width={36} height={36} /></ToolTile>
        <ToolTile className="absolute bottom-[3%] left-[47%]"><Image src="/icons/googleads.svg" alt="" width={36} height={36} /></ToolTile>
        <ToolTile className="absolute bottom-[5%] right-[30%]"><ChatIcon /><span className="text-[15px] font-semibold">ChatGPT</span></ToolTile>

        <CursorTag label="Growth Strategist" color="#1E8A4C" className="absolute left-[25%] top-[7%] z-[4]" />
        <CursorTag label="SEO Specialist" color="#2E62D9" className="absolute right-[27%] top-[16%] z-[4]" />
        <CursorTag label="UI Designer" color="#5B4BD6" className="absolute left-[3%] top-[53%] z-[4]" />
        <CursorTag label="Ads Manager" color="#C2329E" className="absolute bottom-[25%] left-[42%] z-[4]" />
        <CursorTag label="Developer" color="#1C7F99" className="absolute bottom-[7%] left-[21%] z-[4]" />
        <CursorTag label="AI Engineer" color="#F2C230" dark className="absolute bottom-[8%] left-[39%] z-[4]" />
        <CursorTag label="You, approving" color="#D9480F" className="absolute bottom-[28%] right-[13%] z-[4]" />
      </div>
    </section>
  );
}

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
      <Hero />

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
