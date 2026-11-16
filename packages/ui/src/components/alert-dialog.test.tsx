import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { PortalContainerProvider } from "./portal-container";

function renderDialog(container: HTMLElement | null) {
  render(
    <PortalContainerProvider container={container}>
      <AlertDialog>
        <AlertDialogTrigger>Borrar</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>¿Lo borro?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    </PortalContainerProvider>,
  );
}

describe("AlertDialog", () => {
  it("renders into document.body by default", async () => {
    const user = userEvent.setup();
    renderDialog(null);

    await user.click(screen.getByRole("button", { name: "Borrar" }));

    expect(
      screen.getByRole("alertdialog", { name: "¿Lo borro?" }),
    ).toBeVisible();
  });

  it("renders inside the element given by PortalContainerProvider", async () => {
    const user = userEvent.setup();
    const appElement = document.createElement("div");
    document.body.append(appElement);
    renderDialog(appElement);

    await user.click(screen.getByRole("button", { name: "Borrar" }));

    expect(appElement).toContainElement(
      screen.getByRole("alertdialog", { name: "¿Lo borro?" }),
    );
    appElement.remove();
  });
});
