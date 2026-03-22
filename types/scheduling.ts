import type { Template } from "@/types/template";
import type { NetworkType } from "./publication";
import type { Team } from "./team";

export interface PublicationDescription {
  header?: string;
  core: string;
  footer?: string;
}

export interface PublicationSchedule {
  moment: string; // "veille_match", "jour_match", etc.
  time: string;   // "18:00"
}

export interface Publication {
  id: string;
  templates: Template[];
  teams: Team[];
  platforms: NetworkType;
  schedule: PublicationSchedule;
  description?: PublicationDescription;
  active: boolean;
}

export interface ScheduledItem {
  id: string;
  date: Date;
  templates: Template[];
  platforms: NetworkType;
  status: "upcoming" | "published" | "error";
  ruleId?: string;
}
