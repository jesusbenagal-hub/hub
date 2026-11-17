import { describe, expect, it } from "vitest";

import * as ui from "@hub/ui";

import { componentPages } from "./component-pages";

const documented = componentPages.flatMap((page) => page.documents);

// Components are the PascalCase exports; the rest are helpers (toast, …).
const components = Object.keys(ui).filter((name) => /^[A-Z]/.test(name));

describe("componentPages", () => {
  it.each(components)("documents %s", (name) => {
    expect(documented.some((prefix) => name.startsWith(prefix))).toBe(true);
  });
});
