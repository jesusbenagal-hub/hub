import { useId } from "react";

import { Button, Field, FieldError, FieldLabel, Input } from "@hub/ui";

export function FieldWithError() {
  const inputId = useId();
  const errorId = useId();

  return (
    <Field data-invalid className="max-w-80">
      <FieldLabel htmlFor={inputId}>Producto</FieldLabel>
      <div className="flex gap-2">
        <Input
          id={inputId}
          defaultValue="Leche"
          aria-invalid
          aria-describedby={errorId}
        />
        <Button>Añadir</Button>
      </div>
      <FieldError id={errorId}>«Leche» ya está en la lista.</FieldError>
    </Field>
  );
}
