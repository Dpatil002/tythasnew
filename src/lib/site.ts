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
  // 30-min strategy call: offered to Hot leads after the contact form
  calendarUrl: "https://cal.com/digambar-patil-mlckev/30min",
  // 15-min intro call: used on every "Book a free call" / "Schedule a call" button
  introCallUrl: "https://cal.com/digambar-patil-mlckev/15min",
  instagram: "https://www.instagram.com/tythas_digital",
  linkedin: "#",
  foundedYear: 2021,
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
