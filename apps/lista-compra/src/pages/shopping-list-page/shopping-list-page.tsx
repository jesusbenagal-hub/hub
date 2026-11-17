import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ItemGroup,
  toast,
} from "@hub/ui";

import { AddItemForm } from "../../components/add-item-form/add-item-form";
import { ItemFilterSelect } from "../../components/item-filter-select/item-filter-select";
import { ItemRow } from "../../components/item-row/item-row";
import { useToggleSet } from "../../hooks/use-toggle-set";
import { ItemFilter } from "../../types/item-filter";

// TODO(phase-3): load the items from lista-compra-api.
const sampleItems = ["Leche", "Pan", "Huevos"];

export function ShoppingListPage() {
  const [items, setItems] = useState<readonly string[]>(sampleItems);
  const [purchasedItems, togglePurchased] = useToggleSet<string>();
  const [filter, setFilter] = useState<ItemFilter>(ItemFilter.All);
  const visibleItems = items.filter((item) => {
    switch (filter) {
      case ItemFilter.Pending:
        return !purchasedItems.has(item);
      case ItemFilter.Purchased:
        return purchasedItems.has(item);
      case ItemFilter.All:
        return true;
    }
  });

  return (
    <Card className="max-w-96">
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          {purchasedItems.size} de {items.length} en el carro
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <AddItemForm
          items={items}
          onAdd={(name) => {
            setItems((previous) => [...previous, name]);
          }}
        />
        <ItemFilterSelect value={filter} onChange={setFilter} />
        <ItemGroup aria-label="Productos" className="gap-2">
          {visibleItems.map((item) => (
            <ItemRow
              key={item}
              name={item}
              isPurchased={purchasedItems.has(item)}
              onToggle={() => {
                togglePurchased(item);
              }}
              onDelete={() => {
                if (purchasedItems.has(item)) {
                  togglePurchased(item);
                }
                setItems((previous) =>
                  previous.filter((name) => name !== item),
                );
                toast.add({
                  title: "Borrado",
                  description: `«${item}» ya no está en la lista.`,
                });
              }}
            />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
