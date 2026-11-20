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
  phone: "778-928-6412",
  phoneHref: "tel:7789286412",
  email: "info@secretbuilderssociety.ca",
  /** Public site address — used for absolute share-image and og:url links. */
  siteUrl: "https://secretbuilderssociety.ca",
  currency: "CAD",
  /** Shopify store used for checkout permalinks. */
  shopifyDomain: "2zzz0q-zy.myshopify.com",
  /** Free standard shipping threshold (CAD). Shopify shipping rates must match. */
  freeShippingThreshold: 300,
  currencyLabel: "Canada (CAD $)",
  mapsQuery: "1395 Commercial Drive, Vancouver, BC",
  hours: [
    { day: "Fri – Sun", time: "12 PM – 7 PM" },
    { day: "Mon – Thu", time: "Closed" },
  ],
  /** One wording for pickup timing everywhere (FAQ, pickup page, product page, cart). */
  pickupLeadTime:
    "Most items are ordered in from our supplier once a week, so pickup orders are usually ready the following Friday–Sunday. We email you when your order is ready — no same-day pickup.",
  /** One wording for walk-in visits everywhere. */
  walkIn:
    "Walk-ins are welcome Friday–Sunday, 12–7 PM, to browse our in-store shelves. We keep a small curated selection in store — most of the online catalogue is ordered in for you.",
  /** The shop's social accounts (no TikTok or X yet). */
  social: [
    { label: "Instagram", handle: "@secretbuilderssociety", href: "https://www.instagram.com/secretbuilderssociety/" },
    { label: "Facebook", handle: "Secret Builders Society", href: "https://www.facebook.com/profile.php?id=61591124742042" },
  ],
} as const;

export const UNITY_TATTOO_URL = "https://unity-tattoo.com/";

/** Real Unity Tattoo assets supplied by the store owner. */
export const UNITY_TATTOO_LOGO = "/images/store/unity-tattoo-logo.png";
export const UNITY_TATTOO_INTERIOR_PHOTO = "/images/store/unity-tattoo-interior.webp";
export const UNITY_TATTOO_STOREFRONT_PHOTO = "/images/store/unity-tattoo-storefront.jpg";

/** Real in-store photos of Secret Builders Society (Nov 2026). */
export type StorePhoto = {
  /** Full-size image (≈1600px long edge) — used in the lightbox. */
  src: string;
  /** Small image (≈800px long edge) — used in grids. */
  srcSm: string;
  alt: string;
  caption: string;
  orientation: "landscape" | "portrait";
};

const photo = (
  file: string,
  alt: string,
  caption: string,
  orientation: StorePhoto["orientation"],
): StorePhoto => ({
  src: `/images/store/${file}.webp`,
  srcSm: `/images/store/${file}-sm.webp`,
  alt,
  caption,
  orientation,
});

export const STORE_PHOTOS = {
  interiorWide: photo(
    "sbs-shop-interior-wide",
    "Secret Builders Society shop corner with Gundam model kits, One Piece blind boxes and a Gundam cartoon on the TV",
    "The SBS corner inside 1395 Commercial Drive",
    "landscape",
  ),
  gunplaShelf: photo(
    "sbs-gunpla-anime-collectibles-shelf",
    "Wooden shelves of Gundam model kits, One Piece blind boxes, Evangelion figures and Naruto collectibles under a Gundam cartoon",
    "Gunpla, One Piece and Evangelion on the shelves",
    "portrait",
  ),
  pokemonKits: photo(
    "sbs-pokemon-star-wars-model-kits",
    "Bandai Pokémon model kits including Lugia and Rayquaza, with Star Wars Death Star and Star Destroyer kits below",
    "Pokémon and Star Wars model kits",
    "portrait",
  ),
  storefrontSign: photo(
    "sbs-hobby-shop-sign-storefront",
    "Secret Builders Society Hobby Shop sandwich board in front of the Unity Tattoo storefront",
    "Hobby Shop sign outside 1395 Commercial Drive",
    "landscape",
  ),
  frontEntrance: photo(
    "sbs-hobby-shop-front-entrance",
    "Front entrance at 1395 Commercial Drive with the Secret Builders Society Hobby Shop sign by the door",
    "Front door at 1395 Commercial Drive",
    "landscape",
  ),
  sidewalkSign: photo(
    "sbs-hobby-shop-sidewalk-sign",
    "Secret Builders Society Hobby Shop sidewalk sign on Commercial Drive",
    "Look for this sign on the sidewalk",
    "portrait",
  ),
} satisfies Record<string, StorePhoto>;

/** Curated inside-the-shop set — one overview + two detail shots, no near-duplicates. */
export const STORE_GALLERY: StorePhoto[] = [
  STORE_PHOTOS.interiorWide,
  STORE_PHOTOS.gunplaShelf,
  STORE_PHOTOS.pokemonKits,
];

export const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=1395+Commercial+Drive,+Vancouver,+BC&output=embed";
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=1395+Commercial+Drive,+Vancouver,+BC";
