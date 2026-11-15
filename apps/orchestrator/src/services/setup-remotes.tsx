import { loadRemote, registerRemotes } from "@module-federation/runtime";
import { lazy } from "react";

import type { RemoteAppModule } from "@hub/shared";

import { RemoteLoadError } from "../components/remote-load-error/remote-load-error";
import type { LoadedRemote, RemoteDefinition } from "../types/remote";
import { isRemoteDefinition } from "../utils/is-remote-definition";

async function fetchRemoteDefinitions(): Promise<RemoteDefinition[]> {
  const response = await fetch("/remotes.json");
  if (!response.ok) {
    throw new Error(`Could not read remotes.json (HTTP ${response.status})`);
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isRemoteDefinition)) {
    throw new Error("remotes.json does not have the expected shape");
  }
  return data;
}

// Created once per remote, outside render, so React keeps the same component.
function createRemoteComponent(definition: RemoteDefinition) {
  return lazy(async () => {
    try {
      const module = await loadRemote<RemoteAppModule>(
        `${definition.mfName}/App`,
      );
      if (!module) {
        throw new Error(`${definition.mfName}/App returned no module`);
      }
      return { default: module.App };
    } catch (error) {
      console.error(`Could not load remote "${definition.appId}"`, error);
      return {
        default: () => <RemoteLoadError title={definition.title} />,
      };
    }
  });
}

/**
 * Reads `remotes.json`, registers every remote in the Module Federation
 * runtime and returns them ready to mount. If anything fails, the hub starts
 * without apps.
 */
export async function setupRemotes(): Promise<LoadedRemote[]> {
  try {
    const definitions = await fetchRemoteDefinitions();
    registerRemotes(
      definitions.map((definition) => ({
        name: definition.mfName,
        entry: definition.entry,
      })),
    );
    return definitions.map((definition) => ({
      definition,
      Component: createRemoteComponent(definition),
    }));
  } catch (error) {
    console.error("Could not set up the hub's apps", error);
    return [];
  }
}
