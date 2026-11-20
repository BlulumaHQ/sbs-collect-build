import { useEffect, useState } from "react";
import { STORE } from "@/config/store";

/**
 * Supplier order cycle: the shop orders from the supplier every Monday (cut-off Monday 23:59
 * Vancouver time) and the order is ready that Friday. So an order placed Tuesday–Monday is
 * ready the Friday after the next Monday cut-off. Early arrivals are a bonus the shop tells
 * customers about itself — the site only ever promises this date.
 */
const TZ = "America/Vancouver";

function vancouverToday(now: Date): { y: number; m: number; d: number; weekday: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { y: Number(get("year")), m: Number(get("month")), d: Number(get("day")), weekday };
}

/** The estimated ready/ship Friday for an in-stock order placed at `now`, as a UTC-noon Date. */
export function estimatedReadyFriday(now: Date = new Date()): Date {
  const { y, m, d, weekday } = vancouverToday(now);
  const daysToMonday = (1 - weekday + 7) % 7; // Monday itself → 0 (still before the 23:59 cut-off)
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  date.setUTCDate(date.getUTCDate() + daysToMonday + 4 + 7 * STORE.fulfilmentDelayWeeks);
  return date;
}

export function formatReadyDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

/** Client-only (the date depends on "now"), so the server never renders a stale date. */
export function useEstimatedReadyDate(): string | null {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => setLabel(formatReadyDate(estimatedReadyFriday())), []);
  return label;
}
