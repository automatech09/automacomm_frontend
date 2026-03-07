import type { VisualType } from "./template";

export interface BackgroundItem {
  id: string;
  teamId: string;
  visualType: VisualType;
  schedule: string;
  templateName: string;
  format: "post" | "story";
  imageUrl: string;
}
