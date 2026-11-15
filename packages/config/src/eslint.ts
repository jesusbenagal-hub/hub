import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * ESLint config shared by every package: ESLint's recommended rules plus the
 * strict, type-aware rules of typescript-eslint.
 */
export const baseConfig = defineConfig(
  globalIgnores(["dist/"]),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        // Each file is type-checked with the tsconfig.json that includes it.
        projectService: true,
        // The repository root, so it also works when ESLint runs from there.
        tsconfigRootDir: fileURLToPath(new URL("../../..", import.meta.url)),
      },
    },
  },
  {
    rules: {
      // Numbers turn into strings predictably; objects, null or undefined don't.
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      // docs/convenciones-codigo.md §5: no `as` assertions (`as const` is fine).
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
    },
  },
  {
    // Config files run in Node and are not part of any tsconfig.json.
    // Last, so no later block turns type-aware rules back on.
    files: ["eslint.config.ts"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
