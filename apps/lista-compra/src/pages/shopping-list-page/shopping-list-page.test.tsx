import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ShoppingListPage } from "./shopping-list-page";

describe("ShoppingListPage", () => {
  it("starts with nothing in the trolley", () => {
    render(<ShoppingListPage />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(screen.getByText("0 de 3 en el carro")).toBeInTheDocument();
  });

  it("counts an item as purchased when its checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);

    await user.click(screen.getByRole("checkbox", { name: "Leche" }));

    expect(screen.getByRole("checkbox", { name: "Leche" })).toBeChecked();
    expect(screen.getByText("1 de 3 en el carro")).toBeInTheDocument();
  });

  it("lets the item be unchecked again", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);
    const milk = screen.getByRole("checkbox", { name: "Leche" });

    await user.click(milk);
    await user.click(milk);

    expect(milk).not.toBeChecked();
    expect(screen.getByText("0 de 3 en el carro")).toBeInTheDocument();
  });

  it("selects an item by clicking its name", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);

    await user.click(screen.getByText("Pan"));

    expect(screen.getByRole("checkbox", { name: "Pan" })).toBeChecked();
  });
});
