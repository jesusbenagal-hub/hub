import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "lista_compra",
      filename: "remoteEntry.js",
      manifest: true,
      exposes: {
        "./App": "./src/App.tsx",
      },
       shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
      },
      dts: false,
    }),
  ],
  server: {
    port: 5174,
    strictPort: true,
    origin: "http://localhost:5174",
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
});