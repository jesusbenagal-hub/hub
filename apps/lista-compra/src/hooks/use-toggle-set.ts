import { useState } from "react";

/**
 * A set of values that are switched on and off one at a time, such as the
 * items already in the trolley.
 */
export function useToggleSet<Value>(): [
  ReadonlySet<Value>,
  (value: Value) => void,
] {
  const [values, setValues] = useState<ReadonlySet<Value>>(new Set());

  function toggle(value: Value) {
    setValues((previous) => {
      const next = new Set(previous);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  }

  return [values, toggle];
}
