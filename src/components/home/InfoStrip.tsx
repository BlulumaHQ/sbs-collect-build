import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Truck } from "lucide-react";
import { STORE } from "@/config/store";

export function InfoStrip() {
  return (
    <section className="border-b border-border bg-white" aria-label="Store information">
      <div className="container-sbs grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white px-6 py-8">
          <MapPin className="text-sbs-red" size={22} aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg">Vancouver Store</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            {STORE.addressLine}
            <br />
            {STORE.city}, {STORE.region}
          </p>
          <Link to="/contact" className="micro mt-4 inline-block text-sbs-red hover:underline">
            Store info
          </Link>
        </div>

        <div className="bg-white px-6 py-8">
          <Clock className="text-sbs-red" size={22} aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg">Store Hours</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Mon–Sat 11 AM–6 PM
            <br />
            Sunday Closed
          </p>
        </div>

        <div className="bg-white px-6 py-8">
          <Truck className="text-sbs-red" size={22} aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg">Shipping Information</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Shipping options and rates will be provided through the live Shopify checkout.
          </p>
          <Link
            to="/shipping-information"
            className="micro mt-4 inline-block text-sbs-red hover:underline"
          >
            Learn more
          </Link>
        </div>

        <div className="bg-white px-6 py-8">
          <Phone className="text-sbs-red" size={22} aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg">Need Help?</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            <a href={STORE.phoneHref} className="hover:text-sbs-red">
              {STORE.phone}
            </a>
          </p>
          <Link to="/contact" className="micro mt-4 inline-block text-sbs-red hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
