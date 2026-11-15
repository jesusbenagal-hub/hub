import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@hub/ui";

interface RemoteErrorBoundaryProps {
  title: string;
  children: ReactNode;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

export class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  override state: RemoteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `Remote "${this.props.title}" failed to render`,
      error,
      info.componentStack,
    );
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex flex-col items-start gap-2">
          <p>«{this.props.title}» ha tenido un problema.</p>
          <Button
            variant="outline"
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            <ArrowClockwiseIcon aria-hidden="true" data-icon="inline-start" />
            Reintentar
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
