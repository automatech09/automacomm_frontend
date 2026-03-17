import type { OpponentTeam } from "@/types";

// Données actuelles reçues du backend (nom/logo potentiellement déjà personnalisés)
export const opponentTeams: OpponentTeam[] = [
  { id: 1, name: "Saint-Priest FC", shortName: "St-Priest", logoUrl: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/storage_automacomm/logos_clubs/rugby/65", league: "Régionale 1 AuRA" },
  { id: 2, name: "FC Vénissieux", shortName: "Vénissieux", logoUrl: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/storage_automacomm/logos_clubs/rugby/1000", league: "Régionale 1 AuRA" },
  { id: 3, name: "Décines", shortName: "Décines", logoUrl: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/storage_automacomm/logos_clubs/rugby/553", league: "Régionale 1 AuRA" },
  { id: 4, name: "AS Mions", shortName: "Mions", logoUrl: "https://placehold.co/80x80/1E8449/ffffff?text=ASM", league: "Régionale 1 AuRA" },
  { id: 5, name: "Est Lyonnais", shortName: "Est Lyonnais", logoUrl: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/storage_automacomm/logos_clubs/rugby/553", league: "Régionale 1 AuRA" },
  { id: 6, name: "SC Bron Terraillon", shortName: "Bron", logoUrl: "https://placehold.co/80x80/1A5276/ffffff?text=SCB", league: "Régionale 1 AuRA" },
  { id: 7, name: "Villeurbanne", shortName: "Villeurbanne", logoUrl: "https://placehold.co/80x80/784212/ffffff?text=VFC", league: "Régionale 1 AuRA" },
  { id: 8, name: "AS Caluire et Cuire", shortName: "Caluire", logoUrl: "https://placehold.co/80x80/117A65/ffffff?text=ACC", league: "Régionale 1 AuRA" },
];

// Simule ce que le backend renverrait lors d'une réinitialisation (données de la DB commune)
export const officialTeamData: Record<number, Pick<OpponentTeam, "name" | "shortName" | "logoUrl">> = {
  1: { name: "AS Saint-Priest", shortName: "Saint-Priest", logoUrl: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/storage_automacomm/logos_clubs/rugby/65" },
  2: { name: "FC Vénissieux", shortName: "Vénissieux", logoUrl: "https://placehold.co/80x80/1A5276/ffffff?text=FCV" },
  3: { name: "Olympique Décines Charpieu", shortName: "Décines", logoUrl: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/storage_automacomm/logos_clubs/rugby/1000" },
  4: { name: "AS Mions", shortName: "Mions", logoUrl: "https://placehold.co/80x80/1E8449/ffffff?text=ASM" },
  5: { name: "Entente Est Lyonnais", shortName: "Est Lyonnais", logoUrl: "https://placehold.co/80x80/6C3483/ffffff?text=EEL" },
  6: { name: "SC Bron Terraillon", shortName: "Bron", logoUrl: "https://placehold.co/80x80/1A5276/ffffff?text=SCB" },
  7: { name: "Villeurbanne FC", shortName: "Villeurbanne", logoUrl: "https://placehold.co/80x80/784212/ffffff?text=VFC" },
  8: { name: "AS Caluire et Cuire", shortName: "Caluire", logoUrl: "https://placehold.co/80x80/117A65/ffffff?text=ACC" },
};

// Simule GET /opponent-teams
export async function fetchOpponentTeams(): Promise<OpponentTeam[]> {
  await new Promise((r) => setTimeout(r, 300));
  return opponentTeams;
}

// Simule PATCH /opponent-teams/:id
export async function saveTeamOverrides(id: number, data: Pick<OpponentTeam, "name" | "shortName" | "logoUrl">): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  console.log(`[API] PATCH /opponent-teams/${id}`, data);
}

// Simule DELETE /opponent-teams/:id/overrides → renvoie les données officielles
export async function resetTeamOverrides(id: number): Promise<Pick<OpponentTeam, "name" | "shortName" | "logoUrl">> {
  await new Promise((r) => setTimeout(r, 400));
  console.log(`[API] DELETE /opponent-teams/${id}/overrides`);
  return officialTeamData[id];
}
