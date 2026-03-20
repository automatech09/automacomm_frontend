import type { VisualType } from "@/types/template";

export const VISUAL_CONFIG: Record<VisualType, { color: string; bg: string }> = {
  Résultat:        { color: "#0A5EBF", bg: "#E8F4FF" },
  Classement:      { color: "#D4640A", bg: "#FFF3E8" },
  Affiche:         { color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { color: "#0F9B58", bg: "#EEFBF3" },
};

export const STATUS_CONFIG: Record<
  "upcoming" | "published" | "error",
  { color: string; label: string }
> = {
  upcoming:  { color: "blue",  label: "À venir" },
  published: { color: "green", label: "Publié" },
  error:     { color: "red",   label: "Erreur" },
};
