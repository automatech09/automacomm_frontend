import type { Team } from "@/types";
import { initialTeams } from "@/lib/mockupdata/teams/data";

export async function getTeams(): Promise<Team[]> {
  // TODO: remplacer par un vrai appel API / DB
  return initialTeams;
}
