import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setupRemotes } from "./remotes";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No encuentro el elemento #root en index.html");
}

const remotes = await setupRemotes();

createRoot(rootElement).render(
  <StrictMode>
    <App remotes={remotes} />
  </StrictMode>,
);