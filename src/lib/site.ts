export const site = {
  name: "Tythas Digital",
  tagline: "Results that matter.",
  url: "https://www.tythas.com",
  email: "contact@tythas.com",
  location: "Pune, Maharashtra, India",
  // TODO: replace with the real WhatsApp Business number (digits only, with country code)
  whatsappNumber: "910000000000",
  whatsappDisplay: "[+91 XXXXX XXXXX]",
  replyTime: "24 hours",
  // TODO: replace with your real booking link (Calendly, Cal.com, Google Calendar appointment page)
  calendarUrl: "https://cal.com/[your-link]",
  instagram: "https://www.instagram.com/tythas_digital",
  linkedin: "#",
  foundedYear: 2021,
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
