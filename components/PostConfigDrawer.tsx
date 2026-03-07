"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import type { ScheduleRule } from "@/types";

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

const variables = ["{team}", "{opponent}", "{score}", "{date}", "{competition}"];

function PostConfigContent({ config, onClose, onSave }: PostConfigContentProps) {
  const [description, setDescription] = useState(config.description ?? "");
  const [loadingAi, setLoadingAi] = useState(false);

  const previewText = useMemo(() => {
    return description
      .replaceAll("{team}", config.teams[0]?.label ?? "Équipe")
      .replaceAll("{opponent}", "AS Montluçon")
      .replaceAll("{score}", "3-1")
      .replaceAll("{date}", "Dimanche 8 mars")
      .replaceAll("{competition}", "Division Régionale");
  }, [config.teams, description]);

  const handleGenerate = () => {
    setLoadingAi(true);
    setTimeout(() => {
      setDescription(
        "Belle victoire de {team} face à {opponent} ({score}) ! Merci aux supporters pour l'ambiance. #${competition}"
      );
      setLoadingAi(false);
    }, 700);
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
    <Stack gap="md">
      <Paper withBorder p="md" radius="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={5} c="brand.7">
              Règle sélectionnée
            </Title>
            <Badge color="brand">{config.visualType}</Badge>
          </Group>
          <SimpleGrid cols={2} spacing="sm">
            <Box>
              <Text fz="xs" c="dimmed">
                Format
              </Text>
              <Text fw={600}>{config.format === "P" ? "Post" : "Story"}</Text>
            </Box>
            <Box>
              <Text fz="xs" c="dimmed">
                Déclenchement
              </Text>
              <Text fw={600}>
                {config.moment} à {config.time}
              </Text>
            </Box>
          </SimpleGrid>
          <Group gap="xs" wrap="wrap">
            {config.teams.map((team) => (
              <Badge key={team.label} variant="light" style={{ borderLeft: `3px solid ${team.borderColor}` }}>
                {team.label}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Paper>

      <Paper withBorder p="md" radius="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={5} c="brand.7">
              Description
            </Title>
            <Button
              size="xs"
              variant="light"
              leftSection={<IconSparkles size={14} />}
              onClick={handleGenerate}
              loading={loadingAi}
            >
              Générer
            </Button>
          </Group>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            minRows={5}
            placeholder="Votre description..."
          />
          <Group gap="xs" wrap="wrap">
            {variables.map((variable) => (
              <Button
                key={variable}
                size="compact-xs"
                variant="default"
                onClick={() => setDescription((old) => `${old} ${variable}`.trim())}
              >
                {variable}
              </Button>
            ))}
          </Group>
        </Stack>
      </Paper>

      <Paper withBorder p="md" radius="lg">
        <Stack gap="xs">
          <Title order={5} c="brand.7">
            Aperçu
          </Title>
          <Text c={previewText ? "dark" : "dimmed"} fz="sm" style={{ whiteSpace: "pre-wrap" }}>
            {previewText || "L'aperçu de la description s'affichera ici."}
          </Text>
        </Stack>
      </Paper>

      <Divider />

      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Annuler
        </Button>
        <Button color="brand" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Group>
    </Stack>
  );
}

export function PostConfigDrawer({ open, config, onClose, onSave }: PostConfigDrawerProps) {
  return (
    <Drawer opened={open} onClose={onClose} position="right" size="lg" title="Configuration du post">
      {config ? (
        <PostConfigContent key={config.id} config={config} onClose={onClose} onSave={onSave} />
      ) : null}
    </Drawer>
  );
}
