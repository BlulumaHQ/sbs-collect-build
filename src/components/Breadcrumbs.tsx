import { Link } from "@tanstack/react-router";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const base = tone === "light" ? "text-white/55" : "text-muted-foreground";
  const active = tone === "light" ? "text-white" : "text-foreground";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`micro-sm flex flex-wrap items-center gap-2 ${base}`}>
        <li>
          <Link to="/" className="hover:text-sbs-red">
            Home
          </Link>
        </li>

        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link to={item.to} className="hover:text-sbs-red">
                {item.label}
              </Link>
            ) : (
              <span className={active}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
