import type { ScheduledPublication } from "@/types";
import type { Team } from "@/types";

export function getVisualType(item: ScheduledPublication): string {
  return item.templates[0]?.visualType ?? "Publication";
}

export function getUniqueTeams(item: ScheduledPublication): Team[] {
  const seen = new Set<string>();
  return item.templates
    .map((t) => t.team)
    .filter((team): team is NonNullable<typeof team> => team !== null && !seen.has(team.id) && !!seen.add(team.id));
}
