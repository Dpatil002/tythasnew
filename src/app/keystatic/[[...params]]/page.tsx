import type { Metadata } from "next";
import KeystaticApp from "../keystatic";

export const metadata: Metadata = { title: "Blog editor", robots: { index: false, follow: false } };

export default function Page() {
  return <KeystaticApp />;
}
