import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { InstagramIcon, LinkedInIcon } from "./icons";

const company = [
  { label: "About", href: "/#about" },
  { label: "Our Work", href: "/#work" },
  { label: "How We Work", href: "/#how" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#EDEDED]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-10 px-4 py-14 sm:px-6 lg:px-10">
        <div className="flex max-w-xs flex-col gap-4">
          <Image src="/brand/lockup.png" alt="Tythas, results that matter" width={378} height={228} className="h-[84px] w-auto self-start" />
          <p className="text-lg font-semibold leading-snug tracking-[-0.01em]">You focus on business.<br />We focus on growth.</p>
          <p className="flex items-center gap-2 text-body"><MapPin aria-hidden className="h-4 w-4 text-brand" />{site.location}</p>
        </div>
        <div className="flex flex-wrap gap-12 text-[15px]">
          <nav aria-label="Services" className="flex flex-col gap-2">
            <p className="font-semibold">Services</p>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="text-body hover:text-brand">{s.name}</Link>
            ))}
          </nav>
          <nav aria-label="Company" className="flex flex-col gap-2">
            <p className="font-semibold">Company</p>
            {company.map((c) => (
              <Link key={c.label} href={c.href} className="text-body hover:text-brand">{c.label}</Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2.5">
            <p className="font-semibold">Connect</p>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-body hover:text-brand"><Mail aria-hidden className="h-[18px] w-[18px]" />Email</a>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-body hover:text-brand"><InstagramIcon size={18} />Instagram</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-body hover:text-brand"><LinkedInIcon size={18} />LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-2 border-t border-[#EDEDED] px-4 py-6 text-sm text-body sm:px-6 lg:px-10">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
      </div>
    </footer>
  );
}
