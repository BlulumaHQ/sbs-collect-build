import { useState } from "react";
import type { StorePhoto } from "@/config/store";
import { StoreLightbox } from "./StoreLightbox";

/**
 * Bento-style photo grid. Landscape photos span 2 columns × 2 rows,
 * portrait photos 1 column × 2 rows; `grid-flow-dense` closes gaps.
 * Every tile opens the lightbox.
 */
export function StoreGallery({ photos }: { photos: StorePhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="m-0 grid list-none grid-flow-dense grid-cols-2 gap-2 p-0 [grid-auto-rows:150px] sm:gap-3 sm:[grid-auto-rows:190px] lg:grid-cols-4 lg:[grid-auto-rows:210px]">
        {photos.map((p, i) => (
          <li
            key={p.src}
            className={p.orientation === "landscape" ? "col-span-2 row-span-2" : "row-span-2"}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block h-full w-full overflow-hidden bg-bone"
              aria-label={`Open photo: ${p.caption}`}
            >
              <img
                src={p.srcSm}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="micro-sm pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <StoreLightbox photos={photos} index={open} onIndexChange={setOpen} />
    </>
  );
}
