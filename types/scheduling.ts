import type { VisualType } from "./template";
import type { NetworkType } from "./publication";

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
  platforms?: NetworkType;
  description?: string;
  isCustomDescription?: boolean;
  templates: string[];
  isCarousel?: boolean;
}
