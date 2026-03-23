import { initialTemplates } from "@/lib/mockupdata/templates/data";
import { ScheduledPublication } from "@/types";


// ─── Références aux templates existants ──────────────────
const T_RESULTAT_EQ1     = initialTemplates.find((t) => t.id === 1)!;
const T_AFFICHE_EQ1      = initialTemplates.find((t) => t.id === 4)!;
const T_CLASSEMENT_EQ1   = initialTemplates.find((t) => t.id === 5)!;
const T_RESULTAT_U18     = initialTemplates.find((t) => t.id === 8)!;
const T_RESULTAT_RESERVE = initialTemplates.find((t) => t.id === 7)!;

function dt(y: number, mo: number, d: number, h: number, mi: number): Date {
  return new Date(y, mo - 1, d, h, mi);
}

// Today: March 19, 2026
export const scheduledItems: ScheduledPublication[] = [
  // ─── Historique ──────────────────────────────────────
  { id: "h1", date: dt(2026, 3, 9, 9, 0),   templates: [T_RESULTAT_EQ1],  status: "published", ruleId: "1" },
  { id: "h2", date: dt(2026, 3, 9, 10, 0),  templates: [T_CLASSEMENT_EQ1], status: "published", ruleId: "3" },
  { id: "h3", date: dt(2026, 3, 13, 18, 0), templates: [T_AFFICHE_EQ1],  status: "published", ruleId: "2" },
  { id: "h4", date: dt(2026, 3, 15, 20, 0), templates: [T_RESULTAT_U18], status: "error",     ruleId: "5" },
  { id: "h5", date: dt(2026, 3, 16, 18, 0), templates: [T_AFFICHE_EQ1],    status: "published", ruleId: "2" },

  // ─── À venir ─────────────────────────────────────────
  { id: "u1", date: dt(2026, 3, 22, 9, 0),   templates: [T_AFFICHE_EQ1],    status: "upcoming", ruleId: "2" },
  { id: "u2", date: dt(2026, 3, 22, 9, 20),  templates: [T_RESULTAT_RESERVE],  status: "upcoming", ruleId: "1" },
  { id: "u3", date: dt(2026, 3, 22, 9, 15),  templates: [T_RESULTAT_U18],  status: "upcoming", ruleId: "5" },
  { id: "u4", date: dt(2026, 3, 22, 9, 0),   templates: [T_CLASSEMENT_EQ1],  status: "upcoming", ruleId: "3" },
  { id: "u5", date: dt(2026, 3, 18, 18, 0),  templates: [T_AFFICHE_EQ1],       status: "upcoming", ruleId: "2" },
  { id: "u6", date: dt(2026, 3, 19, 9, 0),   templates: [T_RESULTAT_EQ1],      status: "upcoming", ruleId: "1" },
  { id: "u7", date: dt(2026, 3, 20, 20, 0),  templates: [T_RESULTAT_U18],   status: "upcoming", ruleId: "5" },
  { id: "u8", date: dt(2026, 3, 19, 10, 0),  templates: [T_CLASSEMENT_EQ1],status: "upcoming", ruleId: "3" },
  { id: "u9", date: dt(2026, 4, 2, 18, 0),   templates: [T_AFFICHE_EQ1],  status: "upcoming", ruleId: "2" },

  // ─── Carousels (multi-templates) ─────────────────────
  { id: "c1", date: dt(2026, 3, 22, 11, 0),  templates: [T_RESULTAT_EQ1, T_RESULTAT_U18], status: "upcoming" },
  { id: "c2", date: dt(2026, 3, 26, 9, 0),   templates: [T_AFFICHE_EQ1, T_RESULTAT_RESERVE],status: "upcoming", ruleId: "2" },
  { id: "c3", date: dt(2026, 4, 2, 10, 0),   templates: [T_RESULTAT_EQ1, T_RESULTAT_RESERVE, T_RESULTAT_U18], status: "upcoming" },
];

