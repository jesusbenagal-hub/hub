import mdx from "@mdx-js/rollup";
import { mergeConfig } from "vitest/config";

import { reactTestConfig } from "@hub/config/vitest";

export default mergeConfig(reactTestConfig, {
  plugins: [mdx()],
});
