import type { Team, PlayerRow } from "@/types";

export const initialTeams: Team[] = [
  { id: "team1", name: "Équipe 1", league: "Division Régionale 1 — Auvergne-Rhône-Alpes", color: "#FF6B35" },
  { id: "reserve", name: "Équipe Réserve", league: "Division Honneur Régionale", color: "#0F9B58" },
  { id: "u18", name: "U18", league: "Championnat U18 Régional", color: "#7A0FB0" },
];

export const initialPlayers: PlayerRow[] = [
  { id: "p1", firstName: "Lucas", lastName: "Martin", category: "Senior", photo: null },
  { id: "p2", firstName: "Thomas", lastName: "Durand", category: "Senior", photo: null },
  { id: "p3", firstName: "Hugo", lastName: "Petit", category: "Senior", photo: null },
  { id: "p4", firstName: "Maxime", lastName: "Bernard", category: "Senior", photo: null },
  { id: "p5", firstName: "Nathan", lastName: "Richard", category: "Senior", photo: null },
  { id: "p6", firstName: "Théo", lastName: "Lambert", category: "U18", photo: null },
  { id: "p7", firstName: "Enzo", lastName: "Thomas", category: "U18", photo: null },
  { id: "p8", firstName: "Louis", lastName: "Girard", category: "U15", photo: null },
  { id: "p9", firstName: "Arthur", lastName: "Rousseau", category: "U15", photo: null },
];

export const categories = ["Senior", "U18", "U15", "U13"];
