export const SITE = {
  name: "Tiffin Cart",
  tagline: "Home-cooked. Delivered.",
  description:
    "Fresh, home-cooked tiffin delivery in Manish Nagar, Nagpur. Lunch & Dinner with full ingredient transparency.",
  url: "https://tiffincart.in",
} as const;

export const CONTACT = {
  phone: "+918983528922",
  whatsapp: "https://wa.me/918983528922",
  address: "Manish Nagar, Nagpur, Maharashtra",
  area: "Manish Nagar & surrounding areas",
  hours: "Lunch 8 AM – 12 PM  /  Dinner 5 – 9 PM",
} as const;

export const PRICING = {
  lunch: 2400,
  dinner: 2800,
  both: 3100,
  skipDays: "6–8 days/month",
} as const;

export const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;
