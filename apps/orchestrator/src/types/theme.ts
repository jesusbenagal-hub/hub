export const Theme = {
  System: "system",
  Light: "light",
  Dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

/**
 * localStorage key of the chosen theme. index.html reads it too, before the
 * page paints, so keep both in sync.
 */
export const THEME_STORAGE_KEY = "hub-theme";
