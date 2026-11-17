import { useId } from "react";

import { Field, FieldDescription, FieldLabel, Input } from "@hub/ui";

export function FieldWithInput() {
  const inputId = useId();
  const descriptionId = useId();

  return (
    <Field className="max-w-80">
      <FieldLabel htmlFor={inputId}>Producto</FieldLabel>
      <Input
        id={inputId}
        placeholder="Leche, pan…"
        aria-describedby={descriptionId}
      />
      <FieldDescription id={descriptionId}>
        Escribe un producto.
      </FieldDescription>
    </Field>
  );
}
