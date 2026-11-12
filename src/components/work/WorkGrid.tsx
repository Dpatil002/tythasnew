"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/home";
import WorkCard from "./WorkCard";

const FILTERS = ["All", "SEO", "Lead Generation", "Real Estate", "AI"];

export default function WorkGrid() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? caseStudies : caseStudies.filter((c) => c.tags.includes(filter));
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <p className="text-[15px] text-white/60" aria-live="polite">Showing {list.length} project{list.length === 1 ? "" : "s"}</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter case studies">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-[14px] font-semibold transition-colors ${
                filter === f ? "border-white bg-white text-ink" : "border-white/20 text-white/80 hover:border-white/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((cs) => <WorkCard key={cs.slug} cs={cs} />)}
      </div>
    </>
  );
}
