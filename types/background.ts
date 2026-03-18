import type { Template } from "./template";

/** Un template planifié avec son créneau de publication */
export interface ScheduledBackground {
  template: Template;
  schedule: string;
}

export interface BackgroundItem {
  id: string;
  teamId: string;
  visualType: string;
  schedule: string;
  templateName: string;
  format: string;
  imageUrl: string;
}

export interface UsedBackground {
  id: number;
  imageUrl: string;
  usedDate: string;
}
