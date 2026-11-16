import { useState } from "react";

import { AddItemForm } from "../../components/add-item-form/add-item-form";
import { ItemRow } from "../../components/item-row/item-row";
import { useToggleSet } from "../../hooks/use-toggle-set";

// TODO(phase-3): load the items from lista-compra-api.
const sampleItems = ["Leche", "Pan", "Huevos"];

export function ShoppingListPage() {
  const [items, setItems] = useState<readonly string[]>(sampleItems);
  const [purchasedItems, togglePurchased] = useToggleSet<string>();

  return (
    <>
      <AddItemForm
        items={items}
        onAdd={(name) => {
          setItems((previous) => [...previous, name]);
        }}
      />
      <ul>
        {items.map((item) => (
          <ItemRow
            key={item}
            name={item}
            isPurchased={purchasedItems.has(item)}
            onToggle={() => {
              togglePurchased(item);
            }}
          />
        ))}
      </ul>
      <p>
        {purchasedItems.size} de {items.length} en el carro
      </p>
    </>
  );
}
