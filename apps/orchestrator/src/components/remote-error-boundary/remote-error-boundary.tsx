import { Component, type ErrorInfo, type ReactNode } from "react";

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
        <div role="alert">
          <p>«{this.props.title}» ha tenido un problema.</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
