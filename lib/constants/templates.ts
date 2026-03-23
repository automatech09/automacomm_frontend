import {
  IconCalendarStats,
  IconChartBar,
  IconLayout,
  IconTrophy,
  type TablerIcon,
} from "@tabler/icons-react";
import type { VisualType } from "@/types";

/** Dérive bg (20% alpha) et text depuis la couleur d'une équipe */
export function teamPalette(color: string): { text: string; bg: string } {
  return { text: color, bg: `${color}20` };
}

export const visualTypeConfig: Record<VisualType, { icon: TablerIcon; color: string; bg: string }> = {
  Résultat: { icon: IconTrophy, color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { icon: IconChartBar, color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { icon: IconLayout, color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { icon: IconCalendarStats, color: "#0F9B58", bg: "#EEFBF3" },
};

