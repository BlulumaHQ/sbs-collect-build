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
          "Answers about the Secret Builders Society storefront prototype, preorders, currency, shipping across Canada, store pickup in Vancouver, store visits and online ordering plans.",
      },
      { property: "og:title", content: "FAQ | Secret Builders Society" },
      {
        property: "og:description",
        content: "Common questions about SBS preorders, shipping, store pickup in Vancouver and store visits.",
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
    a: "Products marked PREORDER represent upcoming products in the current storefront prototype. Release information, when available, is an estimate and may change. If you order preorders and in-stock items together, we ship everything once all preorder items arrive, so we recommend ordering them separately.",
  },
  {
    q: "Can I order online now?",
    a: "Not yet. The current website is a storefront preview and does not take orders or payments. Online ordering will be enabled before the store launches publicly.",
  },
  {
    q: "Do you ship?",
    a: "Yes, we ship across Canada. In-stock orders ship within 1–5 business days, and orders of CA$300 or more get free standard shipping. Shipping costs and options are shown at checkout.",
  },
  {
    q: "How does store pickup work?",
    a: `Choose "Pickup" at checkout. Most items ship to us from our warehouse, so please wait for our "Ready for pickup" email (usually within 2–5 business days), then collect your order at ${STORE.addressLine} during store hours.`,
  },
  {
    q: "Can I visit the store?",
    a: `Secret Builders Society is located at ${STORE.addressLine}, ${STORE.city}, ${STORE.region}. Store hours are Friday through Sunday, 12:00 PM to 7:00 PM. Closed Monday through Thursday.`,
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
            Shipping &amp; pickup
          </Link>
        </aside>
      </div>
    </div>
  );
}
