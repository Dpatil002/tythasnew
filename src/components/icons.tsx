import Image from "next/image";
import {
  Bot,
  ChartColumn,
  CodeXml,
  MessagesSquare,
  Nfc,
  PencilRuler,
  Search,
  type LucideIcon,
} from "lucide-react";

/** One icon per service, keyed by slug */
export const serviceIcons: Record<string, LucideIcon> = {
  "websites-and-apps": CodeXml,
  "ui-ux-design": PencilRuler,
  seo: Search,
  "google-ads": ChartColumn,
  "chatgpt-ads": MessagesSquare,
  "nfc-cards": Nfc,
  "ai-automation": Bot,
};

export function ServiceIcon({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const Icon = serviceIcons[slug] ?? CodeXml;
  return <Icon aria-hidden className={className} strokeWidth={1.8} />;
}

/** Rounded square that holds a service icon, used on cards */
export function IconBadge({ slug, dark = false }: { slug: string; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? "bg-white/10 text-brand-light" : "bg-brand-soft text-brand"}`}
    >
      <ServiceIcon slug={slug} />
    </span>
  );
}

export function InstagramIcon({ size = 22 }: { size?: number }) {
  return <Image src="/icons/instagram.svg" alt="" width={size} height={size} />;
}

export function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center rounded-[4px] bg-[#0A66C2] font-bold leading-none text-white"
      style={{ width: size, height: size, fontSize: size * 0.62 }}
    >
      in
    </span>
  );
}
