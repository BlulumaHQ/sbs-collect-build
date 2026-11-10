import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { MAPS_DIRECTIONS_URL, STORE } from "@/config/store";

const TITLE = "Local Pickup in Vancouver | Secret Builders Society";
const DESCRIPTION = `Secret Builders Society is local pickup only from ${STORE.addressLine}, ${STORE.city}, ${STORE.region}. No shipping or delivery. Prices in CAD.`;

export const Route = createFileRoute("/pickup-information")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/pickup-information" },
    ],
    links: [{ rel: "canonical", href: "/pickup-information" }],
  }),
  component: PickupPage,
});

function PickupPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Pickup Information" }]} />
      <SBSBuildRail index="01" label="Customer Care" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Local Pickup Information</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        Secret Builders Society is a Vancouver shop serving customers in Canada. Orders are{" "}
        <strong className="text-foreground">local pickup only</strong> from our store — we do not offer
        shipping or delivery. All prices are in Canadian dollars (CAD).
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <Block title="Pickup location">
          <p>
            {STORE.name}
            <br />
            {STORE.addressLine}
            <br />
            {STORE.city}, {STORE.region}, {STORE.country}
          </p>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="micro mt-4 inline-block text-sbs-red hover:underline"
          >
            Get directions
          </a>
        </Block>

        <Block title="Store hours">
          <dl className="space-y-1">
            {STORE.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-6 border-b border-border py-1.5">
                <dt>{h.day}</dt>
                <dd className="text-foreground">{h.time}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Online orders">
          <p>
            Online ordering is not live yet — this website is a storefront preview. How pickup orders are
            placed, confirmed and collected will be confirmed before the online store launches.
          </p>
        </Block>

        <Block title="Preorders">
          <p>
            Release dates shown on preorder items are estimates and may change. Preorder payment timing and
            pickup arrangements have not been finalized and will be confirmed before launch.
          </p>
        </Block>
      </div>

      <div className="mt-14 max-w-2xl">
        <Block title="Questions?">
          <p>
            Call{" "}
            <a href={STORE.phoneHref} className="text-sbs-red hover:underline">
              {STORE.phone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${STORE.email}`} className="text-sbs-red hover:underline">
              {STORE.email}
            </a>
            .
          </p>
        </Block>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link to="/faq" className="btn-ghost-sbs">
          Read the FAQ
        </Link>
        <Link to="/contact" className="btn-primary-sbs">
          Contact the store
        </Link>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t-2 border-sbs-red pt-5">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
