import {
  IconCalendarStats,
  IconChartBar,
  IconLayout,
  IconTrophy,
  type TablerIcon,
} from "@tabler/icons-react";
import type { TeamName, TemplateTeamFilter, VisualType } from "@/types";

export const visualTypeConfig: Record<VisualType, { icon: TablerIcon; color: string; bg: string }> = {
  Résultat: { icon: IconTrophy, color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { icon: IconChartBar, color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { icon: IconLayout, color: "#7A0FB0", bg: "#F3EEFB" },
  Calendrier: { icon: IconCalendarStats, color: "#0F9B58", bg: "#EEFBF3" },
};

export const teamUIColors: Record<TeamName | "Tous", { text: string; bg: string }> = {
  Tous: { text: "#04346D", bg: "#F8F9FA" },
  "Équipe 1": { text: "#FF6B35", bg: "#FFE8E0" },
  Réserve: { text: "#7A0FB0", bg: "#EBE0FF" },
  U18: { text: "#0F9B58", bg: "#E0F5EA" },
};

export const templateTeamTabs: TemplateTeamFilter[] = ["Tous", "Équipe 1", "Réserve", "U18"];
export const templateCreationTeams: TeamName[] = ["Équipe 1", "Réserve", "U18"];
