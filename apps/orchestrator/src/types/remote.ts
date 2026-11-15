import type { ComponentType, LazyExoticComponent } from "react";

import type { RemoteAppProps } from "@hub/shared";

/** One entry of `public/remotes.json`. */
export interface RemoteDefinition {
  appId: string;
  mfName: string;
  entry: string;
  route: string;
  title: string;
}

/** A remote ready to mount: its definition and its lazy `App`. */
export interface LoadedRemote {
  definition: RemoteDefinition;
  Component: LazyExoticComponent<ComponentType<RemoteAppProps>>;
}
