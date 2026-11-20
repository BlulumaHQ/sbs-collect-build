import { slugify } from "./adapter";
import brandLogoData from "@/data/brand-logos.json";

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
  "tamashii-nations": "tamashii-nations-logo.png",
  kotobukiya: "kotobukiya-logo.png",
  godhand: "godhand-logo.png",
  taito: "taito-logo.png",
  sega: "sega-logo.png",
  furyu: "furyu-logo.png",
  threezero: "threezero-logo.svg",
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

/** Plamod brand marks, trimmed and scaled to equal visual weight (scripts in sbs-work/brand_logos.py). */
const BRAND_LOGOS = brandLogoData as Record<string, { src: string; w: number; h: number }>;

export function brandLogoSized(vendor: string): { src: string; w: number; h: number } | null {
  return BRAND_LOGOS[slugify(vendor)] ?? null;
}

export function brandLogo(vendor: string): string | null {
  const file = BRAND_LOGO_FILES[slugify(vendor)];
  return file ? `/images/brands/${file}` : null;
}

/** SBS collection key art (16:9, real product photos), by series slug. */
const SERIES_SBS: Record<string, string> = {
  "demon-slayer": "demon-slayer",
  "dragon-ball": "dragon-ball",
  "dragon-ball-z": "dragon-ball",
  evangelion: "evangelion",
  haikyu: "haikyu",
  "hatsune-miku": "hatsune-miku",
  "jujutsu-kaisen": "jujutsu-kaisen",
  gundam: "gundam",
  "mobile-suit-gundam": "gundam",
  "my-hero-academia": "my-hero-academia",
  naruto: "naruto",
  "naruto-shippuden": "naruto",
  "one-piece": "one-piece",
  pokemon: "pokemon",
  "star-wars": "star-wars-vader",
};

export function seriesArtwork(series: string): string {
  const slug = slugify(series);
  const sbs = SERIES_SBS[slug];
  if (sbs) return `/images/collections/sbs-${sbs}.webp`;
  return SERIES_JPG.has(slug)
    ? `/images/collections/${slug}.jpg`
    : `/images/collections/${slug}.svg`;
}

export const CATEGORY_ARTWORK: Record<string, { src: string; alt: string }> = {
  Figures: {
    src: "/images/categories/figures.webp",
    alt: "Anime figures collage: scale, non-scale, chibi and action figures from Dragon Ball, One Piece, Jujutsu Kaisen and more",
  },
  "Model Kits": {
    src: "/images/categories/model-kits.webp",
    alt: "Model kits collage: Gunpla HG, RG, MG and PG Gundam kits including RX-78-2, Unicorn and Strike Freedom",
  },
  Plush: {
    src: "/images/categories/plush.webp",
    alt: "Anime plush collage: character plushies, mascots and plush keychains including Chopper and Haro",
  },
  "Blind Boxes": {
    src: "/images/categories/blind-boxes.webp",
    alt: "Blind boxes collage: gacha capsules, trading figures and mascot blind box series",
  },
  "Hobby Supplies": {
    src: "/images/categories/hobby-supplies.webp",
    alt: "Hobby supplies collage: airbrushes, Mr. Hobby and SMS paints, nippers, cement and finishing tools",
  },
  "Character Goods": {
    src: "/images/categories/character-goods.webp",
    alt: "Character goods collage: acrylic stands, keychains, replicas, home goods and pins",
  },
  Apparel: {
    src: "/images/categories/apparel.webp",
    alt: "Anime apparel collage: hoodies, tees, knit sweaters, accessories and cosplay pieces",
  },
};
