"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box, Button, Group, Modal, Paper, ScrollArea, Select,
  Stack, Stepper, Text, TextInput, UnstyledButton,
} from "@mantine/core";
import { IconCalendar, IconClock, IconDeviceMobile, IconLayoutGrid } from "@tabler/icons-react";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { VisualTypeSelector } from "@/components/common/VisualTypeSelector";
import { DescriptionStep } from "@/components/scheduling/rules/description/DescriptionStep";
import type { Publication, PublicationDescription } from "@/types/scheduling";
import type { NetworkType } from "@/types/publication";
import type { Team } from "@/types/team";
import type { TemplateFormat, VisualType } from "@/types/template";
import { initialTemplates } from "@/lib/mockupdata/templates/data";
import { MOMENT_OPTIONS } from "@/lib/constants/scheduler";

const STEPS = ["Type", "Visuels", "Description", "Planification"];

const EMPTY_FORM = {
  format: null as TemplateFormat | null,
  visualType: null as VisualType | null,
  templateIds: [] as number[],
  header: "",
  core: "",
  footer: "",
  moment: "Jour J",
  time: "18:00",
  platforms: "both" as NetworkType,
};

function teamsFromTemplateIds(ids: number[]): Team[] {
  const seen = new Set<string>();
  return initialTemplates
    .filter((t) => ids.includes(t.id) && t.team !== null)
    .map((t) => t.team!)
    .filter((team) => !seen.has(team.id) && !!seen.add(team.id));
}

function fromPublication(p: Publication): typeof EMPTY_FORM {
  const first = p.templates[0];
  return {
    format: first?.format ?? null,
    visualType: first?.visualType ?? null,
    templateIds: p.templates.map((t) => t.id),
    header: p.description?.header ?? "",
    core: p.description?.core ?? "",
    footer: p.description?.footer ?? "",
    moment: p.schedule.moment,
    time: p.schedule.time,
    platforms: p.platforms,
  };
}

function toPublication(id: string, form: typeof EMPTY_FORM, active: boolean): Publication {
  const templates = initialTemplates.filter((t) => form.templateIds.includes(t.id));
  const teams = teamsFromTemplateIds(form.templateIds);
  const description: PublicationDescription | undefined = form.core.trim()
    ? {
        ...(form.header.trim() && { header: form.header }),
        core: form.core,
        ...(form.footer.trim() && { footer: form.footer }),
      }
    : undefined;
  return { id, templates, teams, platforms: form.platforms, schedule: { moment: form.moment, time: form.time }, description, active };
}

interface Props {
  open: boolean;
  publication: Publication | null;
  onClose: () => void;
  onSave: (p: Publication) => void;
}

