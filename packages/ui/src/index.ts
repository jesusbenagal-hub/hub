/*
 * Public API of @hub/ui: apps import from "@hub/ui", never from a file path,
 * so Module Federation shares one copy of the whole library (and of Base UI
 * inside it). Add a line here for every component the shadcn CLI adds.
 */
export { Button, buttonVariants } from "./components/button";
export { Checkbox } from "./components/checkbox";
export { Label } from "./components/label";
