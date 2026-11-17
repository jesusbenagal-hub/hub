import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ThemeSelect } from "./theme-select";

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe("ThemeSelect", () => {
  it("switches the whole page to the chosen theme", async () => {
    const user = userEvent.setup();
    render(<ThemeSelect />);

    const trigger = screen.getByRole("combobox", { name: "Tema" });
    expect(trigger).toHaveTextContent("Sistema");

    await user.click(trigger);
    await user.click(await screen.findByRole("option", { name: "Oscuro" }));

    expect(trigger).toHaveTextContent("Oscuro");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
