import { Link } from "react-router";

import type { LoadedRemote } from "../../types/remote";

interface HomePageProps {
  remotes: LoadedRemote[];
}

export function HomePage({ remotes }: HomePageProps) {
  return (
    <>
      <h1 className="text-xl font-semibold">Hub</h1>
      {remotes.length === 0 ? (
        <p>No hay ninguna app disponible.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {remotes.map(({ definition }) => (
            <li
              key={definition.appId}
              data-accent={definition.accent}
              className="flex items-center gap-2"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent"
              />
              <Link to={definition.route}>{definition.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
