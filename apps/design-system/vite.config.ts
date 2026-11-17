import mdx from "@mdx-js/rollup";

import { createRemoteConfig } from "@hub/config/vite";

export default createRemoteConfig({
  name: "design_system",
  port: 5175,
  // MDX compiles to JSX, so it has to run before the React plugin.
  plugins: [{ enforce: "pre", ...mdx() }],
});
