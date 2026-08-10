import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_SRC,
  STORE,
  UNITY_TATTOO_URL,
} from "@/config/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Store Info | Secret Builders Society" },
      {
        name: "description",
        content:
          "Visit Secret Builders Society at 1395 Commercial Drive, Vancouver, BC. Open Monday to Saturday, 11 AM to 6 PM. Call 604.423.3343.",
      },
      { property: "og:title", content: "Contact & Store Info | Secret Builders Society" },
      {
        property: "og:description",
        content: "Store address, hours, phone and directions for our Commercial Drive location.",
      },
    ],
  }),
  component: ContactPage,
});

const FIELD =
  "mt-2 h-12 w-full border border-border bg-white px-4 text-[15px] outline-none focus:border-sbs-red";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim()) {
      setError("Please complete name, subject and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <>
      <section className="border-b border-border bg-white py-12 lg:py-16">
        <div className="container-sbs">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <SBSBuildRail index="01" label="Visit & Contact" />
          <h1 className="mt-5 font-display text-[38px] lg:text-[50px]">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
            Have a question about the store, the catalogue or an upcoming release? Get in touch with
            Secret Builders Society.
          </p>
        </div>
      </section>

      <section className="section-y border-b border-border bg-bone">
        <div className="container-sbs grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — contact information */}
          <div>
            <h2 className="micro text-sbs-red">Contact information</h2>
            <p className="mt-4 font-display text-[28px] lg:text-[34px]">Secret Builders Society</p>

            <ul className="mt-8 space-y-7">
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Address</h3>
                  <address className="mt-2 text-[16px] not-italic leading-relaxed">
                    {STORE.addressLine}
                    <br />
                    {STORE.city}, {STORE.region}
                  </address>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Phone</h3>
                  <p className="mt-2 text-[16px]">
                    <a href={STORE.phoneHref} className="hover:text-sbs-red">
                      {STORE.phone}
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Email</h3>
                  <p className="mt-2 text-[16px]">
                    <a href={`mailto:${STORE.email}`} className="hover:text-sbs-red">
                      {STORE.email}
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Store hours</h3>
                  <dl className="mt-2 space-y-1 text-[16px]">
                    {STORE.hours.map((h) => (
                      <div key={h.day} className="flex gap-3">
                        <dt className="text-muted-foreground">{h.day}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT — contact form */}
          <div className="border border-border bg-white p-6 lg:p-9">
            <h2 className="micro text-sbs-red">Contact form</h2>
            <p className="mt-4 font-display text-[26px] lg:text-[30px]">Send us a message</p>

            {sent ? (
              <p className="mt-8 border border-sbs-red/30 bg-sbs-red/5 p-5 text-[16px] leading-relaxed">
                Thank you. Your message has been received in this prototype.
              </p>
            ) : (
              <form onSubmit={submit} noValidate className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-name" className="micro-sm text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="cf-name"
                      className={FIELD}
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="micro-sm text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      className={FIELD}
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-phone" className="micro-sm text-muted-foreground">
                      Phone
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      className={FIELD}
                      value={form.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-subject" className="micro-sm text-muted-foreground">
                      Subject
                    </label>
                    <input
                      id="cf-subject"
                      className={FIELD}
                      value={form.subject}
                      onChange={(e) => set("subject")(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-message" className="micro-sm text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    rows={6}
                    className="mt-2 w-full border border-border bg-white px-4 py-3 text-[15px] outline-none focus:border-sbs-red"
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                  />
                </div>
                {error ? <p className="text-sm text-sbs-red">{error}</p> : null}
                <button type="submit" className="btn-primary-sbs">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container-sbs py-12 lg:py-16">
          <h2 className="font-display text-[28px] lg:text-[34px]">Find the store</h2>
          <div className="mt-6 h-[360px] w-full overflow-hidden border border-border lg:h-[470px]">
            <iframe
              title="Map showing 1395 Commercial Drive, Vancouver, BC"
              src={MAPS_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
          <div className="mt-6">
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-sbs"
            >
              Get directions
            </a>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="micro text-sbs-red">Sharing the space</p>
            <h3 className="mt-3 font-display text-[22px] lg:text-[26px]">
              Also home to Unity Tattoo.
            </h3>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Secret Builders Society shares its Commercial Drive location with Unity Tattoo.
            </p>
            <a
              href={UNITY_TATTOO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="micro mt-4 inline-block text-sbs-red hover:underline"
            >
              Visit Unity Tattoo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
