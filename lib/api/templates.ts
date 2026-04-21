import { initialTemplates } from "@/lib/mockupdata/templates/data";
import type { Template } from "@/types";

/**
 * TODO: remplacer par un appel API → fetch("/api/templates")
 */
export async function getTemplates(): Promise<Template[]> {
  return initialTemplates;
}
