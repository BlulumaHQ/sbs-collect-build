import { slugify } from "./adapter";

/**
 * Local artwork resolvers.
 *
 * Brand marks and series/franchise artwork are stored as physical files under
 * /public/images/brands and /public/images/collections. Dropping an official
 * asset in at the same slug replaces the prototype plate with no code change.
 */

const BRAND_LOGO_FILES: Record<string, string> = {
  "16-directions": "16-directions-logo.png",
  "52toys": "52toys-logo.png",
  bandai: "bandai-logo.svg",
  "bandai-hobby": "bandai-hobby-logo.svg",
  "bushiroad-creative": "bushiroad-creative-logo.svg",
  bellfine: "bellfine-logo.png",
  capcom: "capcom-logo.svg",
  "good-smile-company": "good-smile-company-logo.svg",
  "gsi-creos": "gsi-creos-logo.svg",
  "goodsmile-moment": "goodsmile-moment-logo.png",
  "max-limited": "max-limited-logo.png",
  "marimo-craft": "marimo-craft-logo.png",
  megahouse: "megahouse-logo.svg",
  "presence-co-ltd": "presence-logo.png",
  "square-enix": "square-enix-logo.svg",
  toptoy: "toptoy-logo.png",
};


/** Series that have photographic franchise key art (jpg); the rest use SVG plates. */
const SERIES_JPG = new Set([
  "blue-lock",
  "chainsaw-man",
  "kirby",
  "monster-hunter",
  "nierautomata",
  "one-piece",
  "pokemon",
  "street-fighter",
]);

export function brandLogo(vendor: string): string | null {
  const file = BRAND_LOGO_FILES[slugify(vendor)];
  return file ? `/images/brands/${file}` : null;
}

export function seriesArtwork(series: string): string {
  const slug = slugify(series);
  return SERIES_JPG.has(slug)
    ? `/images/collections/${slug}.jpg`
    : `/images/collections/${slug}.svg`;
}

export const CATEGORY_ARTWORK: Record<string, { src: string; alt: string }> = {
  Figures: {
    src: "/images/categories/figures.webp",
    alt: "Anime figures key art: scale, chibi and action figures posed together",
  },
  "Model Kits": {
    src: "/images/categories/model-kits.webp",
    alt: "Model kits key art: Gundam, mecha and scale kits with sprues and tools",
  },
  Plush: {
    src: "/images/categories/plush.webp",
    alt: "Plush key art: soft collectible characters and animal plushies",
  },
  "Blind Boxes": {
    src: "/images/categories/blind-boxes.webp",
    alt: "Blind box key art: designer mystery box series and capsule figures",
  },
  "Hobby Supplies": {
    src: "/images/categories/hobby-supplies.webp",
    alt: "Hobby supplies key art: airbrush, paints, nippers, files and markers",
  },
  "Character Goods": {
    src: "/images/categories/character-goods.webp",
    alt: "Character goods key art: acrylic stands, keychains, pins and stationery",
  },
  Apparel: {
    src: "/images/categories/apparel.webp",
    alt: "Apparel key art: Japanese-inspired collector tees, hoodies and caps",
  },
};

