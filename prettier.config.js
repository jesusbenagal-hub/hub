// Prettier's defaults, written out so the choices are visible in one place.
// Indentation and line endings come from .editorconfig.

/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  printWidth: 80,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  // Sorts Tailwind classes in the order Tailwind writes them in the CSS.
  plugins: ["prettier-plugin-tailwindcss"],
  // The stylesheet that loads Tailwind (and, later, our theme), so the plugin
  // knows every class the project can use.
  tailwindStylesheet: "./apps/orchestrator/src/styles.css",
};

export default config;
