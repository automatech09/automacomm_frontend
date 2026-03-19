import type { Template } from "@/types/template";
import type { NetworkType } from "@/types/publication";
import { teamByName, type TeamData } from "@/app/dashboard/generation/data";
import { initialTemplates } from "@/lib/mockupdata/templates/data";

export interface ScheduledItem {
  id: string;
  teamData: TeamData;
  date: Date;
  template: Template;
  platforms: NetworkType;
  status: "upcoming" | "published" | "error";
  ruleId?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    template: Template;
    teamData: TeamData;
    platforms: NetworkType;
    status: "upcoming" | "published" | "error";
  };
}

// ─── Références aux templates existants ──────────────────
const T_RESULTAT_EQ1  = initialTemplates.find((t) => t.id === 1)!; // Match day · Résultat · Équipe 1
const T_AFFICHE_EQ1   = initialTemplates.find((t) => t.id === 4)!; // Affiche · Équipe 1
const T_CLASSEMENT_EQ1 = initialTemplates.find((t) => t.id === 5)!; // Classement · Équipe 1
const T_RESULTAT_U18  = initialTemplates.find((t) => t.id === 8)!; // Classement · U18

function dt(y: number, mo: number, d: number, h: number, mi: number): Date {
  return new Date(y, mo - 1, d, h, mi);
}

// Today: March 18, 2026
export const scheduledItems: ScheduledItem[] = [
  // ─── Historique ──────────────────────────────────────
  { id: "h1", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 9, 9, 0), template: T_RESULTAT_EQ1,   platforms: "both",      status: "published", ruleId: "1" },
  { id: "h2", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 9, 10, 0),template: T_CLASSEMENT_EQ1, platforms: "instagram", status: "published", ruleId: "3" },
  { id: "h3", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 13, 18, 0), template: T_AFFICHE_EQ1,    platforms: "both",      status: "published", ruleId: "2" },
  { id: "h4", teamData: teamByName["U18"],      date: dt(2026, 3, 15, 20, 0), template: T_RESULTAT_U18,   platforms: "instagram", status: "error",     ruleId: "5" },
  { id: "h5", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 16, 18, 0), template: T_AFFICHE_EQ1,    platforms: "both",      status: "published", ruleId: "2" },

  // ─── À venir ─────────────────────────────────────────
  { id: "u1", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 22,9, 0), template: T_AFFICHE_EQ1,    platforms: "both",      status: "upcoming",  ruleId: "2" },
  { id: "u2", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 22, 9, 0),template: T_RESULTAT_EQ1,   platforms: "both",      status: "upcoming",  ruleId: "1" },
  { id: "u3", teamData: teamByName["U18"],      date: dt(2026, 3, 22, 9, 0), template: T_RESULTAT_U18,   platforms: "instagram", status: "upcoming",  ruleId: "5" },
  { id: "u4", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 22, 9, 0), template: T_CLASSEMENT_EQ1, platforms: "instagram", status: "upcoming",  ruleId: "3" },
  { id: "u5", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 26, 18, 0), template: T_AFFICHE_EQ1,    platforms: "both",      status: "upcoming",  ruleId: "2" },
  { id: "u6", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 29, 9, 0),template: T_RESULTAT_EQ1,   platforms: "both",      status: "upcoming",  ruleId: "1" },
  { id: "u7", teamData: teamByName["U18"],      date: dt(2026, 3, 29, 20, 0), template: T_RESULTAT_U18,   platforms: "instagram", status: "upcoming",  ruleId: "5" },
  { id: "u8", teamData: teamByName["Équipe 1"], date: dt(2026, 3, 30, 10, 0), template: T_CLASSEMENT_EQ1, platforms: "instagram", status: "upcoming",  ruleId: "3" },
  { id: "u9", teamData: teamByName["Équipe 1"], date: dt(2026, 4, 2, 18, 0),template: T_AFFICHE_EQ1,    platforms: "both",      status: "upcoming",  ruleId: "2" },
];

export function toCalendarEvents(items: ScheduledItem[]): CalendarEvent[] {
  return items.map((item) => ({
    id: item.id,
    title: item.template.name,
    start: item.date,
    end: new Date(item.date.getTime() + 15 * 60 * 1000),
    resource: {
      template: item.template,
      teamData: item.teamData,
      platforms: item.platforms,
      status: item.status,
    },
  }));
}
