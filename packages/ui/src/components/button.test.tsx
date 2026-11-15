import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("calls onClick when it is pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Guardar</Button>);

    await user.click(screen.getByRole("button", { name: "Guardar" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when it is disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Guardar
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Guardar" });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("lets a className override its default classes", () => {
    render(<Button className="px-6">Guardar</Button>);

    const button = screen.getByRole("button", { name: "Guardar" });

    expect(button).toHaveClass("px-6");
    expect(button).not.toHaveClass("px-2");
  });
});
