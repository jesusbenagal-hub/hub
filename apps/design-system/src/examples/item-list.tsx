import { TrashIcon } from "@phosphor-icons/react";

import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@hub/ui";

export function ItemList() {
  return (
    <ItemGroup aria-label="Productos" className="w-80 gap-2">
      <Item role="listitem" variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Leche</ItemTitle>
          <ItemDescription>2 bricks</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm" aria-label="Borrar «Leche»">
            <TrashIcon aria-hidden="true" />
          </Button>
        </ItemActions>
      </Item>
      <Item role="listitem" variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Pan</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
