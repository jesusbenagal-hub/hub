// Full class names: Tailwind only generates the classes it finds written out.
const textSizes = [
  { name: "text-2xl", className: "text-2xl", size: "28 px" },
  { name: "text-xl", className: "text-xl", size: "22 px" },
  { name: "text-lg", className: "text-lg", size: "18 px" },
  { name: "text-base", className: "text-base", size: "15 px" },
  { name: "text-sm", className: "text-sm", size: "13 px" },
  { name: "text-xs", className: "text-xs", size: "12 px" },
];

/** The text sizes of the hub, each written in its own size. */
export function TypeScale() {
  return (
    <ul className="mb-6 flex flex-col gap-2">
      {textSizes.map(({ name, className, size }) => (
        <li key={name} className="flex items-baseline gap-4">
          <code className="w-36 shrink-0 font-mono text-xs text-muted-foreground">
            {name} · {size}
          </code>
          <span className={className}>Leche, pan y huevos</span>
        </li>
      ))}
    </ul>
  );
}
