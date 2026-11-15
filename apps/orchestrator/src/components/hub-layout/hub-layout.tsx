import { NavLink, Outlet } from "react-router";

import type { LoadedRemote } from "../../types/remote";

interface HubLayoutProps {
  remotes: LoadedRemote[];
}

export function HubLayout({ remotes }: HubLayoutProps) {
  return (
    <>
      <header className="border-b border-line px-6 py-3">
        <nav aria-label="Apps del hub">
          <ul className="flex gap-6">
            <li>
              <NavLink to="/" end className="font-semibold">
                Hub
              </NavLink>
            </li>
            {remotes.map(({ definition }) => (
              <li key={definition.appId}>
                <NavLink
                  to={definition.route}
                  className="text-ink-muted aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                >
                  {definition.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="px-6 py-4">
        <Outlet />
      </main>
    </>
  );
}
