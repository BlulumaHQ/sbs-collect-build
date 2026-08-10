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

