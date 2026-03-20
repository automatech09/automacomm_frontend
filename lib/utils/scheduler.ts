import { COLORS } from "@/lib/constants/colors";
import type { ScheduledItem } from "@/lib/mockupdata/scheduler/data";

export function getUniqueTeams(item: ScheduledItem) {
  const seen = new Set<string>();
  return item.templates
    .map((t) => t.team)
    .filter((t): t is NonNullable<typeof t> => !!t && !seen.has(t.id) && !!seen.add(t.id));
}

export function getEventColor(item: ScheduledItem): string {
  const teams = getUniqueTeams(item);
  return teams.length === 1 ? teams[0].color : COLORS.primary;
}
