import { defineConfig } from "eslint/config";

import { reactConfig } from "@hub/config/eslint";

export default defineConfig(reactConfig, {
  files: ["src/**/*.tsx"],
  rules: {
    // Inside the library, components import each other by path (shadcn CLI).
    "no-restricted-imports": "off",
    // Label and FieldLabel are generic wrappers: whoever uses them passes the
    // control or htmlFor, and the apps' lint checks those uses.
    "jsx-a11y-x/label-has-associated-control": "off",
    // Prop names follow Base UI's API (alignItemWithTrigger), not our prefixes.
    "@typescript-eslint/naming-convention": "off",
  },
});
