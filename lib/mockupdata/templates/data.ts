import type { Template } from "@/types";
import { initialTeams } from "../teams/data";

const eq1 = initialTeams[0];
const reserve = initialTeams[1];
const u18 = initialTeams[2];

export const initialTemplates: Template[] = [
  { id: 1, visualType: "Résultat", name: "Résumé Gruissan", format: "Post", team: eq1, lastUsed: "2 mars 2026", thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/gruissan", urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg'},
  { id: 2, visualType: "Résultat", name: "Story FCTT", format: "Story", team: eq1, thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/fctt" , urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg'},
  { id: 3, visualType: "Affiche", name: "Annonce Tarascon VOI", format: "Story", team: reserve, lastUsed: "28 fév. 2026", thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/tarasvoi" , urlArrierePlan:'https://images.unsplash.com/photo-1732511821776-14d2274e5b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'},
  { id: 4, visualType: "Affiche", name: "Affiche Tarascon VOI", format: "Story", team: eq1,  thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/tarasvoi", urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg' },
  { id: 5, visualType: "Classement", name: "Classement J8", format: "Post", team: eq1, thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/pts-g-n-p-classement-j8", urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg' },
  { id: 6, visualType: "Affiche", name: "Affiche Sigean", format: "Post", team: reserve, thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/sigean", urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg' },
  { id: 7, visualType: "Résultat", name: "Score SCA", format: "Post", team: reserve, lastUsed: "1 mars 2026", thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/sca", urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg' },
  { id: 8, visualType: "Classement", name: "Classement ESL", format: "Story", team: u18, thumbnail: "https://wssyotafegeacalvtdqt.supabase.co/storage/v1/object/public/dev/esl" , urlArrierePlan:'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg'},
];
