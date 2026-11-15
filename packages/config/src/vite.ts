import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";

/** Dependencies the host and the remotes share as a single instance. */
const sharedDependencies = {
  react: { singleton: true },
  "react-dom": { singleton: true },
  "react-router": { singleton: true },
  "@hub/ui": { singleton: true },
};
interface AppConfigOptions {
  /** Name in the Module Federation runtime (the `mfName` of a remote). */
  name: string;
  /** Fixed local port, with `strictPort`. */
  port: number;
}

function serverOptions(port: number) {
  return {
    server: { port, strictPort: true },
    preview: { port, strictPort: true },
  };
}

/**
 * Vite config for the orchestrator, the Module Federation host. It also
 * compiles Tailwind CSS: the host is the one that loads the base styles.
 */
export function createHostConfig({ name, port }: AppConfigOptions): UserConfig {
  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name,
        shared: sharedDependencies,
        dts: false,
      }),
    ],
    ...serverOptions(port),
  });
}
/** Vite config for a remote: exposes `./App` and publishes its manifest. */
export function createRemoteConfig({
  name,
  port,
}: AppConfigOptions): UserConfig {
  const { server, preview } = serverOptions(port);
  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name,
        filename: "remoteEntry.js",
        manifest: true,
        exposes: {
          "./App": "./src/app.tsx",
        },
        shared: sharedDependencies,
        dts: false,
      }),
    ],
    server: { ...server, origin: `http://localhost:${port}` },
    preview,
  });
}
