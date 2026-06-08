export const site = {
  name: "SavyGurl",
  legalName: "SavyGurl Fashion",
  tagline: "Affordable & Sustainable Women's Fashion",
  mantra: "More than fashion — it's how you show up for yourself.",
  description:
    "SavyGurl is an online boutique for trendy, affordable and size-inclusive women's fashion in regular and plus sizes. New arrivals weekly.",
  url: "https://www.savygurlfashion.com",
  email: "savygurlfashion@gmail.com",
  supportEmail: "info@savygurlfashion.com",
  phone: "347-669-1457",
  phoneHref: "tel:13476691457",
  hours: ["Mon–Fri · 10am – 5pm EST", "Sat · 10am – 3pm EST"],
  social: {
    instagram: "http://www.instagram.com/savygurlfashion",
    facebook: "http://www.facebook.com/savygurlfashion",
  },
  perks: [
    { title: "$2 Shipping Tuesdays", detail: "Flat $2 shipping on every order, every Tuesday." },
    { title: "Free shipping over $49", detail: "Spend $49 and shipping is on us." },
    { title: "Shop now, pay later", detail: "Split it up with PayPal & Afterpay at checkout." },
    { title: "Size-inclusive", detail: "Designed for women of every size — regular & plus." },
  ],
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const shopMenu: { label: string; href: string }[] = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Sets", href: "/collections/sets" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Jumpsuits", href: "/collections/jumpsuits" },
  { label: "Tops", href: "/collections/tops" },
  { label: "Bottoms", href: "/collections/bottoms" },
  { label: "Skirts", href: "/collections/skirts" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Outerwear", href: "/collections/outerwear" },
  { label: "Plus Size", href: "/collections/plus-size" },
  { label: "SavyGurl Merch", href: "/collections/merch" },
];

export const primaryNav: NavItem[] = [
  { label: "Shop", href: "/shop", children: shopMenu },
  { label: "New In", href: "/collections/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "Rewards", href: "/rewards" },
  { label: "Support", href: "/support" },
];
