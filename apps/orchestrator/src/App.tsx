import { Suspense } from "react";
import type { LoadedRemote } from "./remotes";

interface AppProps {
  remotes: LoadedRemote[];
}

export function App({ remotes }: AppProps) {
  return (
    <main>
      <h1>Hub</h1>
      {remotes.length === 0 && <p>No hay ninguna app disponible.</p>}
      {remotes.map(({ definition, Component }) => (
        <Suspense key={definition.appId} fallback={<p>Cargando «{definition.title}»…</p>}>
          <Component />
        </Suspense>
      ))}
    </main>
  );
}