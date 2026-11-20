/**
 * Contact form → email to the shop, sent from the Worker with Cloudflare Email Routing's
 * `send_email` binding (wrangler.jsonc). No third-party email service: mail goes from
 * website@secretbuilderssociety.ca to the shop's verified Email Routing inbox, with the
 * customer as Reply-To so the shop can simply hit "Reply".
 */
import { createServerFn } from "@tanstack/react-start";

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  /** Honeypot — real people never fill it. */
  website?: string;
  /** ms the form was open before submit (bots submit instantly). */
  elapsed?: number;
}

export type ContactResult = { ok: true } | { ok: false; error: string };

// Workers runtime modules — kept as variables so the bundler leaves them for workerd to resolve.
const CF_WORKERS = "cloudflare:workers";
const CF_EMAIL = "cloudflare:email";

const FROM = "website@secretbuilderssociety.ca";
const TO = "jointhesbs@gmail.com";

const clip = (s: unknown, n: number) =>
  String(s ?? "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, n);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
const b64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};
const encodeHeader = (s: string) => `=?UTF-8?B?${b64(s)}?=`;

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((d: ContactInput) => d)
  .handler(async ({ data }): Promise<ContactResult> => {
    const name = oneLine(clip(data.name, 120));
    const email = oneLine(clip(data.email, 200));
    const phone = oneLine(clip(data.phone, 40));
    const subject = oneLine(clip(data.subject, 160));
    const message = clip(data.message, 5000);

    // Bots: pretend success so they don't retry.
    if (data.website || (data.elapsed !== undefined && data.elapsed < 2500)) return { ok: true };
    if (!name || !subject || !message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
      return { ok: false, error: "Please complete every required field." };
    }

    const body = [
      message,
      "",
      "—",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "Sent from the contact form on secretbuilderssociety.ca — reply to this email to answer the customer.",
    ]
      .filter((l) => l !== null)
      .join("\r\n");

    const raw = [
      `From: ${encodeHeader("SBS Website")} <${FROM}>`,
      `To: <${TO}>`,
      `Reply-To: ${encodeHeader(name)} <${email}>`,
      `Subject: ${encodeHeader(`[Website] ${subject}`)}`,
      `Message-ID: <${crypto.randomUUID()}@secretbuilderssociety.ca>`,
      `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      b64(body).replace(/.{76}/g, "$&\r\n"),
    ].join("\r\n");

    try {
      const { env } = (await import(/* @vite-ignore */ CF_WORKERS)) as unknown as {
        env: { SEND_EMAIL?: { send: (m: unknown) => Promise<void> } };
      };
      const { EmailMessage } = (await import(/* @vite-ignore */ CF_EMAIL)) as unknown as {
        EmailMessage: new (from: string, to: string, raw: string) => unknown;
      };
      if (!env.SEND_EMAIL) throw new Error("SEND_EMAIL binding missing");
      await env.SEND_EMAIL.send(new EmailMessage(FROM, TO, raw));
      return { ok: true };
    } catch (err) {
      console.error("contact form send failed", err);
      return { ok: false, error: "send-failed" };
    }
  });
