import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { fetchCatalogPage } from "@/commerce/api";
import { validateShopSearch, type ShopSearch } from "@/commerce/search-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";

const DESCRIPTION =
  "Pre-order upcoming Gunpla, figures and collectibles at Secret Builders Society, Vancouver. Expected ship months and pre-order deadlines on every item.";

export const Route = createFileRoute("/preorders")({
  // Search params are optional here so plain links to /preorders work.
  validateSearch: (s: Record<string, unknown>): Partial<ShopSearch> => validateShopSearch(s),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps }) =>
    fetchCatalogPage({
      data: {
        scope: { kind: "preorder" },
        search: { ...deps.search, sort: deps.search.sort ?? "featured" },
      },
    }),
  head: () => ({
    meta: [
      { title: "Pre-orders | Secret Builders Society" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Pre-orders | Secret Builders Society" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/preorders" },
    ],
    links: [{ rel: "canonical", href: "/preorders" }],
  }),
  component: PreordersPage,
});

function PreordersPage() {
  const page = Route.useLoaderData();
  const raw = Route.useSearch();
  const search: ShopSearch = { ...raw, sort: raw.sort ?? "featured" };
  const navigate = useNavigate({ from: "/preorders" });
  const onChange = (next: ShopSearch) => navigate({ to: ".", search: next });

  return (
    <div>
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Preorders" }]} />
        <div className="mt-6">
          <SBSBuildRail index="04" label="Preorders" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">On the Horizon</h1>

        <div className="mt-10">
          <CatalogueBrowser data={page} search={search} onChange={onChange} showCategoryFilter />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/shop"
            search={{ sort: "featured" }}
            className="micro border border-charcoal px-6 py-3 transition-colors duration-200 hover:bg-charcoal hover:text-white"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
