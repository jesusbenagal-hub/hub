import { CaretRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

import { Item, ItemActions, ItemContent, ItemTitle } from "@hub/ui";

import type { LoadedRemote } from "../../types/remote";

interface HomePageProps {
  remotes: LoadedRemote[];
}

export function HomePage({ remotes }: HomePageProps) {
  return (
    <div className="flex max-w-96 flex-col gap-4">
      <h1 className="text-xl font-semibold">Hub</h1>
      {remotes.length === 0 ? (
        <p>No hay ninguna app disponible.</p>
      ) : (
        <ul aria-label="Apps" className="flex flex-col gap-2">
          {remotes.map(({ definition }) => (
            <li key={definition.appId}>
              <Item variant="outline" render={<Link to={definition.route} />}>
                <ItemContent>
                  <ItemTitle className="text-sm">{definition.title}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <CaretRightIcon aria-hidden="true" />
                </ItemActions>
              </Item>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
