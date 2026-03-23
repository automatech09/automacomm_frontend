import type { Team } from "@/types/team";

export type VisualType = "Résultat" | "Classement" | "Affiche" | "Score en direct";

export type TemplateFormat = "Post" | "Story";

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
  team: string;
  startFromScratch: boolean;
}
