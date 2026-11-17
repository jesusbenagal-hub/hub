import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hub/ui";

export function CardList() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>1 de 3 en el carro</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Vaciar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Leche, pan y huevos.</CardContent>
      <CardFooter className="border-t">Actualizada hoy</CardFooter>
    </Card>
  );
}
