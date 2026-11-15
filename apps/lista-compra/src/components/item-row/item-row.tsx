import { Checkbox, Label } from "@hub/ui";

interface ItemRowProps {
  name: string;
  isPurchased: boolean;
  onToggle: () => void;
}

export function ItemRow({ name, isPurchased, onToggle }: ItemRowProps) {
  return (
    <li>
      <Label className="py-1 text-sm font-normal">
        <Checkbox checked={isPurchased} onCheckedChange={onToggle} />
        {name}
      </Label>
    </li>
  );
}
