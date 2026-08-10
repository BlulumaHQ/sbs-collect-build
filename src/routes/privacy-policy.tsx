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
          "How Secret Builders Society collects, uses and protects your personal information when you shop with us.",
      },
      { property: "og:title", content: "Privacy Policy | Secret Builders Society" },
      {
        property: "og:description",
        content: "How we collect, use and protect your personal information.",
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
    title: "What we collect",
    body: "Contact and delivery details you provide at checkout, order history, and basic analytics about how the site is used. We never collect or store full payment card numbers — payments are handled by our payment processor.",
  },
  {
    title: "How we use it",
    body: "To process and ship orders, answer enquiries, manage preorder notifications, prevent fraud, and — only if you opt in — send restock and drop emails.",
  },
  {
    title: "Local storage on this site",
    body: "Your cart and recently viewed products are stored in your browser's local storage so the site remembers them between visits. This data stays on your device and is not sent to a server.",
  },
  {
    title: "Sharing",
    body: "We share only what is necessary with shipping carriers, our payment processor and our email provider. We never sell personal information.",
  },
  {
    title: "Retention",
    body: "Order records are retained as required by Canadian tax law. Marketing contact details are kept until you unsubscribe.",
  },
  {
    title: "Your rights",
    body: `You can request access to, correction of, or deletion of your personal information at any time by emailing ${STORE.email}.`,
  },
  {
    title: "Security",
    body: "The site is served over HTTPS and access to order data is limited to staff who need it to fulfil orders.",
  },
];

function PrivacyPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <SBSBuildRail index="01" label="Legal" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="micro mt-4 text-muted-foreground">Last updated: January 2026</p>

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
        {STORE.addressLine}, {STORE.city}, {STORE.region} {STORE.postal}
      </address>
    </div>
  );
}
