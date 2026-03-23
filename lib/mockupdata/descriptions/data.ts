import { VisualType } from "@/types";

export interface DescriptionMock {
  visualType: VisualType;
  label: string;

  availableVariables: string[];

  example: {
    header?: string;
    core: string;
    footer?: string;
  };
}

export const DESCRIPTION_MOCKS: DescriptionMock[] = [
  {
    visualType: "Résultat",
    label: "Résultat",
    availableVariables: [
      "{team}",
      "{opponent}",
      "{score}",
      "{result_text}",
      "{result_emoji}"
    ],
    example: {
      header: "Résultats du week-end 🔥",
      core: "{result_text} {result_emoji} de {team} face à {opponent}\nScore : {score}",
      footer: "Bravo à toutes les équipes 👏"
    }
  },
  {
    visualType: "Affiche",
    label: "Affiche",
    availableVariables: [
      "{team}",
      "{opponent}",
      "{date}",
      "{competition}",
      "{time}"
    ],
    example: {
      header: "Prochain match 📣",
      core: "{team} vs {opponent}\n{competition}\n{date} à {time}",
      footer: "On vous attend nombreux 🔥"
    }
  },
  {
    visualType: "Classement",
    label: "Classement",
    availableVariables: [
      "{team}",
      "{position}",
      "{points}",
      "{played}",
      "{won}",
      "{lost}"
    ],
    example: {
      header: "Classement 📊",
      core: "{team} est {position} avec {points} pts\nMatchs : {played} | Victoires : {won} | Défaites : {lost}",
      footer: "Continuez à nous soutenir 💪"
    }
  }
];
