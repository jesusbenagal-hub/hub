import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";

import { App } from "./app";

describe("App", () => {
  it("keeps its links relative to where the hub mounts it", () => {
    render(
      <MemoryRouter initialEntries={["/lista-compra/historial"]}>
        <Routes>
          <Route path="lista-compra/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Lista de la compra" });
    expect(within(nav).getByRole("link", { name: "Lista" })).toHaveAttribute(
      "href",
      "/lista-compra",
    );
    expect(
      within(nav).getByRole("link", { name: "Historial" }),
    ).toHaveAttribute("href", "/lista-compra/historial");
  });
});
