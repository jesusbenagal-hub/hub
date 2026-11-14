import { NavLink, Route, Routes } from "react-router";
import { Historial } from "./Historial";
import { Lista } from "./Lista";

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
        <Route index element={<Lista />} />
        <Route path="historial" element={<Historial />} />
      </Routes>
    </section>
  );
}