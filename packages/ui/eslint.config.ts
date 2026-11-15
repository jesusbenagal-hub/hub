import { defineConfig } from "eslint/config";

import { reactConfig } from "@hub/config/eslint";

export default defineConfig(
  reactConfig,
  {
    // Inside the library, components import each other by path (shadcn CLI).
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    // Label is a generic wrapper: whoever uses it passes the control or htmlFor.
    files: ["src/components/label.tsx"],
    rules: {
      "jsx-a11y-x/label-has-associated-control": "off",
    },
  },
);
