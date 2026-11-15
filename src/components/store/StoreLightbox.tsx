import { useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { StorePhoto } from "@/config/store";

type Props = {
  photos: StorePhoto[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

/** Full-screen photo viewer with keyboard (← →) and button navigation. */
export function StoreLightbox({ photos, index, onIndexChange }: Props) {
  const open = index !== null;
  const count = photos.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const photo = index !== null ? photos[index] : null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 outline-none sm:p-10"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            {photo ? photo.caption : "Store photo"}
          </DialogPrimitive.Title>

          {photo ? (
            <figure className="m-0 flex max-h-full w-full flex-col items-center">
              <img
                src={photo.src}
                alt={photo.alt}
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
              <figcaption className="micro-sm mt-4 text-center text-white/70">
                {photo.caption}
                <span className="ml-3 text-white/40">
                  {(index ?? 0) + 1} / {count}
                </span>
              </figcaption>
            </figure>
          ) : null}

          <DialogPrimitive.Close
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
            aria-label="Close photo"
          >
            <X size={26} />
          </DialogPrimitive.Close>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:left-4"
                aria-label="Previous photo"
              >
                <ChevronLeft size={34} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:right-4"
                aria-label="Next photo"
              >
                <ChevronRight size={34} />
              </button>
            </>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
