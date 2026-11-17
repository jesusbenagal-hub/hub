import type { ReactNode } from "react";

interface ExampleProps {
  /** Source of the example, imported with `?raw` from the same file. */
  code: string;
  children: ReactNode;
}

/** A live example with its code underneath. */
export function Example({ code, children }: ExampleProps) {
  return (
    <figure className="mb-4">
      <div className="flex flex-wrap items-center gap-3 rounded-t-lg border bg-card p-4">
        {children}
      </div>
      <pre className="overflow-x-auto rounded-b-lg bg-muted p-3 text-sm">
        <code className="font-mono">{code.trim()}</code>
      </pre>
    </figure>
  );
}
