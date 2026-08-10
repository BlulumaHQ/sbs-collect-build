import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_SRC,
  STORE,
  STORE_IMAGE,
  STORE_IMAGE_CAPTION,
  UNITY_TATTOO_URL,
} from "@/config/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Store Info | Secret Builders Society" },
      {
        name: "description",
        content:
          "Visit Secret Builders Society at 1395 Commercial Drive, Vancouver, BC. Open Monday to Saturday, 11 AM to 6 PM. Call 604.423.3343.",
      },
      { property: "og:title", content: "Contact & Store Info | Secret Builders Society" },
      {
        property: "og:description",
        content: "Store address, hours, phone and directions for our Commercial Drive location.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-white py-12 lg:py-16">
        <div className="container-sbs">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <SBSBuildRail index="01" label="Visit & Contact" />
          <h1 className="mt-5 font-display text-[38px] lg:text-[50px]">Contact</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
            Find us on Commercial Drive in Vancouver, inside the space we share with Unity Tattoo.
          </p>
        </div>
      </section>

      <section className="section-y border-b border-border bg-bone">
        <div className="container-sbs grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[28px] lg:text-[34px]">Secret Builders Society</h2>

            <ul className="mt-8 space-y-7">
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Address</h3>
                  <address className="mt-2 text-[16px] not-italic leading-relaxed">
                    {STORE.addressLine}
                    <br />
                    {STORE.city}, {STORE.region}
                  </address>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Phone</h3>
                  <p className="mt-2 text-[16px]">
                    <a href={STORE.phoneHref} className="hover:text-sbs-red">
                      {STORE.phone}
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Email</h3>
                  <p className="mt-2 text-[16px]">
                    <a href={`mailto:${STORE.email}`} className="hover:text-sbs-red">
                      {STORE.email}
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Store hours</h3>
                  <dl className="mt-2 space-y-1 text-[16px]">
                    {STORE.hours.map((h) => (
                      <div key={h.day} className="flex gap-3">
                        <dt className="text-muted-foreground">{h.day}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-border pt-8">
              <p className="micro text-sbs-red">Sharing the space</p>
              <h3 className="mt-4 font-display text-[24px] lg:text-[28px]">
                Also home to Unity Tattoo.
              </h3>
              <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
                Secret Builders Society shares this Commercial Drive location with Unity Tattoo.
              </p>
              <a
                href={UNITY_TATTOO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-sbs mt-6"
              >
                Visit unity-tattoo.com
              </a>
            </div>
          </div>

          <figure className="m-0">
            <div className="aspect-[4/3] w-full overflow-hidden bg-white">
              <img
                src={STORE_IMAGE}
                alt="Shared tattoo studio and collector toy store interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="micro-sm mt-3 text-muted-foreground">
              {STORE_IMAGE_CAPTION}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container-sbs py-12 lg:py-16">
          <h2 className="font-display text-[28px] lg:text-[34px]">Find the store</h2>
          <div className="mt-6 h-[360px] w-full overflow-hidden border border-border lg:h-[480px]">
            <iframe
              title="Map showing 1395 Commercial Drive, Vancouver, BC"
              src={MAPS_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-sbs"
            >
              Get directions
            </a>
            <Link to="/shop" search={{ sort: "featured" }} className="btn-ghost-sbs">
              Shop the catalogue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
