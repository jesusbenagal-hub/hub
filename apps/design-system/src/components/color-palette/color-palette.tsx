const colorGroups = [
  {
    title: "Base",
    colors: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "border",
      "input",
    ],
  },
  {
    title: "Marca y relleno",
    colors: [
      "primary",
      "primary-foreground",
      "ring",
      "secondary",
      "muted-foreground",
    ],
  },
  {
    title: "Estados",
    colors: [
      "destructive",
      "destructive-soft",
      "success",
      "success-soft",
      "warning",
      "warning-soft",
      "info",
      "info-soft",
    ],
  },
];

/** The palette tokens, painted with their CSS variables (light or dark). */
export function ColorPalette() {
  return (
    <div className="mb-6 flex flex-col gap-4">
      {colorGroups.map(({ title, colors }) => (
        <section key={title}>
          <h3 className="mb-2 text-sm font-semibold">{title}</h3>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {colors.map((color) => (
              <li key={color} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-8 shrink-0 rounded-md border"
                  style={{ backgroundColor: `var(--color-${color})` }}
                />
                <code className="font-mono text-xs">{color}</code>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
