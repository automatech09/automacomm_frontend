import { COLORS } from "@/lib/constants/colors";
import { ScheduledPublication } from "@/types";
import { getUniqueTeams } from "./publications";


export function getEventColor(item: ScheduledPublication): string {
  const teams = getUniqueTeams(item);
  return teams.length === 1 ? teams[0].color : COLORS.primary;
}
