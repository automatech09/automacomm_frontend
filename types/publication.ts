import type { Template } from "@/types/template";

export type NetworkType = "instagram" | "facebook" | "both";

export type Publication = {
  id: number;
  date: string;
  time: string;
  templates: Template[];
  network: NetworkType;
};
