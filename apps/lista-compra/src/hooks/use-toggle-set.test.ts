import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useToggleSet } from "./use-toggle-set";

describe("useToggleSet", () => {
  it("adds a value the first time and removes it the second", () => {
    const { result } = renderHook(() => useToggleSet<string>());

    act(() => {
      result.current[1]("Leche");
    });
    expect(result.current[0].has("Leche")).toBe(true);

    act(() => {
      result.current[1]("Leche");
    });
    expect(result.current[0].has("Leche")).toBe(false);
  });

  it("returns a new set on every change", () => {
    const { result } = renderHook(() => useToggleSet<string>());
    const initialValues = result.current[0];

    act(() => {
      result.current[1]("Pan");
    });

    expect(result.current[0]).not.toBe(initialValues);
  });
});
