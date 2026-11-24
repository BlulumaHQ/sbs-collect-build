/**
 * Multi-select filters keep several values in one URL param, joined by "|"
 * (e.g. `?grade=HG|RG`). Within a group values are OR'ed; groups are AND'ed.
 */
export const MULTI_SEP = "|";

export function values(param: string | undefined): string[] {
  return param ? param.split(MULTI_SEP).filter(Boolean) : [];
}

export function hasValue(param: string | undefined, value: string): boolean {
  return values(param).includes(value);
}

/** Add the value if missing, remove it if present. Returns undefined when nothing is left. */
export function toggleValue(param: string | undefined, value: string): string | undefined {
  const list = values(param);
  const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  return next.length ? next.join(MULTI_SEP) : undefined;
}

export function matches(param: string | undefined, value: string | undefined | null): boolean {
  const list = values(param);
  return list.length === 0 || (value != null && list.includes(value));
}
