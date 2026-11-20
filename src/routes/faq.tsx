import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Secret Builders Society" },
      {
        name: "description",
        content:
          "Answers about preorders, payment, currency, shipping across Canada, store pickup in Vancouver and visiting Secret Builders Societyg plans.",
      },
      { property: "og:title", content: "FAQ | Secret Builders Society" },
      {
        property: "og:description",
        content:
          "Common questions about SBS preorders, shipping, store pickup in Vancouver and store visits.",
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
    q: "What currency are prices shown in?",
    a: "All prices displayed in the current SBS catalogue are shown in Canadian dollars (CAD).",
  },
  {
    q: "How do preorders work?",
    a: "Products marked PREORDER are upcoming releases. You pay when you order, and we ship (or hold for pickup) as soon as the item arrives. Release dates are estimates set by the manufacturer and may change; if a release is cancelled you get a full refund. If you order preorders and in-stock items together, we ship everything once all preorder items arrive, so we recommend ordering them separately.",
  },
  {
    q: "How do I pay?",
    a: "Checkout is handled securely by Shopify. We accept major credit cards, Shop Pay, Apple Pay and Google Pay. All prices are in Canadian dollars, so there are no duties for Canadian orders.",
  },
  {
    q: "Do you ship?",
    a: "Yes, we ship across Canada. We ship on Fridays: orders placed by Sunday 11:59 PM (Pacific) ship the coming Friday; orders from Monday on ship the Friday after. Orders of CA$300 or more get free standard shipping. Shipping costs and options are shown at checkout.",
  },
  {
    q: "How does store pickup work?",
    a: `Choose "Pickup" at checkout. ${STORE.pickupLeadTime} Collect your order at ${STORE.addressLine} during store hours.`,
  },
  {
    q: "Can I visit the store?",
    a: `Yes. Secret Builders Society is at ${STORE.addressLine}, ${STORE.city}, ${STORE.region}, inside Unity Tattoo. ${STORE.walkIn} Closed Monday through Thursday.`,
  },
  {
    q: "How can I contact the store?",
    a: `Call ${STORE.phone} or email ${STORE.email}.`,
  },
  {
    q: "What does Sold Out mean?",
    a: "Products marked SOLD OUT are currently unavailable.",
  },
  {
    q: "Can I create a customer account?",
    a: "You can check out as a guest. Your order confirmation email has a link to track your order.",
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
            Call the shop or send an email and someone on the floor will get back to you.
          </p>
          <Link to="/contact" className="btn-primary-sbs mt-6 w-full">
            Contact us
          </Link>
          <Link to="/shipping-information" className="btn-ghost-sbs mt-3 w-full">
            Shipping &amp; pickup
          </Link>
        </aside>
      </div>
    </div>
  );
}
