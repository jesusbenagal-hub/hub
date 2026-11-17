import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
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
});
