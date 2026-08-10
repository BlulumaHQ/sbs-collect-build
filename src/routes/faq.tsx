import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE, SHIPPING_LINE } from "@/config/store";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Secret Builders Society" },
      {
        name: "description",
        content:
          "Answers on preorders, shipping, in-store pickup, blind box policy and order changes at Secret Builders Society.",
      },
      { property: "og:title", content: "FAQ | Secret Builders Society" },
      {
        property: "og:description",
        content: "Common questions about preorders, shipping, pickup and returns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How do preorders work?",
    a: "Reserve the item now and we charge when the maker ships it to us. Release windows come straight from the manufacturer and can move by a month or two — we email you whenever a date changes.",
  },
  {
    q: "When will my order ship?",
    a: "In-stock orders leave the shop within one to two business days. Orders that mix in-stock and preorder items ship once the preorder lands, unless you ask us to split the shipment.",
  },
  {
    q: "Do you offer free shipping?",
    a: `${SHIPPING_LINE}. Below that, live rates are calculated at checkout based on weight and destination.`,
  },
  {
    q: "Can I pick up in store?",
    a: `Yes. Choose in-store pickup at checkout and collect at ${STORE.addressLine}, ${STORE.city}. We hold pickups for 14 days.`,
  },
  {
    q: "Can I choose my blind box figure?",
    a: "No — blind boxes are sealed and random by design. Full-case purchases guarantee one of each standard figure but never a secret/chase variant.",
  },
  {
    q: "What is your return policy?",
    a: "Unopened, undamaged items can be returned within 14 days of delivery. Preorders can be cancelled any time before they ship. Opened blind boxes and used hobby supplies are final sale.",
  },
  {
    q: "Is a damaged box covered?",
    a: "Manufacturer boxes can arrive with shelf wear. We photograph and grade anything significant before it ships. If the product itself is damaged in transit, contact us within 48 hours with photos.",
  },
  {
    q: "Do you restock sold-out items?",
    a: "Where the maker still produces the item, yes. Subscribe to the newsletter for restock and re-release notices.",
  },
];

function FaqPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <SBSBuildRail index="01" label="Customer Care" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Frequently Asked Questions</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <dl className="border-t border-border">
          {FAQS.map((item) => (
            <div key={item.q} className="border-b border-border py-6">
              <dt className="font-display text-lg">{item.q}</dt>
              <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>

        <aside className="card-retail h-fit p-6">
          <h2 className="font-display text-xl">Still stuck?</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The shop answers email within one business day, and someone is always on the floor
            during opening hours.
          </p>
          <Link to="/contact" className="btn-primary-sbs mt-6 w-full">
            Contact us
          </Link>
          <Link to="/shipping-information" className="btn-ghost-sbs mt-3 w-full">
            Shipping information
          </Link>
        </aside>
      </div>
    </div>
  );
}
