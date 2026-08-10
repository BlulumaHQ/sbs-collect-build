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
          "Canadian and international shipping rates, processing times, preorder handling and in-store pickup for Secret Builders Society orders.",
      },
      { property: "og:title", content: "Shipping Information | Secret Builders Society" },
      {
        property: "og:description",
        content: "Rates, processing times, preorder handling and pickup options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/shipping-information" },
    ],
    links: [{ rel: "canonical", href: "/shipping-information" }],
  }),
  component: ShippingPage,
});

const RATES = [
  { zone: "Ontario & Quebec", time: "1 — 3 business days", cost: "$12.00 CAD" },
  { zone: "Rest of Canada", time: "3 — 7 business days", cost: "$18.00 CAD" },
  { zone: "Northern & remote", time: "7 — 14 business days", cost: "Live rate at checkout" },
  { zone: "United States", time: "5 — 10 business days", cost: "From $24.00 CAD" },
  { zone: "International", time: "10 — 21 business days", cost: "Live rate at checkout" },
];

function ShippingPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Shipping Information" }]} />
      <SBSBuildRail index="01" label="Customer Care" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Shipping Information</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Shipping options and rates will be provided through the live Shopify checkout. Everything ships from the shop in {STORE.city}, {STORE.region}, packed for
        collectors — boxed items double-boxed, corner protection on shelf pieces.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Rates & Delivery Windows</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border border-border bg-white text-sm">
            <thead>
              <tr className="border-b border-border bg-bone text-left">
                <th className="micro px-4 py-3 font-normal">Destination</th>
                <th className="micro px-4 py-3 font-normal">Estimated transit</th>
                <th className="micro px-4 py-3 font-normal">Cost</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((rate) => (
                <tr key={rate.zone} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">{rate.zone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{rate.time}</td>
                  <td className="px-4 py-3">{rate.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="micro mt-3 text-muted-foreground">
          Demo rates for prototype purposes. Duties and taxes outside Canada are the recipient's
          responsibility.
        </p>
      </section>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        <Block title="Processing">
          In-stock orders are picked and packed within one to two business days. Orders placed after
          15:00 local time are processed the next business day.
        </Block>
        <Block title="Preorders">
          Preorder items ship when the maker releases them. Mixed carts ship together once the last
          preorder lands unless you request a split shipment at no extra charge.
        </Block>
        <Block title="In-store pickup">
          Free at {STORE.addressLine}, {STORE.city}. We email when your order is ready and hold it
          for 14 days.
        </Block>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link to="/faq" className="btn-ghost-sbs">
          Read the FAQ
        </Link>
        <Link to="/contact" className="btn-primary-sbs">
          Ask about an order
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
