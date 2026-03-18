import type { Template, VisualType } from "@/types/template";
import type { NetworkType } from "@/types/publication";
import type { RuleFormat } from "@/types/scheduling";
import { TeamData } from "@/app/dashboard/generation/data";

export interface ScheduledItem {
  id: string;
  teamData : TeamData
  date: Date;
  timeStr: string;
  template : Template
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
    thumbnail: string;
    team: string;
    teamColor: string;
    visualType: VisualType;
    platforms: NetworkType;
    status: "upcoming" | "published" | "error";
  };
}

const THUMBS = {
  resultat: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/gruissan",
  affiche: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/tarasvoi",
  classement: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/pts-g-n-p-classement-j8",
  u18: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/esl",
};

function dt(y: number, mo: number, d: number, h: number, mi: number): Date {
  return new Date(y, mo - 1, d, h, mi);
}

// Today: March 18, 2026
// Matches: Équipe 1 on March 21 & 28, Réserve on March 21 & 28, U18 on March 22 & 29
export const scheduledItems: ScheduledItem[] = [
  // ─── Historique ──────────────────────────────────────
  {
    id: "h1", visualType: "Résultat", visualName: "Match day",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 9, 9, 0), timeStr: "09:00",
    platforms: "both", status: "published", thumbnail: THUMBS.resultat, format: "P", ruleId: "1",
  },
  {
    id: "h2", visualType: "Classement", visualName: "Classement J18",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 9, 9, 0), timeStr: "10:00",
    platforms: "instagram", status: "published", thumbnail: THUMBS.classement, format: "P", ruleId: "3",
  },
  {
    id: "h3", visualType: "Affiche", visualName: "Affiche match J19",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 13, 18, 0), timeStr: "18:00",
    platforms: "both", status: "published", thumbnail: THUMBS.affiche, format: "P", ruleId: "2",
  },
  {
    id: "h4", visualType: "Résultat", visualName: "Résultat U18",
    team: "U18", teamColor: "#0F9B58",
    date: dt(2026, 3, 15, 20, 0), timeStr: "20:00",
    platforms: "instagram", status: "error", thumbnail: THUMBS.u18, format: "P", ruleId: "5",
  },
  {
    id: "h5", visualType: "Affiche", visualName: "Affiche match J20",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 16, 18, 0), timeStr: "18:00",
    platforms: "both", status: "published", thumbnail: THUMBS.affiche, format: "P", ruleId: "2",
  },

  // ─── À venir ─────────────────────────────────────────
  {
    id: "u1", visualType: "Affiche", visualName: "Affiche match J20",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 19, 18, 0), timeStr: "18:00",
    platforms: "both", status: "upcoming", thumbnail: THUMBS.affiche, format: "P", ruleId: "2",
  },
  {
    id: "u2", visualType: "Résultat", visualName: "Match day",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 22, 9, 0), timeStr: "09:00",
    platforms: "both", status: "upcoming", thumbnail: THUMBS.resultat, format: "P", ruleId: "1",
  },
  {
    id: "u3", visualType: "Résultat", visualName: "Résultat U18",
    team: "U18", teamColor: "#0F9B58",
    date: dt(2026, 3, 22, 9, 0), timeStr: "20:00",
    platforms: "instagram", status: "upcoming", thumbnail: THUMBS.u18, format: "P", ruleId: "5",
  },
  {
    id: "u4", visualType: "Classement", visualName: "Classement J20",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 23, 10, 0), timeStr: "10:00",
    platforms: "instagram", status: "upcoming", thumbnail: THUMBS.classement, format: "P", ruleId: "3",
  },
  {
    id: "u5", visualType: "Affiche", visualName: "Affiche match J21",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 26, 18, 0), timeStr: "18:00",
    platforms: "both", status: "upcoming", thumbnail: THUMBS.affiche, format: "P", ruleId: "2",
  },
  {
    id: "u6", visualType: "Résultat", visualName: "Match day",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 29, 9, 0), timeStr: "09:00",
    platforms: "both", status: "upcoming", thumbnail: THUMBS.resultat, format: "P", ruleId: "1",
  },
  {
    id: "u7", visualType: "Résultat", visualName: "Résultat U18",
    team: "U18", teamColor: "#0F9B58",
    date: dt(2026, 3, 29, 20, 0), timeStr: "20:00",
    platforms: "instagram", status: "upcoming", thumbnail: THUMBS.u18, format: "P", ruleId: "5",
  },
  {
    id: "u8", visualType: "Classement", visualName: "Classement J21",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 3, 30, 10, 0), timeStr: "10:00",
    platforms: "instagram", status: "upcoming", thumbnail: THUMBS.classement, format: "P", ruleId: "3",
  },
  {
    id: "u9", visualType: "Affiche", visualName: "Affiche match J22",
    team: "Équipe 1", teamColor: "#FF6B35",
    date: dt(2026, 4, 2, 18, 0), timeStr: "18:00",
    platforms: "both", status: "upcoming", thumbnail: THUMBS.affiche, format: "P", ruleId: "2",
  },
];

export function toCalendarEvents(items: ScheduledItem[]): CalendarEvent[] {
  return items.map((item) => ({
    id: item.id,
    title: item.visualName,
    start: item.date,
    end: new Date(item.date.getTime() + 60 * 60 * 1000),
    resource: {
      thumbnail: item.thumbnail,
      team: item.team,
      teamColor: item.teamColor,
      visualType: item.visualType,
      platforms: item.platforms,
      status: item.status,
    },
  }));
}
