import { ButtonLink } from "./ui";

export function PartnerBand() {
  return (
    <section className="px-4 pb-12 sm:px-6 md:pb-20 lg:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-7 rounded-[28px] bg-ink p-8 text-white md:p-14">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-2.5">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-light">Growth Partner plan</span>
          <span className="text-[clamp(26px,3vw,38px)] font-bold leading-[1.1] tracking-[-0.035em]">Want everything handled?</span>
          <span className="text-on-dark">Website, SEO, ads and AI automation from one team and one plan. You approve, we execute.</span>
        </div>
        <div className="flex flex-col items-start gap-3">
          <span>
            <span className="text-[40px] font-extrabold tracking-[-0.04em]">₹14,999</span>{" "}
            <span className="text-on-dark">from, per month</span>
          </span>
          <ButtonLink href="/contact">Get the Growth Partner plan</ButtonLink>
        </div>
      </div>
    </section>
  );
}
