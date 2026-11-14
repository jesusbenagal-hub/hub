const productos = ["Leche", "Pan", "Huevos"];

export function App() {
  return (
    <section>
      <h2>Lista de la compra</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto}>{producto}</li>
        ))}
      </ul>
    </section>
  );
}