import { createFileRoute, Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StoreGallery } from "@/components/store/StoreGallery";
import {
  STORE,
  STORE_GALLERY,
  STORE_PHOTOS,
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
                src={STORE_PHOTOS.storefrontSign.src}
                alt={STORE_PHOTOS.storefrontSign.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="micro-sm mt-3 text-muted-foreground">
              {STORE_PHOTOS.storefrontSign.caption}
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
            <a
              href={UNITY_TATTOO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-4 border border-border bg-white px-5 py-4 transition-colors hover:border-sbs-red"
              aria-label="Visit Unity Tattoo (opens in a new tab)"
            >
              <img
                src={UNITY_TATTOO_LOGO}
                alt="Unity Tattoo logo"
                loading="lazy"
                className="h-10 w-auto lg:h-12"
              />
              <span className="micro-sm text-muted-foreground">Sharing the space →</span>
            </a>
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
                  Fri–Sun 12:00 PM – 7:00 PM
                  <br />
                  Mon–Thu Closed
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 03 — meet the builder */}
      <section className="section-y border-b border-border bg-bone">
        <div className="container-sbs grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <figure className="m-0">
            <div className="aspect-square w-full overflow-hidden bg-charcoal">
              <img
                src="/images/team/yu-wei-wang.webp"
                alt="Yu-Wei Wang, founder of Secret Builders Society"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="micro-sm mt-3 text-muted-foreground">
              Yu-Wei Wang — founder, buyer, builder
            </figcaption>
          </figure>
          <div>
            <SBSBuildRail index="03" label="Meet the Builder" />
            <h2 className="mt-5 font-display text-[32px] leading-[1.06] lg:text-[42px]">
              Yu-Wei Wang
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
              <p>
                Yu-Wei has spent more than two decades behind the counter of Vancouver&apos;s toy
                and anime shops, and even longer as a serious collector. By day he manages Sakura
                Media Metrotown. By night he&apos;s the bass player in a heavy metal band. He also
                owns Unity Tattoo, cuts hair at Bosu Vancouver, and somewhere in between he started
                Secret Builders Society: a small shelf of kits and figures he&apos;d actually buy
                himself, inside the tattoo shop he built.
              </p>
              <p>
                Every kit on our shelf is one he&apos;s picked. If you&apos;re not sure where to
                start, ask him.
              </p>
            </div>
            {/* TODO(Yu-Wei): replace with his own one-line quote */}
            <blockquote className="mt-8 max-w-xl border-l-2 border-sbs-red pl-5 font-display text-xl leading-snug text-charcoal lg:text-2xl">
              &ldquo;[One line from Yu-Wei — why he collects, or the first kit he ever
              built.]&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* 03 — inside the shop gallery */}
      <section id="gallery" className="section-y scroll-mt-24 border-b border-border bg-white">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SBSBuildRail index="04" label="Inside the Shop" />
              <h2 className="mt-5 font-display text-[32px] leading-[1.06] lg:text-[42px]">
                Take a look around.
              </h2>
            </div>
            <p className="max-w-md text-[16px] leading-relaxed text-muted-foreground">
              Gunpla, prize figures, blind boxes and Pokémon kits — this is what is on the shelves
              right now. Tap any photo to see it full size.
            </p>
          </div>
          <div className="mt-10">
            <StoreGallery photos={STORE_GALLERY} />
          </div>
        </div>
      </section>

      {/* 04 — principles */}
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

      {/* 05 — CTA */}
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
