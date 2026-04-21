"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandInstagram,
  IconCheck,
  IconDownload,
  IconRefresh,
  IconSend,
  IconSparkles,
} from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { getTemplates } from "@/lib/api/templates";
import type { GenerationForm, NetworkType, Template } from "@/types";

function previewUrl(template: Template, form: GenerationForm) {
  const color = template.team?.color.slice(1) ?? "04346D";
  const text =
    template.visualType === "Résultat"
      ? `${template.visualType}+${form.scoreHome}-${form.scoreAway}`
      : `${template.visualType}+${form.opponent || "Visuel"}`;
  return `https://placehold.co/1080x1080/${color}/F5F3EB?text=${encodeURIComponent(text)}`;
}

export default function TemplateGenerationPage() {
  const params = useParams();
  const id = Number(params.id);

  const [template, setTemplate] = useState<Template | null>(null);
  useEffect(() => {
    getTemplates().then((list) => setTemplate(list.find((t) => t.id === id) ?? null));
  }, [id]);

  const [form, setForm] = useState<GenerationForm>({
    teamId: "",
    opponent: "AS Millery",
    scoreHome: "3",
    scoreAway: "1",
    date: "2026-03-08",
    time: "15:00",
    location: "Stade Léo Lagrange",
    competition: "Division Régionale 1",
    network: "both",
  });

  useEffect(() => {
    if (template) setForm((f) => ({ ...f, teamId: template.team?.id ?? "" }));
  }, [template]);

  const [generated, setGenerated] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  if (!template) {
    return (
      <Stack align="center" mt="xl" gap="md">
        <Text c="brand.7" fw={600}>Template introuvable.</Text>
        <Button variant="light" color="brand" component={Link} href="/dashboard/templates">Retour aux templates</Button>
      </Stack>
    );
  }

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
    <Stack gap="lg">
      <Group gap="md" wrap="nowrap" align="flex-start">
        <ActionIcon variant="light" color="brand" size="lg" radius="xl" component={Link} href="/dashboard/templates">
          <IconArrowLeft size={18} />
        </ActionIcon>
        <Stack gap={2} style={{ flex: 1 }}>
          <Group gap="xs" wrap="wrap">
            <Title order={1} c="brand.7" fz="1.6rem">{template.name}</Title>
            <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>{template.visualType}</Badge>
            {template.team && <BadgeTeam teamData={template.team} />}
          </Group>
          <Text fz="sm" c="rgba(4,52,109,0.5)">Créez un visuel personnalisé et publiez-le en quelques secondes.</Text>
        </Stack>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Stack gap="sm">
          <Paper radius="lg" withBorder p="sm" style={{ borderColor: "rgba(4,52,109,0.08)" }}>
            <Box style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 12 }}>
              <Image src={previewUrl(template, form)} alt="Aperçu du visuel" h="100%" w="100%" fit="cover" />
              {generated && (
                <Badge style={{ position: "absolute", top: 10, right: 10 }} color="green" radius="xl" leftSection={<IconSparkles size={12} />}>
                  Généré
                </Badge>
              )}
            </Box>
          </Paper>

          <SimpleGrid cols={3} spacing="sm">
            <Button leftSection={<IconRefresh size={16} />} bg="#04346D" onClick={() => setGenerated(true)}>Générer</Button>
            <Button
              variant="light"
              color={published ? "green" : "brand"}
              leftSection={publishing ? <IconRefresh size={16} /> : published ? <IconCheck size={16} /> : <IconSend size={16} />}
              loading={publishing}
              onClick={handlePublish}
              disabled={!generated || publishing}
            >
              {published ? "Publié" : "Publier"}
            </Button>
            <Button variant="light" color="brand" leftSection={<IconDownload size={16} />} disabled={!generated}>Télécharger</Button>
          </SimpleGrid>
        </Stack>

        <Paper radius="lg" withBorder style={{ overflow: "hidden", borderColor: "rgba(4,52,109,0.08)" }}>
          <Stack gap={0}>
            <Box px="lg" py="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.08)", background: "rgba(4,52,109,0.03)" }}>
              <Text fw={700} c="brand.7">Informations du visuel</Text>
              <Text fz="xs" c="rgba(4,52,109,0.45)">Modifiez les champs pour mettre à jour l'aperçu.</Text>
            </Box>

            <Stack p="lg" gap="md">
              <TextInput label="Adversaire" value={form.opponent} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, opponent: v })); }} />

              {template.visualType === "Résultat" && (
                <SimpleGrid cols={2} spacing="sm">
                  <TextInput label="Score (domicile)" type="number" value={form.scoreHome} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, scoreHome: v })); }} />
                  <TextInput label={`Score (${form.opponent || "extérieur"})`} type="number" value={form.scoreAway} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, scoreAway: v })); }} />
                </SimpleGrid>
              )}

              <SimpleGrid cols={2} spacing="sm">
                <TextInput label="Date" type="date" value={form.date} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, date: v })); }} />
                <TextInput label="Heure" type="time" value={form.time} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, time: v })); }} />
              </SimpleGrid>

              {(template.visualType === "Résultat" || template.visualType === "Affiche") && (
                <TextInput label="Lieu" value={form.location} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, location: v })); }} />
              )}

              <TextInput label="Compétition" value={form.competition} onChange={(e) => { const v = e.currentTarget.value; setForm((prev) => ({ ...prev, competition: v })); }} />

              <Stack gap={8}>
                <Text fz="sm" fw={500} c="brand.7">Publier sur</Text>
                <SimpleGrid cols={3} spacing="sm">
                  {networkOptions.map(({ value, label, icon: Icon, color }) => {
                    const selected = form.network === value;
                    return (
                      <Box
                        key={value}
                        onClick={() => setForm((prev) => ({ ...prev, network: value as NetworkType }))}
                        p="sm"
                        style={{
                          borderRadius: 12,
                          textAlign: "center",
                          cursor: "pointer",
                          border: `1.5px solid ${selected ? "#04346D" : "rgba(4,52,109,0.1)"}`,
                          background: selected ? "#04346D" : "rgba(4,52,109,0.03)",
                        }}
                      >
                        <Stack gap={4} align="center">
                          <Icon size={16} color={selected ? "white" : color} />
                          <Text fz="xs" fw={selected ? 600 : 500} c={selected ? "white" : "rgba(4,52,109,0.65)"}>{label}</Text>
                        </Stack>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Stack>

              <Button leftSection={<IconSparkles size={16} />} bg="#04346D" onClick={() => setGenerated(true)}>
                Générer le visuel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
