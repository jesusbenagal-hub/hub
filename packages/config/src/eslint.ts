import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import checkFile from "eslint-plugin-check-file";
import { importX } from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/**
 * ESLint config for every package: ESLint's recommended rules, the strict,
 * type-aware rules of typescript-eslint, imports and naming conventions.
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

  // Imports (docs/convenciones-codigo.md §3). Only the rules TypeScript
  // doesn't already cover: it knows whether an import exists, not its order.
  importX.flatConfigs.typescript,
  {
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver()],
      "import-x/internal-regex": "^@hub/",
    },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import-x/no-cycle": "error",
      "import-x/no-duplicates": "error",
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      // Named exports only (§4); config files are the exception, below.
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],
    },
  },

  // Names (docs/convenciones-codigo.md §2).
  {
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        // `remote-app.test.ts` and `vite.config.ts` are checked as their first part.
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "src/**/": "KEBAB_CASE" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "default", format: ["camelCase"] },
        { selector: "import", format: ["camelCase", "PascalCase"] },
        // Components are PascalCase; fixed module constants, UPPER_CASE.
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        { selector: "typeLike", format: ["PascalCase"] },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        {
          selector: ["variable", "parameter"],
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "can", "should"],
        },
        // Properties may hold components (`App`) or be `as const` keys.
        {
          selector: ["objectLiteralProperty", "typeProperty"],
          format: ["camelCase", "PascalCase"],
        },
        // Keys like "react-dom" or "./App" are names from outside the code.
        {
          selector: [
            "objectLiteralProperty",
            "typeProperty",
            "objectLiteralMethod",
          ],
          modifiers: ["requiresQuotes"],
          format: null,
        },
      ],
    },
  },

  // Config files: default export (the tool requires it). eslint.config.ts is
  // also outside every tsconfig.json, so it gets no type-aware rules.
  {
    files: ["*.config.ts"],
    rules: { "no-restricted-exports": "off" },
  },
  {
    // Last, so no later block turns type-aware rules back on.
    files: ["eslint.config.ts"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);

/**
 * `baseConfig` plus the rules of hooks and accessibility, for packages with
 * React components.
 */
export const reactConfig = defineConfig(baseConfig, {
  files: ["**/*.tsx"],
  extends: [reactHooks.configs.flat.recommended, jsxA11y.configs.recommended],
  rules: {
    // A warning nobody fixes is noise: these are errors too.
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/incompatible-library": "error",
    "react-hooks/unsupported-syntax": "error",
    // @hub/ui's Label must wrap one of its controls or point to it (htmlFor).
    "jsx-a11y-x/label-has-associated-control": [
      "error",
      {
        labelComponents: ["Label", "FieldLabel"],
        controlComponents: ["Checkbox", "Input"],
        assert: "either",
      },
    ],
    // Module Federation shares @hub/ui by its name: a file path skips it.
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@hub/ui/*"],
            message: 'Import from "@hub/ui", the copy the hub shares.',
          },
        ],
      },
    ],
  },
});
