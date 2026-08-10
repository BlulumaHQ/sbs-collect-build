import { createFileRoute, Link } from "@tanstack/react-router";
import { getSeries } from "@/commerce/adapter";
import { seriesArtwork } from "@/commerce/artwork";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections | Secret Builders Society" },
      {
        name: "description",
        content:
          "Browse collector goods by series and franchise — from ONE PIECE and Chainsaw Man to NieR:Automata, Kirby and Monster Hunter.",
      },
      { property: "og:title", content: "Collections | Secret Builders Society" },
      {
        property: "og:description",
        content: "Shop figures, kits and goods by series and franchise.",
      },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const series = getSeries();

  return (
    <>
      <section className="border-b border-border bg-white py-12 lg:py-16">
        <div className="container-sbs">
          <Breadcrumbs items={[{ label: "Collections" }]} />
          <SBSBuildRail index="01" label="Series Directory" />
          <h1 className="mt-5 font-display text-[38px] lg:text-[50px]">Collections</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
            {series.length} series and franchises represented across figures, kits, plush and
            character goods.
          </p>
        </div>
      </section>

      <section className="section-y bg-bone">
        <div className="container-sbs">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {series.map((entry) => (
              <Link
                key={entry.name}
                to="/shop"
                search={{ sort: "featured", series: entry.name }}
                className="group relative block aspect-video overflow-hidden bg-charcoal"
              >
                <img
                  src={seriesArtwork(entry.name)}
                  alt={`${entry.name} collection artwork`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="clamp-1 block font-display text-lg text-white">
                    {entry.name}
                  </span>
                  <span className="micro-sm mt-1 block text-white/65">{entry.count} products</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="micro-sm mt-8 text-muted-foreground">
            Collection artwork is prototype key art — official franchise artwork will replace it
            once licensing is confirmed.
          </p>
        </div>
      </section>
    </>
  );
}
