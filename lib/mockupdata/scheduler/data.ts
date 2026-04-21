import type { ScheduledPublication, Template } from "@/types";

function dt(y: number, mo: number, d: number, h: number, mi: number): Date {
  return new Date(y, mo - 1, d, h, mi);
}

// Today: April 21, 2026
export function buildScheduledItems(templates: Template[]): ScheduledPublication[] {
  const T = (id: number) => templates.find((t) => t.id === id)!;

  const T_RESULTAT_EQ1     = T(1);
  const T_AFFICHE_EQ1      = T(4);
  const T_CLASSEMENT_EQ1   = T(5);
  const T_RESULTAT_U18     = T(8);
  const T_RESULTAT_RESERVE = T(7);

  return [
    // ─── Historique ──────────────────────────────────────
    { id: "h1", date: dt(2026, 4, 14, 9, 0),  templates: [T_RESULTAT_EQ1],     status: "published", ruleId: "1", result: ["https://placehold.co/700x700/0A5EBF/FFFFFF?text=Résultat+EQ1"] },
    { id: "h2", date: dt(2026, 4, 14, 10, 0), templates: [T_CLASSEMENT_EQ1],   status: "published", ruleId: "3", result: ["https://placehold.co/700x700/D4640A/FFFFFF?text=Classement"] },
    { id: "h3", date: dt(2026, 4, 16, 18, 0), templates: [T_AFFICHE_EQ1],      status: "published", ruleId: "2", result: ["https://placehold.co/700x700/7A0FB0/FFFFFF?text=Affiche+Match"] },
    { id: "h4", date: dt(2026, 4, 17, 9, 0),  templates: [T_RESULTAT_U18],     status: "error",     ruleId: "5" },
    { id: "h5", date: dt(2026, 4, 18, 9, 0),  templates: [T_CLASSEMENT_EQ1],   status: "published", ruleId: "3", result: ["https://placehold.co/700x700/D4640A/FFFFFF?text=Classement"] },
    { id: "h6", date: dt(2026, 4, 19, 18, 0), templates: [T_AFFICHE_EQ1],      status: "published", ruleId: "2", result: ["https://placehold.co/700x700/7A0FB0/FFFFFF?text=Affiche+Match"] },
    { id: "h7", date: dt(2026, 4, 20, 9, 0),  templates: [T_RESULTAT_EQ1],     status: "published", ruleId: "1", result: ["https://placehold.co/700x700/0A5EBF/FFFFFF?text=Résultat+EQ1"] },
    { id: "h8", date: dt(2026, 4, 20, 10, 0), templates: [T_RESULTAT_RESERVE], status: "published", ruleId: "4", result: ["https://placehold.co/700x700/0F9B58/FFFFFF?text=Résultat+Réserve"] },

    // ─── À venir (22 avril → 6 mai) ─────────────────────
    { id: "u1",  date: dt(2026, 4, 22, 18, 0), templates: [T_AFFICHE_EQ1],                                          status: "upcoming", ruleId: "2" },
    { id: "u2",  date: dt(2026, 4, 23, 9, 0),  templates: [T_CLASSEMENT_EQ1],                                       status: "upcoming", ruleId: "3" },
    { id: "u3",  date: dt(2026, 4, 24, 18, 0), templates: [T_AFFICHE_EQ1, T_RESULTAT_RESERVE, T_RESULTAT_EQ1],      status: "upcoming", ruleId: "2" },
    { id: "u4",  date: dt(2026, 4, 25, 9, 0),  templates: [T_RESULTAT_U18],                                         status: "upcoming", ruleId: "5" },
    { id: "u5",  date: dt(2026, 4, 25, 9, 0),  templates: [T_RESULTAT_RESERVE],                                     status: "upcoming", ruleId: "4" },
    { id: "u6",  date: dt(2026, 4, 25, 9, 0),  templates: [T_RESULTAT_EQ1],                                         status: "upcoming", ruleId: "1" },
    { id: "u7",  date: dt(2026, 4, 28, 9, 0),  templates: [T_CLASSEMENT_EQ1],                                       status: "upcoming", ruleId: "3" },
    { id: "u8",  date: dt(2026, 5, 1, 18, 0),  templates: [T_AFFICHE_EQ1],                                          status: "upcoming", ruleId: "2" },
    { id: "u9",  date: dt(2026, 5, 3, 20, 0),  templates: [T_RESULTAT_EQ1],                                         status: "upcoming", ruleId: "1" },
    { id: "u10", date: dt(2026, 5, 4, 9, 0),   templates: [T_CLASSEMENT_EQ1],                                       status: "upcoming", ruleId: "3" },
    { id: "u11", date: dt(2026, 5, 6, 18, 0),  templates: [T_AFFICHE_EQ1],                                          status: "upcoming", ruleId: "2" },

    // ─── Carousels (multi-templates) ─────────────────────
    { id: "c1", date: dt(2026, 4, 23, 10, 0), templates: [T_RESULTAT_EQ1, T_RESULTAT_U18],                       status: "upcoming" },
    { id: "c2", date: dt(2026, 4, 28, 10, 0), templates: [T_AFFICHE_EQ1, T_RESULTAT_RESERVE],                    status: "upcoming", ruleId: "2" },
    { id: "c3", date: dt(2026, 5, 5, 10, 0),  templates: [T_RESULTAT_EQ1, T_RESULTAT_RESERVE, T_RESULTAT_U18],   status: "upcoming" },
  ];
}
