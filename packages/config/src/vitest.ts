import { defineConfig, mergeConfig } from "vitest/config";

/** Vitest config shared by every package: tests live next to the code. */
export const baseTestConfig = defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
  },
});

/**
 * `baseTestConfig` plus a browser-like DOM (jsdom) for testing React
 * components. Every React package has its own `src/setup-tests.ts`.
 */
export const reactTestConfig = mergeConfig(
  baseTestConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/setup-tests.ts"],
    },
  }),
);
