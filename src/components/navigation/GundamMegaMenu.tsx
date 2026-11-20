import { Link } from "@tanstack/react-router";
import { useNavSummary } from "@/commerce/nav-summary";
import { GUNDAM_SERIES, GUNPLA_GRADES } from "@/commerce/attributes";
import { GUIDES } from "@/content/guides";

const linkCls = "flex items-baseline justify-between gap-3 py-1 text-sm text-charcoal/80 transition-colors duration-200 hover:text-sbs-red";

function Count({ n }: { n: number }) {
  return <span className="micro-sm text-muted-foreground">{n}</span>;
}

/**
 * Gundam mega menu. Grade/series links are always URL-backed catalogue filters;
 * counts reflect products carrying that metadata.
 */
export function GundamMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { gundam } = useNavSummary();

  const availability = [
    { label: "In Stock", search: { sort: "featured" as const, status: "available" }, n: gundam.available },
    { label: "New Arrivals", search: { sort: "featured" as const, new: true }, n: gundam.newArrivals },
    { label: "Preorders", search: { sort: "featured" as const, status: "preorder" }, n: gundam.preorder },
    { label: "On Sale", search: { sort: "featured" as const, sale: true }, n: gundam.sale },
  ];

  return (
    <div className="border-t border-border bg-card">
      <div className="container-sbs grid gap-8 py-10 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-1">
          <span className="micro mb-2 text-sbs-red">Shop by Grade</span>
          {GUNPLA_GRADES.map((g) => {
            const n = gundam.grades[g.code] ?? 0;
            const label = g.code === "OTHER" ? g.name : `${g.code} · ${g.name}`;
            return (
              <Link key={g.code} to="/gundam" search={{ sort: "featured", grade: g.code }} onClick={onNavigate} className={linkCls}>
                {label} <Count n={n} />
              </Link>
            );
          })}
          <Link to="/guides/gunpla-grades-explained" onClick={onNavigate} className="micro-sm mt-3 text-foreground hover:text-sbs-red">
            Learn about grades →
          </Link>
          {gundam.total === 0 ? (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              No Gundam kits are in stock right now.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <span className="micro mb-2 text-sbs-red">Shop by Series</span>
          {GUNDAM_SERIES.map((s) => (
            <Link key={s.code} to="/gundam" search={{ sort: "featured", gseries: s.code }} onClick={onNavigate} className={linkCls}>
              {s.name} <Count n={gundam.series[s.code] ?? 0} />
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <span className="micro mb-2 text-sbs-red">Shop by Availability</span>
          {availability.map((a) => (
            <Link key={a.label} to="/gundam" search={a.search} onClick={onNavigate} className={linkCls}>
              {a.label} <Count n={a.n} />
            </Link>
          ))}
          <Link to="/gundam" search={{ sort: "featured" }} onClick={onNavigate} className="micro mt-4 text-foreground hover:text-sbs-red">
            All Gundam →
          </Link>
        </div>

        <div className="flex flex-col gap-1 border-l border-border pl-6">
          <span className="micro mb-2 text-sbs-red">Build &amp; Learn</span>
          {GUIDES.map((g) => (
            <Link key={g.slug} to={g.path} onClick={onNavigate} className="py-1 text-sm text-charcoal/80 hover:text-sbs-red">
              {g.title}
            </Link>
          ))}
          <Link
            to="/shop/$category"
            params={{ category: "hobby-supplies" }}
            search={{ sort: "featured" }}
            onClick={onNavigate}
            className="py-1 text-sm text-charcoal/80 hover:text-sbs-red"
          >
            Tools &amp; Hobby Supplies
          </Link>
          <Link to="/guides" onClick={onNavigate} className="micro mt-4 text-foreground hover:text-sbs-red">
            All guides →
          </Link>
        </div>
      </div>
    </div>
  );
}
