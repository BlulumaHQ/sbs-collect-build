import { createFileRoute, Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useRewards } from "@/components/rewards/RewardsProvider";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | Secret Builders Society" },
      {
        name: "description",
        content:
          "Customer accounts, order history and SBS Rewards will become available when the Secret Builders Society storefront launches.",
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
  const { openRewards } = useRewards();

  return (
    <section className="section-y bg-bone">
      <div className="container-sbs">
        <Breadcrumbs items={[{ label: "My Account" }]} />
        <SBSBuildRail index="01" label="Account" />
        <h1 className="mt-5 font-display text-[38px] lg:text-[50px]">My Account</h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
          Customer accounts, order history and SBS Rewards will become available when the Shopify
          storefront launches.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/shop" search={{ sort: "featured" }} className="btn-primary-sbs">
            Shop products
          </Link>
          <button type="button" onClick={openRewards} className="btn-ghost-sbs">
            View rewards
          </button>
        </div>
      </div>
    </section>
  );
}
