import { NavLink, Outlet } from "react-router";

import type { LoadedRemote } from "../../types/remote";

interface HubLayoutProps {
  remotes: LoadedRemote[];
}

export function HubLayout({ remotes }: HubLayoutProps) {
  return (
    <>
      <header>
        <nav aria-label="Apps del hub">
          <ul>
            <li>
              <NavLink to="/" end>
                Hub
              </NavLink>
            </li>
            {remotes.map(({ definition }) => (
              <li key={definition.appId}>
                <NavLink to={definition.route}>{definition.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
