import type { VisualType } from "./template";

export type RuleFormat = "P" | "S";

export interface TeamTag {
  label: string;
  borderColor: string;
}

export interface ScheduleRule {
  id: string;
  visualType: VisualType;
  format: RuleFormat;
  teams: TeamTag[];
  active: boolean;
  moment: string;
  time: string;
  description?: string;
  isCustomDescription?: boolean;
  templates: string[];
  isCarousel?: boolean;
}
