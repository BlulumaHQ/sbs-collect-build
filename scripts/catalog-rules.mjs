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
  "capsule toy": "Blind Boxes",
  "tools / supplies": "Hobby Supplies",
  "plush": "Plush",
  "apparel": "Apparel",
  "character goods": "Character Goods",
  "life style": "Character Goods",
  "puzzles & toys": "Character Goods",
};

/** Plamod `category/subcategory` pairs that move to another storefront category. */
export const PLAMOD_CATEGORY_OVERRIDE = {
  "life style/plush": "Plush",
  "life style/clothing": "Apparel",
};

/** Plamod `subcategory:` tag → storefront subcategory (keys are lower-case). */
export const PLAMOD_SUBCATEGORY = {
  // Model Kits
  "gunpla": "Gunpla",
  "character model kits": "Character Kits",
  "character model": "Character Kits",
  "mech model kits": "Mech Kits",
  "scale model kits": "Scale Kits",
  "original series model kits": "Original Series",
  "sci-fi": "Sci-Fi",
  "model kit accessories": "Kit Accessories",
  "model kit acc": "Kit Accessories",
  "decals": "Kit Accessories",
  // Figures
  "scale figure": "Scale Figures",
  "non scale figure": "Non-Scale Figures",
  "non-scale figure": "Non-Scale Figures",
  "action figure": "Action Figures",
  "prize figure": "Prize Figures",
  "statue": "Statues",
  "figure accessories": "Figure Accessories",
  "dolls": "Chibi Figures",
  // Hobby Supplies
  "paints": "Paints",
  "primers / thinners": "Paints",
  "sprays": "Paints",
  "air brushes": "Airbrushes",
  "tools": "Tools",
  "nippers": "Tools",
  "polishing": "Finishing",
  "brushes": "Brushes & Markers",
  "markers": "Brushes & Markers",
  "shelving": "Display Cases & Storage",
};

/** Product-type / title refinements applied after the Plamod subcategory. */
export const SUBCATEGORY_REFINE = [
  { category: "Figures", test: /^(nendoroid|figuarts mini|hello! good smile|lookup)$/i, field: "type", subcategory: "Chibi Figures" },
  { category: "Hobby Supplies", test: /compressor/i, field: "title", subcategory: "Compressors" },
];

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
  const pcKey = (plamodCategory ?? "").trim().toLowerCase();
  const psKey = (plamodSubcategory ?? "").trim().toLowerCase();
  const pc = PLAMOD_CATEGORY_OVERRIDE[`${pcKey}/${psKey}`] ?? PLAMOD_CATEGORY[pcKey];
  if (pc) {
    let subcategory = PLAMOD_SUBCATEGORY[psKey] ?? null;
    for (const r of SUBCATEGORY_REFINE) {
      const text = r.field === "type" ? (productType ?? "") : (title ?? "");
      if (r.category === pc && r.test.test(text)) subcategory = r.subcategory;
    }
    return { category: pc, subcategory };
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
