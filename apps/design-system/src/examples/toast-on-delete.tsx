import { Button, toast } from "@hub/ui";

export function ToastOnDelete() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast.add({
          title: "Borrado",
          description: "«Leche» ya no está en la lista.",
        });
      }}
    >
      Borrar «Leche»
    </Button>
  );
}
