import { Publication } from "@/types/publication";
import { initialTemplates } from "@/lib/mockupdata/templates/data";

export const upcomingPublications: Publication[] = [
  {
    id: 1,
    date: "Lun 3 mars",
    time: "18:00",
    templates: [initialTemplates[5]],
    network: "instagram",
  },
  {
    id: 2,
    date: "Mar 4 mars",
    time: "09:00",
    templates: [initialTemplates[4], initialTemplates[7]],
    network: "facebook",
  },
  {
    id: 3,
    date: "Mer 5 mars",
    time: "17:00",
    templates: [initialTemplates[2]],
    network: "instagram",
  },
  {
    id: 4,
    date: "Ven 7 mars",
    time: "10:00",
    templates: [initialTemplates[3]],
    network: "both",
  },
  {
    id: 5,
    date: "Sam 8 mars",
    time: "08:00",
    templates: [initialTemplates[0], initialTemplates[1]],
    network: "instagram",
  },
  {
    id: 6,
    date: "Sam 8 mars",
    time: "18:00",
    templates: [initialTemplates[7]],
    network: "facebook",
  },
  {
    id: 7,
    date: "Dim 9 mars",
    time: "20:00",
    templates: [initialTemplates[6]],
    network: "both",
  },
];
  
