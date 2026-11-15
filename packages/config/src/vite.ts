import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";

/** Dependencias que host y remotes comparten como una única instancia. */
const sharedDependencies = {
  react: { singleton: true },
  "react-dom": { singleton: true },
  "react-router": { singleton: true },
};

interface AppConfigOptions {
  /** Nombre en el runtime de MF (`mfName`, en snake_case para los remotes). */
  name: string;
  /** Puerto fijo en local (§4.2). */
  port: number;
}

function serverOptions(port: number) {
  return {
    server: { port, strictPort: true },
    preview: { port, strictPort: true },
  };
}

/** Configuración de Vite para el orchestrator (host de Module Federation). */
export function createHostConfig({ name, port }: AppConfigOptions): UserConfig {
  return defineConfig({
    plugins: [
      react(),
      federation({
        name,
        shared: sharedDependencies,
        dts: false,
      }),
    ],
    ...serverOptions(port),
  });
}

/** Configuración de Vite para un remote: expone `./App` y publica su manifiesto. */
export function createRemoteConfig({
  name,
  port,
}: AppConfigOptions): UserConfig {
  const { server, preview } = serverOptions(port);
  return defineConfig({
    plugins: [
      react(),
      federation({
        name,
        filename: "remoteEntry.js",
        manifest: true,
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: sharedDependencies,
        dts: false,
      }),
    ],
    server: { ...server, origin: `http://localhost:${port}` },
    preview,
  });
}
