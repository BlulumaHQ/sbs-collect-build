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
          "Answers about the Secret Builders Society storefront prototype, preorders, currency, store visits and upcoming Shopify checkout.",
      },
      { property: "og:title", content: "FAQ | Secret Builders Society" },
      {
        property: "og:description",
        content: "Common questions about the SBS storefront prototype, preorders and store visits.",
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
    a: "Products marked PREORDER represent upcoming products in the current storefront prototype. Release information, when available, is provided as a reference and may change before launch.",
  },
  {
    q: "When will Shopify checkout be available?",
    a: "The current website is a storefront prototype. Full Shopify checkout will be enabled before the store launches publicly.",
  },
  {
    q: "How will shipping work?",
    a: "Available shipping services, rates and delivery options will be shown during Shopify checkout once the live ecommerce system is connected.",
  },
  {
    q: "Can I visit the store?",
    a: `Secret Builders Society is located at ${STORE.addressLine}, ${STORE.city}, ${STORE.region}. Store hours are Monday through Saturday, 11:00 AM to 6:00 PM. Sunday is closed.`,
  },
  {
    q: "How can I contact the store?",
    a: `Call ${STORE.phone} or email ${STORE.email}.`,
  },
  {
    q: "What does Sold Out mean?",
    a: "Products marked SOLD OUT are currently unavailable in the demo catalogue.",
  },
  {
    q: "Can I create a customer account?",
    a: "Customer accounts will be enabled when the Shopify storefront launches.",
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
            Shipping information
          </Link>
        </aside>
      </div>
    </div>
  );
}
