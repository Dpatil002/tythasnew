"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "../Article";

/** "On this page" list; highlights the section being read. */
export default function Toc({ items, className = "" }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const onScroll = () => {
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top < 140) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className={className}>
      <p className="border-b border-line pb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-ink">On this page</p>
      <ol className="mt-4 flex flex-col gap-1">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`block border-l-2 py-1.5 text-[14px] leading-snug transition-colors ${i.level === 3 ? "pl-6" : "pl-3"} ${
                active === i.id ? "border-brand font-semibold text-brand" : "border-transparent text-subtle hover:text-ink"
              }`}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
