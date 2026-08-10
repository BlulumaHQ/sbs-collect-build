import { STORE, SHIPPING_LINE } from "@/config/store";

const ITEMS = [
  {
    title: "Free Canadian shipping",
    body: SHIPPING_LINE.replace("Free shipping across Canada on ", "On "),
  },
  {
    title: "Preorder protection",
    body: "Reserve upcoming releases with no charge until the item ships from the maker.",
  },
  {
    title: "Collector-grade packing",
    body: "Boxed items double-boxed, sleeves and corner protection on every shelf piece.",
  },
  {
    title: "Shop in person",
    body: `Visit us in ${STORE.city}, ${STORE.region} — open seven days a week.`,
  },
];

export function InfoStrip() {
  return (
    <section aria-label="Store promises" className="border-b border-border bg-white">
      <div className="container-sbs grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex gap-4 py-7 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <span className="mt-1.5 block h-px w-8 shrink-0 bg-sbs-red" aria-hidden="true" />
            <div>
              <h3 className="font-display text-base">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
