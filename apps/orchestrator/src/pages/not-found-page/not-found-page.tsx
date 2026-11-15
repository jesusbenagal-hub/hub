import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <>
      <h1>No encuentro esta página</h1>
      <p>
        <Link to="/">Volver al hub</Link>
      </p>
    </>
  );
}
