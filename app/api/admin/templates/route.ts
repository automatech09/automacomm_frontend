import { NextResponse } from "next/server";
import { listAdminTemplates, saveAdminTemplate } from "@/lib/admin/template-store";
import type { AdminTemplateInput, TemplateFormat, VisualType } from "@/types";

export const dynamic = "force-dynamic";

const VISUAL_TYPES = new Set<VisualType>(["Résultat", "Classement", "Affiche", "Score en direct"]);
const FORMATS = new Set<TemplateFormat>(["Post", "Story"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseTemplateInput(body: unknown): AdminTemplateInput | null {
  if (!isRecord(body)) {
    return null;
  }

  const { id, name, visualType, format, teamId, backgroundColor, objectCount, preview, canvas } = body;

  if (typeof name !== "string" || !name.trim()) {
    return null;
  }

  if (typeof visualType !== "string" || !VISUAL_TYPES.has(visualType as VisualType)) {
    return null;
  }

  if (typeof format !== "string" || !FORMATS.has(format as TemplateFormat)) {
    return null;
  }

  if (typeof backgroundColor !== "string" || !backgroundColor.trim()) {
    return null;
  }

  if (typeof objectCount !== "number" || Number.isNaN(objectCount)) {
    return null;
  }

  if (!isRecord(canvas)) {
    return null;
  }

  if (teamId !== null && typeof teamId !== "string" && typeof teamId !== "undefined") {
    return null;
  }

  if (preview !== null && typeof preview !== "string" && typeof preview !== "undefined") {
    return null;
  }

  if (id !== undefined && typeof id !== "string") {
    return null;
  }

  return {
    id,
    name,
    visualType: visualType as VisualType,
    format: format as TemplateFormat,
    teamId: typeof teamId === "string" ? teamId : null,
    backgroundColor,
    objectCount,
    preview: typeof preview === "string" ? preview : null,
    canvas,
  };
}

export async function GET() {
  const templates = await listAdminTemplates();
  return NextResponse.json({ templates });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = parseTemplateInput(body);

  if (!input) {
    return NextResponse.json({ error: "Payload template invalide." }, { status: 400 });
  }

  const template = await saveAdminTemplate(input);
  return NextResponse.json({ template });
}
