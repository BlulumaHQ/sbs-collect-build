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
          "Draft privacy information for the Secret Builders Society storefront prototype, including local storage use and prototype forms.",
      },
      { property: "og:title", content: "Privacy Policy | Secret Builders Society" },
      {
        property: "og:description",
        content: "Draft privacy information for the SBS storefront prototype.",
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
    body: "This website is currently a storefront prototype. It does not process online orders and does not take payment card information.",
  },
  {
    title: "Information you enter",
    body: "The contact form and newsletter signup are frontend prototype forms. Information entered into them is not submitted to, or stored by, an external service.",
  },
  {
    title: "Local storage on this site",
    body: "Your cart and recently viewed products are stored in your browser's local storage so the site remembers them between visits. This data stays on your device and is not sent to a server.",
  },
  {
    title: "Payments",
    body: "No payment processing takes place on this site and no payment card details are collected or stored.",
  },
  {
    title: "Sharing",
    body: "No personal information collected through this prototype is shared with third parties, and none is sold.",
  },
  {
    title: "Contacting the store directly",
    body: `If you call ${STORE.phone} or email ${STORE.email}, we use those details only to answer your enquiry.`,
  },
  {
    title: "Before launch",
    body: "Final privacy language covering the live Shopify storefront, including checkout, order history and email marketing, will be added before the store launches publicly.",
  },
];

function PrivacyPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <SBSBuildRail index="01" label="Legal" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-4 max-w-3xl border-l-2 border-sbs-red pl-4 text-sm leading-relaxed text-muted-foreground">
        Draft policy content for design review. Final privacy policy must be reviewed before public
        launch.
      </p>

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
