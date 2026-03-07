export type VisualType = "Résultat" | "Classement" | "Affiche" | "Calendrier";

export type TemplateFormat = "Post" | "Story";

export interface Template {
  id: string;
  name: string;
  visualType: VisualType;
  format: TemplateFormat;
  teamId: string;
  active: boolean;
  thumbnail: string;
  lastUsed?: string;
}
