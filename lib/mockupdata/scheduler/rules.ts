import type { Publication } from "@/types/scheduling";
import type { Template } from "@/types";
import { initialTeams } from "@/lib/mockupdata/teams/data";

const [eq1, reserve, u18] = initialTeams;

export function buildInitialPublications(templates: Template[]): Publication[] {
  const T = (id: number) => templates.find((t) => t.id === id)!;

  const T_RESULTAT_EQ1     = T(1);
  const T_AFFICHE_EQ1      = T(4);
  const T_CLASSEMENT_EQ1   = T(5);
  const T_RESULTAT_RESERVE = T(7);
  const T_CLASSEMENT_U18   = T(8);

  return [
    {
      id: "1",
      templates: [T_RESULTAT_EQ1],
      teams: [eq1],
      schedule: { moment: "J+1 (lendemain)", time: "09:00" },
      description: {
        core: "Belle victoire de {result_text} face à {opponent} ! Score final : {score}",
      },
      active: true,
    },
    {
      id: "2",
      templates: [T_AFFICHE_EQ1],
      teams: [eq1],
      schedule: { moment: "J-2", time: "18:00" },
      active: true,
    },
    {
      id: "3",
      templates: [T_CLASSEMENT_EQ1, T_RESULTAT_RESERVE],
      teams: [eq1, reserve],
      schedule: { moment: "Lundi", time: "10:00" },
      description: {
        header: "Résultats du week-end 🔥",
        core: "{result_text} de {team} face à {opponent}\nScore : {score}",
        footer: "Bravo à toutes les équipes 👏",
      },
      active: true,
    },
    {
      id: "4",
      templates: [T_AFFICHE_EQ1],
      teams: [eq1],
      schedule: { moment: "J-1 (veille du match)", time: "17:00" },
      active: false,
    },
    {
      id: "5",
      templates: [T_CLASSEMENT_U18],
      teams: [u18],
      schedule: { moment: "Dimanche", time: "20:00" },
      active: true,
    },
    {
      id: "6",
      templates: [T_RESULTAT_EQ1],
      teams: [eq1, reserve, u18],
      schedule: { moment: "Lundi", time: "08:00" },
      active: true,
    },
  ];
}
