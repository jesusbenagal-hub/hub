import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Item, ItemContent, ItemGroup, ItemTitle } from "./item";

describe("Item", () => {
  it("is a list item inside an ItemGroup when given the role", () => {
    render(
      <ItemGroup aria-label="Productos">
        <Item role="listitem">
          <ItemContent>
            <ItemTitle>Leche</ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>,
    );

    const list = screen.getByRole("list", { name: "Productos" });
    expect(list).toContainElement(screen.getByRole("listitem"));
  });

  it("renders as the element passed in render", () => {
    render(
      <ul>
        <Item render={<li />}>Leche</Item>
      </ul>,
    );

    expect(screen.getByRole("listitem")).toHaveTextContent("Leche");
  });
});
