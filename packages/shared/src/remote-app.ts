import type { ComponentType } from "react";

/** Props the host passes to the `App` of every remote. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- TODO(phase-2): add user and role
export interface RemoteAppProps {}

/** Shape of the `./App` module that every remote exposes. */
export interface RemoteAppModule {
  App: ComponentType<RemoteAppProps>;
}
