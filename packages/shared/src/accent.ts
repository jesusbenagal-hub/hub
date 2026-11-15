/**
 * Accent colors of the hub, one per app. Each value matches a
 * `[data-accent="…"]` palette in `@hub/tokens/page.css`.
 */
export const Accent = {
  Blue: "blue",
  Sage: "sage",
  Mustard: "mustard",
  Plum: "plum",
  Teal: "teal",
} as const;

export type Accent = (typeof Accent)[keyof typeof Accent];
