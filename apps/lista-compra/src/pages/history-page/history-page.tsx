import { Link } from "react-router";

export function HistoryPage() {
  return (
    <>
      <p>Aquí verás las compras anteriores.</p>
      <Link to="..">Volver a la lista</Link>
    </>
  );
}
