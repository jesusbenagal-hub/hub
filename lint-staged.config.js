// Runs on the staged files only. Each glob gets its own list of commands, in
// order; the globs don't overlap, so no file is written by two at once.

/** @type {import("lint-staged").Configuration} */
const config = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,json,md,yaml,yml,html,css}": "prettier --write",
};

export default config;
