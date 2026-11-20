import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

const TITLE = "Shipping & Pickup Policy | Secret Builders Society";
const DESCRIPTION =
  "Secret Builders Society ships across Canada. In-stock orders ship in 1–5 business days, with free standard shipping on orders CA$300+. Store pickup in Vancouver once we email you that your order is ready.";

export const Route = createFileRoute("/shipping-information")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/shipping-information" },
    ],
    links: [{ rel: "canonical", href: "/shipping-information" }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Shipping & Pickup" }]} />
      <SBSBuildRail index="01" label="Customer Care" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Shipping &amp; Pickup Policy</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        We ship across Canada, or you can pick up your order at our Vancouver store. Most items ship from our
        warehouse, so our shelves in store only carry a small selection. All prices are in Canadian dollars (CAD).
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <Block title="Order processing">
          <p>
            In-stock orders are packed and shipped within 1–5 business days. We don’t ship on weekends or
            statutory holidays. During busy periods, processing may take slightly longer.
          </p>
        </Block>

        <Block title="Delivery time">
          <p>
            Once shipped, orders usually arrive in 1–5 business days depending on your province (BC is usually
            fastest). Free standard shipping takes 3–9 business days.
          </p>
        </Block>

        <Block title="Free shipping">
          <p>
            Orders of CA$300 or more qualify for free standard shipping within Canada. Your shipping options and
            free-shipping eligibility are shown at checkout once you enter your address.
          </p>
        </Block>

        <Block title="Shipping rates">
          <p>
            Shipping is calculated at checkout based on your package size, weight and destination. Faster options
            such as Canada Post Expedited or UPS Standard are available at checkout.
          </p>
        </Block>

        <Block title="Large items">
          <p>
            Oversized or heavy items may not qualify for free shipping, even on orders over CA$300. If the final
            shipping cost is much higher than the checkout estimate, we’ll contact you before shipping.
          </p>
        </Block>

        <Block title="Preorders">
          <p>
            Please place preorders separately from in-stock items. If they’re in the same order, we’ll ship
            everything together once all preorder items arrive. Each preorder shows its expected arrival month. If
            the manufacturer cancels a release, you’ll receive a full refund.
          </p>
        </Block>

        <Block title="Store pickup">
          <p>
            Choose “Pickup” at checkout to collect your order free at {STORE.addressLine}, {STORE.city}. Most items
            aren’t kept in store, so please wait for our “Ready for pickup” email before you visit. Pickup is
            during store hours.
          </p>
          <Link to="/pickup-information" className="micro mt-4 inline-block text-sbs-red hover:underline">
            Pickup details &amp; hours
          </Link>
        </Block>

        <Block title="Damaged or missing packages">
          <p>
            Please keep all packaging and take clear photos of the box, inner packaging and product. Contact us
            within 30 days of delivery for damaged items, or within 7 days of the last tracking update for packages
            lost in transit.
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
