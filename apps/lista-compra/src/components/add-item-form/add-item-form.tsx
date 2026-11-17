import { useId, useState, type SubmitEvent } from "react";

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@hub/ui";

import { validateItemName } from "../../utils/validate-item-name";

interface AddItemFormProps {
  items: readonly string[];
  onAdd: (name: string) => void;
}

export function AddItemForm({ items, onAdd }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string>();
  const inputId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const hasError = error !== undefined;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = validateItemName(name, items);
    if (message !== undefined) {
      setError(message);
      return;
    }
    onAdd(name.trim());
    setName("");
    setError(undefined);
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Field data-invalid={hasError}>
        <FieldLabel htmlFor={inputId}>Producto</FieldLabel>
        <div className="flex gap-2">
          <Input
            id={inputId}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Leche, pan…"
            autoComplete="off"
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${descriptionId} ${errorId}` : descriptionId
            }
          />
          <Button type="submit">Añadir</Button>
        </div>
        <FieldDescription id={descriptionId}>
          Escribe un producto y pulsa «Añadir».
        </FieldDescription>
        <FieldError id={errorId}>{error}</FieldError>
      </Field>
    </form>
  );
}
