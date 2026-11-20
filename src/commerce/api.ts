/**
 * Server functions — the only way pages and components read the catalogue.
 * The handlers run on the Worker; the browser receives just the products a
 * page shows, so the bundle stays small however many products Shopify has.
 */
import { createServerFn } from "@tanstack/react-start";
import type { CommerceCategory, CommerceProduct } from "@/types/commerce";
import type { ShopSearch } from "@/commerce/search-schema";
import { paginate, type CatalogPage } from "@/commerce/query";
import * as catalog from "@/commerce/catalog.server";

export type CatalogScope =
  | { kind: "all" }
  | { kind: "category"; slug: string }
  | { kind: "gundam" }
  | { kind: "preorder" }
  | { kind: "search"; q: string };

function scopeProducts(scope: CatalogScope): CommerceProduct[] {
  switch (scope.kind) {
    case "category":
      return catalog.getProductsByCategorySlug(scope.slug);
    case "gundam":
      return catalog.getGundamProducts();
    case "preorder":
      return catalog.getPreorderProducts();
    case "search":
      return catalog.searchProducts(scope.q);
    default:
      return catalog.getAllProducts();
  }
}

/** One filtered, sorted page of a catalogue view, plus its filter options. */
export const fetchCatalogPage = createServerFn({ method: "GET" })
  .validator((d: { scope: CatalogScope; search: ShopSearch }) => d)
  .handler(async ({ data }): Promise<CatalogPage> =>
    paginate(scopeProducts(data.scope), data.search),
  );

export interface SiteSummary {
  categories: CommerceCategory[];
  gundam: {
    total: number;
    grades: Record<string, number>;
    gundamSeries: Record<string, number>;
    available: number;
    newArrivals: number;
    preorder: number;
    sale: number;
  };
}

/** Menu counts, loaded once by the root route. */
export const fetchSiteSummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSummary> => {
    const g = catalog.getGundamProducts();
    const tally = (key: "grade" | "gundamSeries") =>
      g.reduce<Record<string, number>>((acc, p) => {
        const v = p[key];
        if (v) acc[v] = (acc[v] ?? 0) + 1;
        return acc;
      }, {});
    return {
      categories: catalog.getCategories().map(({ name, slug, count }) => ({
        name,
        slug,
        count,
        image: "",
      })),
      gundam: {
        total: g.length,
        grades: tally("grade"),
        gundamSeries: tally("gundamSeries"),
        available: g.filter((p) => p.status === "available").length,
        newArrivals: g.filter((p) => p.newArrival).length,
        preorder: g.filter((p) => p.status === "preorder").length,
        sale: g.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price).length,
      },
    };
  },
);

/** Everything the home page lists. */
export const fetchHome = createServerFn({ method: "GET" }).handler(async () => ({
  hot: catalog.getHotProducts(3),
  newArrivals: catalog.getNewArrivals(8),
  featured: catalog.getFeaturedProducts(),
  preorders: catalog.getPreorderProducts().slice(0, 4),
  onSale: catalog.getSaleProducts().slice(0, 4),
  total: catalog.getAllProducts().length,
}));

export const fetchProductPage = createServerFn({ method: "GET" })
  .validator((handle: string) => handle)
  .handler(async ({ data: handle }) => {
    const product = catalog.getProductByHandle(handle);
    if (!product) return null;
    return { product, related: catalog.getRelatedProducts(product) };
  });

export const fetchProductsByIds = createServerFn({ method: "GET" })
  .validator((ids: string[]) => ids.slice(0, 24))
  .handler(async ({ data }) => catalog.getProductsByIds(data));

/** Quick search for the header overlay. */
export const fetchSearchSuggestions = createServerFn({ method: "GET" })
  .validator((q: string) => q.slice(0, 80))
  .handler(async ({ data }) => {
    const results = catalog.searchProducts(data);
    return { items: results.slice(0, 6), total: results.length };
  });

export const fetchVendors = createServerFn({ method: "GET" }).handler(async () =>
  catalog.getVendors(),
);

export const fetchSeries = createServerFn({ method: "GET" }).handler(async () =>
  catalog.getSeries(),
);
