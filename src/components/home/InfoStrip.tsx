import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Truck } from "lucide-react";
import { STORE } from "@/config/store";

export function InfoStrip() {
  return (
    <section className="border-b border-border bg-white" aria-label="Store information">
      <div className="container-sbs">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          <div className="lg:pr-8">
            <MapPin className="text-sbs-red" size={20} aria-hidden="true" />
            <h2 className="mt-3 font-display text-[17px] leading-tight">Vancouver Store</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              {STORE.addressLine}
              <br />
              {STORE.city}, {STORE.region}
            </p>
          </div>

          <div className="lg:border-l lg:border-border lg:px-8">
            <Clock className="text-sbs-red" size={20} aria-hidden="true" />
            <h2 className="mt-3 font-display text-[17px] leading-tight">Store Hours</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              Mon–Sat 11 AM–6 PM
              <br />
              Sunday Closed
            </p>
          </div>

          <div className="lg:border-l lg:border-border lg:px-8">
            <Truck className="text-sbs-red" size={20} aria-hidden="true" />
            <h2 className="mt-3 font-display text-[17px] leading-tight">Shipping Information</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              Shipping options and rates will be provided through the live Shopify checkout.
            </p>
            <Link
              to="/shipping-information"
              className="micro-sm mt-2 inline-block text-sbs-red hover:underline"
            >
              Learn more
            </Link>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-8">
            <Phone className="text-sbs-red" size={20} aria-hidden="true" />
            <h2 className="mt-3 font-display text-[17px] leading-tight">Need Help?</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              <a href={STORE.phoneHref} className="hover:text-sbs-red">
                {STORE.phone}
              </a>
            </p>
            <Link
              to="/contact"
              className="micro-sm mt-2 inline-block text-sbs-red hover:underline"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
