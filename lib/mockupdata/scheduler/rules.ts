import type { Publication } from "@/types/scheduling";
import { initialTeams } from "@/lib/mockupdata/teams/data";
import { initialTemplates } from "@/lib/mockupdata/templates/data";

const [eq1, reserve, u18] = initialTeams;

const T_RESULTAT_EQ1     = initialTemplates.find((t) => t.id === 1)!;
const T_AFFICHE_EQ1      = initialTemplates.find((t) => t.id === 4)!;
const T_CLASSEMENT_EQ1   = initialTemplates.find((t) => t.id === 5)!;
const T_RESULTAT_RESERVE = initialTemplates.find((t) => t.id === 7)!;
const T_CLASSEMENT_U18   = initialTemplates.find((t) => t.id === 8)!;

export const initialPublications: Publication[] = [
  {
    id: "1",
    templates: [T_RESULTAT_EQ1],
    teams: [eq1],
    platforms: "both",
    schedule: { moment: "J+1 (lendemain)", time: "09:00" },
    description: {
      core: "Belle victoire de {team} face à {opponent} ! Score final : {score}",
    },
    active: true,
  },
  {
    id: "2",
    templates: [T_AFFICHE_EQ1],
    teams: [eq1],
    platforms: "both",
    schedule: { moment: "J-2", time: "18:00" },
    active: true,
  },
  {
    id: "3",
    templates: [T_CLASSEMENT_EQ1, T_RESULTAT_RESERVE],
    teams: [eq1, reserve],
    platforms: "instagram",
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
    platforms: "instagram",
    schedule: { moment: "J-1 (veille du match)", time: "17:00" },
    active: false,
  },
  {
    id: "5",
    templates: [T_CLASSEMENT_U18],
    teams: [u18],
    platforms: "instagram",
    schedule: { moment: "Dimanche", time: "20:00" },
    active: true,
  },
  {
    id: "6",
    templates: [T_RESULTAT_EQ1],
    teams: [eq1, reserve, u18],
    platforms: "both",
    schedule: { moment: "Lundi", time: "08:00" },
    active: true,
  },
];
