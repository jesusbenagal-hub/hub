import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Link } from "react-router";

const linkClassName = "text-primary underline underline-offset-4";

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
  p: (props) => <p className="mb-3" {...props} />,
  ul: (props) => <ul className="mb-3 list-disc pl-6" {...props} />,
  // Links inside the design system go through the router (no page reload).
  a: ({ href = "", children, ...props }: ComponentProps<"a">) =>
    /^https?:/.test(href) ? (
      <a href={href} className={linkClassName} {...props}>
        {children}
      </a>
    ) : (
      <Link to={href} className={linkClassName} {...props}>
        {children}
      </Link>
    ),
  code: (props) => (
    <code className="rounded-sm bg-muted px-1 font-mono text-sm" {...props} />
  ),
};
