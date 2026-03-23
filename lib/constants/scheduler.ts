import type { VisualType } from "@/types/template";

export const MATCH_OPTIONS = [
  { value: "J-4", label: "J-4" },
  { value: "J-3", label: "J-3" },
  { value: "J-2", label: "J-2" },
  { value: "J-1 (veille du match)", label: "Veille" },
  { value: "Jour J", label: "Jour J" },
  { value: "J+1 (lendemain)", label: "Lend." },
  { value: "J+2", label: "J+2" },
  { value: "J+3", label: "J+3" },
  { value: "J+4", label: "J+4" },
];

export const VISUAL_CONFIG: Record<VisualType, { color: string; bg: string }> = {
  Résultat:        { color: "#0A5EBF", bg: "#E8F4FF" },
  Classement:      { color: "#D4640A", bg: "#FFF3E8" },
  Affiche:         { color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { color: "#0F9B58", bg: "#EEFBF3" },
};

export const MOMENT_PHRASES: Record<string, string> = {
  "J-4": "4 jours avant le match",
  "J-3": "3 jours avant le match",
  "J-2": "2 jours avant le match",
  "J-1 (veille du match)": "Veille du match",
  "Jour J": "Jour du match",
  "J+1 (lendemain)": "Lendemain du match",
  "J+2": "2 jours après le match",
  "J+3": "3 jours après le match",
  "J+4": "4 jours après le match",
  Lundi: "Chaque lundi",
  Mardi: "Chaque mardi",
  Mercredi: "Chaque mercredi",
  Jeudi: "Chaque jeudi",
  Vendredi: "Chaque vendredi",
  Samedi: "Chaque samedi",
  Dimanche: "Chaque dimanche",
};

export const STATUS_CONFIG: Record<
  "upcoming" | "published" | "error",
  { color: string; label: string }
> = {
  upcoming:  { color: "blue",  label: "À venir" },
  published: { color: "green", label: "Publié" },
  error:     { color: "red",   label: "Erreur" },
};
