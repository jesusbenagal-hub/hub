import { Button } from "@hub/ui";

export function ButtonVariants() {
  return (
    <>
      <Button>Añadir</Button>
      <Button variant="outline">Reintentar</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Fantasma</Button>
      <Button variant="destructive">Borrar</Button>
      <Button variant="link">Enlace</Button>
    </>
  );
}
