import { NextResponse } from "next/server";
import { deleteAdminTemplate, getAdminTemplate } from "@/lib/admin/template-store";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const template = await getAdminTemplate(id);

  if (!template) {
    return NextResponse.json({ error: "Template introuvable." }, { status: 404 });
  }

  return NextResponse.json({ template });
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const deleted = await deleteAdminTemplate(id);

  if (!deleted) {
    return NextResponse.json({ error: "Template introuvable." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
