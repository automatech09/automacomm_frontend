import type { Template } from "@/types/template";
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
  schedule: PublicationSchedule;
  description?: PublicationDescription;
  active: boolean;
}

export interface ScheduledPublication {
  id: string;
  date: Date;
  templates: Template[];
  result?: string [] | null;
  status: "upcoming" | "published" | "error";
  ruleId?: string;
}
