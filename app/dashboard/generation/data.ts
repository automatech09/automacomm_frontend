import type { Team } from "@/types";

export type TeamName = "Équipe 1" | "Réserve" | "U18";
export type TeamData = Team & { name: TeamName };
export type VisualType = "Résultat" | "Affiche" | "Classement" | "Calendrier";
export type NetworkType = "instagram" | "facebook" | "both";

export type TemplateCard = {
  id: string;
  name: string;
  type: VisualType;
  teamData: TeamData;
  thumbnail: string;
};

export type GenerationForm = {
  team: TeamName;
  opponent: string;
  scoreHome: string;
  scoreAway: string;
  date: string;
  time: string;
  location: string;
  competition: string;
  network: NetworkType;
};

export const teamByName: Record<TeamName, TeamData> = {
  "Équipe 1": { id: "team1", name: "Équipe 1", color: "#FF6B35", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" },
  Réserve: { id: "reserve", name: "Réserve", color: "#7A0FB0", league: "Division Honneur Régionale" },
  U18: { id: "u18", name: "U18", color: "#0F9B58", league: "Championnat U18 Régional" },
};

export const teamTabColor: Record<TeamName | "Tous", string> = {
  Tous: "#FF6B35",
  "Équipe 1": "#FF6B35",
  Réserve: "#7A0FB0",
  U18: "#0F9B58",
};

export const teams: (TeamName | "Tous")[] = ["Tous", "Équipe 1", "Réserve", "U18"];

export const templatesByTeam: Record<TeamName, TemplateCard[]> = {
  "Équipe 1": [
    { id: "eq1-res-1", name: "Résultat Standard", type: "Résultat", teamData: teamByName["Équipe 1"], thumbnail: "https://placehold.co/1080x1080/04346D/F5F3EB?text=Resultat+Standard" },
    { id: "eq1-aff-1", name: "Affiche Match", type: "Affiche", teamData: teamByName["Équipe 1"], thumbnail: "https://placehold.co/1080x1080/FF6B35/F5F3EB?text=Affiche+Match" },
    { id: "eq1-class-1", name: "Classement Complet", type: "Classement", teamData: teamByName["Équipe 1"], thumbnail: "https://placehold.co/1080x1080/D4640A/F5F3EB?text=Classement+Complet" },
    { id: "eq1-cal-1", name: "Calendrier Semaine", type: "Calendrier", teamData: teamByName["Équipe 1"], thumbnail: "https://placehold.co/1080x1080/0F9B58/F5F3EB?text=Calendrier+Semaine" },
  ],
  Réserve: [
    { id: "res-res-1", name: "Résultat Réserve", type: "Résultat", teamData: teamByName.Réserve, thumbnail: "https://placehold.co/1080x1080/04346D/F5F3EB?text=Resultat+Reserve" },
    { id: "res-aff-1", name: "Affiche Réserve", type: "Affiche", teamData: teamByName.Réserve, thumbnail: "https://placehold.co/1080x1080/7A0FB0/F5F3EB?text=Affiche+Reserve" },
  ],
  U18: [
    { id: "u18-res-1", name: "Résultat U18", type: "Résultat", teamData: teamByName.U18, thumbnail: "https://placehold.co/1080x1080/04346D/F5F3EB?text=Resultat+U18" },
    { id: "u18-aff-1", name: "Affiche U18", type: "Affiche", teamData: teamByName.U18, thumbnail: "https://placehold.co/1080x1080/0F9B58/F5F3EB?text=Affiche+U18" },
    { id: "u18-class-1", name: "Classement U18", type: "Classement", teamData: teamByName.U18, thumbnail: "https://placehold.co/1080x1080/D4640A/F5F3EB?text=Classement+U18" },
  ],
};

export const defaultGenerationForm: GenerationForm = {
  team: "Équipe 1",
  opponent: "AS Millery",
  scoreHome: "3",
  scoreAway: "1",
  date: "2026-03-08",
  time: "15:00",
  location: "Stade Léo Lagrange",
  competition: "Division Régionale 1",
  network: "both",
};
