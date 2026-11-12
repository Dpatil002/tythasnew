import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#EDEDED]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-10 px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex max-w-xs flex-col gap-4">
          <Image src="/brand/lockup.png" alt="Tythas, results that matter" width={378} height={228} className="h-[84px] w-auto self-start" />
          <p className="text-body">Done-for-you digital growth. You approve, we execute.</p>
        </div>
        <div className="flex flex-wrap gap-12 text-[15px]">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Services</p>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="text-body hover:text-brand">
                {s.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Company</p>
            <Link href="/#work" className="text-body hover:text-brand">Work</Link>
            <Link href="/#how" className="text-body hover:text-brand">How we work</Link>
            <Link href="/blog" className="text-body hover:text-brand">Blog</Link>
            <Link href="/contact" className="text-body hover:text-brand">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Connect</p>
            <a href={`mailto:${site.email}`} className="text-body hover:text-brand">{site.email}</a>
            <a href={site.instagram} className="text-body hover:text-brand" target="_blank" rel="noreferrer">Instagram</a>
            <a href={site.linkedin} className="text-body hover:text-brand">LinkedIn</a>
            <span className="text-body">{site.location}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] px-4 pb-8 text-sm text-body sm:px-6 lg:px-10">
        {site.foundedYear}–{new Date().getFullYear()} {site.name}. {site.tagline}
      </div>
    </footer>
  );
}
