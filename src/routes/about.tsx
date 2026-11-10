import { createFileRoute, Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  STORE,
  STORE_IMAGE,
  STORE_IMAGE_CAPTION,
  UNITY_TATTOO_LOGO,
  UNITY_TATTOO_URL,
} from "@/config/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Secret Builders Society" },
      {
        name: "description",
        content:
          "Secret Builders Society is a collector-focused toy and model kit store sharing its Commercial Drive space in Vancouver with Unity Tattoo.",
      },
      { property: "og:title", content: "About | Secret Builders Society" },
      {
        property: "og:description",
        content:
          "A collector-focused hobby shop inside a shared creative space with Unity Tattoo on Commercial Drive.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    index: "01",
    title: "Discover clearly",
    body: "Category, series and brand navigation built so collectors can find the exact piece they came for — and the one they did not know existed.",
  },
  {
    index: "02",
    title: "Build confidently",
    body: "Kits sit beside the tools, paints and finishing supplies that complete them, so a build never stalls halfway through.",
  },
  {
    index: "03",
    title: "Collect your way",
    body: "Preorders, in-stock shelves and character goods presented plainly, with honest status on every product.",
  },
];

function AboutPage() {
  return (
    <>
      {/* 01 — compact charcoal hero */}
      <section className="bg-charcoal py-14 text-white lg:py-20">
        <div className="container-sbs">
          <Breadcrumbs items={[{ label: "About" }]} tone="light" />
          <p className="micro mt-6 text-white/60">Secret Builders Society</p>
          <h1 className="mt-5 font-display text-[40px] text-white lg:text-[54px]">
            Built for collectors.
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70 lg:text-[17px]">
            Secret Builders Society is a collector-focused shop for figures, model kits, plush,
            blind boxes, hobby supplies, character goods and apparel — curated for people who care
            about what ends up on the shelf.
          </p>
        </div>
      </section>

      {/* 02 — shared space */}
      <section className="section-y border-b border-border bg-white">
        <div className="container-sbs grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <figure className="m-0">
            <div className="aspect-[4/3] w-full overflow-hidden bg-bone">
              <img
                src={STORE_IMAGE}
                alt="Shared tattoo studio and collector toy store interior with Gundam model kits"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="micro-sm mt-3 text-muted-foreground">
              Concept visualization. {STORE_IMAGE_CAPTION}
            </figcaption>
          </figure>
          <div>
            <SBSBuildRail index="02" label="Our Space" />
            <h2 className="mt-5 font-display text-[32px] leading-[1.06] lg:text-[42px]">
              A different kind of hobby shop.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
              Secret Builders Society brings collector toys and model kits into the same Commercial
              Drive space as Unity Tattoo — combining two creative communities under one roof.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="micro-sm text-muted-foreground">Address</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">
                  {STORE.addressLine}
                  <br />
                  {STORE.city}, {STORE.region}
                </dd>
              </div>
              <div>
                <dt className="micro-sm text-muted-foreground">Hours</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">
                  Mon–Sat 11:00 AM – 6:00 PM
                  <br />
                  Sunday Closed
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 03 — principles */}
      <section className="section-y border-b border-border bg-bone">
        <div className="container-sbs">
          <h2 className="font-display text-[32px] lg:text-[38px]">How we work</h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article key={p.index} className="card-retail p-7">
                <p className="micro-sm text-sbs-red">{p.index}</p>
                <h3 className="mt-4 font-display text-[22px]">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — CTA */}
      <section className="bg-white py-14 lg:py-16">
        <div className="container-sbs flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-[28px] lg:text-[34px]">Come see the shelves.</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary-sbs">
              Visit Secret Builders Society
            </Link>
            <a
              href={UNITY_TATTOO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-sbs"
            >
              Visit Unity Tattoo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
