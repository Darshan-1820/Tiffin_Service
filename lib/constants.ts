export const SITE = {
  name: "Tiffin Kart",
  tagline: "Fresh from Home. Delivered.",
  description:
    "Fresh tiffin delivery in Manish Nagar, Nagpur. Lunch & dinner with full ingredient transparency and nutrition tracking.",
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
  lunch: 2500,
  dinner: 2500,
  both: 3500,
  skipDays: "6–8 days/month",
} as const;

export const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "Fit Bite", href: "#fitbite" },
  { label: "Process", href: "#process" },
  { label: "Laundry", href: "#laundry" },
  { label: "Contact", href: "#contact" },
] as const;
