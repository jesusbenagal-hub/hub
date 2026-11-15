import { Route, Routes } from "react-router";

import { HubLayout } from "./components/hub-layout/hub-layout";
import { HomePage } from "./pages/home-page/home-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { RemotePage } from "./pages/remote-page/remote-page";
import type { LoadedRemote } from "./types/remote";

interface AppProps {
  remotes: LoadedRemote[];
}

export function App({ remotes }: AppProps) {
  return (
    <Routes>
      <Route element={<HubLayout remotes={remotes} />}>
        <Route index element={<HomePage remotes={remotes} />} />
        {remotes.map((remote) => (
          <Route
            key={remote.definition.appId}
            path={`${remote.definition.route}/*`}
            element={<RemotePage remote={remote} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
