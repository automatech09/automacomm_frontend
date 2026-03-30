import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AdminTemplate, AdminTemplateInput } from "@/types";

const STORAGE_PATH = path.join(process.cwd(), "data/admin/templates.json");

async function ensureStorage() {
  await mkdir(path.dirname(STORAGE_PATH), { recursive: true });

  try {
    await readFile(STORAGE_PATH, "utf8");
  } catch {
    await writeFile(STORAGE_PATH, "[]\n", "utf8");
  }
}

async function readTemplatesFile(): Promise<AdminTemplate[]> {
  await ensureStorage();

  try {
    const raw = await readFile(STORAGE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AdminTemplate[]) : [];
  } catch {
    return [];
  }
}

async function writeTemplatesFile(templates: AdminTemplate[]) {
  await ensureStorage();
  await writeFile(STORAGE_PATH, `${JSON.stringify(templates, null, 2)}\n`, "utf8");
}

function sortByUpdatedAt(templates: AdminTemplate[]) {
  return [...templates].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function listAdminTemplates() {
  const templates = await readTemplatesFile();
  return sortByUpdatedAt(templates);
}

export async function getAdminTemplate(id: string) {
  const templates = await readTemplatesFile();
  return templates.find((template) => template.id === id) ?? null;
}

export async function saveAdminTemplate(input: AdminTemplateInput) {
  const templates = await readTemplatesFile();
  const now = new Date().toISOString();
  const existing = input.id ? templates.find((template) => template.id === input.id) : null;

  const template: AdminTemplate = {
    id: existing?.id ?? crypto.randomUUID(),
    name: input.name.trim(),
    visualType: input.visualType,
    format: input.format,
    teamId: input.teamId,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    backgroundColor: input.backgroundColor,
    objectCount: input.objectCount,
    preview: input.preview ?? null,
    canvas: input.canvas,
  };

  const nextTemplates = sortByUpdatedAt([
    template,
    ...templates.filter((item) => item.id !== template.id),
  ]);

  await writeTemplatesFile(nextTemplates);
  return template;
}

export async function deleteAdminTemplate(id: string) {
  const templates = await readTemplatesFile();
  const nextTemplates = templates.filter((template) => template.id !== id);
  const deleted = nextTemplates.length !== templates.length;

  if (deleted) {
    await writeTemplatesFile(sortByUpdatedAt(nextTemplates));
  }

  return deleted;
}
