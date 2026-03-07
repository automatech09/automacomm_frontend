import { TEAMS } from "@/lib/constants/dashboardData";
import type { Team, TeamFormData } from "@/types";

export const teamsService = {
  async getAll(): Promise<Team[]> {
    return Promise.resolve(TEAMS);
  },
  async create(data: TeamFormData): Promise<Team> {
    return Promise.resolve({
      id: crypto.randomUUID(),
      name: data.name,
      league: data.league,
      color: data.color,
    });
  },
};
