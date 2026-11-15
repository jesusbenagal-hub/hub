interface ItemRowProps {
  name: string;
  isPurchased: boolean;
  onToggle: () => void;
}

export function ItemRow({ name, isPurchased, onToggle }: ItemRowProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          className="accent-accent"
          checked={isPurchased}
          onChange={onToggle}
        />
        {name}
      </label>
    </li>
  );
}
