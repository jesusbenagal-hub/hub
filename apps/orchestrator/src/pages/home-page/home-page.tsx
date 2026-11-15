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
        <ul>
          {remotes.map(({ definition }) => (
            <li key={definition.appId}>
              <Link to={definition.route}>{definition.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
