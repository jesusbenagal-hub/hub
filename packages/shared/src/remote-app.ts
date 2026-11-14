import type { ComponentType } from "react";

/**
 * Props que el host pasa al `App` de cada remote.
 * En la Fase 2 se añadirán `user` y `role`.
 */
export interface RemoteAppProps {}

/** Forma que debe tener el módulo `./App` que expone cada remote. */
export interface RemoteAppModule {
  App: ComponentType<RemoteAppProps>;
}