export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMins: number;
  cover: { from: string; to: string; icon: string };
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "what-is-aeo",
    title: "What is AEO, and why your business needs it now",
    excerpt: "Customers now ask ChatGPT and Gemini what to buy. Answer Engine Optimisation is how you get named in the answer.",
    category: "AI Search",
    date: "2026-11-10",
    readMins: 5,
    cover: { from: "#0B1F4D", to: "#1457CB", icon: "sparkles" },
    body: [
      { type: "p", text: "For twenty years, getting found online meant ranking on Google. That still matters. But more and more buyers now skip the search results and ask an AI assistant directly: \"Which agency builds good Shopify stores in Pune?\" or \"Best skincare brand for oily skin?\"" },
      { type: "p", text: "The assistant gives one answer, often with a few names. Answer Engine Optimisation (AEO) is the work of making sure your business is one of them." },
      { type: "h2", text: "How AI assistants decide who to recommend" },
      { type: "p", text: "Assistants build answers from content they can find, understand and trust. Three things help them pick you:" },
      { type: "ul", items: [
        "Clear answers on your own site. Pages that say plainly what you do, who it's for, where you work and what it costs.",
        "Structure machines can read. Headings, FAQs and schema markup that spell out your services, prices and locations.",
        "Proof from other places. Reviews, directory listings and mentions on sites the assistant already trusts.",
      ] },
      { type: "h2", text: "AEO vs SEO: do you need both?" },
      { type: "p", text: "Yes, and they overlap a lot. Good SEO (fast pages, clear headings, useful content) is the foundation AEO is built on. AEO adds a focus on direct answers, FAQs and being cited, not just clicked." },
      { type: "h2", text: "Five things you can do this month" },
      { type: "ul", items: [
        "Add an FAQ section to every service page, answering the questions customers actually ask you.",
        "Put prices, or at least \"starting from\" prices, on your site. Assistants love concrete numbers.",
        "Make sure your Google Business Profile is complete and your reviews are recent.",
        "Write one honest comparison page, for example \"Website vs app: what does my business need?\"",
        "Ask ChatGPT and Gemini about your category and note who they mention. That's your competition now.",
      ] },
      { type: "quote", text: "If an assistant can't explain what you do in one sentence, it won't recommend you." },
      { type: "p", text: "Want us to check how AI assistants see your business today? Our free growth audit includes an AEO check." },
    ],
  },
  {
    slug: "website-cost-india",
    title: "How much should a business website cost in India?",
    excerpt: "From ₹4,000 to several lakhs: what actually changes the price, and how to know which kind of site you need.",
    category: "Websites",
    date: "2026-11-03",
    readMins: 6,
    cover: { from: "#141E26", to: "#2E62D9", icon: "code" },
    body: [
      { type: "p", text: "Ask five agencies for a website quote and you might get five answers that are lakhs apart. That's confusing, but it usually isn't a scam. The price depends on what you're actually buying." },
      { type: "h2", text: "What changes the price" },
      { type: "ul", items: [
        "Number of pages and how unique each one is. A 3-page brochure site is very different from a 30-page site with custom layouts.",
        "Who writes the content. Copywriting and product photos are real work, and often the hidden cost.",
        "Custom design vs a template. A template is faster and cheaper; custom design fits your brand and goals.",
        "Features. Booking, payments, a store, multiple languages or a client login all add build time.",
        "What happens after launch. Hosting, fixes, updates and SEO are ongoing, not one-off.",
      ] },
      { type: "h2", text: "Rough ranges at Tythas" },
      { type: "p", text: "To make it concrete, here's how our own plans are priced: a Starter site on your existing hosting from ₹3,999, a 5-page site built from scratch from ₹6,999, and a full Shopify store from ₹9,999. Web apps and MVPs are quoted after a call." },
      { type: "h2", text: "Questions to ask any agency" },
      { type: "ul", items: [
        "Will I own the domain, design files and code?",
        "What exactly is included, and what costs extra?",
        "How many rounds of changes do I get?",
        "Who fixes things after launch, and for how long?",
        "Can I see sites you built that are live today?",
      ] },
      { type: "quote", text: "The cheapest website is the one that brings you customers. The most expensive is the one nobody visits." },
      { type: "p", text: "Not sure what you need? Tell us your goal in our 30-second form and we'll suggest the right plan." },
    ],
  },
  {
    slug: "idea-to-mvp",
    title: "From idea to MVP in 30 days: a founder's checklist",
    excerpt: "You don't need a full product to start. You need the smallest version that proves people want it.",
    category: "Founders",
    date: "2026-10-27",
    readMins: 7,
    cover: { from: "#1A1033", to: "#7C5CFF", icon: "rocket" },
    body: [
      { type: "p", text: "Most first-time founders try to build everything at once. The result is a product that takes a year, costs too much and launches to silence. An MVP (minimum viable product) flips that: build the smallest thing that tests your riskiest assumption, then learn." },
      { type: "h2", text: "Week 1: decide what to prove" },
      { type: "ul", items: [
        "Write your idea in one sentence: who it's for, what problem it solves, and why now.",
        "List your assumptions and circle the riskiest one. That's what your MVP must test.",
        "Talk to 10 people who have the problem. Not friends. Ask how they solve it today.",
      ] },
      { type: "h2", text: "Week 2: design the core flow" },
      { type: "ul", items: [
        "Map the one journey that delivers value, start to finish.",
        "Cut every feature that isn't on that journey. Login, settings and dashboards can often wait.",
        "Turn the flow into a clickable prototype and show it to the same 10 people.",
      ] },
      { type: "h2", text: "Weeks 3 and 4: build, launch, measure" },
      { type: "ul", items: [
        "Build only what the prototype proved people need.",
        "Set up analytics before launch, so you know what users actually do.",
        "Launch to a small group first, fix what breaks, then open it up.",
        "Decide in advance what result means \"keep going\" and what means \"change course\".",
      ] },
      { type: "quote", text: "An MVP isn't a small product. It's a fast experiment." },
      { type: "p", text: "This is exactly how we work with founders at Tythas: flows, design, build and launch, with you approving each step. If you have an idea, tell us about it." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
