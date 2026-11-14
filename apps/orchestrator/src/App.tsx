import { lazy, Suspense } from "react";

const ListaCompraApp = lazy(() =>
  import("lista_compra/App").then((module) => ({ default: module.App })),
);

export function App() {
  return (
    <main>
      <h1>Hub</h1>
      <Suspense fallback={<p>Cargando lista de la compra…</p>}>
        <ListaCompraApp />
      </Suspense>
    </main>
  );
}