import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/shipping-information")({
  head: () => ({
    meta: [
      { title: "Shipping Information | Secret Builders Society" },
      {
        name: "description",
        content:
          "Shipping methods, rates and delivery options for Secret Builders Society will be finalized and displayed through Shopify checkout before the store launches.",
      },
      { property: "og:title", content: "Shipping Information | Secret Builders Society" },
      {
        property: "og:description",
        content: "Shipping options will be confirmed through Shopify checkout before launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/shipping-information" },
    ],
    links: [{ rel: "canonical", href: "/shipping-information" }],
  }),
  component: ShippingPage,
});

const SECTIONS = [
  {
    title: "Shipping at launch",
    body: "Available shipping methods, pricing and delivery options will be displayed at checkout when the Shopify storefront launches.",
  },
  {
    title: "Shipping rates",
    body: "Shipping rates will be calculated using the final Shopify shipping configuration.",
  },
  {
    title: "Preorders",
    body: "Preorder release dates are estimates and may change before inventory reaches the store. Final preorder shipping and fulfillment rules will be confirmed before launch.",
  },
  {
    title: "Order status",
    body: "Order tracking and customer order history will become available through Shopify once the live ecommerce system is connected.",
  },
];

function ShippingPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Shipping Information" }]} />
      <SBSBuildRail index="01" label="Customer Care" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Shipping Information</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Shipping methods, rates and delivery options have not yet been finalized. Final shipping
        options will be displayed through Shopify checkout before the public store launches.
      </p>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <Block key={section.title} title={section.title}>
            {section.body}
          </Block>
        ))}
      </div>

      <div className="mt-14 max-w-2xl">
        <Block title="Questions?">
          Call{" "}
          <a href={STORE.phoneHref} className="text-sbs-red hover:underline">
            {STORE.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${STORE.email}`} className="text-sbs-red hover:underline">
            {STORE.email}
          </a>
          .
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
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
