import type { VisualType } from "@/types/template";

export const MOMENT_OPTIONS: { value: string; label: string }[] = [
  { value: "J-4", label: "4 jours avant le match" },
  { value: "J-3", label: "3 jours avant le match" },
  { value: "J-2", label: "2 jours avant le match" },
  { value: "J-1 (veille du match)", label: "Veille du match" },
  { value: "Jour J", label: "Jour du match" },
  { value: "J+1 (lendemain)", label: "Lendemain du match" },
  { value: "J+2", label: "2 jours après le match" },
  { value: "J+3", label: "3 jours après le match" },
  { value: "J+4", label: "4 jours après le match" },
  { value: "Lundi", label: "Chaque lundi" },
  { value: "Mardi", label: "Chaque mardi" },
  { value: "Mercredi", label: "Chaque mercredi" },
  { value: "Jeudi", label: "Chaque jeudi" },
  { value: "Vendredi", label: "Chaque vendredi" },
  { value: "Samedi", label: "Chaque samedi" },
  { value: "Dimanche", label: "Chaque dimanche" },
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
