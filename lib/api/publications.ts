import { buildInitialPublications } from "@/lib/mockupdata/scheduler/rules";
import { getTemplates } from "@/lib/api/templates";
import type { Publication } from "@/types/scheduling";

/**
 * TODO: remplacer par un appel API → fetch("/api/publications")
 */
export async function getPublications(): Promise<Publication[]> {
  const templates = await getTemplates();
  return buildInitialPublications(templates);
}
