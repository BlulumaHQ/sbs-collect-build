import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { fetchListing } from "@/commerce/catalog-api";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ deps }) =>
    deps.q.trim() ? fetchListing({ data: { scope: { kind: "search", q: deps.q }, search: { sort: "featured" } } }) : Promise.resolve(null),
  head: () => ({
    meta: [
      { title: "Search | Secret Builders Society" },
      {
        name: "description",
        content: "Search the Secret Builders Society catalogue by title, maker, series or code.",
      },
      { property: "og:title", content: "Search | Secret Builders Society" },
      {
        property: "og:description",
        content: "Search the Secret Builders Society catalogue.",
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
  const listing = Route.useLoaderData();
  const total = listing?.total ?? 0;

  return (
    <div>
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
            {total} {total === 1 ? "result" : "results"} for “{q}”
          </p>
        ) : null}

        <div className="mt-8">
          {q && listing && listing.total > 0 ? (
            <CatalogueBrowser
              scope={{ kind: "search", q }}
              listing={listing}
              search={{ sort: "featured" }}
              onChange={() => undefined}
              showFilters={false}
            />
          ) : q ? (
            <div className="border border-border bg-card p-6">
              <p className="text-[16px]">No products found for “{q}”.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a shorter word, a model number or a maker — or browse a category:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/gundam" search={{ sort: "featured" }} className="micro border border-border px-4 py-3 hover:border-sbs-red hover:text-sbs-red">
                  Gundam
                </Link>
                {[
                  ["figures", "Figures"],
                  ["model-kits", "Model Kits"],
                  ["hobby-supplies", "Hobby Supplies"],
                  ["blind-boxes", "Blind Boxes"],
                ].map(([slug, label]) => (
                  <Link
                    key={slug}
                    to="/shop/$category"
                    params={{ category: slug! }}
                    search={{ sort: "featured" }}
                    className="micro border border-border px-4 py-3 hover:border-sbs-red hover:text-sbs-red"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
