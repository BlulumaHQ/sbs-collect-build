import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { sendContactMessage } from "@/lib/contact-api";
import {
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_SRC,
  STORE,
  STORE_PHOTOS,
  UNITY_TATTOO_INTERIOR_PHOTO,
  UNITY_TATTOO_STOREFRONT_PHOTO,
  UNITY_TATTOO_URL,
} from "@/config/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Store Info | Secret Builders Society" },
      {
        name: "description",
        content:
          "Visit Secret Builders Society at 1395 Commercial Drive, Vancouver, BC. Open Friday to Sunday, 12 PM to 7 PM. Call 778-928-6412.",
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
  "mt-2 h-12 w-full border border-border bg-white px-4 text-base outline-none focus:border-sbs-red";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
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
    setSending(true);
    try {
      const res = await sendContactMessage({
        data: { ...form, website: honeypot, elapsed: Date.now() - openedAt },
      });
      if (res.ok) {
        setSent(true);
        return;
      }
      setError(
        res.error === "send-failed"
          ? `Sorry — your message couldn't be sent right now. Please email us at ${STORE.email} or call ${STORE.phone}.`
          : res.error,
      );
    } catch {
      setError(
        `Sorry — your message couldn't be sent right now. Please email us at ${STORE.email}.`,
      );
    } finally {
      setSending(false);
    }
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
                <Instagram className="mt-1 shrink-0 text-sbs-red" size={22} aria-hidden="true" />
                <div>
                  <h3 className="micro-sm text-muted-foreground">Follow us</h3>
                  <ul className="mt-2 space-y-1 text-[16px]">
                    {STORE.social.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-sbs-red"
                        >
                          {s.label} — {s.handle}
                        </a>
                      </li>
                    ))}
                  </ul>
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
              <p
                role="status"
                className="mt-8 border border-sbs-red/30 bg-sbs-red/5 p-5 text-[16px] leading-relaxed"
              >
                Thanks, {form.name.split(" ")[0] || "there"} — your message has been sent. We'll
                reply to {form.email}, usually within a few days (the store is open Friday to
                Sunday).
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
                    className="mt-2 w-full border border-border bg-white px-4 py-3 text-base outline-none focus:border-sbs-red"
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="cf-website">Website</label>
                  <input
                    id="cf-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                {error ? (
                  <p role="alert" className="text-sm text-sbs-red">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="btn-primary-sbs" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container-sbs py-12 lg:py-16">
          <h2 className="font-display text-[28px] lg:text-[34px]">Find the store</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            We are inside 1395 Commercial Drive, through the Unity Tattoo door. Look for the{" "}
            <strong className="font-semibold text-foreground">Hobby Shop</strong> sign on the
            sidewalk.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-[2fr_1fr]">
            {[STORE_PHOTOS.frontEntrance, STORE_PHOTOS.sidewalkSign].map((p) => (
              <figure key={p.src} className="m-0">
                <div className="h-[240px] w-full overflow-hidden border border-border bg-bone sm:h-[320px] lg:h-[380px]">
                  <img
                    src={p.srcSm}
                    srcSet={`${p.srcSm} 800w, ${p.src} 1600w`}
                    sizes="(min-width: 640px) 66vw, 100vw"
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${p.orientation === "portrait" ? "object-[center_20%]" : ""}`}
                  />
                </div>
                <figcaption className="micro-sm mt-2 text-muted-foreground">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 h-[360px] w-full overflow-hidden border border-border lg:h-[470px]">
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
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <figure className="m-0">
                <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-bone">
                  <img
                    src={UNITY_TATTOO_STOREFRONT_PHOTO}
                    alt="Unity Tattoo storefront on Commercial Drive with lettering on the window"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="micro-sm mt-2 text-muted-foreground">
                  Unity Tattoo storefront, Commercial Drive
                </figcaption>
              </figure>
              <figure className="m-0">
                <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-bone">
                  <img
                    src={UNITY_TATTOO_INTERIOR_PHOTO}
                    alt="Inside Unity Tattoo — framed tattoo art on the walls and a treatment bed"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="micro-sm mt-2 text-muted-foreground">
                  Inside the Unity Tattoo studio
                </figcaption>
              </figure>
            </div>
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
