import { Separator } from "@hub/ui";

export function SeparatorOrientations() {
  return (
    <>
      <div className="flex w-80 flex-col gap-2">
        <span>Pendientes</span>
        <Separator />
        <span>En el carro</span>
      </div>
      <div className="flex h-6 items-center gap-2">
        <span>Lista</span>
        <Separator orientation="vertical" />
        <span>Historial</span>
      </div>
    </>
  );
}
