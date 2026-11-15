import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { Accent } from "@hub/shared";

import { App } from "./app";

import "./standalone.css";

// In the hub, the host sets the accent from remotes.json.
document.documentElement.dataset.accent = Accent.Sage;

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Missing #root element in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
