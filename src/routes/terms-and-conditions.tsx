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
          "The terms covering orders, preorders, pricing, returns and site use at Secret Builders Society.",
      },
      { property: "og:title", content: "Terms & Conditions | Secret Builders Society" },
      {
        property: "og:description",
        content: "Order, preorder, pricing and return terms for Secret Builders Society.",
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
    title: "1. Acceptance",
    body: "By browsing or ordering from this site you agree to these terms. If you do not accept them, please do not place an order.",
  },
  {
    title: "2. Products and availability",
    body: "Stock levels change quickly and listings may sell out between adding to cart and checkout. Where an item becomes unavailable after ordering, we cancel that line and refund it in full.",
  },
  {
    title: "3. Pricing",
    body: `All prices are shown in ${STORE.currency} and exclude applicable taxes, which are calculated at checkout. We reserve the right to correct pricing errors before an order ships.`,
  },
  {
    title: "4. Preorders",
    body: "Preorder release dates are supplied by the manufacturer and are estimates. Payment is captured when the item ships. You may cancel a preorder at any time before it ships.",
  },
  {
    title: "5. Blind boxes and randomised items",
    body: "Sealed randomised products cannot be selected, exchanged or returned once opened. Case purchases follow the manufacturer's stated ratios; secret variants are never guaranteed.",
  },
  {
    title: "6. Returns",
    body: "Unopened, undamaged items may be returned within 14 days of delivery for a refund less shipping. Opened items, used hobby supplies and final-sale clearance are non-returnable.",
  },
  {
    title: "7. Intellectual property",
    body: "All product names, characters and logos remain the property of their respective rights holders. Site design and copy are the property of Secret Builders Society.",
  },
  {
    title: "8. Limitation of liability",
    body: "Our liability for any order is limited to the amount paid for that order. We are not liable for indirect or consequential loss.",
  },
  {
    title: "9. Governing law",
    body: `These terms are governed by the laws of ${STORE.region}, ${STORE.country}.`,
  },
];

function TermsPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <SBSBuildRail index="01" label="Legal" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Terms & Conditions</h1>
      <p className="micro mt-4 text-muted-foreground">Last updated: January 2026</p>

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
