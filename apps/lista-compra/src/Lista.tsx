import { useState } from "react";

const productos = ["Leche", "Pan", "Huevos"];

export function Lista() {
  const [comprados, setComprados] = useState<ReadonlySet<string>>(new Set());

  function alternar(producto: string) {
    setComprados((anteriores) => {
      const siguientes = new Set(anteriores);
      if (siguientes.has(producto)) {
        siguientes.delete(producto);
      } else {
        siguientes.add(producto);
      }
      return siguientes;
    });
  }

  return (
    <>
      <ul>
        {productos.map((producto) => (
          <li key={producto}>
            <label>
              <input
                type="checkbox"
                checked={comprados.has(producto)}
                onChange={() => alternar(producto)}
              />
              {producto}
            </label>
          </li>
        ))}
      </ul>
      <p>
        {comprados.size} de {productos.length} en el carro
      </p>
    </>
  );
}