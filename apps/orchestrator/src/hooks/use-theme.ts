import { useEffect, useState } from "react";

import { Theme, THEME_STORAGE_KEY } from "../types/theme";

function isTheme(value: unknown): value is Theme {
  return Object.values<unknown>(Theme).includes(value);
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : Theme.System;
  } catch {
    // Storage can be blocked (e.g. some private modes): follow the system.
    return Theme.System;
  }
}

/**
 * The theme chosen by the user. "system" follows `prefers-color-scheme`;
 * "light" and "dark" force it with `data-theme` on <html>, which the tokens
 * (and every remote under it) read through the cascade.
 */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === Theme.System) {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = theme;
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Not saved: the choice still applies until the page is reloaded.
    }
  }, [theme]);

  return [theme, setTheme];
}
