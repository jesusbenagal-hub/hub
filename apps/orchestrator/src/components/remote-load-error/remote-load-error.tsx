interface RemoteLoadErrorProps {
  title: string;
}

export function RemoteLoadError({ title }: RemoteLoadErrorProps) {
  return (
    <p role="alert">
      No se ha podido cargar «{title}». Prueba a recargar dentro de un rato.
    </p>
  );
}
