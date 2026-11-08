import { ButtonLink, Container, CursorTag } from "./ui";
import { site, whatsappLink } from "@/lib/site";

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

export function ContactCta({
  title = "Let's grow your business.",
  text = "Tell us where you are today. We'll take it from there.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="grid-canvas relative overflow-hidden border-t border-[#EDEDED]">
      <Container className="relative z-10 flex flex-col items-center gap-5 py-24 text-center md:py-36">
        <h2 className="text-[clamp(40px,5.6vw,80px)] font-bold leading-none tracking-[-0.055em]">{title}</h2>
        <p className="max-w-[560px] text-xl text-body">{text}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">Let&apos;s talk</ButtonLink>
          <ButtonLink href={whatsappLink("Hi Tythas, I'd like to book a free call.")} variant="secondary" target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </ButtonLink>
        </div>
        <p className="text-sm text-subtle">We reply within {site.replyTime}.</p>
      </Container>
      <div aria-hidden className="absolute left-[6%] top-[18%] hidden items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 shadow-[0_10px_30px_rgba(20,30,38,0.08)] md:flex float-a">
        <span className="text-[15px]">Growth plan</span>
        <span className="rounded-md bg-brand px-2.5 py-1 text-[13px] font-bold text-white">Approved</span>
      </div>
      <CursorTag label="You" color="#D9480F" className="absolute right-[7%] top-[26%] hidden md:flex" />
      <div aria-hidden className="absolute bottom-[16%] right-[10%] hidden rounded-[18px] bg-white px-4 py-3.5 text-[15px] shadow-[0_10px_30px_rgba(20,30,38,0.08)] md:block float-b">
        New site is live
      </div>
      <CursorTag label="Tythas team" color="#5B4BD6" className="absolute bottom-[18%] left-[12%] hidden md:flex" />
    </section>
  );
}
