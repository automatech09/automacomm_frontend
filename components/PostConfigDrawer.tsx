"use client";

import { useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Drawer,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconPhoto,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import type { ScheduleRule, TeamTag } from "@/types";

interface PostConfigDrawerProps {
  open: boolean;
  config: ScheduleRule | null;
  onClose: () => void;
  onSave: (rule: ScheduleRule) => void;
}

interface PostConfigContentProps {
  config: ScheduleRule;
  onClose: () => void;
  onSave: (rule: ScheduleRule) => void;
}

const variables = [
  { key: "{team}", label: "Équipe" },
  { key: "{opponent}", label: "Adversaire" },
  { key: "{score}", label: "Score" },
  { key: "{date}", label: "Date" },
  { key: "{competition}", label: "Compétition" },
] as const;

function TeamTagPill({ tag }: { tag: TeamTag }) {
  return (
    <Box
      px="xs"
      py={4}
      style={{
        borderRadius: 6,
        background: "#F8F9FA",
        borderLeft: `3px solid ${tag.borderColor}`,
        boxShadow: "0 2px 6px rgba(4,52,109,0.12)",
      }}
    >
      <Text fz="xs" fw={600} c="brand.7">
        {tag.label}
      </Text>
    </Box>
  );
}

function PostConfigContent({ config, onClose, onSave }: PostConfigContentProps) {
  const [description, setDescription] = useState(config.description ?? "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);

  const templates = config.templates?.length ? config.templates : [`Template ${config.visualType}`];
  const hasChanges = description !== (config.description ?? "");

  const previewText = useMemo(() => {
    return description
      .replaceAll("{team}", config.teams[0]?.label ?? "Équipe")
      .replaceAll("{opponent}", "AS Example")
      .replaceAll("{score}", "3-1")
      .replaceAll("{date}", "Samedi 8 mars à 15h00")
      .replaceAll("{competition}", "Championnat Régional");
  }, [config.teams, description]);

  const insertVariable = (variable: string) => {
    setDescription((old) => `${old}${variable}`);
  };

  const generateWithAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setDescription(
        `🏀 Match à domicile ce week-end !\n\n{team} affronte {opponent} le {date}. Venez nombreux soutenir nos joueurs ! 💪\n\n#${config.teams[0]?.label.replace(/\s/g, "") ?? "Club"} #{competition}`
      );
      setIsGenerating(false);
    }, 1200);
  };

  const generateVariants = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setVariants([
        `🏆 {team} vs {opponent} - {date}\n\nRendez-vous pour soutenir nos joueurs ! 💙\n\n#{competition}`,
        `Match important ce week-end ! 🔥\n\n{team} reçoit {opponent} le {date}. Ambiance garantie au stade !\n\n#${config.teams[0]?.label.replace(/\s/g, "") ?? "Club"}`,
        `⚽ Prochain match : {team} - {opponent}\n📅 {date}\n\nOn compte sur vous ! 👏`,
      ]);
      setIsGenerating(false);
    }, 1600);
  };

  const applyVariant = (variant: string) => {
    setDescription(variant);
    setVariants([]);
  };

  const handleSave = () => {
    onSave({
      ...config,
      description,
      isCustomDescription: description.trim().length > 0,
    });
    onClose();
  };

  return (
    <Box>
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          background: "white",
          borderBottom: "1px solid rgba(4,52,109,0.08)",
          padding: "1.25rem 1.5rem 1rem",
        }}
      >
        <Group justify="space-between" align="flex-start">
          <Stack gap={2}>
            <Title order={4} c="brand.7">
              Configuration de la publication
            </Title>
            <Text fz="sm" c="rgba(4,52,109,0.55)">
              {config.visualType} · {config.teams.map((team) => team.label).join(", ")}
            </Text>
          </Stack>
          <ActionIcon variant="subtle" color="brand" radius="md" onClick={onClose}>
            <IconX size={18} />
          </ActionIcon>
        </Group>
      </Box>

      <Stack gap="md" p="lg" pb={120}>
        <Paper withBorder radius="xl" p="md">
          <Stack gap="sm">
            <Text fz="sm" fw={700} c="brand.7">
              📅 Planification
            </Text>
            <SimpleGrid cols={2} spacing="sm">
              <Box>
                <Text fz="xs" fw={500} c="rgba(4,52,109,0.55)" mb={6}>
                  Équipe(s)
                </Text>
                <Group gap="xs" wrap="wrap">
                  {config.teams.map((tag) => (
                    <TeamTagPill key={tag.label} tag={tag} />
                  ))}
                </Group>
              </Box>
              <Box>
                <Text fz="xs" fw={500} c="rgba(4,52,109,0.55)" mb={6}>
                  Format
                </Text>
                <Badge variant="light" color="brand" radius="md">
                  {config.format === "P" ? "Post" : "Story"}
                </Badge>
              </Box>
            </SimpleGrid>
            <SimpleGrid cols={2} spacing="sm">
              <Stack gap={4}>
                <Group gap={6}>
                  <IconCalendar size={14} color="rgba(4,52,109,0.55)" />
                  <Text fz="xs" fw={500} c="rgba(4,52,109,0.55)">
                    Moment
                  </Text>
                </Group>
                <Text fz="sm" fw={600} c="brand.7">
                  {config.moment}
                </Text>
              </Stack>
              <Stack gap={4}>
                <Group gap={6}>
                  <IconClock size={14} color="rgba(4,52,109,0.55)" />
                  <Text fz="xs" fw={500} c="rgba(4,52,109,0.55)">
                    Heure
                  </Text>
                </Group>
                <Text fz="sm" fw={600} c="brand.7">
                  {config.time}
                </Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Paper>

        <Paper withBorder radius="xl" p="md">
          <Stack gap="sm">
            <Group justify="space-between">
              <Group gap="xs">
                <IconPhoto size={16} color="#04346D" />
                <Text fz="sm" fw={700} c="brand.7">
                  Visuels inclus
                </Text>
              </Group>
              <Badge variant="light" color={config.isCarousel ? "grape" : "brand"}>
                {config.isCarousel ? "Carrousel" : "Visuel unique"}
              </Badge>
            </Group>
            <Stack gap="xs">
              {templates.map((template, index) => (
                <Group
                  key={`${template}-${index}`}
                  gap="sm"
                  p="xs"
                  style={{ background: "rgba(4,52,109,0.03)", borderRadius: 8 }}
                >
                  <Box
                    w={30}
                    h={30}
                    style={{
                      borderRadius: 8,
                      background: "#04346D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text c="white" fz="xs" fw={700}>
                      {index + 1}
                    </Text>
                  </Box>
                  <Text fz="sm" fw={500} c="brand.7">
                    {template}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Paper withBorder radius="xl" p="md">
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fz="sm" fw={700} c="brand.7">
                💬 Description du post
              </Text>
              <Button
                size="xs"
                onClick={generateWithAI}
                loading={isGenerating}
                leftSection={<IconSparkles size={12} />}
                style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)" }}
              >
                {isGenerating ? "Génération..." : "Générer avec IA"}
              </Button>
            </Group>

            <Textarea
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              minRows={5}
              placeholder="Écrivez la description de votre publication ici..."
              styles={{ input: { background: "#F5F3EB", borderColor: "rgba(4,52,109,0.1)", color: "#04346D" } }}
            />

            {variants.length === 0 ? (
              <Button
                variant="default"
                fullWidth
                onClick={generateVariants}
                loading={isGenerating}
                c="brand.7"
                styles={{ root: { borderColor: "rgba(4,52,109,0.14)" } }}
              >
                {isGenerating ? "Génération en cours..." : "✨ Générer 3 variantes"}
              </Button>
            ) : (
              <Stack gap="xs">
                <Text fz="xs" fw={600} c="rgba(4,52,109,0.55)">
                  Variantes générées :
                </Text>
                {variants.map((variant, index) => (
                  <Paper
                    key={index}
                    p="sm"
                    radius="md"
                    style={{ background: "rgba(4,52,109,0.03)", border: "1px solid rgba(4,52,109,0.08)" }}
                  >
                    <Text fz="xs" c="brand.7" style={{ whiteSpace: "pre-wrap" }}>
                      {variant}
                    </Text>
                    <Button
                      size="xs"
                      fullWidth
                      variant="default"
                      mt="xs"
                      onClick={() => applyVariant(variant)}
                    >
                      Appliquer la variante {index + 1}
                    </Button>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>

        <Paper withBorder radius="xl" p="md">
          <Stack gap="xs">
            <Text fz="sm" fw={700} c="brand.7">
              🏷️ Variables disponibles
            </Text>
            <Text fz="xs" c="rgba(4,52,109,0.55)" style={{ lineHeight: 1.6 }}>
              Cliquez sur une variable pour l&apos;insérer dans la description.
            </Text>
            <Group gap="xs" wrap="wrap">
              {variables.map((variable) => (
                <Button
                  key={variable.key}
                  size="xs"
                  variant="default"
                  onClick={() => insertVariable(variable.key)}
                  c="brand.7"
                  styles={{ root: { background: "#E8F4FD", borderColor: "rgba(4,52,109,0.15)" } }}
                >
                  {variable.key}
                  <Text span ml={4} c="rgba(4,52,109,0.55)">
                    · {variable.label}
                  </Text>
                </Button>
              ))}
            </Group>
          </Stack>
        </Paper>

        <Paper withBorder radius="xl" p="md">
          <Stack gap="xs">
            <Text fz="sm" fw={700} c="brand.7">
              👁️ Aperçu
            </Text>
            <Box
              p="md"
              style={{
                borderRadius: 10,
                background: "#F5F3EB",
                border: "1.5px solid rgba(4,52,109,0.08)",
              }}
            >
              {previewText ? (
                <Text fz="sm" c="brand.7" style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                  {previewText}
                </Text>
              ) : (
                <Text fz="sm" fs="italic" c="rgba(4,52,109,0.35)">
                  L&apos;aperçu apparaîtra ici...
                </Text>
              )}
            </Box>
            <Text fz="xs" c="rgba(4,52,109,0.45)">
              Exemple de rendu avec les données d&apos;un match à venir.
            </Text>
          </Stack>
        </Paper>
      </Stack>

      <Box
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 5,
          background: "white",
          borderTop: "1px solid rgba(4,52,109,0.08)",
          padding: "1rem 1.5rem",
        }}
      >
        {hasChanges ? (
          <Group
            gap="xs"
            px="sm"
            py="xs"
            mb="sm"
            style={{
              borderRadius: 8,
              background: "rgba(255,107,53,0.08)",
              border: "1px solid rgba(255,107,53,0.15)",
            }}
          >
            <Box w={6} h={6} style={{ borderRadius: "50%", background: "#FF6B35" }} />
            <Text fz="xs" fw={600} c="#FF6B35">
              Modifications non sauvegardées
            </Text>
          </Group>
        ) : null}

        <Group gap="sm">
          <Button flex={1} variant="default" onClick={onClose}>
            Annuler
          </Button>
          <Button
            flex={1}
            onClick={handleSave}
            style={{ background: hasChanges ? "#FF6B35" : "#04346D" }}
          >
            Sauvegarder
          </Button>
        </Group>
      </Box>
    </Box>
  );
}

export function PostConfigDrawer({ open, config, onClose, onSave }: PostConfigDrawerProps) {
  return (
    <Drawer
      opened={open}
      onClose={onClose}
      withCloseButton={false}
      position="right"
      size={580}
      styles={{ body: { padding: 0, background: "#FAFAFA" } }}
    >
      {config ? (
        <PostConfigContent
          key={`${config.id}-${open ? "open" : "closed"}`}
          config={config}
          onClose={onClose}
          onSave={onSave}
        />
      ) : null}
    </Drawer>
  );
}
