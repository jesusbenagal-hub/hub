import { TrashIcon } from "@phosphor-icons/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Checkbox,
  Label,
} from "@hub/ui";

interface ItemRowProps {
  name: string;
  isPurchased: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function ItemRow({
  name,
  isPurchased,
  onToggle,
  onDelete,
}: ItemRowProps) {
  return (
    <li className="flex max-w-80 items-center justify-between gap-2">
      <Label className="py-1 text-sm font-normal">
        <Checkbox checked={isPurchased} onCheckedChange={onToggle} />
        {name}
      </Label>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Borrar «${name}»`}
            />
          }
        >
          <TrashIcon aria-hidden="true" />
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Lo borro?</AlertDialogTitle>
            <AlertDialogDescription>
              «{name}» desaparecerá de la lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDelete}>
              Borrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
