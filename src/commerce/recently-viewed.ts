import { useEffect, useState } from "react";
import { getProductsByIds } from "@/commerce/adapter";
import type { CommerceProduct } from "@/types/commerce";

const KEY = "sbs-recently-viewed-v1";
const LIMIT = 12;

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

/** Records a product view in localStorage (client-only, SSR safe). */
export function useTrackRecentlyViewed(id: string | undefined) {
  useEffect(() => {
    if (!id) return;
    try {
      const next = [id, ...read().filter((v) => v !== id)].slice(0, LIMIT);
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, [id]);
}

/** Returns recently viewed products, optionally excluding the current one. */
export function useRecentlyViewed(excludeId?: string): CommerceProduct[] {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(read());
  }, [excludeId]);
  return getProductsByIds(ids.filter((id) => id !== excludeId));
}
