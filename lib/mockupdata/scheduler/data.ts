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

// Today: March 23, 2026
export const scheduledItems: ScheduledPublication[] = [
  // ─── Historique ──────────────────────────────────────
  { id: "h1", date: dt(2026, 3, 10, 9, 0),  templates: [T_RESULTAT_EQ1],     status: "published", ruleId: "1", result: ["https://placehold.co/700x700/0A5EBF/FFFFFF?text=Résultat+EQ1"] },
  { id: "h2", date: dt(2026, 3, 10, 10, 0), templates: [T_CLASSEMENT_EQ1],   status: "published", ruleId: "3", result: ["https://placehold.co/700x700/D4640A/FFFFFF?text=Classement"] },
  { id: "h3", date: dt(2026, 3, 14, 18, 0), templates: [T_AFFICHE_EQ1],      status: "published", ruleId: "2", result: ["https://placehold.co/700x700/7A0FB0/FFFFFF?text=Affiche+Match"] },
  { id: "h4", date: dt(2026, 3, 16, 9, 0),  templates: [T_RESULTAT_U18],     status: "error",     ruleId: "5" },
  { id: "h5", date: dt(2026, 3, 17, 9, 0),  templates: [T_CLASSEMENT_EQ1],   status: "published", ruleId: "3", result: ["https://placehold.co/700x700/D4640A/FFFFFF?text=Classement"] },
  { id: "h6", date: dt(2026, 3, 19, 18, 0), templates: [T_AFFICHE_EQ1],      status: "published", ruleId: "2", result: ["https://placehold.co/700x700/7A0FB0/FFFFFF?text=Affiche+Match"] },
  { id: "h7", date: dt(2026, 3, 21, 9, 0),  templates: [T_RESULTAT_EQ1],     status: "published", ruleId: "1", result: ["https://placehold.co/700x700/0A5EBF/FFFFFF?text=Résultat+EQ1"] },
  { id: "h8", date: dt(2026, 3, 22, 10, 0), templates: [T_RESULTAT_RESERVE], status: "published", ruleId: "4", result: ["https://placehold.co/700x700/0F9B58/FFFFFF?text=Résultat+Réserve"] },

  // ─── À venir (23 mars → 7 avril) ─────────────────────
  { id: "u1", date: dt(2026, 3, 23, 18, 0), templates: [T_AFFICHE_EQ1],      status: "upcoming", ruleId: "2" },
  { id: "u2", date: dt(2026, 3, 24, 9, 0),  templates: [T_CLASSEMENT_EQ1],   status: "upcoming", ruleId: "3" },
  { id: "u3", date: dt(2026, 3, 25, 18, 0), templates: [T_AFFICHE_EQ1],      status: "upcoming", ruleId: "2" },
  { id: "u4", date: dt(2026, 3, 26, 9, 0),  templates: [T_RESULTAT_U18],     status: "upcoming", ruleId: "5" },
  { id: "u5", date: dt(2026, 3, 26, 9, 0),  templates: [T_RESULTAT_RESERVE], status: "upcoming", ruleId: "4" },
  { id: "u6", date: dt(2026, 3, 26, 9, 0), templates: [T_RESULTAT_EQ1],     status: "upcoming", ruleId: "1" },
  { id: "u7", date: dt(2026, 3, 29, 9, 0),  templates: [T_CLASSEMENT_EQ1],   status: "upcoming", ruleId: "3" },
  { id: "u8", date: dt(2026, 4, 1, 18, 0),  templates: [T_AFFICHE_EQ1],      status: "upcoming", ruleId: "2" },
  { id: "u9", date: dt(2026, 4, 4, 20, 0),  templates: [T_RESULTAT_EQ1],     status: "upcoming", ruleId: "1" },
  { id: "u10", date: dt(2026, 4, 5, 9, 0),  templates: [T_CLASSEMENT_EQ1],   status: "upcoming", ruleId: "3" },
  { id: "u11", date: dt(2026, 4, 7, 18, 0), templates: [T_AFFICHE_EQ1],      status: "upcoming", ruleId: "2" },

  // ─── Carousels (multi-templates) ─────────────────────
  { id: "c1", date: dt(2026, 3, 24, 10, 0), templates: [T_RESULTAT_EQ1, T_RESULTAT_U18],                       status: "upcoming" },
  { id: "c2", date: dt(2026, 3, 29, 10, 0), templates: [T_AFFICHE_EQ1, T_RESULTAT_RESERVE],                    status: "upcoming", ruleId: "2" },
  { id: "c3", date: dt(2026, 4, 5, 10, 0),  templates: [T_RESULTAT_EQ1, T_RESULTAT_RESERVE, T_RESULTAT_U18],   status: "upcoming" },
];

