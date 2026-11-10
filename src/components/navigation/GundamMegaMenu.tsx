import { Link } from "@tanstack/react-router";
import { getGundamProducts } from "@/commerce/adapter";
import { GUNDAM_SERIES, GUNPLA_GRADES } from "@/commerce/attributes";
import { GUIDES } from "@/content/guides";

const linkCls = "flex items-baseline justify-between gap-3 py-1 text-sm text-charcoal/80 transition-colors duration-200 hover:text-sbs-red";

function Count({ n }: { n: number }) {
  return <span className="micro-sm text-muted-foreground">{n}</span>;
}

/**
 * Gundam mega menu. Grade/series links become live catalogue filters only when
 * products carry that metadata; otherwise grades point to the educational guide.
 */
export function GundamMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const scope = getGundamProducts();
  const count = (pred: (p: (typeof scope)[number]) => boolean) => scope.filter(pred).length;

  const availability = [
    { label: "In Stock", search: { sort: "featured" as const, status: "available" }, n: count((p) => p.status === "available") },
    { label: "New Arrivals", search: { sort: "featured" as const, new: true }, n: count((p) => Boolean(p.newArrival)) },
    { label: "Preorders", search: { sort: "featured" as const, status: "preorder" }, n: count((p) => p.status === "preorder") },
    { label: "On Sale", search: { sort: "featured" as const, sale: true }, n: count((p) => Boolean(p.compareAtPrice && p.compareAtPrice > p.price)) },
  ];

  return (
    <div className="border-t border-border bg-card">
      <div className="container-sbs grid gap-8 py-10 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-1">
          <span className="micro mb-2 text-sbs-red">Shop by Grade</span>
          {GUNPLA_GRADES.map((g) => {
            const n = count((p) => p.grade === g.code);
            const label = g.code === "OTHER" ? g.name : `${g.code} · ${g.name}`;
            return n > 0 ? (
              <Link key={g.code} to="/gundam" search={{ sort: "featured", grade: g.code }} onClick={onNavigate} className={linkCls}>
                {label} <Count n={n} />
              </Link>
            ) : (
              <Link
                key={g.code}
                to="/guides/gunpla-grades-explained"
                hash={`grade-${g.code.toLowerCase()}`}
                onClick={onNavigate}
                className={linkCls}
              >
                {label} <span className="micro-sm text-muted-foreground">Guide</span>
              </Link>
            );
          })}
          {scope.length === 0 ? (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              No Gundam kits are listed in the demo catalogue yet — grade links open our guide.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <span className="micro mb-2 text-sbs-red">Shop by Series</span>
          {GUNDAM_SERIES.map((s) => (
            <Link key={s.code} to="/gundam" search={{ sort: "featured", gseries: s.code }} onClick={onNavigate} className={linkCls}>
              {s.name} <Count n={count((p) => p.gundamSeries === s.code)} />
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
