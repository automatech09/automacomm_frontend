"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Canvas as FabricCanvas, FabricObject } from "fabric";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  ColorInput,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlignBoxCenterMiddle,
  IconCopy,
  IconDeviceFloppy,
  IconDownload,
  IconFileImport,
  IconLayoutList,
  IconPhotoPlus,
  IconPlus,
  IconRefresh,
  IconSquareRoundedPlus,
  IconTextPlus,
  IconTrash,
  IconTypography,
} from "@tabler/icons-react";
import { initialTeams } from "@/lib/mockupdata/teams/data";
import type { AdminTemplate, TemplateFormat, VisualType } from "@/types";

const VISUAL_TYPES: VisualType[] = ["Résultat", "Classement", "Affiche", "Score en direct"];
const INITIAL_FORMAT: TemplateFormat = "Post";
const INITIAL_BACKGROUND_COLOR = "#FFFFFF";

const FORMAT_DIMENSIONS: Record<TemplateFormat, { width: number; height: number; label: string }> = {
  Post: { width: 720, height: 720, label: "Post · 1080 x 1080" },
  Story: { width: 405, height: 720, label: "Story · 1080 x 1920" },
};

const TEXT_SWATCHES = ["#04346D", "#111827", "#EF4444", "#0F9B58", "#F59E0B", "#7C3AED"];
const BACKGROUND_SWATCHES = ["#FFFFFF", "#F5F3EB", "#E8F0F9", "#FEF3C7", "#DCFCE7", "#FCE7F3"];

type SelectedObjectState = {
  type: string;
  fill: string;
  text: string;
  isText: boolean;
};

