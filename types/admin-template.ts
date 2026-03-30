import type { TemplateFormat, VisualType } from "./template";

export interface AdminTemplate {
  id: string;
  name: string;
  visualType: VisualType;
  format: TemplateFormat;
  teamId: string | null;
  createdAt: string;
  updatedAt: string;
  backgroundColor: string;
  objectCount: number;
  preview: string | null;
  canvas: Record<string, unknown>;
}

export interface AdminTemplateInput {
  id?: string;
  name: string;
  visualType: VisualType;
  format: TemplateFormat;
  teamId: string | null;
  backgroundColor: string;
  objectCount: number;
  preview?: string | null;
  canvas: Record<string, unknown>;
}
