import { render, screen, within } from "@testing-library/react";
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

  it("adds the item typed in the form", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);
    const input = screen.getByRole("textbox", { name: "Producto" });

    await user.type(input, "Café");
    await user.click(screen.getByRole("button", { name: "Añadir" }));

    expect(screen.getByRole("checkbox", { name: "Café" })).not.toBeChecked();
    expect(screen.getByText("0 de 4 en el carro")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("adds the item when Enter is pressed", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);

    await user.type(
      screen.getByRole("textbox", { name: "Producto" }),
      "Café{Enter}",
    );

    expect(screen.getByRole("checkbox", { name: "Café" })).toBeInTheDocument();
  });

  it("explains why an empty name is not added", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);
    const input = screen.getByRole("textbox", { name: "Producto" });

    await user.click(screen.getByRole("button", { name: "Añadir" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Escribe el nombre del producto.",
    );
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription(
      "Escribe un producto y pulsa «Añadir». Escribe el nombre del producto.",
    );
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("clears the error once a valid item is added", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);
    const input = screen.getByRole("textbox", { name: "Producto" });

    await user.type(input, "Pan{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "«Pan» ya está en la lista.",
    );

    await user.clear(input);
    await user.type(input, "Café{Enter}");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).toBeValid();
  });

  it("deletes an item after confirming", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);

    await user.click(screen.getByRole("button", { name: "Borrar «Leche»" }));
    const dialog = screen.getByRole("alertdialog", { name: "¿Lo borro?" });
    await user.click(within(dialog).getByRole("button", { name: "Borrar" }));

    expect(
      screen.queryByRole("checkbox", { name: "Leche" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("0 de 2 en el carro")).toBeInTheDocument();
  });

  it("keeps the item when the deletion is cancelled", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);

    await user.click(screen.getByRole("button", { name: "Borrar «Leche»" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Leche" })).toBeInTheDocument();
  });

  it("shows only the pending items when asked to", async () => {
    const user = userEvent.setup();
    render(<ShoppingListPage />);

    await user.click(screen.getByRole("checkbox", { name: "Leche" }));
    await user.click(screen.getByRole("combobox", { name: "Mostrar" }));
    await user.click(screen.getByRole("option", { name: "Pendientes" }));

    expect(screen.getByRole("combobox", { name: "Mostrar" })).toHaveTextContent(
      "Pendientes",
    );
    expect(
      screen.queryByRole("checkbox", { name: "Leche" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Pan" })).toBeInTheDocument();
    expect(screen.getByText("1 de 3 en el carro")).toBeInTheDocument();
  });
});
