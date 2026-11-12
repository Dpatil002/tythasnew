import Reveal from "./motion/Reveal";

/** FAQ accordion with FAQPage structured data (helps Google and AI assistants quote the answers). */
export default function Faq({
  items,
  title = "Questions, answered.",
  eyebrow = "FAQ",
  intro,
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
  intro?: string;
}) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12 px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <Reveal as="p" className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{eyebrow}</Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(36px,4.6vw,60px)] font-bold leading-[1.03] tracking-tighter">{title}</Reveal>
          {intro && <Reveal as="p" delay={160} className="max-w-[380px] text-lg text-body">{intro}</Reveal>}
        </div>
        <div className="min-w-0 flex-[2_1_560px] border-b border-line">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group border-t border-line py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[20px] font-semibold tracking-[-0.01em]">
                  {f.q}
                  <span aria-hidden className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-xl font-normal transition-[rotate,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">+</span>
                </summary>
                <p className="mt-4 max-w-[680px] text-[17px] leading-relaxed text-body">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </section>
  );
}
