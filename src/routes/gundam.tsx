import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getGundamProducts } from "@/commerce/adapter";
import { GUNPLA_GRADES, gradeName, gundamSeriesName } from "@/commerce/attributes";
import { validateShopSearch, type ShopSearch } from "@/commerce/search-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";

const TITLE = "Gundam Model Kits (Gunpla) in Vancouver | Secret Builders Society";
const DESCRIPTION =
  "Browse Gundam model kits at Secret Builders Society on Commercial Drive, Vancouver — filter by grade (EG, HG, RG, MG, PG, SD) and series. Prices in CAD, local pickup only.";

export const Route = createFileRoute("/gundam")({
  validateSearch: validateShopSearch,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gundam" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // Filtered views (?grade=, ?gseries=) share one canonical to avoid thin duplicate pages.
    links: [{ rel: "canonical", href: "/gundam" }],
  }),
  component: GundamPage,
});

function GundamPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/gundam" });
  const scope = getGundamProducts();
  const onChange = (next: ShopSearch) => navigate({ to: ".", search: next });

  const activeLabel = [
    search.grade ? gradeName(search.grade) : null,
    search.gseries ? gundamSeriesName(search.gseries) : null,
    search.status === "available" ? "in stock" : null,
    search.status === "preorder" ? "preorder" : null,
    search.sale ? "on sale" : null,
    search.new ? "new arrival" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Shop", to: "/shop" }, { label: "Gundam" }]} />
      <div className="mt-6">
        <SBSBuildRail index="01" label="Gunpla Index" />
      </div>
      <h1 className="mt-5 font-display text-4xl md:text-6xl">Gundam Model Kits</h1>
      <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        Gunpla from entry-level snap kits to large-scale centrepieces. Filter by grade or series below, or
        start with our <Link to="/guides/gunpla-grades-explained" className="text-sbs-red underline">guide to
        Gunpla grades</Link>.
      </p>

      <nav aria-label="Shop by grade" className="mt-8 flex flex-wrap gap-2">
        {GUNPLA_GRADES.map((g) => {
          const active = search.grade === g.code;
          return (
            <Link
              key={g.code}
              to="/gundam"
              search={(prev) => {
                const next = { ...prev, sort: prev.sort ?? "featured" } as ShopSearch;
                if (active) delete next.grade;
                else next.grade = g.code;
                return next;
              }}
              aria-pressed={active}
              className={`micro border px-4 py-2.5 transition-colors duration-200 ${
                active ? "border-sbs-red bg-sbs-red text-white" : "border-border hover:border-sbs-red hover:text-sbs-red"
              }`}
            >
              {g.code === "OTHER" ? "Other" : g.code}
            </Link>
          );
        })}
      </nav>
      {activeLabel ? (
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          Showing: <span className="font-medium text-foreground">{activeLabel}</span>{" "}
          <Link to="/gundam" search={{ sort: "featured" }} className="ml-2 text-sbs-red underline">
            Clear filters
          </Link>
        </p>
      ) : null}

      <div className="mt-10">
        <CatalogueBrowser
          scope={scope}
          search={search}
          onChange={onChange}
          emptyState={
            <div className="border border-border bg-card px-6 py-16 text-center">
              <p className="micro text-sbs-red">Nothing listed yet</p>
              <p className="mx-auto mt-4 max-w-xl font-display text-2xl">
                {activeLabel
                  ? `No Gundam kits match “${activeLabel}” right now.`
                  : "No Gundam kits are listed in the current demo catalogue."}
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                The live Gunpla range will appear here once the store catalogue is connected.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/gundam" search={{ sort: "featured" }} className="btn-primary-sbs">
                  All Gundam
                </Link>
                <Link
                  to="/shop/$category"
                  params={{ category: "model-kits" }}
                  search={{ sort: "featured" }}
                  className="btn-ghost-sbs"
                >
                  Browse all model kits
                </Link>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
