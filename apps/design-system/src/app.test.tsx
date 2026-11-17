import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";

import { App } from "./app";

describe("App", () => {
  it("opens on the introduction and moves between sections", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Design system del hub" }),
    ).toBeInTheDocument();

    const nav = screen.getByRole("navigation", { name: "Design system" });
    await user.click(within(nav).getByRole("link", { name: "Tokens" }));

    expect(screen.getByRole("heading", { name: "Tokens" })).toBeInTheDocument();
  });

  it("keeps its links relative to where the hub mounts it", () => {
    render(
      <MemoryRouter initialEntries={["/design-system/tokens"]}>
        <Routes>
          <Route path="design-system/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation", { name: "Design system" });
    expect(within(nav).getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "href",
      "/design-system",
    );
    expect(
      within(nav).getByRole("link", { name: "Componentes" }),
    ).toHaveAttribute("href", "/design-system/componentes");
  });
});
