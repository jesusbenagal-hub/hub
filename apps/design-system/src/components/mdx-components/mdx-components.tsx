import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Link } from "react-router";

import { useAppPath } from "@hub/shared";

const linkClassName = "text-primary underline underline-offset-4";

/** Links in MDX: outside ones as <a>, ours through the router (no reload). */
function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const appPath = useAppPath();
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={linkClassName} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link to={appPath(href)} className={linkClassName} {...props}>
      {children}
    </Link>
  );
}

/** Styles for the plain HTML that MDX writes (preflight resets it all). */
export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="mb-4 text-2xl font-semibold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-8 mb-3 text-lg font-semibold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-6 mb-2 font-semibold" {...props}>
      {children}
    </h3>
  ),
  p: (props) => <p className="mb-3" {...props} />,
  ul: (props) => <ul className="mb-3 list-disc pl-6" {...props} />,
  a: MdxLink,
  code: (props) => (
    <code className="rounded-sm bg-muted px-1 font-mono text-sm" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-muted p-3 text-sm [&_code]:p-0"
      {...props}
    />
  ),
  table: (props) => (
    <table className="mb-4 w-full border-collapse text-sm" {...props} />
  ),
  th: (props) => (
    <th className="border-b px-2 py-1 text-left font-semibold" {...props} />
  ),
  td: (props) => <td className="border-b px-2 py-1 align-top" {...props} />,
};
