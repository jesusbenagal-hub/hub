import { Checkbox, Label } from "@hub/ui";

export function CheckboxWithLabel() {
  return (
    <>
      <Label>
        <Checkbox />
        Leche
      </Label>
      <Label className="has-checked:text-muted-foreground has-checked:line-through">
        <Checkbox defaultChecked />
        Pan
      </Label>
      <Label>
        <Checkbox disabled />
        Huevos
      </Label>
    </>
  );
}
