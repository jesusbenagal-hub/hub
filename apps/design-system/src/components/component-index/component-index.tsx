import { Link } from "react-router";

import { useAppPath } from "@hub/shared";

import { componentPages } from "../../content/component-pages";

/** Links to every component page. */
export function ComponentIndex() {
  const appPath = useAppPath();

  return (
    <ul className="mb-3 list-disc pl-6">
      {componentPages.map(({ slug, title }) => (
        <li key={slug}>
          <Link
            to={appPath(`componentes/${slug}`)}
            className="text-primary underline underline-offset-4"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
