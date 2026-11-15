/**
 * Fallback classification for Shopify products that do not carry the
 * storefront's own `sbs-category:` tags (e.g. products the owner entered by
 * hand, or products created by the Plamod sync with its `category:` tags).
 *
 * Order of precedence in sync-shopify-catalog.mjs:
 *   1. sbs-category / sbs-subcategory tags (explicit, always win)
 *   2. Plamod `category:` / `subcategory:` tags, mapped below
 *   3. Title rules below, then the Shopify product category / type
 *
 * Vendor: Shopify's default vendor is the shop name ("My Store"); that is
 * replaced by a brand derived from the title, or left empty.
 */

/** Plamod `category:` tag → storefront category. */
export const PLAMOD_CATEGORY = {
  "plastic model kits": "Model Kits",
  "figures": "Figures",
  "blind box": "Blind Boxes",
  "tools / supplies": "Hobby Supplies",
  "plush": "Plush",
  "apparel": "Apparel",
  "character goods": "Character Goods",
};

/** Plamod `subcategory:` tag → storefront subcategory. */
export const PLAMOD_SUBCATEGORY = {
  "gunpla": "Gunpla",
  "sci-fi": "Sci-Fi",
  "character model": "Character Kits",
  "model kit acc": "Kit Accessories",
  "prize figure": "Prize Figures",
  "scale figure": "Scale Figures",
  "non-scale figure": "Non-Scale Figures",
  "markers": "Brushes & Markers",
  "tools": "Tools",
  "paints": "Paints",
};

/** Title rules, first match wins. */
export const TITLE_RULES = [
  { test: /blind box|hidden dissectibles|nendoroid surprise|kwistal fwenz|good night/i, category: "Blind Boxes" },
  { test: /gundam marker/i, category: "Hobby Supplies", subcategory: "Brushes & Markers" },
  { test: /nipper|tool set|tweezer|sanding/i, category: "Hobby Supplies", subcategory: "Tools" },
  { test: /paint pack|paint set/i, category: "Hobby Supplies", subcategory: "Paints" },
  { test: /action base/i, category: "Model Kits", subcategory: "Kit Accessories" },
  { test: /\bqmsv\b/i, category: "Figures", subcategory: "Chibi Figures" },
  { test: /mega cat project/i, category: "Figures", subcategory: "Non-Scale Figures" },
  { test: /grandista|digivice/i, category: "Figures", subcategory: "Prize Figures" },
  { test: /pok[eé]mon.*(model kit|select series)/i, category: "Model Kits", subcategory: "Character Kits" },
  { test: /vehicle model|death star|star destroyer|millennium falcon/i, category: "Model Kits", subcategory: "Sci-Fi" },
  { test: /gundam|gunpla|zaku|beargguy|pandagguy|\bgbft\b|\bmgsd\b|entry grade/i, category: "Model Kits", subcategory: "Gunpla" },
  { test: /model kit/i, category: "Model Kits" },
];

/** Shopify product category / product type keywords, used when no title rule matches. */
export const TYPE_RULES = [
  { test: /model kit|spacecraft/i, category: "Model Kits" },
  { test: /figure/i, category: "Figures" },
  { test: /model making|nipper|tool/i, category: "Hobby Supplies", subcategory: "Tools" },
  { test: /plush|stuffed/i, category: "Plush" },
  { test: /apparel|clothing|shirt/i, category: "Apparel" },
];

export const DEFAULT_CATEGORY = "Character Goods";

/** Brand rules for products whose vendor is still the shop's default name. */
export const VENDOR_RULES = [
  { test: /hidden dissectibles/i, vendor: "Mighty Jaxx" },
  { test: /nendoroid/i, vendor: "GOOD SMILE COMPANY" },
  { test: /mega cat project/i, vendor: "MegaHouse" },
  { test: /gundam marker|\bmr\.? basic/i, vendor: "GSI Creos" },
  { test: /\bgh-|ultimate nipper/i, vendor: "GodHand" },
  { test: /evangelion series figures blind box|naruto shippuden chronicles/i, vendor: "Funism" },
  { test: /grandista|digivice|bandai spirits/i, vendor: "BANDAI SPIRITS" },
  {
    test: /gundam|gunpla|zaku|beargguy|pandagguy|\bgbft\b|\bmgsd\b|entry grade|pok[eé]mon.*(model kit|select series)|vehicle model|death star|action base|qmsv/i,
    vendor: "BANDAI",
  },
];

/** Series rules (drives "related products" and series browsing). */
export const SERIES_RULES = [
  { test: /pok[eé]mon/i, series: "Pokémon" },
  { test: /star destroyer|millennium falcon|death star/i, series: "Star Wars" },
  { test: /one piece/i, series: "ONE PIECE" },
  { test: /evangelion/i, series: "Evangelion" },
  { test: /naruto/i, series: "NARUTO" },
  { test: /jujutsu|jujustu/i, series: "Jujutsu Kaisen" },
  { test: /dragon ball/i, series: "Dragon Ball" },
  { test: /digimon/i, series: "Digimon" },
  { test: /beargguy|pandagguy|\bgbft\b/i, series: "Gundam Build Fighters" },
];

function first(rules, text) {
  return rules.find((r) => r.test.test(text));
}

/** Shop default vendor names that mean "no brand entered". */
export function isPlaceholderVendor(vendor, shopName) {
  const v = (vendor ?? "").trim().toLowerCase();
  return !v || v === "my store" || (shopName && v === shopName.trim().toLowerCase());
}

export function classify({ title, productType, shopifyCategory, plamodCategory, plamodSubcategory }) {
  const pc = plamodCategory && PLAMOD_CATEGORY[plamodCategory.toLowerCase()];
  if (pc) {
    return { category: pc, subcategory: (plamodSubcategory && PLAMOD_SUBCATEGORY[plamodSubcategory.toLowerCase()]) || null };
  }
  const byTitle = first(TITLE_RULES, title);
  if (byTitle) return { category: byTitle.category, subcategory: byTitle.subcategory ?? null };
  const typeText = [shopifyCategory, productType].filter(Boolean).join(" ");
  const byType = typeText && first(TYPE_RULES, typeText);
  if (byType) return { category: byType.category, subcategory: byType.subcategory ?? null };
  return { category: DEFAULT_CATEGORY, subcategory: null };
}

export function guessVendor(title) {
  return first(VENDOR_RULES, title)?.vendor ?? "";
}

export function guessSeries(title) {
  return first(SERIES_RULES, title)?.series ?? null;
}
