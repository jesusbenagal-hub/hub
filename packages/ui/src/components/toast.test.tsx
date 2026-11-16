import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { toast, Toaster } from "./toast";

describe("Toaster", () => {
  it("shows what anyone adds with toast.add", () => {
    render(<Toaster />);

    act(() => {
      toast.add({
        title: "Borrado",
        description: "«Leche» ya no está en la lista.",
      });
    });

    expect(screen.getByText("Borrado")).toBeInTheDocument();
    expect(
      screen.getByText("«Leche» ya no está en la lista."),
    ).toBeInTheDocument();
  });
});
