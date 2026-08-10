import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { RecentlyViewed } from "@/components/commerce/RecentlyViewed";
import { useCart } from "@/commerce/cart";
import { formatMoneyCAD } from "@/commerce/format";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | Secret Builders Society" },
      {
        name: "description",
        content:
          "Sign in to track orders, manage preorders and update delivery details at Secret Builders Society.",
      },
      { property: "og:title", content: "My Account | Secret Builders Society" },
      {
        property: "og:description",
        content: "Track orders, manage preorders and update your details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/account" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: AccountPage,
});

const PANELS = [
  { title: "Orders", body: "Track shipments, download invoices and re-order past builds." },
  { title: "Preorders", body: "See every reserved release and its current estimated ship window." },
  { title: "Addresses", body: "Manage delivery and billing addresses for faster checkout." },
  { title: "Notifications", body: "Choose restock alerts, drop emails and preorder reminders." },
];

function AccountPage() {
  const { count, subtotal } = useCart();

  return (
    <>
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Account" }]} />
        <SBSBuildRail index="01" label="Member Area" />
        <h1 className="mt-5 font-display text-4xl md:text-5xl">My Account</h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="card-retail h-fit p-6 md:p-8"
            aria-label="Sign in"
          >
            <h2 className="font-display text-2xl">Sign in</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Accounts are not connected in this prototype.
            </p>

            <label htmlFor="account-email" className="micro mt-6 block text-muted-foreground">
              Email
            </label>
            <input
              id="account-email"
              type="email"
              maxLength={254}
              className="mt-2 h-11 w-full border border-border bg-white px-3 text-sm outline-none focus:border-charcoal"
            />

            <label htmlFor="account-password" className="micro mt-4 block text-muted-foreground">
              Password
            </label>
            <input
              id="account-password"
              type="password"
              maxLength={128}
              className="mt-2 h-11 w-full border border-border bg-white px-3 text-sm outline-none focus:border-charcoal"
            />

            <button type="submit" disabled className="btn-primary-sbs mt-6 w-full opacity-60">
              Sign in (demo)
            </button>
            <p className="micro mt-4 text-muted-foreground">
              New here? Account creation opens at launch.
            </p>
          </form>

          <div>
            <div className="card-retail flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="micro text-muted-foreground">Current cart</p>
                <p className="mt-1 font-display text-2xl">
                  {count} {count === 1 ? "item" : "items"} · {formatMoneyCAD(subtotal)}
                </p>
              </div>
              <Link to="/cart" className="btn-ghost-sbs">
                View cart
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {PANELS.map((panel) => (
                <div key={panel.title} className="card-retail p-6">
                  <h2 className="font-display text-lg">{panel.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{panel.body}</p>
                  <p className="micro mt-4 text-muted-foreground/70">Available at launch</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RecentlyViewed index="02" />
    </>
  );
}
