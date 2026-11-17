import { PlusIcon, TrashIcon } from "@phosphor-icons/react";

import { Button } from "@hub/ui";

export function ButtonSizes() {
  return (
    <>
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button>default</Button>
      <Button size="lg">lg</Button>
      <Button>
        <PlusIcon aria-hidden="true" data-icon="inline-start" />
        Añadir
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Borrar «Leche»">
        <TrashIcon aria-hidden="true" />
      </Button>
      <Button disabled>Deshabilitado</Button>
    </>
  );
}
