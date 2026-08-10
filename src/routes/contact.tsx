import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Secret Builders Society" },
      {
        name: "description",
        content:
          "Reach the Secret Builders Society team about orders, preorders, stock enquiries or in-store visits.",
      },
      { property: "og:title", content: "Contact Us | Secret Builders Society" },
      {
        property: "og:description",
        content: "Store address, hours, phone and an enquiry form for Secret Builders Society.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100, "Name must be under 100 characters."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  subject: z.string().trim().min(1, "Choose a subject.").max(80),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10 characters minimum).")
    .max(1000, "Message must be under 1000 characters."),
});

const SUBJECTS = ["Order enquiry", "Preorder question", "Stock request", "Store visit", "Other"];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <SBSBuildRail index="01" label="Customer Care" />
      <h1 className="mt-5 font-display text-4xl md:text-5xl">Contact Us</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Questions about an order, a preorder window, or whether something is on the shelf right
        now? Send a note or call the shop directly.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const parsed = schema.safeParse({
              name: form.get("name"),
              email: form.get("email"),
              subject: form.get("subject"),
              message: form.get("message"),
            });
            if (!parsed.success) {
              const next: Record<string, string> = {};
              for (const issue of parsed.error.issues) {
                const key = String(issue.path[0]);
                if (!next[key]) next[key] = issue.message;
              }
              setErrors(next);
              setSent(false);
              return;
            }
            setErrors({});
            setSent(true);
          }}
          className="card-retail p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" error={errors["name"]}>
              <input
                id="name"
                name="name"
                maxLength={100}
                className="h-11 w-full border border-border bg-white px-3 text-sm outline-none focus:border-charcoal"
              />
            </Field>
            <Field label="Email" name="email" error={errors["email"]}>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={254}
                className="h-11 w-full border border-border bg-white px-3 text-sm outline-none focus:border-charcoal"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Subject" name="subject" error={errors["subject"]}>
              <select
                id="subject"
                name="subject"
                defaultValue={SUBJECTS[0]}
                className="h-11 w-full border border-border bg-white px-3 text-sm outline-none focus:border-charcoal"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Message" name="message" error={errors["message"]}>
              <textarea
                id="message"
                name="message"
                rows={6}
                maxLength={1000}
                className="w-full border border-border bg-white p-3 text-sm outline-none focus:border-charcoal"
              />
            </Field>
          </div>

          <button type="submit" className="btn-primary-sbs mt-6 w-full sm:w-auto">
            Send message
          </button>
          {sent ? (
            <p role="status" className="mt-4 text-sm text-muted-foreground">
              Thanks — we'll reply within one business day. (Demo form: nothing is sent.)
            </p>
          ) : null}
        </form>

        <aside className="space-y-8">
          <div>
            <h2 className="micro text-sbs-red">The Shop</h2>
            <address className="mt-3 not-italic text-sm leading-relaxed">
              {STORE.addressLine}
              <br />
              {STORE.city}, {STORE.region} {STORE.postal}
              <br />
              {STORE.country}
            </address>
          </div>
          <div>
            <h2 className="micro text-sbs-red">Direct</h2>
            <p className="mt-3 text-sm leading-relaxed">
              <a href={`tel:${STORE.phone.replace(/[^\d+]/g, "")}`} className="hover:text-sbs-red">
                {STORE.phone}
              </a>
              <br />
              <a href={`mailto:${STORE.email}`} className="hover:text-sbs-red">
                {STORE.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="micro text-sbs-red">Hours</h2>
            <dl className="mt-3 space-y-1.5 text-sm">
              {STORE.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="micro text-muted-foreground">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-sbs-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}
