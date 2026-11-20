import type { ImageFrame } from "@/types/commerce";

/** Ask the Shopify CDN for a card-sized rendition instead of the full original. */
function sizedSrc(src: string, width: number): string {
  if (!src.includes("cdn.shopify.com")) return src;
  return `${src}${src.includes("?") ? "&" : "?"}width=${width}`;
}

/**
 * A product photo placed in a square box using its pre-computed frame
 * (scripts/image-framing.mjs): solid-background shots are trimmed and centred so
 * the toy is never cropped; busy photos are shown whole (contain) — never cropped. Photos without a frame are shown whole (contain).
 *
 * `className` goes on the absolutely positioned layer (use it for hover effects).
 */
export function FramedImage({
  src,
  frame,
  alt,
  className = "",
  loading = "lazy",
  ariaHidden,
}: {
  src: string;
  frame?: ImageFrame | undefined;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  ariaHidden?: boolean;
}) {
  if (frame?.m === "b") {
    return (
      <div
        className={`absolute inset-0 overflow-hidden ${className}`}
        style={{ backgroundColor: frame.bg }}
        aria-hidden={ariaHidden}
      >
        <img
          src={sizedSrc(src, frame.rw)}
          alt={alt}
          loading={loading}
          decoding="async"
          className="absolute max-w-none"
          style={{
            width: `${frame.w}%`,
            height: `${frame.h}%`,
            left: `${frame.l}%`,
            top: `${frame.t}%`,
          }}
        />
      </div>
    );
  }

  // Busy / full-bleed photos (frame "c") are shown whole too: never crop a product photo —
  // a tall pen or a long, thin box must be seen end to end.
  const busy = frame?.m === "c";
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-white ${className}`}
      aria-hidden={ariaHidden}
    >
      <img
        src={sizedSrc(src, busy ? frame.rw : 800)}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`h-full w-full object-contain ${busy ? "p-[3%]" : "p-[6%]"}`}
      />
    </div>
  );
}
