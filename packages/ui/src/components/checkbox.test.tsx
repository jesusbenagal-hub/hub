import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

describe("Checkbox", () => {
  it("is named by the label that wraps it", () => {
    render(
      <Label>
        <Checkbox />
        Leche
      </Label>,
    );

    expect(screen.getByRole("checkbox", { name: "Leche" })).not.toBeChecked();
  });

  it("toggles when its label is pressed", async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();
    render(
      <Label>
        <Checkbox onCheckedChange={handleCheckedChange} />
        Leche
      </Label>,
    );

    await user.click(screen.getByText("Leche"));

    expect(screen.getByRole("checkbox", { name: "Leche" })).toBeChecked();
    expect(handleCheckedChange).toHaveBeenCalledOnce();
  });

  it("does not toggle when it is disabled", async () => {
    const user = userEvent.setup();
    render(
      <Label>
        <Checkbox disabled />
        Leche
      </Label>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Leche" });
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
