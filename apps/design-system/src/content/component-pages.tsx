import { mdxComponents } from "../components/mdx-components/mdx-components";
import AlertDialogDoc from "./components/alert-dialog.mdx";
import ButtonDoc from "./components/button.mdx";
import CardDoc from "./components/card.mdx";
import CheckboxDoc from "./components/checkbox.mdx";
import FieldDoc from "./components/field.mdx";
import ItemDoc from "./components/item.mdx";
import SelectDoc from "./components/select.mdx";
import SeparatorDoc from "./components/separator.mdx";
import ToastDoc from "./components/toast.mdx";

/**
 * One page per component family of @hub/ui. `documents` lists the export
 * prefixes each page covers: a test checks that every export has a page.
 */
export const componentPages = [
  {
    slug: "button",
    title: "Button",
    documents: ["Button"],
    element: <ButtonDoc components={mdxComponents} />,
  },
  {
    slug: "checkbox",
    title: "Checkbox y Label",
    documents: ["Checkbox", "Label"],
    element: <CheckboxDoc components={mdxComponents} />,
  },
  {
    slug: "field",
    title: "Field e Input",
    documents: ["Field", "Input"],
    element: <FieldDoc components={mdxComponents} />,
  },
  {
    slug: "select",
    title: "Select",
    documents: ["Select"],
    element: <SelectDoc components={mdxComponents} />,
  },
  {
    slug: "alert-dialog",
    title: "AlertDialog",
    documents: ["AlertDialog", "PortalContainerProvider"],
    element: <AlertDialogDoc components={mdxComponents} />,
  },
  {
    slug: "toast",
    title: "Toast",
    documents: ["Toast"],
    element: <ToastDoc components={mdxComponents} />,
  },
  {
    slug: "card",
    title: "Card",
    documents: ["Card"],
    element: <CardDoc components={mdxComponents} />,
  },
  {
    slug: "item",
    title: "Item",
    documents: ["Item"],
    element: <ItemDoc components={mdxComponents} />,
  },
  {
    slug: "separator",
    title: "Separator",
    documents: ["Separator"],
    element: <SeparatorDoc components={mdxComponents} />,
  },
];
