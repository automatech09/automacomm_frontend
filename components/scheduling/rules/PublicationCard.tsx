"use client";

import { Badge, Box, Group, Paper, Stack, Switch, Text } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import type { Publication } from "@/types/scheduling";
import type { NetworkType } from "@/types/publication";
import type { Template } from "@/types/template";
import { MOMENT_PHRASES } from "@/lib/constants/scheduler";
import { TeamPill } from "./TeamPill";
import { PublicationActionsMenu } from "./PublicationActionsMenu";

function TemplateThumbnails({ templates }: { templates: Template[] }) {
  if (templates.length === 1) {
    return (
      <Box
        style={{
          width: 48,
          height: 62,
          borderRadius: 10,
          overflow: "hidden",
          flexShrink: 0,
          border: "1.5px solid rgba(0,0,0,0.08)",
        }}
      >
        <img src={templates[0].thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
    );
  }

  return (
    <Box style={{ position: "relative", width: 56, height: 68, flexShrink: 0 }}>
      {templates.slice(0, 2).map((t, i) => (
        <Box
          key={t.id}
          style={{
            position: "absolute",
            top: i === 0 ? 6 : 0,
            left: i === 0 ? 6 : 0,
            width: 44,
            height: 58,
            borderRadius: 9,
            overflow: "hidden",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.13)",
            zIndex: i === 0 ? 0 : 1,
          }}
        >
          <img src={t.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      ))}
    </Box>
  );
}

function PlatformIcons({ platforms }: { platforms: NetworkType }) {
  return (
    <Group gap={4}>
      {(platforms === "instagram" || platforms === "both") && (
        <IconBrandInstagram size={16} color="#E1306C" />
      )}
      {(platforms === "facebook" || platforms === "both") && (
        <IconBrandFacebook size={16} color="#1877F2" />
      )}
    </Group>
  );
}

interface Props {
  publication: Publication;
  onToggle: (id: string, active: boolean) => void;
  onEdit: (p: Publication) => void;
  onEditTemplate: () => void;
}

export function PublicationCard({ publication, onToggle, onEdit, onEditTemplate }: Props) {
  const phrase = MOMENT_PHRASES[publication.schedule.moment] ?? publication.schedule.moment;
  const isCarousel = publication.templates.length > 1;

  return (
    <Paper
      withBorder
      radius="xl"
      p="md"
      style={{
        opacity: publication.active ? 1 : 0.55,
        borderColor: publication.active ? "rgba(4,52,109,0.12)" : "rgba(4,52,109,0.06)",
        transition: "opacity 0.2s",
        background: "white",
      }}
    >
      <Group justify="space-between" wrap="nowrap" align="center" gap="md">
        <Group gap="md" wrap="nowrap" align="center" style={{ flex: 1, minWidth: 0 }}>
          <TemplateThumbnails templates={publication.templates} />

          <Stack gap={5} style={{ flex: 1, minWidth: 0 }}>
            <Group gap={4} wrap="wrap">
              {publication.teams.map((team) => (
                <TeamPill key={team.id} team={team} />
              ))}
            </Group>

            <Text fw={700} fz="sm" c="dark.7">
              {phrase} à {publication.schedule.time}
            </Text>

            <Group gap={6} align="center">
              <PlatformIcons platforms={publication.platforms} />
              {isCarousel && (
                <Badge size="xs" variant="light" color="grape">
                  Carrousel · {publication.templates.length} visuels
                </Badge>
              )}
            </Group>
          </Stack>
        </Group>

        <Group gap="sm" align="center" style={{ flexShrink: 0 }}>
          <Switch
            checked={publication.active}
            onChange={(e) => onToggle(publication.id, e.currentTarget.checked)}
            size="sm"
            color="green"
          />
          <PublicationActionsMenu
            publication={publication}
            onEdit={onEdit}
            onEditTemplate={onEditTemplate}
          />
        </Group>
      </Group>
    </Paper>
  );
}
