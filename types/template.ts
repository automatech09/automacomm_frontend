import type { Team, TeamName } from "@/types/team";

export type VisualType = "Résultat" | "Classement" | "Affiche" | "Score en direct";

/** Alias de VisualType pour usage sémantique dans les pages */
export type TemplateType = VisualType;

export type TemplateFormat = "Post" | "Story";
export type TemplateTeamFilter = TeamName | "Tous";
export type TemplateCreationStep = 1 | 2 | 3;

export interface Template {
  id: number;
  name: string;
  visualType: VisualType;
  format: TemplateFormat;
  team: Team | null;
  urlArrierePlan: string | null;
  thumbnail: string;
  lastUsed?: string;
}

export interface CreateTemplatePayload {
  visualType: VisualType;
  team: TeamName;
  startFromScratch: boolean;
}
