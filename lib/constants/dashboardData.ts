import type {
  BackgroundItem,
  ConnectedAccount,
  Player,
  ScheduleRule,
  Team,
  Template,
  VisualType,
} from "@/types";

export const TEAMS: Team[] = [
  {
    id: "team1",
    name: "Équipe 1",
    league: "Division Régionale 1 - Auvergne-Rhône-Alpes",
    color: "#FF6B35",
  },
  {
    id: "reserve",
    name: "Réserve",
    league: "Division Honneur Régionale",
    color: "#7A0FB0",
  },
  {
    id: "u18",
    name: "U18",
    league: "Championnat U18 Régional",
    color: "#0F9B58",
  },
];

export const PLAYERS: Player[] = [
  { id: "p1", teamId: "team1", firstName: "Lucas", lastName: "Martin", category: "Senior" },
  { id: "p2", teamId: "team1", firstName: "Thomas", lastName: "Durand", category: "Senior" },
  { id: "p3", teamId: "reserve", firstName: "Nathan", lastName: "Richard", category: "Senior" },
  { id: "p4", teamId: "u18", firstName: "Enzo", lastName: "Thomas", category: "U18" },
  { id: "p5", teamId: "u18", firstName: "Louis", lastName: "Girard", category: "U18" },
];

const resultPost = "https://placehold.co/1080x1080/04346D/F5F3EB?text=Template+Resultat+Post";
const resultStory = "https://placehold.co/1080x1920/04346D/F5F3EB?text=Template+Resultat+Story";
const posterPost = "https://placehold.co/1080x1080/FF6B35/FFFFFF?text=Template+Affiche+Post";
const rankPost = "https://placehold.co/1080x1080/D4640A/FFFFFF?text=Template+Classement+Post";
const calendarPost = "https://placehold.co/1080x1080/0F9B58/FFFFFF?text=Template+Calendrier+Post";

export const TEMPLATES: Template[] = [
  {
    id: "tpl-1",
    name: "Résultat principal",
    visualType: "Résultat",
    format: "Post",
    teamId: "team1",
    active: true,
    thumbnail: resultPost,
    lastUsed: "2 mars 2026",
  },
  {
    id: "tpl-2",
    name: "Résultat story",
    visualType: "Résultat",
    format: "Story",
    teamId: "team1",
    active: true,
    thumbnail: resultStory,
  },
  {
    id: "tpl-3",
    name: "Affiche match",
    visualType: "Affiche",
    format: "Post",
    teamId: "reserve",
    active: true,
    thumbnail: posterPost,
  },
  {
    id: "tpl-4",
    name: "Classement semaine",
    visualType: "Classement",
    format: "Post",
    teamId: "u18",
    active: false,
    thumbnail: rankPost,
  },
  {
    id: "tpl-5",
    name: "Calendrier hebdo",
    visualType: "Calendrier",
    format: "Post",
    teamId: "team1",
    active: true,
    thumbnail: calendarPost,
  },
];

export const VISUAL_TYPES: VisualType[] = ["Résultat", "Affiche", "Classement", "Calendrier"];

export const MOMENT_OPTIONS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
  "J-2",
  "J-1",
  "Jour J",
  "J+1",
];

export const SCHEDULE_RULES: ScheduleRule[] = [
  {
    id: "rule-1",
    visualType: "Résultat",
    format: "P",
    teams: [{ label: "Équipe 1", borderColor: "#FF6B35" }],
    active: true,
    moment: "J+1",
    time: "09:00",
    description: "Belle victoire de {team} face à {opponent}. Score final: {score}",
    isCustomDescription: true,
    templates: ["Résultat principal"],
  },
  {
    id: "rule-2",
    visualType: "Affiche",
    format: "P",
    teams: [{ label: "Réserve", borderColor: "#7A0FB0" }],
    active: true,
    moment: "J-2",
    time: "18:00",
    templates: ["Affiche match"],
  },
  {
    id: "rule-3",
    visualType: "Classement",
    format: "P",
    teams: [{ label: "U18", borderColor: "#0F9B58" }],
    active: false,
    moment: "Lundi",
    time: "10:00",
    templates: ["Classement semaine"],
  },
];

export const NETWORKS: ConnectedAccount[] = [
  {
    id: "n1",
    network: "instagram",
    accountName: "@fcbeaumont_officiel",
    followers: 1240,
    isActive: true,
    connectedSince: "12 janvier 2026",
  },
  {
    id: "n2",
    network: "facebook",
    accountName: "FC Beaumont - Officiel",
    followers: 3200,
    isActive: false,
    connectedSince: "12 janvier 2026",
  },
];

const bgA = "https://placehold.co/1080x1080/04346D/F5F3EB?text=Background+A";
const bgB = "https://placehold.co/1080x1920/FF6B35/FFFFFF?text=Background+B";
const bgC = "https://placehold.co/1080x1080/0F9B58/FFFFFF?text=Background+C";
const bgD = "https://placehold.co/1080x1080/7A0FB0/FFFFFF?text=Background+D";

export const UPCOMING_BACKGROUNDS: BackgroundItem[] = [
  {
    id: "bg-1",
    teamId: "team1",
    visualType: "Résultat",
    schedule: "J+1 - 09:00",
    templateName: "Résultat principal",
    format: "post",
    imageUrl: bgA,
  },
  {
    id: "bg-2",
    teamId: "reserve",
    visualType: "Affiche",
    schedule: "J-2 - 18:00",
    templateName: "Affiche match",
    format: "story",
    imageUrl: bgB,
  },
  {
    id: "bg-3",
    teamId: "u18",
    visualType: "Classement",
    schedule: "Lundi - 10:00",
    templateName: "Classement semaine",
    format: "post",
    imageUrl: bgC,
  },
];

export const USED_BACKGROUNDS = [
  { id: "used-1", imageUrl: bgD, usedDate: "1 mars 2026" },
  { id: "used-2", imageUrl: bgA, usedDate: "24 février 2026" },
  { id: "used-3", imageUrl: bgC, usedDate: "17 février 2026" },
];

export const RESERVE_BACKGROUNDS = [bgA, bgB, bgC, bgD];
