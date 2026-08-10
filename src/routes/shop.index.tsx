import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getAllProducts } from "@/commerce/adapter";
import { validateShopSearch, type ShopSearch } from "@/commerce/search-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";

export const Route = createFileRoute("/shop/")({
  validateSearch: validateShopSearch,
  head: () => ({
    meta: [
      { title: "Shop | Secret Builders Society" },
      {
        name: "description",
        content:
          "Browse the complete Secret Builders Society demo catalogue across figures, model kits, plush, blind boxes, hobby supplies, character goods, and apparel.",
      },
      { property: "og:title", content: "Shop | Secret Builders Society" },
      {
        property: "og:description",
        content: "Browse the complete Secret Builders Society demo catalogue.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const onChange = (next: ShopSearch) => {
    navigate({ to: ".", search: next });
  };

  return (
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Shop" }]} />
        <div className="mt-6">
          <SBSBuildRail index="01" label="Catalogue" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">All Products</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Browse the complete Secret Builders Society demo catalogue across figures, model kits, plush,
          blind boxes, hobby supplies, character goods, and apparel.
        </p>

        <div className="mt-10">
          <CatalogueBrowser
            scope={getAllProducts()}
            search={search}
            onChange={onChange}
            showCategoryFilter
          />
        </div>
      </div>
    </div>
  );
}
