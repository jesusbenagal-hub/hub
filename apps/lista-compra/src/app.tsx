import { NavLink, Route, Routes } from "react-router";

import { HistoryPage } from "./pages/history-page/history-page";
import { ShoppingListPage } from "./pages/shopping-list-page/shopping-list-page";

export function App() {
  return (
    <section>
      <h2>Lista de la compra</h2>
      <nav aria-label="Lista de la compra">
        <NavLink to="." end>
          Lista
        </NavLink>{" "}
        · <NavLink to="historial">Historial</NavLink>
      </nav>
      <Routes>
        <Route index element={<ShoppingListPage />} />
        <Route path="historial" element={<HistoryPage />} />
      </Routes>
    </section>
  );
}
