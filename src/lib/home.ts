/* Homepage content. Anything in [brackets] is a placeholder to replace with real data before launch. */

/** Brands for the logo strip. Swap `name` for a real logo by adding `logo: "/clients/<file>.svg"`. */
export const clients: { name: string; logo?: string; style?: string }[] = [
  { name: "Dewaxify", style: "font-extrabold uppercase tracking-[0.06em] text-[20px]" },
  { name: "SB Patil Group", style: "font-serif tracking-wide" },
  { name: "Gixel Labs", style: "font-black tracking-tight" },
  { name: "Homyfyd", style: "font-bold tracking-tighter" },
  { name: "Happy Haven", style: "font-semibold italic" },
  { name: "The PowerPoint Coworking", style: "font-bold uppercase tracking-tight text-[17px]" },
  { name: "Soché", style: "font-serif italic tracking-tight" },
  { name: "HireSprint", style: "font-extrabold tracking-tighter" },
  { name: "Sydney Decors", style: "font-light uppercase tracking-[0.2em] text-[18px]" },
  { name: "Elixir Helps", style: "font-medium" },
]

export type CaseStudy = {
  client: string;
  sector: string;
  /** Short title shown above the headline, e.g. "Ear Wax Removal Clinic, UK" */
  title: string;
  /** Big result-led headline on the card */
  headline: string;
  summary: string;
  tags: string[];
  /** Up to 3 numbers. When empty, `badges` are shown in the stats row instead. */
  stats: { value: string; label: string }[];
  badges?: string[];
  device: "phone" | "browser";
  accent: string;
  /** Live site. Leave empty to link to the contact page. */
  url?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Dewaxify",
    sector: "Healthcare · United Kingdom",
    title: "Ear Wax Removal Clinic, UK",
    headline: "+200% appointment enquiries for a London ear-care clinic",
    summary: "7,900% increase in organic traffic over 12 months. Clicks went from 40 to a steady 4,000.",
    tags: ["Healthcare", "SEO", "CRO", "Website"],
    stats: [
      { value: "+200%", label: "appointment enquiries" },
      { value: "+3x", label: "website conversions" },
      { value: "7,900%", label: "organic traffic growth" },
    ],
    device: "browser",
    accent: "#2E62D9",
    url: "https://dewaxifylondon.com",
  },
  {
    client: "SB Patil Group",
    sector: "Luxury real estate · India",
    title: "Luxury Real Estate",
    headline: "Monthly enquiries up from 40 to 250 for a luxury developer",
    summary: "Turned traffic gains directly into business revenue by scaling monthly enquiries from 40 to 250.",
    tags: ["Real Estate", "SEO", "Lead Generation", "Luxury"],
    stats: [
      { value: "66.67%", label: "organic growth" },
      { value: "4.3%", label: "click-through rate" },
      { value: "40 → 250", label: "enquiries a month" },
    ],
    device: "browser",
    accent: "#3BA55C",
  },
  {
    client: "Gixel Labs",
    sector: "AI & 3D · Technology",
    title: "Building Authority in an AI Market",
    headline: "+300% organic enquiries for an AI and 3D studio",
    summary: "Positioned the brand as an industry authority using SEO, content strategy and conversion-focused website improvements.",
    tags: ["AI", "3D", "Branding", "SEO"],
    stats: [
      { value: "+300%", label: "organic enquiries" },
      { value: "1.8x", label: "return on marketing spend" },
    ],
    device: "browser",
    accent: "#6D4AFF",
  },
  {
    client: "Homyfyd",
    sector: "PropTech SaaS · India",
    title: "Building a Smarter Real Estate Platform for Property Businesses",
    headline: "One platform for listings, enquiries, CRM and site visits",
    summary: "A real estate platform that lets developers, brokers and consultants manage the whole customer journey in one place.",
    tags: ["SaaS", "CRM", "Dashboard", "Real Estate"],
    stats: [],
    badges: ["CRM powered", "End-to-end platform", "Site-visit scheduling"],
    device: "browser",
    accent: "#1FA7B8",
  },
  {
    client: "Happy Haven",
    sector: "AI gifting · E-commerce",
    title: "Redefining Personalized Gifting with AI",
    headline: "AI-powered gift hampers, personalised in a few taps",
    summary: "An AI gifting platform that helps people build thoughtful hampers through smart recommendations and easy customisation.",
    tags: ["AI", "E-commerce", "Personalization", "Product Design"],
    stats: [],
    badges: ["AI powered", "100% customisable", "Smart recommendations"],
    device: "phone",
    accent: "#E0336E",
  },
  {
    client: "The PowerPoint Coworking",
    sector: "Coworking · Pune",
    title: "Creating a Digital Experience for Modern Workspaces",
    headline: "A lead-focused website for a modern coworking space",
    summary: "Helps professionals and businesses discover workspaces, compare facilities, understand pricing and enquire in minutes.",
    tags: ["Commercial", "Coworking", "Lead Generation", "UX"],
    stats: [],
    badges: ["Lead focused", "Mobile optimised", "Pricing at a glance"],
    device: "phone",
    accent: "#F07A3A",
  },
];

export type Review = { quote: string; name: string; role: string; company: string; rating: number };

/* Use only real, permission-cleared client quotes here (or embed your Google reviews). */
export const reviews: Review[] = [
  { quote: "[Client quote about how Tythas handled everything and what changed for the business.]", name: "[Client name]", role: "[Founder]", company: "Dewaxify", rating: 5 },
  { quote: "[Client quote about speed, communication and only needing to approve key steps.]", name: "[Client name]", role: "[Owner]", company: "SB Patil Group", rating: 5 },
  { quote: "[Client quote about the result: more leads, bookings or sales, with a number if possible.]", name: "[Client name]", role: "[Director]", company: "Gixel Labs", rating: 5 },
  { quote: "[Client quote about design quality and how customers react to the new site.]", name: "[Client name]", role: "[Founder]", company: "Happy Haven", rating: 5 },
  { quote: "[Client quote about support after launch and ongoing growth work.]", name: "[Client name]", role: "[Manager]", company: "The PowerPoint Coworking", rating: 5 },
  { quote: "[Client quote about working with one team instead of many freelancers.]", name: "[Client name]", role: "[Founder]", company: "Homyfyd", rating: 5 },
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
