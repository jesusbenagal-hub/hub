import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RemoteErrorBoundary } from "./remote-error-boundary";

// Stands in for a remote: it fails to render until `isBroken` is set to false.
let isBroken = true;

function FlakyRemote() {
  if (isBroken) {
    throw new Error("Remote crashed");
  }
  return <p>Contenido del remote</p>;
}

describe("RemoteErrorBoundary", () => {
  beforeEach(() => {
    isBroken = true;
    // React and the boundary log the error; keep the test output clean.
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders its children when nothing fails", () => {
    isBroken = false;
    render(
      <RemoteErrorBoundary title="Lista de la compra">
        <FlakyRemote />
      </RemoteErrorBoundary>,
    );

    expect(screen.getByText("Contenido del remote")).toBeInTheDocument();
  });

  it("shows an alert instead of the remote when it fails to render", () => {
    render(
      <RemoteErrorBoundary title="Lista de la compra">
        <FlakyRemote />
      </RemoteErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "«Lista de la compra» ha tenido un problema.",
    );
    expect(console.error).toHaveBeenCalledWith(
      'Remote "Lista de la compra" failed to render',
      expect.any(Error),
      expect.any(String),
    );
  });

  it("renders the remote again after a retry", async () => {
    const user = userEvent.setup();
    render(
      <RemoteErrorBoundary title="Lista de la compra">
        <FlakyRemote />
      </RemoteErrorBoundary>,
    );

    isBroken = false;
    await user.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Contenido del remote")).toBeInTheDocument();
  });
});
