import { TEMPLATES } from "@/lib/constants/dashboardData";
import type { Template } from "@/types";

export const templatesService = {
  async getAll(): Promise<Template[]> {
    return Promise.resolve(TEMPLATES);
  },
  async getByTeam(teamId: string): Promise<Template[]> {
    return Promise.resolve(TEMPLATES.filter((template) => template.teamId === teamId));
  },
};
