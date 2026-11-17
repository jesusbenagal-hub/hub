import { useId } from "react";

import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hub/ui";

const options = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendientes" },
  { value: "purchased", label: "En el carro" },
];

export function SelectFilter() {
  const triggerId = useId();

  return (
    <Field orientation="horizontal" className="max-w-80">
      <FieldLabel htmlFor={triggerId}>Mostrar</FieldLabel>
      <Select items={options} defaultValue="all">
        <SelectTrigger id={triggerId} className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
