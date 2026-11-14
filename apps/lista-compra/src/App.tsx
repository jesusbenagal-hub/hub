import { useState } from "react";

const productos = ["Leche", "Pan", "Huevos"];

export function App() {
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
    <section>
      <h2>Lista de la compra</h2>
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
    </section>
  );
}