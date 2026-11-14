import type { RemoteAppModule, RemoteAppProps } from "@hub/shared";
import { loadRemote, registerRemotes } from "@module-federation/runtime";
import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export interface RemoteDefinition {
  appId: string;
  mfName: string;
  entry: string;
  route: string;
  title: string;
}

export interface LoadedRemote {
  definition: RemoteDefinition;
  Component: LazyExoticComponent<ComponentType<RemoteAppProps>>;
}


const REQUIRED_FIELDS = ["appId", "mfName", "entry", "route", "title"] as const;

function isRemoteDefinition(value: unknown): value is RemoteDefinition {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return REQUIRED_FIELDS.every((field) => typeof record[field] === "string");
}

async function fetchRemoteDefinitions(): Promise<RemoteDefinition[]> {
  const response = await fetch("/remotes.json");
  if (!response.ok) {
    throw new Error(`No se pudo leer remotes.json (HTTP ${response.status})`);
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isRemoteDefinition)) {
    throw new Error("remotes.json no tiene el formato esperado");
  }
  return data;
}

function createRemoteComponent(definition: RemoteDefinition) {
  return lazy(async () => {
    try {
      const module = await loadRemote<RemoteAppModule>(`${definition.mfName}/App`);
      if (!module) {
        throw new Error(`${definition.mfName}/App no devolvió ningún módulo`);
      }
      return { default: module.App };
    } catch (error) {
      console.error(`No se pudo cargar el remote "${definition.appId}"`, error);
      return {
        default: () => (
          <p role="alert">
            No se ha podido cargar «{definition.title}». Prueba a recargar dentro de un rato.
          </p>
        ),
      };
    }
  });
}

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
    console.error("No se pudo preparar la lista de apps del hub", error);
    return [];
  }
}