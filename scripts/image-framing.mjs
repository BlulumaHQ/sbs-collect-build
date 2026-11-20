/**
 * Product photo framing for the square product cards.
 *
 * Each product image is downloaded once (small Shopify CDN rendition), analysed,
 * and given a "frame" the storefront uses to place it inside the 1:1 card:
 *
 *   { m: "b", bg, w, h, l, t, rw }  Solid / white background shot. The toy's own
 *                                    bounding box is found, the empty margin is
 *                                    trimmed and the toy is centred and scaled to
 *                                    fill the card — never cropped (heads stay on).
 *                                    w/h/l/t are % of the card; bg fills the card.
 *   { m: "c", x, y, rw }             Busy / full-bleed photo (box art, lifestyle).
 *                                    Filled with object-cover; x/y is the
 *                                    object-position chosen by an edge + colour
 *                                    "interest" search, biased towards the top on
 *                                    tall photos (where the head usually is).
 *   { m: "f" }                       Whole photo, no crop, no zoom (manual tag).
 *
 * rw = width to request from the Shopify CDN for a sharp card at 2x DPR.
 *
 * Manual overrides (Shopify product tags): image:full, image:cover, image:top.
 * Results are cached by URL in src/data/image-framing.json so only new photos
 * are downloaded. Needs `sharp`; without it the cache is reused as-is.
 */
import { createRequire } from "node:module";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CACHE = fileURLToPath(new URL("../src/data/image-framing.json", import.meta.url));
const VERSION = 1;
const CARD_PX = 720; // card ~360 CSS px at 2x
const FILL = 0.86; // toy fills 86% of the card's longer side
const MAX_ZOOM = 2.4; // vs plain contain — avoids blurry upscales
const ANALYSIS_PX = 220;

function loadSharp() {
  const dirs = [process.env.IMG_TOOLS_DIR, process.cwd()].filter(Boolean);
  for (const dir of dirs) {
    try {
      return createRequire(path.join(dir, "package.json"))("sharp");
    } catch {
      /* try next */
    }
  }
  return null;
}

const r2 = (n) => Math.round(n * 100) / 100;
const roundW = (n) => Math.min(2048, Math.max(300, Math.ceil(n / 100) * 100));
const hex = ([r, g, b]) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;

export function withWidth(url, width) {
  if (!url.includes("cdn.shopify.com")) return url;
  const u = new URL(url);
  u.searchParams.set("width", String(width));
  return u.toString();
}

