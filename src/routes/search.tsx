import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { searchProducts } from "@/commerce/adapter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductGrid } from "@/components/commerce/ProductGrid";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Search | Secret Builders Society" },
      {
        name: "description",
        content: "Search the Secret Builders Society demo catalogue by title, maker, series or code.",
      },
      { property: "og:title", content: "Search | Secret Builders Society" },
      {
        property: "og:description",
        content: "Search the Secret Builders Society demo catalogue.",
      },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [value, setValue] = useState(q);
  const results = searchProducts(q);

  return (
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Search" }]} />
        <div className="mt-6">
          <SBSBuildRail index="07" label="Search" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">Search</h1>

        <form
          className="mt-8 flex max-w-2xl gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: ".", search: { q: value } });
          }}
        >
          <label htmlFor="search-page-input" className="sr-only">
            Search products
          </label>
          <input
            id="search-page-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Title, maker, series, SKU"
            className="w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-sbs-red"
          />
          <button
            type="submit"
            className="micro border border-charcoal bg-charcoal px-6 py-3 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red"
          >
            Search
          </button>
        </form>

        {q ? (
          <p className="micro mt-6 text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
          </p>
        ) : null}

        <div className="mt-8">
          {q ? <ProductGrid products={results} emptyMessage="No products found." /> : null}
        </div>
      </div>
    </div>
  );
}
