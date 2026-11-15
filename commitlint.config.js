// Conventional Commits, with the workspace packages as the only valid scopes.
const config = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-pnpm-scopes",
  ],
};

export default config;
