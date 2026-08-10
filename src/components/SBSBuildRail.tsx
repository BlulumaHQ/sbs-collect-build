export function SBSBuildRail({
  index,
  label,
  tone = "dark",
}: {
  index: string;
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-px w-10 bg-sbs-red md:w-16" aria-hidden="true" />
      <span
        className={`micro ${tone === "light" ? "text-white/70" : "text-muted-foreground"}`}
      >
        {index} / {label}
      </span>
    </div>
  );
}
