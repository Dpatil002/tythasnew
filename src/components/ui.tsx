import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white border-brand hover:bg-[#0f47a8] hover:border-[#0f47a8]",
  secondary: "bg-white text-ink border-ink hover:bg-ink hover:text-white",
  inverse: "bg-white text-ink border-white hover:bg-brand-soft",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border-[1.5px] px-6 text-base font-semibold transition-colors ${variants[variant]} ${extra}`;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={buttonClass(variant, className)} />;
}

/** Figma-style dashed selection box with corner handles */
export function SelectionBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  const handle = "absolute h-2.5 w-2.5 border-[1.5px] border-[#B8BCC2] bg-white";
  return (
    <div className={`relative border-[1.5px] border-dashed border-[#B8BCC2] ${className}`}>
      <span aria-hidden className={`${handle} -left-1.5 -top-1.5`} />
      <span aria-hidden className={`${handle} -right-1.5 -top-1.5`} />
      <span aria-hidden className={`${handle} -bottom-1.5 -left-1.5`} />
      <span aria-hidden className={`${handle} -bottom-1.5 -right-1.5`} />
      {children}
    </div>
  );
}

/** Coloured multiplayer cursor with a role label */
export function CursorTag({
  label,
  color,
  dark = false,
  className = "",
}: {
  label: string;
  color: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none flex flex-col gap-0.5 ${className}`}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M3 2l18 8-8 2.5L10 21z" fill={color} />
      </svg>
      <span
        className="ml-2.5 rounded px-2 py-0.5 text-[15px] font-medium whitespace-nowrap"
        style={{ background: color, color: dark ? "#141E26" : "#FFFFFF" }}
      >
        {label}
      </span>
    </div>
  );
}

export function ChatBubble({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 rounded-[22px] bg-white py-4 pl-4 pr-5 shadow-[0_10px_30px_rgba(20,30,38,0.08)] ${className}`}>
      <span aria-hidden className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-ink">
        <Image src="/brand/mark-white.png" alt="" width={26} height={18} className="h-auto w-[26px]" />
      </span>
      <div className="flex flex-col">
        <span className="text-[15px]">
          <strong>Tythas</strong> <span className="text-subtle">right now</span>
        </span>
        <span className="text-base">{text}</span>
      </div>
    </div>
  );
}

export function ToolTile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex h-[72px] min-w-[72px] items-center justify-center gap-2.5 rounded-[18px] bg-white px-4 shadow-[0_8px_24px_rgba(20,30,38,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Check({ light = false }: { light?: boolean }) {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={light ? "#8FB3F5" : "#1457CB"}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] flex-none"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function ChatIcon({ size = 30 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#141E26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M9 11h6M9 14h4" />
    </svg>
  );
}

export function ApproveTag({ children = "You approve" }: { children?: ReactNode }) {
  return (
    <span className="self-start whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[13px] font-bold text-white">
      {children}
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[clamp(34px,4.6vw,64px)] font-bold leading-[1.03] tracking-tighter ${className}`}>{children}</h2>
  );
}
