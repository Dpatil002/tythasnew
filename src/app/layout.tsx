import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Tythas Digital · We build the systems that make growth happen",
    template: "%s · Tythas Digital",
  },
  description:
    "Websites, apps, UI/UX, SEO, Google and Meta ads, conversion optimisation and AI automation. We build the systems that make growth happen, from Pune for businesses in India and worldwide.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google tag (GTM container), once per page */}
        <Script id="gtm" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtm.js?id=${site.gtmId}`} />
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteChrome footer={<Footer />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
