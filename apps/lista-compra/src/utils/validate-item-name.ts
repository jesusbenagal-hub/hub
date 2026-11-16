/**
 * Checks the name of a new item against the list. Returns the message to
 * show, or undefined when the name can be added.
 */
export function validateItemName(
  name: string,
  items: readonly string[],
): string | undefined {
  const trimmedName = name.trim();
  if (trimmedName === "") {
    return "Escribe el nombre del producto.";
  }
  const isDuplicate = items.some(
    (item) =>
      item.toLocaleLowerCase("es") === trimmedName.toLocaleLowerCase("es"),
  );
  if (isDuplicate) {
    return `«${trimmedName}» ya está en la lista.`;
  }
  return undefined;
}
