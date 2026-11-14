import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "orchestrator",
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
      },
      dts: false,
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
});