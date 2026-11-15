import { ItemRow } from "../../components/item-row/item-row";
import { useToggleSet } from "../../hooks/use-toggle-set";

// TODO(phase-3): load the items from lista-compra-api.
const sampleItems = ["Leche", "Pan", "Huevos"];

export function ShoppingListPage() {
  const [purchasedItems, togglePurchased] = useToggleSet<string>();

  return (
    <>
      <ul>
        {sampleItems.map((item) => (
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
        {purchasedItems.size} de {sampleItems.length} en el carro
      </p>
    </>
  );
}
