/**
 * Store profile used across the header, footer, contact and info pages.
 * Prototype values — replace with the client's confirmed details before launch.
 */
export const STORE = {
  name: "Secret Builders Society",
  legalName: "Secret Builders Society Inc.",
  addressLine: "1188 Kennedy Road, Unit 4",
  city: "Scarborough",
  region: "Ontario",
  postal: "M1P 2L1",
  country: "Canada",
  phone: "(416) 555-0182",
  email: "hello@secretbuilderssociety.ca",
  currency: "CAD",
  freeShippingThreshold: 150,
  hours: [
    { day: "Monday — Thursday", time: "11:00 — 19:00" },
    { day: "Friday — Saturday", time: "11:00 — 20:00" },
    { day: "Sunday", time: "12:00 — 18:00" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Discord", href: "https://discord.com" },
  ],
} as const;

export const SHIPPING_LINE = `Free shipping across Canada on orders over $${STORE.freeShippingThreshold} CAD`;
