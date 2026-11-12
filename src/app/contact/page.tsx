import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { SelectionBox } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell Tythas what you need in 30 seconds. Email ${site.email} or message us on WhatsApp. Based in ${site.location}.`,
};

const iconBox = "flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl bg-brand-soft";
const card = "flex items-center gap-3.5 rounded-[18px] border border-[#E3E5E8] bg-white px-[18px] py-4";

export default function ContactPage() {
  return (
    <section className="grid-canvas border-b border-[#EDEDED]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-6 md:py-24 lg:flex-row lg:items-start lg:gap-16 lg:px-10">
        {/* On phones: headline, then form, then contact details. On desktop: details column beside the form. */}
        <div className="contents lg:flex lg:min-w-0 lg:flex-[1_1_360px] lg:flex-col lg:gap-6">
          <div className="order-1 flex flex-col gap-6">
            <SelectionBox className="self-start px-[18px] py-1.5">
              <h1 className="text-[clamp(48px,6.4vw,96px)] font-extrabold leading-none tracking-tightest">Let&apos;s talk.</h1>
            </SelectionBox>
            <p className="text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.15] tracking-[-0.035em]">Tell us what you need. We&apos;ll take it from there.</p>
            <p className="max-w-[440px] text-lg text-body">6 quick steps, mostly taps. About 45 seconds.</p>
          </div>

          <div className="order-3 flex flex-col gap-3 lg:mt-2">
            <a href={site.introCallUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3.5 rounded-[18px] bg-ink px-[18px] py-4 text-white transition-colors hover:bg-[#1f2c37]">
              <span aria-hidden className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-xl bg-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8FB3F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4" /></svg>
              </span>
              <span className="flex flex-col"><span className="text-[13px] text-[#A9B0B8]">Prefer to talk?</span><span className="font-semibold">Book a free 15-min intro call</span></span>
            </a>
            <a href={`mailto:${site.email}`} className={`${card} hover:border-brand`}>
              <span aria-hidden className={iconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1457CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
              </span>
              <span className="flex flex-col"><span className="text-[13px] text-subtle">Email</span><span className="font-semibold">{site.email}</span></span>
            </a>
            <a href={whatsappLink("Hi Tythas!")} target="_blank" rel="noreferrer" className={`${card} hover:border-brand`}>
              <span aria-hidden className={iconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1457CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
              </span>
              <span className="flex flex-col"><span className="text-[13px] text-subtle">WhatsApp</span><span className="font-semibold">{site.whatsappDisplay}</span></span>
            </a>
            <div className={card}>
              <span aria-hidden className={iconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1457CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              </span>
              <span className="flex flex-col"><span className="text-[13px] text-subtle">Location</span><span className="font-semibold">{site.location}</span></span>
            </div>
            <p className="flex items-center gap-2 pt-1 text-sm text-subtle">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#1E8A4C]" />
              We reply within {site.replyTime}, Monday to Saturday.
            </p>
          </div>
        </div>

        <div className="relative order-2 min-w-0 rounded-[28px] lg:flex-[1_1_520px] border border-[#E3E5E8] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(20,30,38,0.25)] md:p-10">
          <Suspense fallback={<div className="h-[420px]" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
