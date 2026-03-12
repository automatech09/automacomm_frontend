"use client";

import { useState } from "react";
import {
  Badge, Box, Button, Group, Image, Modal,
  Paper, SimpleGrid, Stack, Text, TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBrandFacebook, IconBrandInstagram, IconCheck,
  IconDownload, IconRefresh, IconSend, IconSparkles,
} from "@tabler/icons-react";
import type { Template, GenerationForm, NetworkType } from "@/types";

interface Props {
  template: Template;
  opened: boolean;
  onClose: () => void;
}

const defaultForm = (template: Template): GenerationForm => ({
  teamId: template.team?.id ?? "",
  opponent: "AS Millery",
  scoreHome: "3",
  scoreAway: "1",
  date: "2026-03-08",
  time: "15:00",
  location: "Stade Léo Lagrange",
  competition: "Division Régionale 1",
  network: "both",
});

function previewUrl(template: Template, form: GenerationForm) {
  const color = template.team?.color.slice(1) ?? "04346D";
  const text = template.visualType === "Résultat"
    ? `${template.visualType}+${form.scoreHome}-${form.scoreAway}`
    : `${template.visualType}+${form.opponent || "Visuel"}`;
  return `https://placehold.co/1080x1080/${color}/F5F3EB?text=${encodeURIComponent(text)}`;
}

export function GenerationModal({ template, opened, onClose }: Props) {
  const [form, setForm] = useState<GenerationForm>(() => defaultForm(template));
  const [generated, setGenerated] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    setPublishing(true);
    window.setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      notifications.show({ color: "green", message: "Publication envoyée" });
      window.setTimeout(() => setPublished(false), 3000);
    }, 1200);
  };

  const networkOptions = [
    { value: "instagram", label: "Instagram", icon: IconBrandInstagram, color: "#E91E8C" },
    { value: "facebook", label: "Facebook", icon: IconBrandFacebook, color: "#1877F2" },
    { value: "both", label: "Les deux", icon: IconSparkles, color: "#04346D" },
  ] as const;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700} c="brand.7">Générer — {template.name}</Text>}
      size={820}
      radius="xl"
      centered
    >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Aperçu */}
        <Stack gap="sm">
          <Paper radius="lg" withBorder p="xs" style={{ borderColor: "rgba(4,52,109,0.08)" }}>
            <Box style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 10 }}>
              <Image src={previewUrl(template, form)} alt="Aperçu" h="100%" w="100%" fit="cover" />
              {generated && (
                <Badge style={{ position: "absolute", top: 10, right: 10 }} color="green" radius="xl" leftSection={<IconSparkles size={12} />}>
                  Généré
                </Badge>
              )}
            </Box>
          </Paper>
          <SimpleGrid cols={3} spacing="xs">
            <Button size="sm" leftSection={<IconRefresh size={14} />} bg="#04346D" onClick={() => setGenerated(true)}>Générer</Button>
            <Button
              size="sm"
              variant="light"
              color={published ? "green" : "brand"}
              leftSection={publishing ? <IconRefresh size={14} /> : published ? <IconCheck size={14} /> : <IconSend size={14} />}
              loading={publishing}
              onClick={handlePublish}
              disabled={!generated || publishing}
            >
              {published ? "Publié" : "Publier"}
            </Button>
            <Button size="sm" variant="light" color="brand" leftSection={<IconDownload size={14} />} disabled={!generated}>Télécharger</Button>
          </SimpleGrid>
        </Stack>

        {/* Formulaire */}
        <Stack gap="sm">
          <TextInput label="Adversaire" value={form.opponent} onChange={(e) => setForm((prev) => ({ ...prev, opponent: e.currentTarget.value }))} />

          {template.visualType === "Résultat" && (
            <SimpleGrid cols={2} spacing="sm">
              <TextInput label="Score (domicile)" type="number" value={form.scoreHome} onChange={(e) => setForm((prev) => ({ ...prev, scoreHome: e.currentTarget.value }))} />
              <TextInput label={`Score (${form.opponent || "extérieur"})`} type="number" value={form.scoreAway} onChange={(e) => setForm((prev) => ({ ...prev, scoreAway: e.currentTarget.value }))} />
            </SimpleGrid>
          )}

          <SimpleGrid cols={2} spacing="sm">
            <TextInput label="Date" type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.currentTarget.value }))} />
            <TextInput label="Heure" type="time" value={form.time} onChange={(e) => setForm((prev) => ({ ...prev, time: e.currentTarget.value }))} />
          </SimpleGrid>

          {(template.visualType === "Résultat" || template.visualType === "Affiche") && (
            <TextInput label="Lieu" value={form.location} onChange={(e) => setForm((prev) => ({ ...prev, location: e.currentTarget.value }))} />
          )}

          <TextInput label="Compétition" value={form.competition} onChange={(e) => setForm((prev) => ({ ...prev, competition: e.currentTarget.value }))} />

          <Stack gap={6}>
            <Text fz="sm" fw={500} c="brand.7">Publier sur</Text>
            <SimpleGrid cols={3} spacing="xs">
              {networkOptions.map(({ value, label, icon: Icon, color }) => {
                const selected = form.network === value;
                return (
                  <Box
                    key={value}
                    onClick={() => setForm((prev) => ({ ...prev, network: value as NetworkType }))}
                    p="xs"
                    style={{
                      borderRadius: 10, textAlign: "center", cursor: "pointer",
                      border: `1.5px solid ${selected ? "#04346D" : "rgba(4,52,109,0.1)"}`,
                      background: selected ? "#04346D" : "rgba(4,52,109,0.03)",
                    }}
                  >
                    <Stack gap={3} align="center">
                      <Icon size={15} color={selected ? "white" : color} />
                      <Text fz={11} fw={selected ? 600 : 500} c={selected ? "white" : "rgba(4,52,109,0.65)"}>{label}</Text>
                    </Stack>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Stack>

          <Button leftSection={<IconSparkles size={15} />} bg="#04346D" mt="xs" onClick={() => setGenerated(true)}>
            Générer le visuel
          </Button>
        </Stack>
      </SimpleGrid>
    </Modal>
  );
}
