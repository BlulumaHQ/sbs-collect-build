#!/usr/bin/env node
/**
 * Snapshot the Shopify catalogue into src/data/shopify-products.json.
 *
 * The storefront reads that file at build time (see src/commerce/adapter.ts),
 * so pages stay static, SEO-friendly and need no runtime API token.
 * Re-run after products change in Shopify, then commit the JSON.
 *
 *   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com \
 *   SHOPIFY_STOREFRONT_TOKEN=xxxxxxxx \
 *   node scripts/sync-shopify-catalog.mjs
 *
 * Products are mapped from tags written by the Plamod sync:
 *   sbs-category:<Figures|Model Kits|...>  sbs-subcategory:<menu name>
 *   franchise:Gundam  grade:<HG|...>  gundam-series:<uc|...>  series:<name>  new-arrival
 *   featured  (home page "Featured Picks", and first in the shop's "Featured" sort)
 *   hot  (home hero "On Our Shelf" slide)
 *   preorder  release:<YYYY-MM>  preorder-deadline:<YYYY-MM-DD>  (pre-order ship month / close date)
 *   image:<full|cover|top>  (manual card photo framing)
 * Products without an sbs-category tag are classified by scripts/catalog-rules.mjs
 * (Plamod category tags, then title rules, then the Shopify product category).
 * Only products published to the storefront's sales channel are returned.
 * Each product photo is also framed for the square cards (scripts/image-framing.mjs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { classify, guessSeries, guessVendor, isPlaceholderVendor } from "./catalog-rules.mjs";
import { frameProducts } from "./image-framing.mjs";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../src/data/shopify-products.json", import.meta.url));
const API_VERSION = "2025-01";

const QUERY = `query Products($cursor: String) {
  products(first: 250, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id handle title vendor productType tags availableForSale createdAt
      category { name }
      descriptionHtml
      featuredImage { url }
      staffPick: metafield(namespace: "custom", key: "staff_pick") { value }
      images(first: 10) { nodes { url } }
      variants(first: 1) {
        nodes {
          id sku barcode availableForSale
          price { amount currencyCode }
          compareAtPrice { amount }
        }
      }
    }
  }
}`;

/** Shopify description HTML -> plain text that keeps line breaks (<br>, </p>, </li>). */
function htmlToText(html) {
  return (html ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Restock pre-orders carry the kit's ORIGINAL Plamod release month (e.g. 2020-01), which is not a
// ship date. Clean it here (GitHub Actions has a real clock; a Worker's module-level clock is 1970).
const THIS_MONTH = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver" })
  .format(new Date())
  .slice(0, 7);

function upcomingMonth(value) {
  const m = value?.match(/^(\d{4}-\d{2})/);
  return m && m[1] < THIS_MONTH ? null : value;
}

function stripPastRelease(text) {
  if (!text) return text;
  return text.replace(/- Expected release: (\d{4}-\d{2})[^\n]*/g, (line, month) =>
    month < THIS_MONTH ? "- Expected release: Restock - date to be confirmed" : line,
  );
}

function tagValue(tags, key) {
  const prefix = `${key}:`;
  const tag = tags.find((t) => t.toLowerCase().startsWith(prefix));
  return tag ? tag.slice(prefix.length).trim() || null : null;
}

function numericId(gid) {
  return gid ? String(gid).split("/").pop() : null;
}

/** Map one Storefront API product node to the RawProduct shape used by the adapter. */
export function mapProduct(node, shopName = "", previous = new Map()) {
  const tags = node.tags ?? [];
  let category = tagValue(tags, "sbs-category");
  let subcategory = tagValue(tags, "sbs-subcategory");
  if (!category) {
    const c = classify({
      title: node.title,
      productType: node.productType,
      shopifyCategory: node.category?.name,
      plamodCategory: tagValue(tags, "category"),
      plamodSubcategory: tagValue(tags, "subcategory"),
    });
    category = c.category;
    subcategory = subcategory ?? c.subcategory;
  }
  const vendor = isPlaceholderVendor(node.vendor, shopName) ? guessVendor(node.title) : node.vendor;
  const variant = node.variants?.nodes?.[0];
  if (!variant) return null;
  let images = (node.images?.nodes ?? []).map((i) => i.url).filter(Boolean);
  let image = node.featuredImage?.url ?? images[0] ?? "";
  if (!image) {
    // Photos mid-replacement in Shopify (e.g. a bulk image import): keep last snapshot's photos
    // so the product doesn't vanish from the site for a sync or two.
    const prev = previous.get(node.handle);
    if (!prev?.image) return null;
    image = prev.image;
    images = prev.images?.length ? prev.images : [prev.image];
  }
  const price = Number(variant.price?.amount ?? 0);
  const compareAt = variant.compareAtPrice?.amount ? Number(variant.compareAtPrice.amount) : null;
  const available = variant.availableForSale ?? node.availableForSale;
  return {
    id: numericId(node.id),
    handle: node.handle,
    title: node.title,
    vendor,
    category,
    subcategory,
    series: tagValue(tags, "series") ?? guessSeries(node.title),
    franchise: tagValue(tags, "franchise"),
    grade: tagValue(tags, "grade"),
    gundamSeries: tagValue(tags, "gundam-series"),
    newArrival: tags.some((t) => t.toLowerCase() === "new-arrival") || null,
    featured: tags.some((t) => t.toLowerCase() === "featured") || null,
    // Home hero "On Our Shelf" picks
    hot: tags.some((t) => t.toLowerCase() === "hot") || null,
    // Supplier has only a few left: product page says we confirm the order (tag set by the Plamod sync)
    confirmStock: tags.some((t) => t.toLowerCase() === "confirm-stock") || null,
    createdAt: node.createdAt ?? null,
    // Plain-text product description from Shopify (trimmed to keep the snapshot lean)
    description: stripPastRelease(htmlToText(node.descriptionHtml).slice(0, 2000)) || null,
    status: tags.some((t) => t.toLowerCase() === "preorder")
      ? "preorder"
      : available
        ? "available"
        : "sold-out",
    price,
    currency: variant.price?.currencyCode ?? "CAD",
    compareAtPrice: compareAt && compareAt > price ? compareAt : null,
    sku: variant.sku || null,
    upc: variant.barcode || null,
    variantId: numericId(variant.id),
    image,
    images: images.length ? images : [image],
    // image:full | image:cover | image:top — manual photo framing override
    imageFit: tagValue(tags, "image")?.toLowerCase() ?? null,
    // Pre-order details: release:2027-02  preorder-deadline:2026-12-15
    estimatedRelease: upcomingMonth(tagValue(tags, "release")),
    preorderDeadline: tagValue(tags, "preorder-deadline"),
    // Store manager note — product metafield custom.staff_pick (Storefront access on)
    staffPick: node.staffPick?.value?.trim() || null,
  };
}

async function storefront(domain, token, query, variables = {}) {
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Storefront API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

async function main() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) {
    console.error("Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN.");
    process.exit(1);
  }
  const products = [];
  const shopRes = await storefront(domain, token, "{ shop { name } }");
  const shopName = shopRes.shop?.name ?? "";
  let previous = new Map();
  try {
    const prev = JSON.parse(readFileSync(OUT, "utf8"));
    previous = new Map((prev.products ?? []).map((p) => [p.handle, p]));
  } catch {
    /* first run */
  }
  let cursor = null;
  let skipped = 0;
  for (;;) {
    const data = await storefront(domain, token, QUERY, { cursor });
    const page = data.products;
    for (const node of page.nodes) {
      const mapped = mapProduct(node, shopName, previous);
      if (mapped) products.push(mapped);
      else skipped += 1;
    }
    if (!page.pageInfo.hasNextPage) break;
    cursor = page.pageInfo.endCursor;
  }
  await frameProducts(products);
  const out = { shopDomain: domain, generatedAt: new Date().toISOString(), products };
  writeFileSync(OUT, `${JSON.stringify(out, null, 1)}\n`);
  console.log(`Wrote ${products.length} products (${skipped} skipped: no variant or image).`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
