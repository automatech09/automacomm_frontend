"use client";

import { useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Image,
  NativeSelect,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandInstagram,
  IconCalendarStats,
  IconCheck,
  IconChartBar,
  IconDownload,
  IconLayout,
  IconRefresh,
  IconSend,
  IconSparkles,
  IconTrophy,
  type TablerIcon,
} from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import {
  defaultGenerationForm,
  teamTabColor,
  teams,
  templatesByTeam,
  type GenerationForm,
  type NetworkType,
  type TeamName,
  type TemplateCard,
  type VisualType,
} from "./data";

const typeConfig: Record<VisualType, { icon: TablerIcon; color: string }> = {
  Résultat: { icon: IconTrophy, color: "#0A5EBF" },
  Affiche: { icon: IconLayout, color: "#FF6B35" },
  Classement: { icon: IconChartBar, color: "#D4640A" },
  Calendrier: { icon: IconCalendarStats, color: "#0F9B58" },
};

function TeamTabs({ active, onChange }: { active: TeamName | "Tous"; onChange: (team: TeamName | "Tous") => void }) {
  return (
    <Group gap="sm" style={{ borderBottom: "1px solid rgba(4,52,109,0.1)" }}>
      {teams.map((team) => {
        const isActive = team === active;
        return (
          <UnstyledButton
            key={team}
            onClick={() => onChange(team)}
            px="md"
            py="sm"
            style={{
              position: "relative",
              color: isActive ? teamTabColor[team] : "rgba(4,52,109,0.5)",
              fontWeight: isActive ? 600 : 500,
            }}
          >
            <Text fz="sm">{team}</Text>
            {isActive ? (
              <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: teamTabColor[team] }} />
            ) : null}
          </UnstyledButton>
        );
      })}
    </Group>
  );
}

function previewUrl(template: TemplateCard, form: GenerationForm) {
  const text =
    template.type === "Résultat"
      ? `${template.type}+${form.scoreHome}-${form.scoreAway}`
      : `${template.type}+${form.team}`;
  return `https://placehold.co/1080x1080/${template.teamData.color.slice(1)}/F5F3EB?text=${text}`;
}

