import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { Toaster } from "@hub/ui";

import { App } from "./app";
import "./standalone.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Missing #root element in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      {/* Mounted like the host does, at a splat route. */}
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
);
