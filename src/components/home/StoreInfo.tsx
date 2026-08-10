import { Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

export function StoreInfo() {
  return (
    <section className="section-y border-b border-border bg-white">
      <div className="container-sbs grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="border border-border bg-bone">
          <img
            src="/images/store/sbs-store-interior.jpg"
            alt="Interior of the Secret Builders Society shop with shelves of boxed model kits and figures"
            width={1600}
            height={1104}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div>
          <SBSBuildRail index="05" label="Visit the Shop" />
          <h2 className="mt-5 font-display text-3xl md:text-4xl">
            Built in store. Shipped across Canada.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Walk the wall of kits, test a paint chip under real light, and talk to people who
            actually build. Everything on the shelf is also available online.
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="micro text-sbs-red">Address</h3>
              <address className="mt-3 not-italic text-sm leading-relaxed">
                {STORE.addressLine}
                <br />
                {STORE.city}, {STORE.region} {STORE.postal}
                <br />
                {STORE.country}
              </address>
              <p className="mt-3 text-sm">
                <a
                  href={`tel:${STORE.phone.replace(/[^\d+]/g, "")}`}
                  className="hover:text-sbs-red"
                >
                  {STORE.phone}
                </a>
              </p>
            </div>
            <div>
              <h3 className="micro text-sbs-red">Store Hours</h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                {STORE.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{h.day}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary-sbs">
              Contact the shop
            </Link>
            <Link to="/shipping-information" className="btn-ghost-sbs">
              Shipping information
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
