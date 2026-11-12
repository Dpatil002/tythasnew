"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Nav from "./Nav";
import SmoothScroll from "./motion/SmoothScroll";

/** Site header, footer and smooth scroll everywhere except the /keystatic blog editor. */
export default function SiteChrome({ footer, children }: { footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) return <>{children}</>;
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
