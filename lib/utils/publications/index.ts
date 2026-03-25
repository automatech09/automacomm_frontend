import type { ScheduledPublication } from "@/types";
import type { Team } from "@/types";

export function getVisualType(item: ScheduledPublication): string {
  return item.templates[0]?.visualType ?? "Publication";
}

/**
 * Retourne les URLs à afficher pour une publication.
 * Si la publication a été diffusée et a des images résultats → result[]
 * Sinon (upcoming, error, ou pas encore de résultat) → thumbnails des templates
 */
export function getDisplayImages(publication: ScheduledPublication): string[] {
  if (publication.status === "published" && publication.result && publication.result.length > 0) {
    return publication.result;
  }
  return publication.templates.map((t) => t.thumbnail);
}

export function getUniqueTeams(item: ScheduledPublication): Team[] {
  const seen = new Set<string>();
  return item.templates
    .map((t) => t.team)
    .filter((team): team is NonNullable<typeof team> => team !== null && !seen.has(team.id) && !!seen.add(team.id));
}