/** Analyse raw RGB pixels (w×h) of an image whose aspect ratio is w/h. */
export function frameFromPixels(data, w, h) {
  const px = (x, y) => {
    const i = (y * w + x) * 3;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const diff = (a, b) =>
    Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]), Math.abs(a[2] - b[2]));

  // 1. Background: is the outer ring one uniform colour?
  const ring = Math.max(2, Math.round(Math.min(w, h) * 0.03));
  const border = [];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (x < ring || y < ring || x >= w - ring || y >= h - ring) border.push(px(x, y));
  const median = [0, 1, 2].map((c) => {
    const vals = border.map((p) => p[c]).sort((a, b) => a - b);
    return vals[vals.length >> 1];
  });
  const uniform = border.filter((p) => diff(p, median) <= 22).length / border.length;

  if (uniform >= 0.8) {
    // 2. Subject bounding box = pixels clearly different from the background.
    const rows = new Array(h).fill(0);
    const cols = new Array(w).fill(0);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++)
        if (diff(px(x, y), median) > 30) {
          rows[y]++;
          cols[x]++;
        }
    const minRow = Math.max(2, w * 0.012);
    const minCol = Math.max(2, h * 0.012);
    let y0 = rows.findIndex((c) => c >= minRow);
    let x0 = cols.findIndex((c) => c >= minCol);
    let y1 = h - 1 - [...rows].reverse().findIndex((c) => c >= minRow);
    let x1 = w - 1 - [...cols].reverse().findIndex((c) => c >= minCol);
    if (y0 >= 0 && x0 >= 0 && y1 > y0 && x1 > x0) {
      y0 = Math.max(0, y0 - 1);
      x0 = Math.max(0, x0 - 1);
      y1 = Math.min(h - 1, y1 + 1);
      x1 = Math.min(w - 1, x1 + 1);
      // Work in image pixels; the card is 1×1.
      const sw = x1 - x0 + 1;
      const sh = y1 - y0 + 1;
      const contain = 1 / Math.max(w, h);
      const s = Math.min(FILL / Math.max(sw, sh), MAX_ZOOM * contain);
      const cx = (x0 + x1 + 1) / 2;
      const cy = (y0 + y1 + 1) / 2;
      const dw = w * s;
      const dh = h * s;
      return {
        m: "b",
        bg: hex(median),
        w: r2(dw * 100),
        h: r2(dh * 100),
        l: r2((0.5 - cx * s) * 100),
        t: r2((0.5 - cy * s) * 100),
        rw: roundW(dw * CARD_PX),
      };
    }
  }

  // 3. Busy background → cover, pick the most interesting square window.
  const aspect = w / h;
  const coverRw = roundW(CARD_PX * Math.max(1, aspect));
  if (Math.abs(aspect - 1) < 0.12) return { m: "c", x: 50, y: 50, rw: coverRw };

  const lum = (p) => 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2];
  const sat = (p) => Math.max(...p) - Math.min(...p);
  const portrait = h > w;
  const len = portrait ? h : w;
  const win = portrait ? w : h;
  const line = new Array(len).fill(0); // energy per row (portrait) / column (landscape)
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const p = px(x, y);
      const e =
        Math.abs(lum(px(x + 1, y)) - lum(px(x - 1, y))) +
        Math.abs(lum(px(x, y + 1)) - lum(px(x, y - 1))) +
        0.35 * sat(p);
      line[portrait ? y : x] += e;
    }
  // Tall photos: heads live near the top — weight the top more.
  // Wide photos: mild centre preference.
  const weight = (i) =>
    portrait ? 1 + 0.9 * (1 - i / len) : 1 + 0.3 * (1 - Math.abs((2 * i) / len - 1));
  let best = 0;
  let bestScore = -1;
  for (let off = 0; off <= len - win; off++) {
    let sc = 0;
    for (let i = off; i < off + win; i++) sc += line[i] * weight(i);
    if (sc > bestScore) {
      bestScore = sc;
      best = off;
    }
  }
  const pos = len - win > 0 ? r2((best / (len - win)) * 100) : 50;
  return portrait ? { m: "c", x: 50, y: pos, rw: coverRw } : { m: "c", x: pos, y: 50, rw: coverRw };
}

async function analyseUrl(sharp, url) {
  const res = await fetch(withWidth(url, 400));
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const { data, info } = await sharp(buf)
    .rotate()
    .flatten({ background: "#ffffff" })
    .resize(ANALYSIS_PX, ANALYSIS_PX, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return frameFromPixels(data, info.width, info.height);
}

const OVERRIDES = {
  full: { m: "f" },
  cover: { m: "c", x: 50, y: 50, rw: CARD_PX },
  top: { m: "c", x: 50, y: 0, rw: CARD_PX },
};

/**
 * Attach `frame` / `hoverFrame` to each product (mutates). `imageFit` (from the
 * image:<full|cover|top> tag) overrides the analysis and is removed afterwards.
 */
export async function frameProducts(products) {
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf8")) : {};
  const frames = cache.version === VERSION ? (cache.frames ?? {}) : {};
  const sharp = loadSharp();
  const urls = [...new Set(products.flatMap((p) => [p.image, p.images?.[1]].filter(Boolean)))];
  const todo = urls.filter((u) => !frames[u]);

  if (todo.length && !sharp) {
    console.warn(`Image framing: sharp not installed, ${todo.length} new photos left unframed.`);
  } else if (todo.length) {
    let done = 0;
    let failed = 0;
    const queue = [...todo];
    await Promise.all(
      Array.from({ length: 8 }, async () => {
        for (let url = queue.shift(); url; url = queue.shift()) {
          try {
            frames[url] = await analyseUrl(sharp, url);
          } catch (err) {
            failed++;
            console.warn(`Image framing failed: ${err.message}`);
          }
          done++;
        }
      }),
    );
    console.log(`Image framing: analysed ${done - failed} new photos (${failed} failed).`);
  }

  for (const p of products) {
    const fit = OVERRIDES[p.imageFit ?? ""];
    p.frame = fit ?? frames[p.image] ?? null;
    p.hoverFrame = p.images?.[1] ? (fit ?? frames[p.images[1]] ?? null) : null;
    delete p.imageFit;
  }

  const keep = Object.fromEntries(urls.filter((u) => frames[u]).map((u) => [u, frames[u]]));
  writeFileSync(CACHE, `${JSON.stringify({ version: VERSION, frames: keep }, null, 1)}\n`);
}
