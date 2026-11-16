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

import { ItemFilter } from "../../types/item-filter";

const options = [
  { value: ItemFilter.All, label: "Todos" },
  { value: ItemFilter.Pending, label: "Pendientes" },
  { value: ItemFilter.Purchased, label: "En el carro" },
];

interface ItemFilterSelectProps {
  value: ItemFilter;
  onChange: (value: ItemFilter) => void;
}

export function ItemFilterSelect({ value, onChange }: ItemFilterSelectProps) {
  const triggerId = useId();

  return (
    <Field orientation="horizontal" className="mb-2 max-w-80">
      <FieldLabel htmlFor={triggerId}>Mostrar</FieldLabel>
      <Select
        items={options}
        value={value}
        onValueChange={(newValue) => {
          if (newValue !== null) {
            onChange(newValue);
          }
        }}
      >
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
