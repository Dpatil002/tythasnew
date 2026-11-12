import Image from "next/image";
import { clients } from "@/lib/home";

/** Infinite strip of client brands. Pauses on hover. Real logos can replace the wordmarks. */
export default function LogoMarquee() {
  const row = [...clients, ...clients];
  return (
    <section aria-label="Brands we've worked with" className="border-b border-[#EDEDED] py-10 md:py-14">
      <h2 className="mb-8 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-subtle">
        Trusted by businesses with bigger ambitions
      </h2>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex w-max items-center" style={{ ["--marquee-duration" as string]: "45s" }}>
          {row.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              aria-hidden={i >= clients.length}
              className="flex h-14 shrink-0 items-center px-8 text-[22px] text-[#8A8F96] grayscale transition-colors hover:text-ink md:px-12"
            >
              {c.logo ? (
                <Image src={c.logo} alt={c.name} width={140} height={40} className="h-9 w-auto opacity-60 transition-opacity hover:opacity-100" />
              ) : (
                <span className={`whitespace-nowrap ${c.style ?? "font-bold"}`}>{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
