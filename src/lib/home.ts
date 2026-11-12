/* Homepage content. Anything in [brackets] is a placeholder to replace with real data before launch. */

/** Brands for the logo strip. Swap `name` for a real logo by adding `logo: "/clients/<file>.svg"`. */
export const clients: { name: string; logo?: string; style?: string }[] = [
  { name: "Soché", style: "font-serif italic tracking-tight" },
  { name: "HireSprint", style: "font-extrabold tracking-tighter" },
  { name: "Sydney Decors", style: "font-light uppercase tracking-[0.2em] text-[18px]" },
  { name: "Amary Beauté", style: "font-serif" },
  { name: "Finansh", style: "font-black tracking-tight" },
  { name: "Sunday Hospitality", style: "font-medium uppercase tracking-[0.12em] text-[17px]" },
  { name: "Elixir Helps", style: "font-semibold italic" },
  { name: "The PowerPoint Coworking", style: "font-bold uppercase tracking-tight text-[17px]" },
  { name: "Pushpam", style: "font-serif tracking-wide" },
  { name: "Therma by Eureka", style: "font-semibold tracking-tight" },
];

export type CaseStudy = {
  client: string;
  sector: string;
  headline: string;
  stats: { value: string; label: string }[];
  device: "phone" | "browser";
  accent: string;
  href: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "HireSprint",
    sector: "Staffing · United Kingdom",
    headline: "[+XX%] qualified leads from a website built around enquiries",
    stats: [
      { value: "[XX%]", label: "more candidate sign-ups" },
      { value: "[X.Xs]", label: "average page load" },
      { value: "[XX]", label: "client enquiries a month" },
    ],
    device: "browser",
    accent: "#7C5CFF",
    href: "/contact",
  },
  {
    client: "Sydney Decors",
    sector: "Events & decor · Australia",
    headline: "[XX] bookings a month from a booking-first website",
    stats: [
      { value: "[XX%]", label: "higher enquiry rate" },
      { value: "[X]x", label: "mobile conversions" },
      { value: "[XX]", label: "Google reviews collected" },
    ],
    device: "phone",
    accent: "#1457CB",
    href: "/contact",
  },
  {
    client: "Soché",
    sector: "D2C spices · United Kingdom",
    headline: "[+XX%] online sales after a brand and store rebuild",
    stats: [
      { value: "[XX%]", label: "conversion rate" },
      { value: "£[X.X]k", label: "first-quarter revenue" },
      { value: "[X]x", label: "repeat orders" },
    ],
    device: "phone",
    accent: "#E8590C",
    href: "/contact",
  },
];

export type Review = { quote: string; name: string; role: string; company: string; rating: number };

/* Use only real, permission-cleared client quotes here (or embed your Google reviews). */
export const reviews: Review[] = [
  { quote: "[Client quote about how Tythas handled everything and what changed for the business.]", name: "[Client name]", role: "[Founder]", company: "HireSprint", rating: 5 },
  { quote: "[Client quote about speed, communication and only needing to approve key steps.]", name: "[Client name]", role: "[Owner]", company: "Sydney Decors", rating: 5 },
  { quote: "[Client quote about the result: more leads, bookings or sales, with a number if possible.]", name: "[Client name]", role: "[Director]", company: "Soché", rating: 5 },
  { quote: "[Client quote about design quality and how customers react to the new site.]", name: "[Client name]", role: "[Founder]", company: "Elixir Helps", rating: 5 },
  { quote: "[Client quote about support after launch and ongoing growth work.]", name: "[Client name]", role: "[Manager]", company: "The PowerPoint Coworking", rating: 5 },
  { quote: "[Client quote about working with one team instead of many freelancers.]", name: "[Client name]", role: "[Founder]", company: "Finansh", rating: 5 },
];

export const reviewSummary = { rating: "[4.9]", count: "[XX]", source: "Google" };

export const homeFaqs: { q: string; a: string }[] = [
  {
    q: "What does \"you just approve\" actually mean?",
    a: "We plan, design, build and run the work. You see each key step before it goes live (the plan, the designs, the launch) and say yes or ask for changes. No briefing five vendors, no chasing updates.",
  },
  {
    q: "How much does it cost to work with Tythas?",
    a: "Single services start from ₹1,999 a month for ads and ₹3,999 for a website. If you want everything handled, the Growth Partner plan starts from ₹14,999 a month. Every service page lists exact plans.",
  },
  {
    q: "I only have an idea. Can you help me build an MVP?",
    a: "Yes. We help founders go from idea to a launched MVP: user flows, UI/UX design, development and launch, then the marketing to get first customers.",
  },
  {
    q: "How fast can we get started?",
    a: "Usually within a week. After a free call we send a clear plan with scope, price and timeline. Work starts once you approve it.",
  },
  {
    q: "Do I own the website, designs and ad accounts?",
    a: "Yes. Design files, code, domains and ad accounts are yours. We work inside your accounts, so nothing is locked to us.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. We work with clients in India, the UK and Australia, and plan calls around your time zone.",
  },
];
