export type NetworkType = "instagram" | "facebook" | "both";

export interface GenerationForm {
  teamId: string;
  opponent: string;
  scoreHome: string;
  scoreAway: string;
  date: string;
  time: string;
  location: string;
  competition: string;
  network: NetworkType;
}
