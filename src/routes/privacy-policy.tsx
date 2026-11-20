import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Secret Builders Society" },
      {
        name: "description",
        content:
          "How Secret Builders Society, Vancouver, handles personal information for orders, checkout, pickup and enquiries.",
      },
      { property: "og:title", content: "Privacy Policy | Secret Builders Society" },
      {
        property: "og:description",
        content: "How Secret Builders Society handles personal information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "About this policy",
    body: `This policy explains how Secret Builders Society (${STORE.addressLine}, ${STORE.city}, ${STORE.region}) handles personal information when you browse this website, contact us or place an order.`,
  },
  {
    title: "Orders and checkout",
    body: "Checkout is provided by Shopify. When you order, Shopify collects your name, email, phone, shipping and billing address and payment details on our behalf, and we use them to process, ship or hold your order for pickup and to send order updates. Payment card details are handled by Shopify's payment processor; we never see or store your full card number. Shopify's privacy policy applies to information processed by Shopify.",
  },
  {
    title: "Contacting us",
    body: `If you call ${STORE.phone}, email ${STORE.email} or use our contact form (which opens your own email app), we use your details only to answer your enquiry.`,
  },
  {
    title: "Information stored in your browser",
    body: "Your cart and recently viewed products are kept in your browser's local storage so the site remembers them between visits. This stays on your device.",
  },
  {
    title: "Marketing emails",
    body: "We only send marketing emails if you opt in at checkout, and every email has an unsubscribe link.",
  },
  {
    title: "Sharing",
    body: "We share personal information only with the service providers needed to run the store (such as Shopify, payment processors and shipping carriers), and only for that purpose. We never sell your personal information.",
  },
  {
    title: "Retention and your rights",
    body: `We keep order records as long as needed for accounting and tax requirements. You can ask to see, correct or delete your personal information by emailing ${STORE.email}. We handle personal information in line with British Columbia's Personal Information Protection Act (PIPA).`,
  },
];

function PrivacyPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <SBSBuildRail index="01" label="Legal" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated November 20, 2026</p>

      <div className="mt-12 max-w-3xl border-t border-border">
        {SECTIONS.map((section) => (
          <section key={section.title} className="border-b border-border py-6">
            <h2 className="font-display text-lg">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>

      <address className="mt-10 not-italic text-sm text-muted-foreground">
        {STORE.legalName}
        <br />
        {STORE.addressLine}, {STORE.city}, {STORE.region}
      </address>
    </div>
  );
}
