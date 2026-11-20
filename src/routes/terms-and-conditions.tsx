import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Secret Builders Society" },
      {
        name: "description",
        content:
          "Terms for orders from Secret Builders Society, Vancouver: pricing in CAD, payment, preorders, shipping, pickup and damaged items.",
      },
      { property: "og:title", content: "Terms & Conditions | Secret Builders Society" },
      {
        property: "og:description",
        content: "Terms for orders from Secret Builders Society, Vancouver.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "About these terms",
    body: `These terms apply to purchases from Secret Builders Society, ${STORE.addressLine}, ${STORE.city}, ${STORE.region}, through this website. By placing an order you agree to them.`,
  },
  {
    title: "Product information",
    body: "We sell officially licensed products from established manufacturers and distributors. Photos are supplied by the manufacturer or distributor; packaging and colours can vary slightly from the images.",
  },
  {
    title: "Pricing and availability",
    body: `All prices are in ${STORE.currency}. GST and PST are calculated at checkout. Stock is limited and can sell out between your visit and checkout; if an item you paid for turns out to be unavailable, we refund it in full.`,
  },
  {
    title: "Orders and payment",
    body: "Checkout and payment are handled securely by Shopify. Your order is confirmed when you receive our order confirmation email. We may cancel and fully refund an order if a product is unavailable or a pricing error occurs.",
  },
  {
    title: "Preorders",
    body: "Preorders are paid when you order. Release dates are estimates set by the manufacturer and may change. If a release is cancelled you receive a full refund. Orders that mix preorder and in-stock items ship together once everything has arrived.",
  },
  {
    title: "Shipping and pickup",
    body: `We ship within Canada, or you can pick up at ${STORE.addressLine}, ${STORE.city}. ${STORE.pickupLeadTime} Processing times, rates and claims are described in our Shipping Information.`,
  },
  {
    title: "Damaged, wrong or missing items",
    body: "If your order arrives damaged, defective or incorrect, contact us within 30 days of delivery with photos of the box, inner packaging and product, and keep all packaging. We will replace the item or refund it. Report a lost package within 7 days of the last tracking update.",
  },
  {
    title: "Other returns",
    body: `For any other return or exchange request, contact us at ${STORE.email} before sending anything back and we will let you know your options.`,
  },
  {
    title: "Intellectual property",
    body: "All product names, characters and logos belong to their respective rights holders. Site design and copy belong to Secret Builders Society.",
  },
  {
    title: "Limitation of liability",
    body: "To the extent permitted by law, Secret Builders Society is not liable for indirect or consequential loss arising from use of this site. Nothing in these terms limits your rights under British Columbia consumer protection law.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. The version shown on this page when you place your order applies to that order.",
  },
  {
    title: "Contact",
    body: `Questions about these terms: ${STORE.email} or ${STORE.phone}.`,
  },
];

function TermsPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <SBSBuildRail index="01" label="Legal" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated November 20, 2026</p>

      <div className="mt-12 max-w-3xl border-t border-border">
        {SECTIONS.map((section) => (
          <section key={section.title} className="border-b border-border py-6">
            <h2 className="font-display text-lg">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
        Questions about these terms? Email{" "}
        <a href={`mailto:${STORE.email}`} className="text-sbs-red hover:underline">
          {STORE.email}
        </a>
        .
      </p>
    </div>
  );
}
