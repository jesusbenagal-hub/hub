import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "orchestrator",
      remotes: {
        lista_compra: {
          type: "module",
          name: "lista_compra",
          entry: "http://localhost:5174/mf-manifest.json",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
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