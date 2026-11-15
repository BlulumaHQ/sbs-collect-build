import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { STORE, STORE_PHOTOS, UNITY_TATTOO_URL } from "@/config/store";
import { StoreLightbox } from "@/components/store/StoreLightbox";
import { SBSBuildRail } from "@/components/SBSBuildRail";

export function StoreInfo() {
  return (
    <section className="section-y border-b border-border bg-white">
      <div className="container-sbs grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <StoreMosaic />

        <div>
          <SBSBuildRail index="09" label="Our Space" />
          <h2 className="mt-5 font-display text-[32px] leading-[1.06] lg:text-[42px]">
            Tattoos, toys,
            <br />
            and things worth collecting.
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
            Secret Builders Society shares its Commercial Drive space with Unity Tattoo, bringing
            model kits, figures and collector goods into the same creative environment.
          </p>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
            Browse the shelves, discover the next build, or visit Unity Tattoo in the same space.
          </p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="micro-sm text-muted-foreground">Address</dt>
              <dd className="mt-2 text-[15px] leading-relaxed">
                {STORE.addressLine}
                <br />
                {STORE.city}, {STORE.region}
              </dd>
            </div>
            <div>
              <dt className="micro-sm text-muted-foreground">Phone</dt>
              <dd className="mt-2 text-[15px]">
                <a href={STORE.phoneHref} className="hover:text-sbs-red">
                  {STORE.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="micro-sm text-muted-foreground">Hours</dt>
              <dd className="mt-2 text-[15px] leading-relaxed">
                Mon–Sat
                <br />
                11:00 AM – 6:00 PM
                <br />
                Sunday Closed
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary-sbs">
              Visit the store
            </Link>
            <a
              href={UNITY_TATTOO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-sbs"
            >
              Unity Tattoo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Homepage photo mosaic: one wide shot + two distinct thumbnails, all open the lightbox. */
const MOSAIC = [STORE_PHOTOS.interiorWide, STORE_PHOTOS.storefrontSign, STORE_PHOTOS.pokemonKits];

function StoreMosaic() {
  const [open, setOpen] = useState<number | null>(null);
  const photos = MOSAIC;

  return (
    <figure className="m-0">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {MOSAIC.map((p, i) => {
          const isLead = i === 0;
          return (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              className={`group relative block overflow-hidden bg-bone ${
                isLead ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
              }`}
              aria-label={`Open photo: ${p.caption}`}
            >
              <img
                src={isLead ? p.src : p.srcSm}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          );
        })}
      </div>
      <figcaption className="micro-sm mt-3 text-muted-foreground">
        Inside Secret Builders Society, 1395 Commercial Drive.
      </figcaption>
      <StoreLightbox photos={photos} index={open} onIndexChange={setOpen} />
    </figure>
  );
}
