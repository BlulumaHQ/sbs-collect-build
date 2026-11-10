/**
 * Product attribute derivation.
 *
 * Grade, Scale, Gundam series, Category, Brand and franchise are separate
 * dimensions. Values come from explicitly labelled source fields first; title
 * tokens are used only when they are unambiguous. Descriptions are never parsed.
 */

export const GUNPLA_GRADES = [
  { code: "EG", name: "Entry Grade" },
  { code: "HG", name: "High Grade" },
  { code: "RG", name: "Real Grade" },
  { code: "MG", name: "Master Grade" },
  { code: "PG", name: "Perfect Grade" },
  { code: "SD", name: "Super Deformed" },
  { code: "OTHER", name: "Full Mechanics & Other" },
] as const;

export type GunplaGrade = (typeof GUNPLA_GRADES)[number]["code"];

export const GUNDAM_SERIES = [
  { code: "uc", name: "Universal Century" },
  { code: "seed", name: "Gundam SEED" },
  { code: "00", name: "Gundam 00" },
  { code: "ibo", name: "Iron-Blooded Orphans" },
  { code: "wfm", name: "The Witch from Mercury" },
  { code: "other", name: "Other Series" },
] as const;

export type GundamSeries = (typeof GUNDAM_SERIES)[number]["code"];

const GRADE_CODES = new Set<string>(GUNPLA_GRADES.map((g) => g.code));
const SERIES_CODES = new Set<string>(GUNDAM_SERIES.map((s) => s.code));

/** Title tokens that map unambiguously to a grade (whole-word, upper-case). */
const GRADE_TOKENS: [RegExp, GunplaGrade][] = [
  [/\bENTRY GRADE\b|\bEG\b/, "EG"],
  [/\bHIGH GRADE\b|\bHGUC\b|\bHGCE\b|\bHGBF\b|\bHGIBO\b|\bHG\b/, "HG"],
  [/\bREAL GRADE\b|\bRG\b/, "RG"],
  [/\bMASTER GRADE\b|\bMGEX\b|\bMGSD\b|\bMG\b/, "MG"],
  [/\bPERFECT GRADE\b|\bPG UNLEASHED\b|\bPG\b/, "PG"],
  [/\bSDCS\b|\bSDEX\b|\bSD GUNDAM\b|\bBB SENSHI\b/, "SD"],
  [/\bFULL MECHANICS\b|\bRE\/100\b/, "OTHER"],
];

export function isGundamTitle(title: string, subcategory?: string): boolean {
  return /\bgundam\b|\bgunpla\b/i.test(title) || subcategory === "Gunpla";
}

export function deriveGrade(input: {
  grade?: string | null | undefined;
  title: string;
  category: string;
  subcategory?: string | undefined;
}): GunplaGrade | undefined {
  const explicit = input.grade?.trim().toUpperCase();
  if (explicit && GRADE_CODES.has(explicit)) return explicit as GunplaGrade;
  // Title tokens only count on Gundam model kits — "HG" in an apparel name is meaningless.
  if (input.category !== "Model Kits" || !isGundamTitle(input.title, input.subcategory)) return undefined;
  const upper = input.title.toUpperCase();
  // MGSD is an SD-style kit sold under the MG line; treat as MG only when explicit.
  for (const [pattern, grade] of GRADE_TOKENS) if (pattern.test(upper)) return grade;
  return undefined;
}

export function deriveScale(input: { scale?: string | null | undefined; title: string }): string | undefined {
  const explicit = input.scale?.trim();
  if (explicit && /^1\/\d{1,4}$/.test(explicit)) return explicit;
  const match = input.title.match(/(?:^|[^\d/])(1\/\d{1,4})(?![\d/])/);
  return match ? match[1] : undefined;
}

const SERIES_TOKENS: [RegExp, GundamSeries][] = [
  [/witch from mercury|\baerial\b/i, "wfm"],
  [/iron[- ]blooded orphans|\bibo\b|barbatos/i, "ibo"],
  [/gundam 00\b|\b00 gundam|exia/i, "00"],
  [/gundam seed|\bseed\b|freedom gundam|strike gundam/i, "seed"],
  [/\bhguc\b|universal century|\brx-78|zaku|sazabi|nu gundam|ν gundam|unicorn/i, "uc"],
];

export function deriveGundamSeries(input: {
  gundamSeries?: string | null | undefined;
  title: string;
  isGundam: boolean;
}): GundamSeries | undefined {
  const explicit = input.gundamSeries?.trim().toLowerCase();
  if (explicit && SERIES_CODES.has(explicit)) return explicit as GundamSeries;
  if (!input.isGundam) return undefined;
  for (const [pattern, code] of SERIES_TOKENS) if (pattern.test(input.title)) return code;
  return undefined;
}

export function gradeName(code: string): string {
  return GUNPLA_GRADES.find((g) => g.code === code)?.name ?? code;
}

export function gundamSeriesName(code: string): string {
  return GUNDAM_SERIES.find((s) => s.code === code)?.name ?? code;
}
