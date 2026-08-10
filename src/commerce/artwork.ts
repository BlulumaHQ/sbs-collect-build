import { slugify } from "./adapter";

/**
 * Local artwork resolvers.
 *
 * Brand marks and series/franchise artwork are stored as physical files under
 * /public/images/brands and /public/images/collections. Dropping an official
 * asset in at the same slug replaces the prototype plate with no code change.
 */

const BRAND_LOGO_SLUGS = new Set([
  "16-directions",
  "52toys",
  "bandai",
  "bandai-hobby",
  "bushiroad-creative",
  "bellfine",
  "capcom",
  "good-smile-company",
  "gsi-creos",
  "goodsmile-moment",
  "max-limited",
  "marimo-craft",
  "megahouse",
  "presence-co-ltd",
  "square-enix",
  "toptoy",
]);

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
  const slug = slugify(vendor);
  return BRAND_LOGO_SLUGS.has(slug) ? `/images/brands/${slug}.svg` : null;
}

export function seriesArtwork(series: string): string {
  const slug = slugify(series);
  return SERIES_JPG.has(slug)
    ? `/images/collections/${slug}.jpg`
    : `/images/collections/${slug}.svg`;
}

export const CATEGORY_ARTWORK: Record<string, { src: string; alt: string }> = {
  Figures: {
    src: "/images/categories/figures.jpg",
    alt: "Collector display cabinet filled with posed figures and statues",
  },
  "Model Kits": {
    src: "/images/categories/model-kits.jpg",
    alt: "Model building workbench with sprues, tools and a partially assembled mecha",
  },
  Plush: {
    src: "/images/categories/plush.jpg",
    alt: "Curated plush display wall in a collectible shop",
  },
  "Blind Boxes": {
    src: "/images/categories/blind-boxes.jpg",
    alt: "Mystery box and capsule toy retail wall",
  },
  "Hobby Supplies": {
    src: "/images/categories/hobby-supplies.jpg",
    alt: "Airbrush, paints, cutting mat and model finishing tools",
  },
  "Character Goods": {
    src: "/images/categories/character-goods.jpg",
    alt: "Character goods wall with acrylic stands, keychains and stationery",
  },
  Apparel: {
    src: "/images/categories/apparel.jpg",
    alt: "Collector streetwear rack with graphic tees and hoodies",
  },
};
