export interface Team {
  id: string;
  name: string;
  league: string;
  color: string;
}

export type PlayerRow = {
  id: string;
  firstName: string;
  lastName: string;
  category: string;
  photo: string | null;
};

export interface TeamFormData {
  name: string;
  league: string;
  color: string;
}

export type TeamName = "Équipe 1" | "Réserve" | "U18";

export interface Player {
  id: string;
  teamId: string;
  firstName: string;
  lastName: string;
  category: string;
}