type ImportPayload = {
  name?: string;
  visualType?: VisualType;
  format?: TemplateFormat;
  teamId?: string | null;
  backgroundColor?: string;
  canvas?: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sortTemplates(templates: AdminTemplate[]) {
  return [...templates].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

function extractSelectedObject(object: FabricObject | undefined): SelectedObjectState | null {
  if (!object) {
    return null;
  }

  const candidate = object as FabricObject & { text?: string; fill?: unknown; type?: string };
  const type = typeof candidate.type === "string" ? candidate.type : "object";
  const fill = typeof candidate.fill === "string" ? candidate.fill : "#111827";
  const text = typeof candidate.text === "string" ? candidate.text : "";
  const isText = type === "textbox" || type === "text" || type === "i-text";

  return { type, fill, text, isText };
}

export function AdminTemplateStudio() {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);

  const [templates, setTemplates] = useState<AdminTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [visualType, setVisualType] = useState<VisualType>("Résultat");
  const [format, setFormat] = useState<TemplateFormat>(INITIAL_FORMAT);
  const [teamId, setTeamId] = useState<string>(initialTeams[0]?.id ?? "");
  const [backgroundColor, setBackgroundColor] = useState(INITIAL_BACKGROUND_COLOR);
  const [selectedObject, setSelectedObject] = useState<SelectedObjectState | null>(null);

  const teamOptions = initialTeams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  const syncCanvasSelection = () => {
    const canvas = fabricRef.current;
    setSelectedObject(extractSelectedObject(canvas?.getActiveObject()));
  };

  const applyCanvasFrame = (nextFormat: TemplateFormat, nextBackgroundColor: string) => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return;
    }

    const dimensions = FORMAT_DIMENSIONS[nextFormat];
    canvas.setDimensions({ width: dimensions.width, height: dimensions.height });
    canvas.backgroundColor = nextBackgroundColor;
    canvas.requestRenderAll();
  };

  const loadTemplates = async () => {
    setTemplatesLoading(true);

    try {
      const response = await fetch("/api/admin/templates", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Impossible de charger les templates.");
      }

      const data = (await response.json()) as { templates: AdminTemplate[] };
      setTemplates(sortTemplates(data.templates));
    } catch (error) {
      console.error(error);
      notifications.show({ color: "red", message: "Impossible de charger la liste des templates." });
    } finally {
      setTemplatesLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let localCanvas: FabricCanvas | null = null;

    const setupCanvas = async () => {
      const { Canvas } = await import("fabric");

      if (!mounted || !canvasElementRef.current) {
        return;
      }

      localCanvas = new Canvas(canvasElementRef.current, {
        width: FORMAT_DIMENSIONS[INITIAL_FORMAT].width,
        height: FORMAT_DIMENSIONS[INITIAL_FORMAT].height,
        backgroundColor: INITIAL_BACKGROUND_COLOR,
        preserveObjectStacking: true,
      });

      fabricRef.current = localCanvas;

      const updateSelection = () => {
        setSelectedObject(extractSelectedObject(localCanvas?.getActiveObject()));
      };

      localCanvas.on("selection:created", updateSelection);
      localCanvas.on("selection:updated", updateSelection);
      localCanvas.on("selection:cleared", () => setSelectedObject(null));
      localCanvas.on("object:modified", updateSelection);
      localCanvas.on("object:added", updateSelection);
      localCanvas.on("object:removed", updateSelection);

      setCanvasReady(true);
    };

    void setupCanvas();
    void loadTemplates();

    return () => {
      mounted = false;
      localCanvas?.dispose();
      fabricRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!canvasReady) {
      return;
    }

    applyCanvasFrame(format, backgroundColor);
  }, [backgroundColor, canvasReady, format]);

  const clearCanvas = (
    nextFormat: TemplateFormat = format,
    nextBackgroundColor: string = backgroundColor
  ) => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return;
    }

    canvas.clear();
    canvas.discardActiveObject();
    applyCanvasFrame(nextFormat, nextBackgroundColor);
    setSelectedObject(null);
  };

  const resetEditor = () => {
    setSelectedTemplateId(null);
    setTemplateName("");
    setVisualType("Résultat");
    setFormat(INITIAL_FORMAT);
    setTeamId(initialTeams[0]?.id ?? "");
    setBackgroundColor(INITIAL_BACKGROUND_COLOR);
    clearCanvas(INITIAL_FORMAT, INITIAL_BACKGROUND_COLOR);
  };

  const addTextbox = async ({
    text,
    fontSize,
    fontWeight,
    fill,
  }: {
    text: string;
    fontSize: number;
    fontWeight: number;
    fill: string;
  }) => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return;
    }

    const { Textbox } = await import("fabric");
    const textbox = new Textbox(text, {
      left: 72,
      top: 72,
      width: Math.min(300, canvas.getWidth() - 120),
      fontSize,
      fontWeight,
      fill,
      editable: true,
      fontFamily: "Montserrat, sans-serif",
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const addRectangle = async () => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return;
    }

    const { Rect } = await import("fabric");
    const rect = new Rect({
      left: 96,
      top: 96,
      width: 240,
      height: 140,
      rx: 18,
      ry: 18,
      fill: "#DBEAFE",
      stroke: "#0A5EBF",
      strokeWidth: 2,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const updateSelectedFill = (nextColor: string) => {
    const canvas = fabricRef.current;
    const activeObject = canvas?.getActiveObject();

    if (!canvas || !activeObject) {
      return;
    }

    activeObject.set("fill", nextColor);
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const updateSelectedText = (nextText: string) => {
    const canvas = fabricRef.current;
    const activeObject = canvas?.getActiveObject() as (FabricObject & { text?: string }) | undefined;

    if (!canvas || !activeObject) {
      return;
    }

    activeObject.set("text", nextText);
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const duplicateSelectedObject = async () => {
    const canvas = fabricRef.current;
    const activeObject = canvas?.getActiveObject();

    if (!canvas || !activeObject) {
      notifications.show({ color: "orange", message: "Sélectionnez un objet à dupliquer." });
      return;
    }

    const clone = await activeObject.clone();
    clone.set({
      left: (activeObject.left ?? 0) + 24,
      top: (activeObject.top ?? 0) + 24,
    });
    clone.setCoords();

    canvas.add(clone);
    canvas.setActiveObject(clone);
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const centerSelectedObject = () => {
    const canvas = fabricRef.current;
    const activeObject = canvas?.getActiveObject();

    if (!canvas || !activeObject) {
      notifications.show({ color: "orange", message: "Sélectionnez un objet à centrer." });
      return;
    }

    canvas.centerObject(activeObject);
    activeObject.setCoords();
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const deleteSelectedObject = () => {
    const canvas = fabricRef.current;
    const activeObject = canvas?.getActiveObject();

    if (!canvas || !activeObject) {
      notifications.show({ color: "orange", message: "Sélectionnez un objet à supprimer." });
      return;
    }

    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    syncCanvasSelection();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricRef.current;
    const file = event.target.files?.[0];

    if (!canvas || !file) {
      return;
    }

    const { FabricImage } = await import("fabric");
    const objectUrl = URL.createObjectURL(file);

    try {
      const image = await FabricImage.fromURL(objectUrl);
      const maxWidth = canvas.getWidth() * 0.7;
      const maxHeight = canvas.getHeight() * 0.45;
      const sourceWidth = image.width ?? maxWidth;
      const sourceHeight = image.height ?? maxHeight;
      const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight, 1);

      image.set({
        left: canvas.getWidth() * 0.15,
        top: canvas.getHeight() * 0.18,
        scaleX: scale,
        scaleY: scale,
      });

      canvas.add(image);
      canvas.setActiveObject(image);
      canvas.requestRenderAll();
      syncCanvasSelection();
    } catch (error) {
      console.error(error);
      notifications.show({ color: "red", message: "Impossible de charger cette image." });
    } finally {
      URL.revokeObjectURL(objectUrl);
      event.target.value = "";
    }
  };

  const buildTemplatePayload = () => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return null;
    }

    return {
      id: selectedTemplateId ?? undefined,
      name: templateName.trim(),
      visualType,
      format,
      teamId: teamId || null,
      backgroundColor,
      objectCount: canvas.getObjects().length,
      preview: canvas.toDataURL({ format: "png", multiplier: 0.2 }),
      canvas: canvas.toJSON(),
    };
  };

  const saveTemplate = async () => {
    const payload = buildTemplatePayload();

    if (!payload) {
      return;
    }

    if (!payload.name) {
      notifications.show({ color: "orange", message: "Donnez un nom au template avant de l'enregistrer." });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du template.");
      }

      const data = (await response.json()) as { template: AdminTemplate };
      setTemplates((current) => sortTemplates([data.template, ...current.filter((item) => item.id !== data.template.id)]));
      setSelectedTemplateId(data.template.id);
      notifications.show({
        color: "green",
        message: payload.id ? "Template mis à jour." : "Template enregistré.",
      });
    } catch (error) {
      console.error(error);
      notifications.show({ color: "red", message: "Impossible d'enregistrer le template." });
    } finally {
      setSaving(false);
    }
  };

  const loadTemplateIntoCanvas = async (template: AdminTemplate) => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return;
    }

    setLoadingTemplateId(template.id);

    try {
      setSelectedTemplateId(template.id);
      setTemplateName(template.name);
      setVisualType(template.visualType);
      setFormat(template.format);
      setTeamId(template.teamId ?? "");
      setBackgroundColor(template.backgroundColor);
      applyCanvasFrame(template.format, template.backgroundColor);

      await canvas.loadFromJSON(template.canvas);
      if (typeof canvas.backgroundColor !== "string") {
        canvas.backgroundColor = template.backgroundColor;
      }
      canvas.requestRenderAll();
      syncCanvasSelection();
      notifications.show({ color: "green", message: `Template "${template.name}" chargé.` });
    } catch (error) {
      console.error(error);
      notifications.show({ color: "red", message: "Impossible de charger ce template." });
    } finally {
      setLoadingTemplateId(null);
    }
  };

  const deleteTemplate = async (template: AdminTemplate) => {
    if (!window.confirm(`Supprimer le template "${template.name}" ?`)) {
      return;
    }

    setDeletingTemplateId(template.id);

    try {
      const response = await fetch(`/api/admin/templates/${template.id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
      }

      setTemplates((current) => current.filter((item) => item.id !== template.id));
      if (selectedTemplateId === template.id) {
        setSelectedTemplateId(null);
      }
      notifications.show({ color: "orange", message: `Template "${template.name}" supprimé.` });
    } catch (error) {
      console.error(error);
      notifications.show({ color: "red", message: "Impossible de supprimer ce template." });
    } finally {
      setDeletingTemplateId(null);
    }
  };

  const exportJsonFile = () => {
    const payload = buildTemplatePayload();
    if (!payload) {
      return;
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${payload.name || "template-admin"}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleJsonImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const canvas = fabricRef.current;
    const file = event.target.files?.[0];

    if (!canvas || !file) {
      return;
    }

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as ImportPayload | Record<string, unknown>;

      const wrappedPayload = isRecord(parsed) && isRecord(parsed.canvas) ? (parsed as ImportPayload) : null;
      const nextCanvas = wrappedPayload?.canvas ?? (parsed as Record<string, unknown>);
      const nextFormat = wrappedPayload?.format ?? format;
      const nextBackgroundColor = wrappedPayload?.backgroundColor ?? backgroundColor;

      setSelectedTemplateId(null);
      setTemplateName(wrappedPayload?.name ?? file.name.replace(/\.json$/i, ""));
      if (wrappedPayload?.visualType) {
        setVisualType(wrappedPayload.visualType);
      }
      if (wrappedPayload?.teamId !== undefined) {
        setTeamId(wrappedPayload.teamId ?? "");
      }
      setFormat(nextFormat);
      setBackgroundColor(nextBackgroundColor);
      applyCanvasFrame(nextFormat, nextBackgroundColor);

      await canvas.loadFromJSON(nextCanvas);
      if (typeof canvas.backgroundColor !== "string") {
        canvas.backgroundColor = nextBackgroundColor;
      }
      canvas.requestRenderAll();
      syncCanvasSelection();
      notifications.show({ color: "green", message: "Configuration JSON importée." });
    } catch (error) {
      console.error(error);
      notifications.show({ color: "red", message: "Le fichier JSON est invalide." });
    } finally {
      event.target.value = "";
    }
  };

  const activeTemplate = templates.find((template) => template.id === selectedTemplateId) ?? null;

  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />
      <input
        ref={jsonInputRef}
        type="file"
        accept=".json,application/json"
        hidden
        onChange={handleJsonImport}
      />

      <Grid gutter="md" align="stretch">
        <Grid.Col span={{ base: 12, xl: 3 }}>
          <Paper p="lg" h="100%" style={{ background: "white", border: "1px solid rgba(4,52,109,0.08)" }}>
            <Stack gap="lg">
              <Stack gap={4}>
                <Title order={3} c="brand.7" fz="1.05rem">
                  Outils
                </Title>
                <Text fz="sm" c="rgba(4,52,109,0.55)">
                  Texte, formes, images, couleurs et edition de l'objet selectionne.
                </Text>
              </Stack>

              <Stack gap="sm">
                <Button leftSection={<IconTextPlus size={16} />} bg="#04346D" onClick={() => void addTextbox({ text: "Nouveau texte", fontSize: 30, fontWeight: 600, fill: "#111827" })}>
                  Ajouter un texte
                </Button>
                <Button variant="light" color="brand" leftSection={<IconTypography size={16} />} onClick={() => void addTextbox({ text: "Titre principal", fontSize: 42, fontWeight: 700, fill: "#111827" })}>
                  Ajouter un titre
                </Button>
                <Button variant="light" color="brand" leftSection={<IconPlus size={16} />} onClick={() => void addTextbox({ text: "Sous-titre", fontSize: 24, fontWeight: 500, fill: "#6B7280" })}>
                  Ajouter un sous-titre
                </Button>
                <Button variant="light" color="brand" leftSection={<IconSquareRoundedPlus size={16} />} onClick={() => void addRectangle()}>
                  Ajouter un rectangle
                </Button>
                <Button variant="light" color="brand" leftSection={<IconPhotoPlus size={16} />} onClick={() => imageInputRef.current?.click()}>
                  Ajouter une image
                </Button>
              </Stack>

              <Divider />

              <Stack gap="sm">
                <ColorInput
                  label="Couleur du texte / fond"
                  value={selectedObject?.fill ?? "#111827"}
                  swatches={TEXT_SWATCHES}
                  disabled={!selectedObject}
                  onChange={updateSelectedFill}
                />

                <ColorInput
                  label="Couleur de fond du canvas"
                  value={backgroundColor}
                  swatches={BACKGROUND_SWATCHES}
                  onChange={setBackgroundColor}
                />

                <TextInput
                  label="Contenu du texte"
                  value={selectedObject?.isText ? selectedObject.text : ""}
                  disabled={!selectedObject?.isText}
                  onChange={(event) => updateSelectedText(event.currentTarget.value)}
                />
              </Stack>

              <Group grow>
                <Button variant="default" leftSection={<IconCopy size={16} />} onClick={() => void duplicateSelectedObject()}>
                  Dupliquer
                </Button>
                <Button variant="default" leftSection={<IconAlignBoxCenterMiddle size={16} />} onClick={centerSelectedObject}>
                  Centrer
                </Button>
              </Group>

              <Button color="red" variant="light" leftSection={<IconTrash size={16} />} onClick={deleteSelectedObject}>
                Supprimer l'objet
              </Button>

              <Divider />

              <Stack gap={6}>
                <Text fw={600} c="brand.7">
                  Selection actuelle
                </Text>
                {selectedObject ? (
                  <>
                    <Group gap="xs">
                      <Badge radius="xl" variant="light" color="brand">
                        {selectedObject.type}
                      </Badge>
                      <Badge radius="xl" variant="light" color={selectedObject.isText ? "green" : "gray"}>
                        {selectedObject.isText ? "editable" : "forme / image"}
                      </Badge>
                    </Group>
                    <Text fz="sm" c="rgba(4,52,109,0.55)">
                      {selectedObject.isText ? "Le champ texte et la couleur sont actifs." : "Vous pouvez centrer, dupliquer ou supprimer cet objet."}
                    </Text>
                  </>
                ) : (
                  <Text fz="sm" c="rgba(4,52,109,0.45)">
                    Aucun objet selectionne pour le moment.
                  </Text>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xl: 6 }}>
          <Paper p="lg" h="100%" style={{ background: "white", border: "1px solid rgba(4,52,109,0.08)" }}>
            <Stack gap="lg" h="100%">
              <Group justify="space-between" wrap="wrap">
                <Stack gap={4}>
                  <Title order={3} c="brand.7" fz="1.05rem">
                    Canvas Builder
                  </Title>
                  <Text fz="sm" c="rgba(4,52,109,0.55)">
                    Zone centrale pour construire le template puis l'enregistrer en JSON local.
                  </Text>
                </Stack>

                <Badge radius="xl" style={{ background: "rgba(4,52,109,0.08)", color: "#04346D" }}>
                  {FORMAT_DIMENSIONS[format].label}
                </Badge>
              </Group>

              <Group grow align="flex-start">
                <TextInput
                  label="Nom du template"
                  placeholder="Ex. Resultat domicile"
                  value={templateName}
                  onChange={(event) => setTemplateName(event.currentTarget.value)}
                />
                <Select
                  label="Type de visuel"
                  data={VISUAL_TYPES}
                  value={visualType}
                  onChange={(value) => {
                    if (value) {
                      setVisualType(value as VisualType);
                    }
                  }}
                />
              </Group>

              <Group grow align="flex-start">
                <Select
                  label="Format"
                  data={["Post", "Story"]}
                  value={format}
                  onChange={(value) => {
                    if (value) {
                      setFormat(value as TemplateFormat);
                    }
                  }}
                />
                <Select
                  label="Equipe"
                  data={teamOptions}
                  value={teamId || null}
                  clearable
                  placeholder="Sans equipe"
                  onChange={(value) => setTeamId(value ?? "")}
                />
              </Group>

              <Paper
                p="md"
                radius="lg"
                style={{
                  flex: 1,
                  minHeight: 560,
                  background: "linear-gradient(180deg, rgba(4,52,109,0.03) 0%, rgba(245,243,235,0.55) 100%)",
                  border: "1px solid rgba(4,52,109,0.08)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Box
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {!canvasReady && (
                    <Stack align="center" gap="xs" style={{ position: "absolute", inset: 0, justifyContent: "center" }}>
                      <Loader color="brand" />
                      <Text fz="sm" c="rgba(4,52,109,0.55)">
                        Initialisation du canvas Fabric.js
                      </Text>
                    </Stack>
                  )}

                  <Box
                    style={{
                      borderRadius: 20,
                      boxShadow: "0 24px 60px rgba(4,52,109,0.15)",
                      overflow: "hidden",
                      border: "1px solid rgba(4,52,109,0.12)",
                      background: "white",
                    }}
                  >
                    <canvas ref={canvasElementRef} />
                  </Box>
                </Box>
              </Paper>

              <Group justify="space-between" wrap="wrap">
                <Group>
                  <Button variant="light" color="brand" leftSection={<IconDeviceFloppy size={16} />} loading={saving} onClick={() => void saveTemplate()}>
                    {activeTemplate ? "Mettre a jour" : "Enregistrer"}
                  </Button>
                  <Button variant="default" leftSection={<IconDownload size={16} />} onClick={exportJsonFile}>
                    Exporter JSON
                  </Button>
                  <Button variant="default" leftSection={<IconFileImport size={16} />} onClick={() => jsonInputRef.current?.click()}>
                    Importer JSON
                  </Button>
                </Group>

                <Group>
                  <Button variant="default" leftSection={<IconRefresh size={16} />} onClick={resetEditor}>
                    Nouveau template
                  </Button>
                  <Button color="red" variant="light" leftSection={<IconTrash size={16} />} onClick={() => clearCanvas()}>
                    Vider le canvas
                  </Button>
                </Group>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xl: 3 }}>
          <Paper p="lg" h="100%" style={{ background: "white", border: "1px solid rgba(4,52,109,0.08)" }}>
            <Stack gap="lg" h="100%">
              <Group justify="space-between" align="flex-start">
                <Stack gap={4}>
                  <Title order={3} c="brand.7" fz="1.05rem">
                    Templates existants
                  </Title>
                  <Text fz="sm" c="rgba(4,52,109,0.55)">
                    Liste a droite avec chargement, suppression et apercu rapide.
                  </Text>
                </Stack>
                <ActionIcon variant="light" color="brand" onClick={() => void loadTemplates()}>
                  <IconLayoutList size={16} />
                </ActionIcon>
              </Group>

              <ScrollArea h={900} offsetScrollbars>
                <Stack gap="sm">
                  {templatesLoading ? (
                    <Group justify="center" py="xl">
                      <Loader color="brand" size="sm" />
                    </Group>
                  ) : templates.length === 0 ? (
                    <Paper p="md" style={{ background: "rgba(4,52,109,0.03)", border: "1px dashed rgba(4,52,109,0.15)" }}>
                      <Text fz="sm" c="rgba(4,52,109,0.55)">
                        Aucun template admin enregistre pour le moment.
                      </Text>
                    </Paper>
                  ) : (
                    templates.map((template) => {
                      const team = initialTeams.find((item) => item.id === template.teamId);
                      const isActive = selectedTemplateId === template.id;

                      return (
                        <Paper
                          key={template.id}
                          p="sm"
                          radius="lg"
                          style={{
                            border: isActive ? "2px solid #04346D" : "1px solid rgba(4,52,109,0.08)",
                            background: isActive ? "rgba(4,52,109,0.03)" : "white",
                          }}
                        >
                          <Stack gap="sm">
                            <Box
                              style={{
                                aspectRatio: template.format === "Story" ? "9 / 16" : "1 / 1",
                                borderRadius: 14,
                                overflow: "hidden",
                                background: template.backgroundColor,
                                border: "1px solid rgba(4,52,109,0.08)",
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              {template.preview ? (
                                <Image src={template.preview} alt={template.name} h="100%" w="100%" fit="cover" />
                              ) : (
                                <Text fz="xs" c="rgba(4,52,109,0.55)">
                                  Apercu indisponible
                                </Text>
                              )}
                            </Box>

                            <Stack gap={6}>
                              <Text fw={700} c="brand.7" lineClamp={1}>
                                {template.name}
                              </Text>
                              <Group gap={6}>
                                <Badge radius="xl" variant="light" color="brand">
                                  {template.visualType}
                                </Badge>
                                <Badge radius="xl" variant="light" color="gray">
                                  {template.format}
                                </Badge>
                              </Group>
                              {team ? (
                                <Text fz="xs" c="rgba(4,52,109,0.55)">
                                  {team.name}
                                </Text>
                              ) : null}
                              <Text fz="xs" c="rgba(4,52,109,0.45)">
                                {template.objectCount} objet{template.objectCount > 1 ? "s" : ""} · modifie le{" "}
                                {new Date(template.updatedAt).toLocaleDateString("fr-FR")}
                              </Text>
                            </Stack>

                            <Group grow>
                              <Button
                                size="xs"
                                variant="light"
                                color="brand"
                                loading={loadingTemplateId === template.id}
                                onClick={() => void loadTemplateIntoCanvas(template)}
                              >
                                Charger
                              </Button>
                              <Button
                                size="xs"
                                color="red"
                                variant="light"
                                loading={deletingTemplateId === template.id}
                                onClick={() => void deleteTemplate(template)}
                              >
                                Supprimer
                              </Button>
                            </Group>
                          </Stack>
                        </Paper>
                      );
                    })
                  )}
                </Stack>
              </ScrollArea>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}
