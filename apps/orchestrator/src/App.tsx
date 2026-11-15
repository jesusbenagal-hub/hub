import { Suspense } from "react";
import { Link, NavLink, Outlet, Route, Routes } from "react-router";

import { RemoteErrorBoundary } from "./RemoteErrorBoundary";
import type { LoadedRemote } from "./remotes";

interface AppProps {
  remotes: LoadedRemote[];
}

export function App({ remotes }: AppProps) {
  return (
    <Routes>
      <Route element={<Layout remotes={remotes} />}>
        <Route index element={<Inicio remotes={remotes} />} />
        {remotes.map((remote) => (
          <Route
            key={remote.definition.appId}
            path={`${remote.definition.route}/*`}
            element={<RemoteView remote={remote} />}
          />
        ))}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

function Layout({ remotes }: AppProps) {
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

function Inicio({ remotes }: AppProps) {
  return (
    <>
      <h1>Hub</h1>
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

function RemoteView({ remote }: { remote: LoadedRemote }) {
  const { definition, Component } = remote;
  return (
    <RemoteErrorBoundary key={definition.appId} title={definition.title}>
      <Suspense fallback={<p>Cargando «{definition.title}»…</p>}>
        <Component />
      </Suspense>
    </RemoteErrorBoundary>
  );
}

function NoEncontrado() {
  return (
    <>
      <h1>No encuentro esta página</h1>
      <p>
        <Link to="/">Volver al hub</Link>
      </p>
    </>
  );
}
