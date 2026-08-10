/**
 * Store profile used across the header, footer, contact and info pages.
 * Confirmed Secret Builders Society details — shared space with Unity Tattoo.
 */
export const STORE = {
  name: "Secret Builders Society",
  legalName: "Secret Builders Society",
  addressLine: "1395 Commercial Drive",
  city: "Vancouver",
  region: "BC",
  country: "Canada",
  phone: "604.423.3343",
  phoneHref: "tel:6044233343",
  email: "hello@secretbuilderssociety.ca",
  currency: "CAD",
  currencyLabel: "Canada (CAD $)",
  mapsQuery: "1395 Commercial Drive, Vancouver, BC",
  hours: [
    { day: "Monday — Saturday", time: "11:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  /** Social accounts have not been supplied yet — prototype buttons only. */
  social: [
    { label: "Facebook" },
    { label: "Instagram" },
    { label: "TikTok" },
    { label: "X" },
  ],
} as const;

export const UNITY_TATTOO_URL = "https://unity-tattoo.com/";

export const STORE_IMAGE = "/images/store/sbs-unity-shared-store-concept.webp";
export const STORE_IMAGE_CAPTION =
  "Concept visualization of the shared SBS and Unity Tattoo space.";

export const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=1395+Commercial+Drive,+Vancouver,+BC&output=embed";
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=1395+Commercial+Drive,+Vancouver,+BC";
