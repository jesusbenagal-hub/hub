import { useState } from "react";
import { NavLink, Route, Routes } from "react-router";

import { PortalContainerProvider } from "@hub/ui";

import { HistoryPage } from "./pages/history-page/history-page";
import { ShoppingListPage } from "./pages/shopping-list-page/shopping-list-page";
import "./styles.css";

export function App() {
  // Overlays render inside data-app, where this app's scoped styles apply.
  const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);

  return (
    <div data-app="lista-compra" ref={setAppElement}>
      <PortalContainerProvider container={appElement}>
        <section className="px-4 py-5">
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
      </PortalContainerProvider>
    </div>
  );
}
