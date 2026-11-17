import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Theme, THEME_STORAGE_KEY } from "../types/theme";
import { useTheme } from "./use-theme";

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe("useTheme", () => {
  it("follows the system when nothing is stored", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe(Theme.System);
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("forces and remembers the chosen theme", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1](Theme.Dark);
    });

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("starts from the stored theme and ignores unknown values", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    expect(renderHook(() => useTheme()).result.current[0]).toBe(Theme.Light);

    localStorage.setItem(THEME_STORAGE_KEY, "sepia");
    expect(renderHook(() => useTheme()).result.current[0]).toBe(Theme.System);
  });
});
