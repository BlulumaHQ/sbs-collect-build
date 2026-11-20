import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { fetchListing } from "@/commerce/catalog-api";
import { validateShopSearch, type ShopSearch } from "@/commerce/search-schema";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";

export const Route = createFileRoute("/preorders")({
  validateSearch: validateShopSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => fetchListing({ data: { scope: { kind: "preorder" }, search: deps } }),
  staleTime: 5 * 60_000,
  head: () => ({
    meta: [
      { title: "Preorders | Secret Builders Society" },
      {
        name: "description",
        content: "Preorder upcoming figures, model kits and collector goods at Secret Builders Society, Vancouver. Prices in CAD.",
      },
      { property: "og:title", content: "Preorders | Secret Builders Society" },
      {
        property: "og:description",
        content: "Preorder upcoming figures, model kits and collector goods at Secret Builders Society.",
      },
      { property: "og:url", content: "/preorders" },
    ],
    links: [{ rel: "canonical", href: "/preorders" }],
  }),
  component: PreordersPage,
});

function PreordersPage() {
  const listing = Route.useLoaderData();
  const search = Route.useSearch();
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
        <p className="micro mt-4 text-muted-foreground">{listing.scopeTotal} products</p>

        <div className="mt-12 lg:mt-16">
          <CatalogueBrowser scope={{ kind: "preorder" }} listing={listing} search={search} onChange={onChange} showFilters={false} />
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
