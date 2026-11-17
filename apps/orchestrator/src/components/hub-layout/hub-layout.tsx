import { NavLink, Outlet } from "react-router";

import type { LoadedRemote } from "../../types/remote";
import { ThemeSelect } from "../theme-select/theme-select";

interface HubLayoutProps {
  remotes: LoadedRemote[];
}

export function HubLayout({ remotes }: HubLayoutProps) {
  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b px-4 py-2 sm:px-6">
        <nav aria-label="Apps del hub" className="overflow-x-auto">
          <ul className="flex gap-6 whitespace-nowrap">
            <li>
              <NavLink to="/" end className="font-semibold">
                Hub
              </NavLink>
            </li>
            {remotes.map(({ definition }) => (
              <li key={definition.appId} data-accent={definition.accent}>
                <NavLink
                  to={definition.route}
                  className="text-muted-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-primary aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                >
                  {definition.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeSelect />
      </header>
      <main className="px-4 py-4 sm:px-6">
        <Outlet />
      </main>
    </>
  );
}