export function PublicationDrawer({ open, publication, onClose, onSave }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (open) {
      setStep(0);
      setForm(publication ? fromPublication(publication) : EMPTY_FORM);
    }
  }, [open]);

  function update<K extends keyof typeof EMPTY_FORM>(k: K, v: (typeof EMPTY_FORM)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setTypeField(key: "format" | "visualType", v: TemplateFormat | VisualType | null) {
    setForm((f) => ({ ...f, [key]: v, templateIds: [] }));
  }

  const filteredTemplates = useMemo(
    () => initialTemplates.filter((t) =>
      (!form.format || t.format === form.format) &&
      (!form.visualType || t.visualType === form.visualType)
    ),
    [form.format, form.visualType]
  );

  const isStory = form.format === "Story";

  function nextStep() {
    setStep((s) => (s === 1 && isStory ? 3 : s + 1));
  }

  function prevStep() {
    setStep((s) => (s === 3 && isStory ? 1 : s - 1));
  }

  function handleTemplateSelect(id: number) {
    setForm((f) => ({
      ...f,
      templateIds: isStory
        ? f.templateIds.includes(id) ? [] : [id]
        : f.templateIds.includes(id)
          ? f.templateIds.filter((x) => x !== id)
          : [...f.templateIds, id],
    }));
  }

  function handleSave() {
    const id = publication?.id ?? crypto.randomUUID();
    onSave(toPublication(id, form, publication?.active ?? true));
    onClose();
  }

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Text fw={700} fz="md">{publication ? "Modifier la publication" : "Nouvelle publication"}</Text>}
      size="85%"
      radius="xl"
      padding="xl"
    >
      <Stack gap="lg">
        <Stepper active={step} size="xs">
          {STEPS.map((label, i) => <Stepper.Step key={i} label={label} />)}
        </Stepper>

        <ScrollArea>
          {step === 0 && (
            <Stack gap="lg">
              <Stack gap="xs">
              <Group gap={5}>
                <Text fz="sm" fw={600} c="dark.5">Format</Text>
                <Text fz="xs" fw={400} c={'dark.2'}> (Obligatoire)</Text>
                </Group> 
                <Group grow>
                  {(["Post", "Story"] as TemplateFormat[]).map((f) => {
                    const isSelected = form.format === f;
                    return (
                      <UnstyledButton key={f} onClick={() => setTypeField("format", f)}>
                        <Paper withBorder radius="xl" p="md" style={{ textAlign: "center", borderColor: isSelected ? "var(--mantine-color-brand-5)" : undefined, borderWidth: isSelected ? 2 : 1, background: isSelected ? "var(--mantine-color-brand-0)" : "white" }}>
                          <Stack align="center" gap="xs">
                            {f === "Post"
                              ? <IconLayoutGrid size={28} color={isSelected ? "var(--mantine-color-brand-6)" : "gray"} />
                              : <IconDeviceMobile size={28} color={isSelected ? "var(--mantine-color-brand-6)" : "gray"} />
                            }
                            <Text fz="sm" fw={700} c={isSelected ? "brand.6" : "dark.5"}>{f}</Text>
                            <Text fz="xs" c="dimmed">{f === "Post" ? "Carré · Fil d'actualité" : "Vertical · Éphémère 24h"}</Text>
                          </Stack>
                        </Paper>
                      </UnstyledButton>
                    );
                  })}
                </Group>
              </Stack>

              <Stack gap="xs">
              <Group gap={5}>
                <Text fz="sm" fw={600} c="dark.5">Type de visuel</Text>
                <Text fz="xs" fw={400} c={'dark.2'}> (Obligatoire)</Text>
                </Group> 
                <VisualTypeSelector
                  value={form.visualType}
                  onChange={(vt) => setTypeField("visualType", vt)}
                />
              </Stack>
            </Stack>
          )}

          {step === 1 && (
            <TemplateGrid
              templates={filteredTemplates}
              onSelect={(t) => handleTemplateSelect(t.id)}
              selectedIds={form.templateIds}
            />
          )}

          {step === 2 && (
            <DescriptionStep
              visualType={form.visualType}
              teams={teamsFromTemplateIds(form.templateIds)}
              header={form.header}
              core={form.core}
              footer={form.footer}
              onChange={(field, value) => update(field, value)}
            />
          )}

          {step === 3 && (
            <Stack gap="xl">
              {form.templateIds.length > 0 && (
                <Stack gap="xs">
                  <Text fz="sm" fw={600} c="dark.5">
                    {form.templateIds.length > 1 ? `Carrousel · ${form.templateIds.length} visuels` : "Visuel sélectionné"}
                  </Text>
                  <TemplateGrid
                    templates={filteredTemplates.filter((t) => form.templateIds.includes(t.id))}
                    onSelect={() => {}}
                  />
                </Stack>
              )}

              <Group grow align="flex-start">
                <Select
                  label="Moment de publication"
                  data={MOMENT_OPTIONS}
                  value={form.moment}
                  onChange={(v) => v && update("moment", v)}
                  radius="lg"
                  size="md"
                  leftSection={<IconCalendar size={16} />}
                />
                <TextInput
                  label="Heure"
                  placeholder="18:00"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  radius="lg"
                  size="md"
                  leftSection={<IconClock size={16} />}
                  style={{ maxWidth: 160 }}
                />
              </Group>
            </Stack>
          )}
        </ScrollArea>

        <Group justify="space-between" mt="xs">
          {step > 0 ? (
            <Button variant="subtle" onClick={prevStep}>Précédent</Button>
          ) : <Box />}
          {step < STEPS.length - 1 ? (
            <Button
              radius="xl"
              disabled={step === 0 && (!form.format || !form.visualType)}
              onClick={nextStep}
            >
              Suivant
            </Button>
          ) : (
            <Button radius="xl" color="green" onClick={handleSave}>
              {publication ? "Enregistrer" : "Créer la publication"}
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}
