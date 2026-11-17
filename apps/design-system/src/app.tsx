import { useState } from "react";
import { NavLink, Route, Routes } from "react-router";

import { PortalContainerProvider } from "@hub/ui";

import { mdxComponents } from "./components/mdx-components/mdx-components";
import Components from "./content/components.mdx";
import Introduction from "./content/introduction.mdx";
import Patterns from "./content/patterns.mdx";
import Tokens from "./content/tokens.mdx";
import "./styles.css";

const sections = [
  {
    path: "tokens",
    title: "Tokens",
    element: <Tokens components={mdxComponents} />,
  },
  {
    path: "componentes",
    title: "Componentes",
    element: <Components components={mdxComponents} />,
  },
  {
    path: "patrones",
    title: "Patrones",
    element: <Patterns components={mdxComponents} />,
  },
];

const navLinkClassName =
  "text-muted-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-primary aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4";

export function App() {
  // Overlays render inside data-app, where this app's scoped styles apply.
  const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);

  return (
    <div data-app="design-system" ref={setAppElement}>
      <PortalContainerProvider container={appElement}>
        <section className="flex flex-col gap-4 px-4 py-5">
          <nav aria-label="Design system">
            <ul className="flex gap-4 text-sm">
              <li>
                <NavLink to="." end className={navLinkClassName}>
                  Inicio
                </NavLink>
              </li>
              {sections.map(({ path, title }) => (
                <li key={path}>
                  <NavLink to={path} className={navLinkClassName}>
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <article className="max-w-prose">
            <Routes>
              <Route
                index
                element={<Introduction components={mdxComponents} />}
              />
              {sections.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </article>
        </section>
      </PortalContainerProvider>
    </div>
  );
}
