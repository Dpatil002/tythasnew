"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { services } from "@/lib/services";
import { buttonClass } from "./ui";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-[#EDEDED] bg-white/90 text-ink backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" aria-label="Tythas home" className="flex items-center gap-3">
          <span className="relative block h-[34px] w-[50px]">
            <Image src="/brand/mark.png" alt="" width={50} height={34} className="logo-dark absolute inset-0 h-[34px] w-auto transition-opacity duration-700" priority />
            <Image src="/brand/mark-white.png" alt="" width={50} height={34} className="logo-light absolute inset-0 h-[34px] w-auto opacity-0 transition-opacity duration-700" priority />
          </span>
          <span className="relative block h-5 w-[130px]">
            <Image src="/brand/wordmark.png" alt="Tythas" width={130} height={20} className="logo-dark absolute inset-0 h-5 w-auto transition-opacity duration-700" priority />
            <Image src="/brand/wordmark-white.png" alt="" width={130} height={20} className="logo-light absolute inset-0 h-5 w-auto opacity-0 transition-opacity duration-700" priority />
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-[15px] font-medium md:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex h-11 items-center gap-1 hover:text-brand"
            >
              Services
              <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-2">
                <ul className="rounded-2xl border border-line bg-white p-2 text-ink shadow-[0_20px_40px_-20px_rgba(20,30,38,0.3)]">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-paper"
                      >
                        <span>{s.name}</span>
                        <span className="text-[13px] text-subtle">from {s.fromPrice}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link href="/work" className="hover:text-brand">Work</Link>
          <Link href="/#how" className="hover:text-brand">How we work</Link>
          <Link href="/blog" className="hover:text-brand">Blog</Link>
          <Link href="/contact" className={buttonClass("primary")}>Let&apos;s talk</Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-current/20 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-4 pb-6 pt-2 text-ink md:hidden">
          <p className="px-1 pb-1 pt-3 text-[13px] font-semibold uppercase tracking-wider text-subtle">Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="flex justify-between border-b border-line px-1 py-3">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-sm text-subtle">from {s.fromPrice}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 py-3">
            <Link href="/work" className="px-1 py-2 font-medium">Work</Link>
            <Link href="/#how" className="px-1 py-2 font-medium">How we work</Link>
            <Link href="/blog" className="px-1 py-2 font-medium">Blog</Link>
          </div>
          <Link href="/contact" className={buttonClass("primary", "w-full")}>Let&apos;s talk</Link>
        </div>
      )}
    </header>
  );
}
