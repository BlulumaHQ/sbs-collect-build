/**
 * sitemap.xml and robots.txt, served by src/server.ts for whatever host the
 * request came in on (so the custom domain gets absolute URLs on its own domain).
 */
import { CATEGORY_ORDER, categorySlug } from "@/commerce/adapter";
import { getAllProducts, getCategories } from "@/commerce/catalog.server";
import { GUIDES } from "@/content/guides";

const STATIC_PATHS = [
  "/",
  "/shop",
  "/gundam",
  "/preorders",
  "/collections",
  "/brands",
  "/guides",
  "/about",
  "/contact",
  "/faq",
  "/shipping-information",
  "/pickup-information",
  "/terms-and-conditions",
  "/privacy-policy",
];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function sitemapXml(origin: string): string {
  const withProducts = new Set(
    getCategories()
      .filter((c) => c.count > 0)
      .map((c) => c.slug),
  );
  const urls: { loc: string; lastmod?: string }[] = [
    ...STATIC_PATHS.map((p) => ({ loc: p })),
    ...GUIDES.map((g) => ({ loc: g.path })),
    ...CATEGORY_ORDER.map(categorySlug)
      .filter((slug) => withProducts.has(slug))
      .map((slug) => ({ loc: `/shop/${slug}` })),
    ...getAllProducts().map((p) => ({
      loc: `/product/${encodeURIComponent(p.handle)}`,
      lastmod: p.createdAt?.slice(0, 10),
    })),
  ];
  const body = urls
    .map(
      (u) =>
        `<url><loc>${esc(origin + u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function robotsTxt(origin: string): string {
  return `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /account\nDisallow: /search\n\nSitemap: ${origin}/sitemap.xml\n`;
}
