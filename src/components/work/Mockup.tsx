import type { CaseStudy } from "@/lib/home";

/** Stylised device screen in the client's accent colour. No screenshots needed. */
function Screen({ cs, compact }: { cs: CaseStudy; compact?: boolean }) {
  const big = cs.stats[0]?.value ?? cs.badges?.[0] ?? "";
  const label = cs.stats[0]?.label ?? "";
  return (
    <div className="flex h-full flex-col gap-3 bg-white p-3 text-ink">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: cs.accent }} />
          {cs.client}
        </span>
        <span className="h-4 w-10 rounded-full" style={{ background: cs.accent }} />
      </div>
      <div className="rounded-xl p-3" style={{ background: `${cs.accent}12` }}>
        <p className="text-[clamp(16px,2.2vw,24px)] font-extrabold leading-none tracking-[-0.03em]" style={{ color: cs.accent }}>{big}</p>
        {label && <p className="mt-1 text-[10px] text-body">{label}</p>}
        <svg viewBox="0 0 120 36" className="mt-2 h-8 w-full" aria-hidden>
          <path d="M0 32 L18 28 L34 30 L52 20 L70 22 L88 11 L104 13 L120 3" fill="none" stroke={cs.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0 32 L18 28 L34 30 L52 20 L70 22 L88 11 L104 13 L120 3 L120 36 L0 36Z" fill={cs.accent} opacity="0.12" />
        </svg>
      </div>
      {!compact && (
        <div className="flex flex-col gap-2">
          {[0.9, 0.7, 0.8].map((w, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-line p-2">
              <span className="h-5 w-5 shrink-0 rounded-md" style={{ background: `${cs.accent}${i === 0 ? "" : "33"}` }} />
              <span className="h-1.5 rounded-full bg-[#E3E6EA]" style={{ width: `${w * 100}%` }} />
            </div>
          ))}
        </div>
      )}
      <div className="mt-auto h-7 rounded-lg text-center text-[10px] font-semibold leading-7 text-white" style={{ background: cs.accent }}>
        Enquire now
      </div>
    </div>
  );
}

export default function Mockup({ cs, compact = false, className = "" }: { cs: CaseStudy; compact?: boolean; className?: string }) {
  if (cs.device === "phone") {
    return (
      <div className={`mx-auto aspect-[9/18] w-[min(240px,60%)] rounded-[34px] border-[7px] border-[#23262C] bg-[#23262C] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}>
        <div className="relative h-full overflow-hidden rounded-[27px]">
          <span className="absolute left-1/2 top-1.5 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-[#23262C]" />
          <div className="h-full pt-6"><Screen cs={cs} compact={compact} /></div>
        </div>
      </div>
    );
  }
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-white/10 bg-[#1A1D22] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" /><span className="h-2 w-2 rounded-full bg-[#FEBC2E]" /><span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-3 h-3.5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="grid aspect-[16/9] grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col justify-center gap-2 bg-white p-[6%]">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: cs.accent }}>{cs.client}</span>
          <span className="h-2.5 w-[90%] rounded-full bg-ink" /><span className="h-2.5 w-[70%] rounded-full bg-ink" />
          <span className="mt-1 h-1.5 w-[80%] rounded-full bg-[#E3E6EA]" /><span className="h-1.5 w-[60%] rounded-full bg-[#E3E6EA]" />
          <span className="mt-2 h-5 w-20 rounded-md" style={{ background: cs.accent }} />
        </div>
        <Screen cs={cs} compact={compact} />
      </div>
    </div>
  );
}
