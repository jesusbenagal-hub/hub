import { useLocation, useParams } from "react-router";

/**
 * Builds absolute paths inside a remote, wherever it is mounted (the host
 * mounts it at "/<route>/*"; standalone, at "/*").
 *
 * Relative links don't work for this: under a splat route, React Router
 * resolves "." from the whole current URL, so a link to "historial" from
 * "/lista-compra/historial" would point to ".../historial/historial".
 *
 * @example
 * const appPath = useAppPath();
 * <NavLink to={appPath()} end>Lista</NavLink>
 * <NavLink to={appPath("historial")}>Historial</NavLink>
 */
export function useAppPath(): (path?: string) => string {
  const { pathname } = useLocation();
  const { "*": rest = "" } = useParams();
  const root = pathname
    .slice(0, pathname.length - rest.length)
    .replace(/\/$/, "");

  return (path = "") => (path ? `${root}/${path}` : root || "/");
}
