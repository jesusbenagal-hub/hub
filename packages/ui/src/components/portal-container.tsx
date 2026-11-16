import { createContext, use, type ReactNode } from "react";

const PortalContainerContext = createContext<HTMLElement | null>(null);

interface PortalContainerProviderProps {
  container: HTMLElement | null;
  children: ReactNode;
}

/**
 * Where @hub/ui overlays (dialogs, selects…) are rendered. A remote points it
 * at its `data-app` element, so its scoped styles reach the overlays too.
 */
export function PortalContainerProvider({
  container,
  children,
}: PortalContainerProviderProps) {
  return (
    <PortalContainerContext value={container}>
      {children}
    </PortalContainerContext>
  );
}

/** The element overlays render into, or undefined for document.body. */
export function usePortalContainer(): HTMLElement | undefined {
  return use(PortalContainerContext) ?? undefined;
}
