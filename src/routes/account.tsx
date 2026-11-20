import { CUSTOMER_ACCOUNT_URL } from "@/commerce/adapter";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | Secret Builders Society" },
      {
        name: "description",
        content:
          "Sign in to your Secret Builders Society customer account to check orders and track shipments.",
      },
      { property: "og:title", content: "My Account | Secret Builders Society" },
      {
        property: "og:description",
        content: "Accounts and rewards are coming with the storefront launch.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {

  return (
    <section className="section-y bg-bone">
      <div className="container-sbs">
        <Breadcrumbs items={[{ label: "My Account" }]} />
        <SBSBuildRail index="01" label="Account" />
        <h1 className="mt-5 font-display text-[38px] lg:text-[50px]">My Account</h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
          Check an order, track a shipment or update your details in your Secret Builders Society
          customer account. Sign in with the email you used at checkout — we send you a one-time code,
          no password needed.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/shop" search={{ sort: "featured" }} className="btn-primary-sbs">
            Shop products
          </Link>
          <a href={CUSTOMER_ACCOUNT_URL} className="btn-ghost-sbs">
            Sign in to your account
          </a>
        </div>
      </div>
    </section>
  );
}
