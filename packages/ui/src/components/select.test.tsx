import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PortalContainerProvider } from "./portal-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const items = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendientes" },
];

describe("Select", () => {
  it("shows the chosen option and reports it", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    const appElement = document.createElement("div");
    document.body.append(appElement);
    render(
      <PortalContainerProvider container={appElement}>
        <Select
          items={items}
          defaultValue="all"
          onValueChange={handleValueChange}
        >
          <SelectTrigger aria-label="Mostrar">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PortalContainerProvider>,
    );

    await user.click(screen.getByRole("combobox", { name: "Mostrar" }));
    expect(appElement).toContainElement(screen.getByRole("listbox"));
    await user.click(screen.getByRole("option", { name: "Pendientes" }));

    expect(screen.getByRole("combobox", { name: "Mostrar" })).toHaveTextContent(
      "Pendientes",
    );
    expect(handleValueChange.mock.calls[0]?.[0]).toBe("pending");
    appElement.remove();
  });
});
