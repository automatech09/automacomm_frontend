import type { UsedBackground } from "@/types";

const img2 = "https://images.unsplash.com/photo-1629441376840-af359be6d172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const img3 = "https://images.unsplash.com/photo-1582583642747-45910b2147aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const img1 = "https://images.unsplash.com/photo-1760384702320-a7409c8b4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const img4 = "https://images.unsplash.com/photo-1752673510841-275144e92ed3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const img5 = "https://images.unsplash.com/photo-1556816214-6d16c62fbbf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const img6 = "https://images.unsplash.com/photo-1732511821776-14d2274e5b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export const usedBackgrounds: UsedBackground[] = [
  { id: 1, imageUrl: img2, usedDate: "23 fév. 2026" },
  { id: 2, imageUrl: img6, usedDate: "16 fév. 2026" },
  { id: 3, imageUrl: img3, usedDate: "9 fév. 2026" },
  { id: 4, imageUrl: img1, usedDate: "2 fév. 2026" },
  { id: 5, imageUrl: img4, usedDate: "26 jan. 2026" },
  { id: 6, imageUrl: img5, usedDate: "19 jan. 2026" },
];

export const reserveBackgroundUrls: string[] = [img2, img6];
