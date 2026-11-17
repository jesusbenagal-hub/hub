import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { mergeConfig } from "vitest/config";

import { reactTestConfig } from "@hub/config/vitest";

export default mergeConfig(reactTestConfig, {
  plugins: [mdx({ remarkPlugins: [remarkGfm] })],
});
