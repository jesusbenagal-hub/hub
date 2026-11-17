// Full class names: Tailwind only generates the classes it finds written out.
const radii = [
  { name: "rounded-xs", className: "rounded-xs", size: "2 px" },
  { name: "rounded-sm", className: "rounded-sm", size: "4 px" },
  { name: "rounded-md", className: "rounded-md", size: "6 px" },
  { name: "rounded-lg", className: "rounded-lg", size: "8 px" },
  { name: "rounded-xl", className: "rounded-xl", size: "10 px" },
];

/** The corner radii, from the smallest to the largest. */
export function RadiusScale() {
  return (
    <ul className="mb-6 flex flex-wrap gap-4">
      {radii.map(({ name, className, size }) => (
        <li key={name} className="flex flex-col items-center gap-1">
          <span
            aria-hidden="true"
            className={`size-12 border-2 border-primary bg-secondary ${className}`}
          />
          <code className="font-mono text-xs">{name}</code>
          <span className="text-xs text-muted-foreground">{size}</span>
        </li>
      ))}
    </ul>
  );
}
