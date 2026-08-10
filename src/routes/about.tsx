import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Secret Builders Society" },
      {
        name: "description",
        content:
          "Secret Builders Society is being designed as a collector-first storefront for figures, model kits, plush, blind boxes, hobby supplies, character goods, and apparel.",
      },
      { property: "og:title", content: "About | Secret Builders Society" },
      {
        property: "og:description",
        content: "A collector-first storefront for figures, model kits and hobby supplies.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Discover clearly",
    body: "Move between categories, series, makers, and search without digging through unnecessary clutter.",
  },
  {
    title: "Build confidently",
    body: "Keep model kits and hobby supplies easy to find alongside the figures and character goods collectors already follow.",
  },
  {
    title: "Collect your way",
    body: "Browse across different product types without forcing every collector into the same path.",
  },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-charcoal text-white">
        <div className="container-sbs py-16 lg:py-24">
          <Breadcrumbs items={[{ label: "About" }]} />
          <div className="mt-8">
            <SBSBuildRail index="00" label="Secret Builders Society" tone="light" />
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl">Built for collectors.</h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Secret Builders Society is being designed as a collector-first storefront for figures, model
            kits, plush, blind boxes, hobby supplies, character goods, and apparel.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-sbs grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <h2 className="font-display text-3xl md:text-4xl">A clearer way to explore the hobby.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            The store experience is organized around the way collectors actually browse: by product
            category, series, maker, availability, and the items they are actively looking for.
          </p>
        </div>

        <div className="container-sbs mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <div key={principle.title} className="bg-card p-8">
              <span className="micro text-sbs-red">0{index + 1}</span>
              <h3 className="mt-4 font-display text-xl uppercase tracking-tight">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
            </div>
          ))}
        </div>

        <div className="container-sbs mt-16">
          <Link
            to="/shop"
            search={{ sort: "featured" }}
            className="micro inline-block border border-sbs-red bg-sbs-red px-7 py-4 text-white transition-colors duration-200 hover:bg-transparent hover:text-sbs-red"
          >
            Explore the catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
