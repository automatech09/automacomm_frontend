"use client";

import { Badge, Box, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { IconCalendarEvent, IconClock } from "@tabler/icons-react";
import { initialTemplates } from "@/lib/mockupdata/templates/data";
import { MOMENT_PHRASES } from "@/lib/constants/scheduler";
import { TeamPill } from "../TeamPill";
import type { Team } from "@/types/team";
import type { TemplateFormat, VisualType } from "@/types/template";

interface Props {
  templateIds: number[];
  teams: Team[];
  moment: string;
  time: string;
  format: TemplateFormat | null;
  visualType: VisualType | null;
}

function Thumbnails({ templateIds }: { templateIds: number[] }) {
  const templates = initialTemplates.filter((t) => templateIds.includes(t.id));
  if (templates.length === 0) return null;

  if (templates.length === 1) {
    return (
      <Box
        style={{
          width: 52,
          height: 68,
          borderRadius: 10,
          overflow: "hidden",
          flexShrink: 0,
          border: "1.5px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <img src={templates[0].thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
    );
  }

  return (
    <Group gap={6} align="flex-end">
      {templates.map((t, i) => (
        <Box
          key={t.id}
          style={{
            width: 44,
            height: 58,
            borderRadius: 9,
            overflow: "hidden",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            transform: `rotate(${(i - (templates.length - 1) / 2) * 3}deg)`,
            transition: "transform 0.2s",
          }}
        >
          <img src={t.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      ))}
    </Group>
  );
}

export function PublicationConfirmCard({ templateIds, teams, moment, time, format, visualType }: Props) {
  const momentLabel = MOMENT_PHRASES[moment] ?? moment;
  const isCarousel = templateIds.length > 1;

  return (
    <Stack gap="md">
      <Text fz="sm" fw={600} c="dark.5">Récapitulatif</Text>

      <Paper
        radius="xl"
        p="xl"
        style={{
          background: "var(--mantine-color-brand-0)",
          border: "1.5px solid var(--mantine-color-brand-2)",
        }}
      >
        <Stack gap="lg">
          {/* Thumbnails + badges */}
          <Group gap="md" align="center">
            <Thumbnails templateIds={templateIds} />
            <Stack gap={6}>
              {isCarousel && (
                <Badge variant="light" color="grape" radius="xl" size="sm">
                  Carrousel · {templateIds.length} visuels
                </Badge>
              )}
              {format && (
                <Badge variant="light" color="brand" radius="xl" size="sm">{format}</Badge>
              )}
              {visualType && (
                <Badge variant="light" color="gray" radius="xl" size="sm">{visualType}</Badge>
              )}
            </Stack>
          </Group>

          <Divider color="brand.2" />

          {/* Teams */}
          {teams.length > 0 && (
            <Stack gap={6}>
              <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: 0.5 }}>
                Équipes concernées
              </Text>
              <Group gap={6} wrap="wrap">
                {teams.map((team) => (
                  <TeamPill key={team.id} team={team} />
                ))}
              </Group>
            </Stack>
          )}

          {/* Timing */}
          <Stack gap={8}>
            <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: 0.5 }}>
              Planification
            </Text>
            <Group gap="xl">
              <Group gap={6} align="center">
                <IconCalendarEvent size={15} color="var(--mantine-color-brand-6)" />
                <Text fz="sm" fw={600} c="brand.7">{momentLabel}</Text>
              </Group>
              <Group gap={6} align="center">
                <IconClock size={15} color="var(--mantine-color-brand-6)" />
                <Text fz="sm" fw={600} c="brand.7">{time}</Text>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
