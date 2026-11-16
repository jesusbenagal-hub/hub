import { describe, expect, it } from "vitest";

import { validateItemName } from "./validate-item-name";

const items = ["Leche", "Pan"];

describe("validateItemName", () => {
  it.each(["Café", "  Café  ", "Pan de molde"])("accepts %j", (name) => {
    expect(validateItemName(name, items)).toBeUndefined();
  });

  it.each(["", "   "])("asks for a name when it is %j", (name) => {
    expect(validateItemName(name, items)).toBe(
      "Escribe el nombre del producto.",
    );
  });

  it.each(["Pan", "pan", " LECHE "])(
    "rejects %j because it is already on the list",
    (name) => {
      expect(validateItemName(name, items)).toBe(
        `«${name.trim()}» ya está en la lista.`,
      );
    },
  );
});
