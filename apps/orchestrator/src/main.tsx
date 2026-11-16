import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { Toaster } from "@hub/ui";

import { App } from "./app";
import { setupRemotes } from "./services/setup-remotes";
import "./styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Missing #root element in index.html");
}

const remotes = await setupRemotes();

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <App remotes={remotes} />
    </BrowserRouter>
  </StrictMode>,
);
