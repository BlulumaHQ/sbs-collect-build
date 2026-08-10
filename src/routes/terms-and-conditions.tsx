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
          "Draft terms covering site use, product information, orders and preorders for the Secret Builders Society storefront prototype.",
      },
      { property: "og:title", content: "Terms & Conditions | Secret Builders Society" },
      {
        property: "og:description",
        content: "Draft terms for the Secret Builders Society storefront prototype.",
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
    title: "Website Use",
    body: "This website is currently a storefront prototype for design review. Browsing the site does not create an order, contract or reservation of any product.",
  },
  {
    title: "Product Information",
    body: "Product names, images, descriptions and specifications shown in the demo catalogue are provided for design review and may not reflect final retail listings.",
  },
  {
    title: "Pricing and Availability",
    body: `Prices shown are indicative and displayed in ${STORE.currency}. Final pricing, taxes and availability will be confirmed at checkout when the live store launches.`,
  },
  {
    title: "Orders",
    body: "Online ordering is not yet enabled. Order handling, confirmation and cancellation rules will be confirmed before public launch and shown before checkout.",
  },
  {
    title: "Preorders",
    body: "Preorder release information is an estimate and may change. Preorder terms, including any cancellation rights, will be confirmed before public launch.",
  },
  {
    title: "Payment",
    body: "No payments are processed through this prototype. Accepted payment methods and payment capture timing will be confirmed before public launch and shown before checkout.",
  },
  {
    title: "Shipping",
    body: "Shipping services, rates and delivery options have not been finalized and will be shown at checkout when the live store launches.",
  },
  {
    title: "Returns and Cancellations",
    body: "Return, exchange and cancellation policies have not been finalized. The applicable policy will be confirmed before public launch and shown before checkout.",
  },
  {
    title: "Intellectual Property",
    body: "All product names, characters and logos remain the property of their respective rights holders. Site design and copy are the property of Secret Builders Society.",
  },
  {
    title: "Limitation of Liability",
    body: "This site is provided on an as-is basis for review purposes. To the extent permitted by law, Secret Builders Society is not liable for indirect or consequential loss arising from use of this site.",
  },
  {
    title: "Changes to These Terms",
    body: "These terms are a draft and will be reviewed, updated and approved before the store launches publicly.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${STORE.email} or called in to ${STORE.phone}.`,
  },
];

function TermsPage() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <SBSBuildRail index="01" label="Legal" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Terms & Conditions</h1>
      <p className="mt-4 max-w-3xl border-l-2 border-sbs-red pl-4 text-sm leading-relaxed text-muted-foreground">
        Draft policy content for design review. Final store terms must be approved before public
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
