import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

import { createRemoteConfig } from "@hub/config/vite";

export default createRemoteConfig({
  name: "design_system",
  port: 5175,
  // MDX compiles to JSX, so it has to run before the React plugin.
  // remark-gfm adds GitHub's Markdown extras, such as tables.
  plugins: [{ enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm] }) }],
});
