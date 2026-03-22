import { SimpleGrid } from "@mantine/core";
import type { VisualType } from "@/types";
import { visualTypeConfig } from "@/lib/constants/templates";
import { SelectionCard } from "./SelectionCard";

interface Props {
  value: VisualType | null;
  onChange: (vt: VisualType | null) => void;
  cols?: { base?: number; sm?: number };
  /** Description affichée sous chaque carte. Laisser vide pour omettre. */
  description?: string;
}

export function VisualTypeSelector({ value, onChange, cols = { base: 1, sm: 2 }, description }: Props) {
  return (
    <SimpleGrid cols={cols} spacing="sm">
      {Object.entries(visualTypeConfig).map(([type, config]) => (
        <SelectionCard
          key={type}
          icon={config.icon}
          title={type}
          description={description}
          color={config.color}
          selected={value === type}
          onClick={() => onChange(value === type ? null : type as VisualType)}
        />
      ))}
    </SimpleGrid>
  );
}
