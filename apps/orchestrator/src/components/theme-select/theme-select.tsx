import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hub/ui";

import { useTheme } from "../../hooks/use-theme";
import { Theme } from "../../types/theme";

const options = [
  {
    value: Theme.System,
    label: "Sistema",
    icon: <DesktopIcon aria-hidden="true" />,
  },
  { value: Theme.Light, label: "Claro", icon: <SunIcon aria-hidden="true" /> },
  { value: Theme.Dark, label: "Oscuro", icon: <MoonIcon aria-hidden="true" /> },
];

export function ThemeSelect() {
  const [theme, setTheme] = useTheme();

  return (
    <Select
      items={options}
      value={theme}
      onValueChange={(value) => {
        if (value) {
          setTheme(value);
        }
      }}
    >
      <SelectTrigger size="sm" aria-label="Tema" className="w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label, icon }) => (
          <SelectItem key={value} value={value}>
            {icon}
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
