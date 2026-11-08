export type Plan = {
  name: string;
  blurb: string;
  price: string;
  unit: string;
  features: string[];
  excluded?: string[];
  featured?: boolean;
};

export type Step = { title: string; text: string; approve?: boolean };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  number: string;
  name: string;
  /** Big word shown in the hero selection box */
  heroWord: string;
  hook: string;
  intro: string;
  /** One-liner shown on the homepage service grid */
  cardLine: string;
  fromPrice: string;
  fromUnit: string;
  bubble: string;
  icon?: string;
  cursors: { label: string; color: string; dark?: boolean }[];
  benefitsTitle: string;
  benefits: { title: string; text: string }[];
  plansNote: string;
  plans: Plan[];
  plansFootnote?: string;
  extra?: { title: string; text: string; cta: string };
  steps: Step[];
  faqs: Faq[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "websites-and-apps",
    number: "01",
    name: "Websites & Apps",
    heroWord: "Websites.",
    hook: "A website that works while you sleep.",
    intro:
      "Fast, mobile-first sites and stores built to turn visitors into enquiries and sales. Designed, built and launched by one team.",
    cardLine: "Fast, beautiful and built to turn visitors into customers.",
    fromPrice: "₹3,999",
    fromUnit: "per website · one-time",
    bubble: "Your new homepage is ready for review.",
    icon: "/icons/nextdotjs.svg",
    cursors: [
      { label: "Developer", color: "#1C7F99" },
      { label: "You, approving", color: "#D9480F" },
    ],
    benefitsTitle: "Built to bring you customers, not just compliments.",
    benefits: [
      { title: "Conversion-first design", text: "Every section leads visitors to call, message or buy." },
      { title: "Fast on every phone", text: "Mobile-first builds that load quickly, even on slow networks." },
      { title: "SEO-ready from day one", text: "Clean structure, page titles and speed that Google likes." },
      { title: "WhatsApp and lead forms", text: "Enquiries land straight in your phone or inbox." },
      { title: "Tracking built in", text: "See where visitors come from and what they do." },
      { title: "Easy to update", text: "Change text and images yourself, no developer needed." },
    ],
    plansNote: "One-time price. No hidden fees. Order on WhatsApp in a minute.",
    plans: [
      {
        name: "Starter",
        blurb: "You already have a domain and hosting.",
        price: "₹3,999",
        unit: "per website",
        features: [
          "Custom design and build",
          "Up to 3 pages",
          "Mobile-friendly layout",
          "WhatsApp button and contact form",
          "Set up on your domain and hosting",
        ],
      },
      {
        name: "Growth",
        blurb: "From zero to live, built from scratch.",
        price: "₹6,999",
        unit: "per website",
        featured: true,
        features: [
          "Everything in Starter",
          "Up to 5 pages, built from scratch",
          "Basic on-page SEO",
          "Google Analytics setup",
          "1 month of free fixes",
        ],
        excluded: ["Domain and hosting not included"],
      },
      {
        name: "Store",
        blurb: "A full Shopify store, ready to sell.",
        price: "₹9,999",
        unit: "per store",
        features: [
          "Everything in Growth",
          "Shopify setup, products added",
          "Payments and shipping set up",
          "Smooth animations",
          "6 months of optimisation, 2 to 3 rounds a month",
        ],
      },
    ],
    extra: {
      title: "Building a web app or MVP?",
      text: "Custom builds for founders. Quote after a free 30-minute call.",
      cta: "Get a quote",
    },
    steps: [
      { title: "Choose a plan", text: "Message us on WhatsApp or book a free call." },
      { title: "We plan, you approve", text: "A clear brief, page list and timeline.", approve: true },
      { title: "We design and build", text: "You review the design before it goes live.", approve: true },
      { title: "Launch and support", text: "We go live and stay on call for fixes." },
    ],
    faqs: [
      { q: "How long does it take?", a: "Starter in [5 to 7] days, Growth in [10 to 14] days, Store in [3 to 4] weeks, once we have your content." },
      { q: "Do I need to write the content?", a: "No. We write the copy with you. You just approve it." },
      { q: "Are domain and hosting included?", a: "Not in Starter or Growth. We help you buy the right ones at actual cost." },
    ],
    metaDescription:
      "Conversion-focused websites, Shopify stores and web apps from ₹3,999. Designed, built and launched by Tythas in Pune.",
  },
  {
    slug: "ui-ux-design",
    number: "02",
    name: "UI/UX Design",
    heroWord: "UI/UX.",
    hook: "Designs people get in five seconds.",
    intro:
      "Research-led UX and clean UI for websites, apps and SaaS products. Every screen is clear, easy to use and ready to build.",
    cardLine: "Products people understand in seconds and enjoy using.",
    fromPrice: "₹2,999",
    fromUnit: "per project · one-time",
    bubble: "Prototype is ready. Want to click through?",
    icon: "/icons/figma.svg",
    cursors: [
      { label: "UI Designer", color: "#5B4BD6" },
      { label: "UX Designer", color: "#C2329E" },
    ],
    benefitsTitle: "Good design is the difference between a visit and a sale.",
    benefits: [
      { title: "User flows and wireframes", text: "We map every step before a single pixel is drawn." },
      { title: "Clean, modern UI", text: "Interfaces that look premium and feel easy." },
      { title: "Clickable prototype", text: "Test it, demo it, show investors before you build." },
      { title: "Design system", text: "Colours, type and components that keep everything consistent." },
      { title: "Developer-ready handoff", text: "Organised Figma files your team can build from." },
      { title: "Mobile and desktop", text: "Every screen designed for every size." },
    ],
    plansNote: "One-time price. Figma files are yours to keep.",
    plans: [
      {
        name: "Landing",
        blurb: "One high-converting page, designed right.",
        price: "₹2,999",
        unit: "per page",
        features: [
          "1 landing page in Figma",
          "Desktop and mobile versions",
          "Conversion-focused layout and copy",
          "2 revision rounds",
          "Developer handoff",
        ],
      },
      {
        name: "Product",
        blurb: "A full website or app flow.",
        price: "₹6,999",
        unit: "per project",
        featured: true,
        features: [
          "Up to 10 screens",
          "User flows and wireframes",
          "Clickable prototype",
          "3 revision rounds",
          "Developer handoff",
        ],
      },
      {
        name: "MVP",
        blurb: "Your whole product, ready to build and pitch.",
        price: "₹11,999",
        unit: "per project",
        features: [
          "Everything in Product",
          "Up to 25 screens",
          "UX research and competitor review",
          "Design system",
          "30 days of design support",
        ],
      },
    ],
    extra: {
      title: "Redesigning something that already exists?",
      text: "Send us the link. We'll do a free UX audit and show what to fix first.",
      cta: "Get a free audit",
    },
    steps: [
      { title: "Choose a plan", text: "Message us on WhatsApp or book a free call." },
      { title: "Research and flows", text: "We map users, goals and every screen.", approve: true },
      { title: "Design and prototype", text: "Click through it before anything is built.", approve: true },
      { title: "Handoff", text: "Files to your team, or we build it for you." },
    ],
    faqs: [
      { q: "What do I get at the end?", a: "Organised Figma files with every screen, a clickable prototype and handoff notes. They're yours to keep." },
      { q: "Can you build it too?", a: "Yes. Our Websites & Apps team can take your design live, so nothing gets lost in handoff." },
      { q: "How long does it take?", a: "Landing in [3 to 5] days, Product in [2] weeks, MVP in [3 to 4] weeks." },
    ],
    metaDescription:
      "UI/UX design for websites, apps and MVPs from ₹2,999. Research-led flows, clean UI and clickable prototypes by Tythas.",
  },
  {
    slug: "seo",
    number: "03",
    name: "SEO",
    heroWord: "SEO.",
    hook: "Get found when buyers search.",
    intro:
      "Rank higher on Google and get recommended in AI answers. Steady traffic that keeps coming when the ad budget stops.",
    cardLine: "Rank on Google. Get recommended by AI.",
    fromPrice: "₹2,999",
    fromUnit: "per month · cancel anytime",
    bubble: "This month's keyword report is in your inbox.",
    cursors: [
      { label: "SEO Specialist", color: "#2E62D9" },
      { label: "Content Writer", color: "#1E8A4C" },
    ],
    benefitsTitle: "Traffic you don't have to pay for, every month.",
    benefits: [
      { title: "Keyword research", text: "We find the searches that bring buyers, not just browsers." },
      { title: "On-page fixes", text: "Titles, headings and content tuned for each page." },
      { title: "Technical SEO", text: "Speed, indexing and site health, fixed and monitored." },
      { title: "Google Business Profile", text: "Show up on Maps and in local searches near you." },
      { title: "Content that ranks", text: "Blog posts written for people first, search engines second." },
      { title: "AI search ready", text: "Structured so ChatGPT and Gemini can recommend you." },
    ],
    plansNote: "Monthly plans. No lock-in. Cancel anytime.",
    plans: [
      {
        name: "Basic",
        blurb: "Get the foundations right.",
        price: "₹2,999",
        unit: "per month",
        features: [
          "Up to 10 target keywords",
          "On-page fixes",
          "Google Business Profile setup",
          "Monthly ranking report",
        ],
      },
      {
        name: "Growth",
        blurb: "Climb the rankings, month after month.",
        price: "₹5,999",
        unit: "per month",
        featured: true,
        features: [
          "Everything in Basic",
          "Up to 25 target keywords",
          "4 SEO blog posts a month",
          "Technical and speed fixes",
          "Quality backlink building",
          "Fortnightly report with next steps",
        ],
      },
      {
        name: "Advanced",
        blurb: "Own your market on Google and AI.",
        price: "₹8,999",
        unit: "per month",
        features: [
          "Everything in Growth",
          "Up to 50 target keywords",
          "8 SEO blog posts a month",
          "AI search optimisation (AEO)",
          "Competitor tracking",
          "Weekly report and strategy call",
        ],
      },
    ],
    plansFootnote: "SEO compounds over time. Most sites start to see real movement in [3 to 6] months.",
    steps: [
      { title: "Free SEO audit", text: "We check your site and show where you stand." },
      { title: "Keyword plan", text: "The searches we'll target, and why.", approve: true },
      { title: "Fixes and content", text: "We optimise pages and publish new content.", approve: true },
      { title: "Track and improve", text: "Clear reports, then the next round of wins." },
    ],
    faqs: [
      { q: "Can you guarantee the #1 spot on Google?", a: "No honest agency can. We commit to the work, and show you progress every month." },
      { q: "What is AI search optimisation?", a: "Making your content easy for tools like ChatGPT and Gemini to find, trust and recommend." },
      { q: "Do I need a new website first?", a: "Usually not. If your site is holding you back, our audit will say so." },
    ],
    metaDescription:
      "Monthly SEO and AI search optimisation from ₹2,999. Rank on Google and get recommended by AI with Tythas.",
  },
  {
    slug: "google-ads",
    number: "04",
    name: "Google Ads",
    heroWord: "Google Ads.",
    hook: "Be there the moment they search.",
    intro:
      "Search, display and shopping campaigns that reach people already looking for what you sell. Tuned for cost per lead, not clicks.",
    cardLine: "Reach buyers the moment they search. Pay for leads, not clicks.",
    fromPrice: "₹1,999",
    fromUnit: "per month · ad spend separate",
    bubble: "Campaigns are ready. Approve to go live?",
    icon: "/icons/googleads.svg",
    cursors: [
      { label: "Ads Manager", color: "#C2329E" },
      { label: "You, approving", color: "#D9480F" },
    ],
    benefitsTitle: "Every rupee aimed at people ready to buy.",
    benefits: [
      { title: "High-intent keywords", text: "We bid on searches that turn into sales." },
      { title: "Ads that get clicked", text: "Sharp copy written and tested for your offer." },
      { title: "Conversion tracking", text: "Know exactly which ad brought which lead." },
      { title: "Remarketing", text: "Bring back visitors who left without buying." },
      { title: "Waste cut weekly", text: "We block searches that spend money and bring nothing." },
      { title: "Reports in plain words", text: "Leads, cost and what we'll do next. No jargon." },
    ],
    plansNote: "Monthly management fee. No lock-in. Cancel anytime.",
    plans: [
      {
        name: "Basic",
        blurb: "Start getting leads from search.",
        price: "₹1,999",
        unit: "per month",
        features: [
          "1 to 2 campaigns managed",
          "Keyword research",
          "Ad copy and setup",
          "Conversion tracking",
          "Monthly performance report",
        ],
      },
      {
        name: "Growth",
        blurb: "More campaigns, more testing, more leads.",
        price: "₹4,999",
        unit: "per month",
        featured: true,
        features: [
          "Everything in Basic",
          "3 to 5 campaigns managed",
          "A/B testing of ads",
          "Remarketing campaigns",
          "Weekly wasted-spend cleanup",
          "Fortnightly report with next steps",
        ],
      },
      {
        name: "Advanced",
        blurb: "Scale what works, every day.",
        price: "₹6,999",
        unit: "per month",
        features: [
          "Everything in Growth",
          "Unlimited campaigns",
          "Performance Max and Shopping",
          "Daily monitoring and budget scaling",
          "Weekly report and strategy call",
        ],
      },
    ],
    plansFootnote: "Ad spend is paid directly to Google and is not included in the plan price.",
    steps: [
      { title: "Tell us your goal", text: "Leads, calls or sales, and your monthly budget." },
      { title: "Campaign plan", text: "Keywords, ads and budget split, laid out clearly.", approve: true },
      { title: "Go live", text: "Nothing runs until you say yes.", approve: true },
      { title: "Optimise", text: "We tune bids and ads to lower your cost per lead." },
    ],
    faqs: [
      { q: "What budget do I need?", a: "We suggest starting from [₹10,000] a month in ad spend. We'll recommend the right amount for your goal." },
      { q: "How soon will I get leads?", a: "Search ads can bring enquiries within days of going live. Results improve as we optimise." },
      { q: "Who owns the ad account?", a: "You do. We work inside your account, so all data stays yours." },
    ],
    metaDescription:
      "Google Ads management from ₹1,999/month. Search, display and shopping campaigns tuned for leads by Tythas.",
  },
  {
    slug: "chatgpt-ads",
    number: "05",
    name: "ChatGPT Ads",
    heroWord: "ChatGPT Ads.",
    hook: "Be the answer when customers ask AI.",
    intro:
      "People now ask ChatGPT what to buy and who to hire. We set up and run ads that put your brand inside those conversations, early.",
    cardLine: "Be the answer when customers ask AI what to buy.",
    fromPrice: "₹2,499",
    fromUnit: "per month · ad spend separate",
    bubble: "Your first AI-chat campaign is ready to review.",
    cursors: [
      { label: "AI Engineer", color: "#F2C230", dark: true },
      { label: "Ads Manager", color: "#C2329E" },
    ],
    benefitsTitle: "The new search box is a chat. Be in it before your competitors.",
    benefits: [
      { title: "Account and eligibility", text: "We set up your ad account and check where you can run." },
      { title: "Conversation-ready copy", text: "Ads that sound helpful, not pushy." },
      { title: "Topic targeting", text: "Show up in chats about your category and problems you solve." },
      { title: "Conversion tracking", text: "See which chats turn into visits and sales." },
      { title: "Paired with AI search", text: "Ads plus content AI can cite, for paid and free reach." },
      { title: "Early-mover advantage", text: "Fewer advertisers today means more room to stand out." },
    ],
    plansNote: "Monthly management fee. No lock-in. Cancel anytime.",
    plans: [
      {
        name: "Basic",
        blurb: "Test the waters on AI ads.",
        price: "₹2,499",
        unit: "per month",
        features: [
          "1 to 2 campaigns managed",
          "Account setup and eligibility check",
          "Ad copy written for chat",
          "Conversion tracking",
          "Monthly performance report",
        ],
      },
      {
        name: "Growth",
        blurb: "Paid and organic AI reach together.",
        price: "₹4,999",
        unit: "per month",
        featured: true,
        features: [
          "Everything in Basic",
          "3 to 5 campaigns managed",
          "Ad and topic A/B testing",
          "2 AI-search content pieces a month",
          "Fortnightly report with next steps",
        ],
      },
      {
        name: "Advanced",
        blurb: "Lead your category in AI chats.",
        price: "₹7,999",
        unit: "per month",
        features: [
          "Everything in Growth",
          "Unlimited campaigns",
          "Daily monitoring and budget scaling",
          "Competitor visibility tracking",
          "Weekly report and strategy call",
        ],
      },
    ],
    plansFootnote: "Ad spend is paid directly to the platform and is not included in the plan price.",
    steps: [
      { title: "Eligibility check", text: "We confirm ChatGPT ads are open for your market." },
      { title: "Campaign plan", text: "Topics, copy and budget, laid out clearly.", approve: true },
      { title: "Go live", text: "Nothing runs until you say yes.", approve: true },
      { title: "Learn and scale", text: "We double down on the chats that convert." },
    ],
    faqs: [
      { q: "Are ChatGPT ads available in India?", a: "Availability is rolling out market by market. We'll check your eligibility on a free call before you pay anything." },
      { q: "How is this different from SEO?", a: "Ads put you in front of people now. AI search optimisation earns free mentions over time. The Growth plan does both." },
      { q: "What if it's not available for me yet?", a: "We'll start with AI search content so you're ready, and switch on ads the day they open up." },
    ],
    metaDescription:
      "ChatGPT ads setup and management from ₹2,499/month. Put your brand inside AI conversations with Tythas.",
  },
  {
    slug: "nfc-cards",
    number: "06",
    name: "NFC Cards",
    heroWord: "NFC Cards.",
    hook: "One tap from print to pipeline.",
    intro:
      "Smart NFC cards, standees and stickers that open your WhatsApp, reviews, menu or offer with one tap. Turn walk-ins into followers and leads.",
    cardLine: "One tap takes people from your print to your pipeline.",
    fromPrice: "₹1,999",
    fromUnit: "per pack · one-time",
    bubble: "Your card designs are ready to approve.",
    cursors: [
      { label: "Print Designer", color: "#5B4BD6" },
      { label: "Your customer, tapping", color: "#D9480F" },
    ],
    benefitsTitle: "Every counter, table and card becomes a lead magnet.",
    benefits: [
      { title: "Branded design", text: "Cards and standees that look as good as your brand." },
      { title: "Tap to anything", text: "WhatsApp, Google review, Instagram, menu or website." },
      { title: "Change links anytime", text: "Run a new offer without reprinting a thing." },
      { title: "Tap analytics", text: "See how many people tapped, and where." },
      { title: "QR backup", text: "Works for every phone, NFC or not." },
      { title: "Delivered ready", text: "Programmed, tested and shipped to your door." },
    ],
    plansNote: "One-time price per pack. Design, programming and setup included.",
    plans: [
      {
        name: "Starter",
        blurb: "Try it at one counter.",
        price: "₹1,999",
        unit: "per pack",
        features: ["10 NFC cards or stickers", "Branded design", "1 tap destination", "QR code backup"],
      },
      {
        name: "Business",
        blurb: "For stores, cafés and clinics.",
        price: "₹4,999",
        unit: "per pack",
        featured: true,
        features: [
          "25 units: cards, stickers and table standees",
          "Up to 3 tap destinations",
          "Links you can change anytime",
          "Tap analytics dashboard",
          "QR code backup",
        ],
      },
      {
        name: "Campaign",
        blurb: "For events, launches and multiple outlets.",
        price: "₹7,999",
        unit: "per pack",
        features: [
          "Everything in Business",
          "50 units",
          "Custom tap landing page",
          "Google review booster flow",
          "3 months of link management and reports",
        ],
      },
    ],
    plansFootnote: "Bulk and event orders get custom pricing. Delivery charged at actuals.",
    steps: [
      { title: "Choose a pack", text: "Tell us where taps should lead." },
      { title: "Design proof", text: "See exactly how each card and standee will look.", approve: true },
      { title: "Print and program", text: "Every unit tested before it ships." },
      { title: "Place and track", text: "Put them out and watch the taps come in." },
    ],
    faqs: [
      { q: "Do customers need an app?", a: "No. Most modern phones read NFC on their own. The QR code covers everyone else." },
      { q: "Can I change where it points later?", a: "Yes, on Business and Campaign. Switch offers or links without reprinting." },
      { q: "How long does delivery take?", a: "Usually [7 to 10] days after you approve the design." },
    ],
    metaDescription:
      "Branded NFC cards, stickers and standees from ₹1,999. One tap to WhatsApp, reviews or your offer. By Tythas.",
  },
  {
    slug: "ai-automation",
    number: "07",
    name: "AI Automation",
    heroWord: "AI Automation.",
    hook: "Your business, running 24/7.",
    intro:
      "AI chatbots and workflows that answer enquiries, follow up with leads and book calls while your team sleeps. Built on the tools you already use.",
    cardLine: "Bots and workflows that reply, qualify and book. Day and night.",
    fromPrice: "₹4,999",
    fromUnit: "one-time setup",
    bubble: "Your WhatsApp bot booked 3 calls overnight.",
    icon: "/icons/notion.svg",
    cursors: [
      { label: "AI Engineer", color: "#F2C230", dark: true },
      { label: "Developer", color: "#1C7F99" },
    ],
    benefitsTitle: "Never miss a lead because nobody replied.",
    benefits: [
      { title: "WhatsApp and website bots", text: "Trained on your business, answering in seconds." },
      { title: "Instant lead replies", text: "Every enquiry gets a reply, day or night." },
      { title: "Auto follow-ups", text: "Gentle nudges until the lead books or buys." },
      { title: "CRM and sheet sync", text: "Every lead logged in one place, automatically." },
      { title: "Appointment booking", text: "Customers pick a slot, your calendar fills up." },
      { title: "Team alerts", text: "Hot leads go straight to the right person." },
    ],
    plansNote: "One-time setup. Built, tested and handed over working.",
    plans: [
      {
        name: "Starter",
        blurb: "One smart assistant for your enquiries.",
        price: "₹4,999",
        unit: "one-time",
        features: [
          "1 chatbot on website or WhatsApp",
          "Trained on your FAQs and services",
          "Leads saved to Google Sheets",
          "1 round of tuning after launch",
        ],
      },
      {
        name: "Growth",
        blurb: "Capture, follow up and book, on autopilot.",
        price: "₹9,999",
        unit: "one-time",
        featured: true,
        features: [
          "Everything in Starter",
          "Chatbot on website and WhatsApp",
          "Automatic lead follow-ups",
          "CRM integration",
          "Appointment booking",
        ],
      },
      {
        name: "Advanced",
        blurb: "Custom workflows across your business.",
        price: "₹14,999",
        unit: "one-time",
        features: [
          "Everything in Growth",
          "Up to 5 custom workflows",
          "Multi-step lead qualification",
          "Team alerts and daily summary",
          "30 days of support",
        ],
      },
    ],
    plansFootnote:
      "Tool and usage costs (WhatsApp API, AI usage) are billed at actuals. Optional care plan from [₹999] a month.",
    steps: [
      { title: "Map the busywork", text: "We find the tasks eating your team's time." },
      { title: "Automation plan", text: "What runs automatically, and what stays human.", approve: true },
      { title: "Build and test", text: "You try every reply before it goes live.", approve: true },
      { title: "Launch and hand over", text: "It runs. We show your team how it works." },
    ],
    faqs: [
      { q: "Will it sound like a robot?", a: "No. We write its replies in your brand's voice, and you approve them before launch." },
      { q: "Is my customer data safe?", a: "Your data stays in your own accounts. We only connect what the automation needs." },
      { q: "Do I need to change my tools?", a: "Usually not. We build on WhatsApp, Google Sheets and the CRM you already use." },
    ],
    metaDescription:
      "AI chatbots and automation from ₹4,999. WhatsApp and website bots that reply, follow up and book. By Tythas.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