export default function ManualGenerationPage() {
  const [activeTeam, setActiveTeam] = useState<TeamName | "Tous">("Tous");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCard | null>(null);
  const [generated, setGenerated] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState<GenerationForm>(defaultGenerationForm);

  const filteredTemplates = useMemo(() => {
    const all = Object.values(templatesByTeam).flat();
    return activeTeam === "Tous" ? all : templatesByTeam[activeTeam];
  }, [activeTeam]);

  const handlePublish = () => {
    setPublishing(true);
    window.setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      notifications.show({ color: "green", message: "Publication envoyée" });
      window.setTimeout(() => setPublished(false), 3000);
    }, 1200);
  };

  if (!selectedTemplate) {
    return (
      <Stack gap="lg">
        <Stack gap={2}>
          <Title order={1} c="brand.7" fz="1.6rem">Génération manuelle</Title>
          <Text fz="sm" c="rgba(4,52,109,0.5)">Sélectionnez un template pour créer votre visuel personnalisé.</Text>
        </Stack>

        <TeamTabs active={activeTeam} onChange={setActiveTeam} />

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
          {filteredTemplates.map((template) => {
            return (
              <UnstyledButton key={template.id} onClick={() => setSelectedTemplate(template)}>
                <Paper withBorder radius="lg" style={{ overflow: "hidden", borderColor: "rgba(4,52,109,0.08)" }}>
                  <Box style={{ position: "relative", aspectRatio: "1 / 1" }}>
                    <Image src={template.thumbnail} alt={template.name} h="100%" w="100%" fit="cover" />
                    <Group justify="space-between" style={{ position: "absolute", top: 12, left: 12, right: 12 }}>
                      <Badge radius="xl" style={{ background: "rgba(4,52,109,0.88)", color: "#F5F3EB" }}>{template.type}</Badge>
                    </Group>
                  </Box>
                  <Stack p="md" gap="xs">
                    <Text c="brand.7" fz="sm" fw={600}>{template.name}</Text>
                    <BadgeTeam teamData={template.teamData} />
                  </Stack>
                </Paper>
              </UnstyledButton>
            );
          })}
        </SimpleGrid>
      </Stack>
    );
  }

  const templatePreview = previewUrl(selectedTemplate, form);

  return (
    <Stack gap="lg">
      <Group gap="md" wrap="nowrap" align="flex-start">
        <ActionIcon variant="light" color="brand" size="lg" radius="xl" onClick={() => setSelectedTemplate(null)}>
          <IconArrowLeft size={18} />
        </ActionIcon>
        <Stack gap={2} style={{ flex: 1 }}>
          <Group gap="xs" wrap="wrap">
            <Title order={1} c="brand.7" fz="1.6rem">{selectedTemplate.name}</Title>
            <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>{selectedTemplate.type}</Badge>
            <BadgeTeam teamData={selectedTemplate.teamData} />
          </Group>
          <Text fz="sm" c="rgba(4,52,109,0.5)">Créez un visuel personnalisé et publiez-le en quelques secondes.</Text>
        </Stack>
      </Group>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" verticalSpacing="md">
        <Stack gap="sm">
          <Paper radius="lg" withBorder p="sm" style={{ borderColor: "rgba(4,52,109,0.08)" }}>
            <Box style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 12 }}>
              <Image src={templatePreview} alt="Aperçu du visuel" h="100%" w="100%" fit="cover" />
              {generated ? (
                <Badge style={{ position: "absolute", top: 10, right: 10 }} color="green" radius="xl" leftSection={<IconSparkles size={12} />}>
                  Généré
                </Badge>
              ) : null}
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
              disabled={publishing}
            >
              {published ? "Publié" : "Publier"}
            </Button>
            <Button variant="light" color="brand" leftSection={<IconDownload size={16} />}>Télécharger</Button>
          </SimpleGrid>
        </Stack>

        <Paper radius="lg" withBorder style={{ overflow: "hidden", borderColor: "rgba(4,52,109,0.08)" }}>
          <Stack gap={0}>
            <Box px="lg" py="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.08)", background: "rgba(4,52,109,0.03)" }}>
              <Text fw={700} c="brand.7">Informations du visuel</Text>
              <Text fz="xs" c="rgba(4,52,109,0.45)">Modifiez les champs pour mettre à jour l'aperçu.</Text>
            </Box>

            <Stack p="lg" gap="md">
              <NativeSelect label="Équipe" value={form.team} onChange={(event) => setForm((prev) => ({ ...prev, team: event.currentTarget.value as TeamName }))} data={["Équipe 1", "Réserve", "U18"]} />
              <TextInput label="Adversaire" value={form.opponent} onChange={(event) => setForm((prev) => ({ ...prev, opponent: event.currentTarget.value }))} />

              {selectedTemplate.type === "Résultat" ? (
                <SimpleGrid cols={2} spacing="sm">
                  <TextInput label="Score FC Beaumont" type="number" value={form.scoreHome} onChange={(event) => setForm((prev) => ({ ...prev, scoreHome: event.currentTarget.value }))} />
                  <TextInput label={`Score ${form.opponent || "Adversaire"}`} type="number" value={form.scoreAway} onChange={(event) => setForm((prev) => ({ ...prev, scoreAway: event.currentTarget.value }))} />
                </SimpleGrid>
              ) : null}

              <SimpleGrid cols={2} spacing="sm">
                <TextInput label="Date" type="date" value={form.date} onChange={(event) => setForm((prev) => ({ ...prev, date: event.currentTarget.value }))} />
                <TextInput label="Heure" type="time" value={form.time} onChange={(event) => setForm((prev) => ({ ...prev, time: event.currentTarget.value }))} />
              </SimpleGrid>

              {selectedTemplate.type === "Résultat" || selectedTemplate.type === "Affiche" ? (
                <TextInput label="Lieu" value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.currentTarget.value }))} />
              ) : null}

              <TextInput label="Compétition" value={form.competition} onChange={(event) => setForm((prev) => ({ ...prev, competition: event.currentTarget.value }))} />

              <Stack gap={8}>
                <Text fz="sm" fw={500} c="brand.7">Publier sur</Text>
                <SimpleGrid cols={3} spacing="sm">
                  {[
                    { value: "instagram", label: "Instagram", icon: IconBrandInstagram, color: "#E91E8C" },
                    { value: "facebook", label: "Facebook", icon: IconBrandFacebook, color: "#1877F2" },
                    { value: "both", label: "Les deux", icon: IconSparkles, color: "#04346D" },
                  ].map(({ value, label, icon: Icon, color }) => {
                    const selected = form.network === value;
                    return (
                      <UnstyledButton
                        key={value}
                        onClick={() => setForm((prev) => ({ ...prev, network: value as NetworkType }))}
                        p="sm"
                        style={{
                          borderRadius: 12,
                          textAlign: "center",
                          border: `1.5px solid ${selected ? "#04346D" : "rgba(4,52,109,0.1)"}`,
                          background: selected ? "#04346D" : "rgba(4,52,109,0.03)",
                        }}
                      >
                        <Stack gap={4} align="center">
                          <Icon size={16} color={selected ? "white" : color} />
                          <Text fz="xs" fw={selected ? 600 : 500} c={selected ? "white" : "rgba(4,52,109,0.65)"}>{label}</Text>
                        </Stack>
                      </UnstyledButton>
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
