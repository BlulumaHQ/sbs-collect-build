import { createFileRoute, Link } from "@tanstack/react-router";
import { getSeries } from "@/commerce/adapter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections | Secret Builders Society" },
      {
        name: "description",
        content: "Series represented in the Secret Builders Society demo catalogue.",
      },
      { property: "og:title", content: "Collections | Secret Builders Society" },
      {
        property: "og:description",
        content: "Series represented in the Secret Builders Society demo catalogue.",
      },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const series = getSeries();

  return (
    <div>
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Collections" }]} />
        <div className="mt-6">
          <SBSBuildRail index="05" label="Series Index" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">Collections</h1>
        <p className="micro mt-4 text-muted-foreground">{series.length} series in the demo catalogue</p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {series.map((entry) => (
            <Link
              key={entry.name}
              to="/shop"
              search={{ sort: "featured", series: entry.name }}
              className="card-retail group flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-white">
                <img
                  src={entry.image}
                  alt={entry.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex h-[62px] items-center justify-between gap-2 border-t border-border px-3">
                <span className="truncate text-sm font-medium transition-colors duration-200 group-hover:text-sbs-red">
                  {entry.name}
                </span>
                <span className="micro shrink-0 text-muted-foreground">{entry.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
