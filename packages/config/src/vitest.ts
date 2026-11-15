import { defineConfig } from "vitest/config";

/** Vitest config shared by every package: tests live next to the code. */
export const baseTestConfig = defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
