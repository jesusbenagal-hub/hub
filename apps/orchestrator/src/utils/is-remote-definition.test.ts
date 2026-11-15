import { describe, expect, it } from "vitest";

import { Accent } from "@hub/shared";

import { isRemoteDefinition } from "./is-remote-definition";

const validDefinition = {
  appId: "lista-compra",
  mfName: "lista_compra",
  entry: "http://localhost:5174/mf-manifest.json",
  route: "/lista-compra",
  title: "Lista de la compra",
  accent: "sage",
};

describe("isRemoteDefinition", () => {
  it("accepts an entry with every field as a string", () => {
    expect(isRemoteDefinition(validDefinition)).toBe(true);
  });

  it("accepts an entry with extra fields", () => {
    expect(isRemoteDefinition({ ...validDefinition, icon: "cart" })).toBe(true);
  });

  it.each([
    { label: "null", value: null },
    { label: "a string", value: "lista-compra" },
    { label: "a number", value: 42 },
    { label: "an array", value: [validDefinition] },
  ])("rejects $label", ({ value }) => {
    expect(isRemoteDefinition(value)).toBe(false);
  });

  it.each(Object.keys(validDefinition))(
    "rejects an entry without %s",
    (field) => {
      const entry = Object.fromEntries(
        Object.entries(validDefinition).filter(([key]) => key !== field),
      );
      expect(isRemoteDefinition(entry)).toBe(false);
    },
  );

  it("rejects an entry with a field that is not a string", () => {
    expect(isRemoteDefinition({ ...validDefinition, entry: 5174 })).toBe(false);
  });

  it.each(Object.values(Accent))("accepts the accent %s", (accent) => {
    expect(isRemoteDefinition({ ...validDefinition, accent })).toBe(true);
  });

  it.each([
    { label: "a color outside the palette", accent: "green" },
    { label: "a number", accent: 1 },
  ])("rejects an accent that is $label", ({ accent }) => {
    expect(isRemoteDefinition({ ...validDefinition, accent })).toBe(false);
  });
});
