import { Suspense } from "react";

import { RemoteErrorBoundary } from "../../components/remote-error-boundary/remote-error-boundary";
import type { LoadedRemote } from "../../types/remote";

interface RemotePageProps {
  remote: LoadedRemote;
}

export function RemotePage({ remote }: RemotePageProps) {
  const { definition, Component } = remote;
  return (
    <RemoteErrorBoundary key={definition.appId} title={definition.title}>
      <Suspense fallback={<p>Cargando «{definition.title}»…</p>}>
        <Component />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
