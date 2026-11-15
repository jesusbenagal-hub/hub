import type { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- TODO(phase-2): add user and role
export interface RemoteAppProps {}

/** Forma que debe tener el módulo `./App` que expone cada remote. */
export interface RemoteAppModule {
  App: ComponentType<RemoteAppProps>;
}
