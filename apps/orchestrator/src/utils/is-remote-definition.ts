import { Accent } from "@hub/shared";

import type { RemoteDefinition } from "../types/remote";

const REQUIRED_TEXT_FIELDS = [
  "appId",
  "mfName",
  "entry",
  "route",
  "title",
] as const;

const ACCENTS: readonly unknown[] = Object.values(Accent);

/** Checks that a value read from `remotes.json` is a valid entry. */
export function isRemoteDefinition(value: unknown): value is RemoteDefinition {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    REQUIRED_TEXT_FIELDS.every(
      (field) => typeof Reflect.get(value, field) === "string",
    ) && ACCENTS.includes(Reflect.get(value, "accent"))
  );
}
