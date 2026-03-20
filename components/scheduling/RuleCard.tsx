"use client";

import { ActionIcon, Badge, Box, Group, Menu, Paper, Stack, Switch, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconChartBar,
  IconDotsVertical,
  IconEdit,
  IconLayout,
  IconPalette,
  IconTrophy,
  IconWifi,
  type TablerIcon,
} from "@tabler/icons-react";
import type { ScheduleRule } from "@/types";
import type { NetworkType } from "@/types/publication";
import { COLORS } from "@/lib/constants/colors";
import { VISUAL_CONFIG as BASE_VISUAL_CONFIG } from "@/lib/constants/scheduler";

const VISUAL_CONFIG: Record<string, { color: string; bg: string; Icon: TablerIcon }> = {
  Résultat:          { ...BASE_VISUAL_CONFIG.Résultat,          Icon: IconTrophy },
  Classement:        { ...BASE_VISUAL_CONFIG.Classement,        Icon: IconChartBar },
  Affiche:           { ...BASE_VISUAL_CONFIG.Affiche,           Icon: IconLayout },
  "Score en direct": { ...BASE_VISUAL_CONFIG["Score en direct"], Icon: IconWifi },
};

const MOMENT_PHRASES: Record<string, string> = {
  "J-4": "4 jours avant le match",
  "J-3": "3 jours avant le match",
  "J-2": "2 jours avant le match",
  "J-1 (veille du match)": "Veille du match",
  "Jour J": "Jour du match",
  "J+1 (lendemain)": "Lendemain du match",
  "J+2": "2 jours après le match",
  "J+3": "3 jours après le match",
  "J+4": "4 jours après le match",
  Lundi: "Chaque lundi",
  Mardi: "Chaque mardi",
  Mercredi: "Chaque mercredi",
  Jeudi: "Chaque jeudi",
  Vendredi: "Chaque vendredi",
  Samedi: "Chaque samedi",
  Dimanche: "Chaque dimanche",
};

function PlatformIcons({ platforms }: { platforms?: NetworkType }) {
  if (!platforms) return null;
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

interface RuleCardProps {
  rule: ScheduleRule;
  onToggle: (id: string, active: boolean) => void;
  onEdit: (rule: ScheduleRule) => void;
  onEditTemplate: () => void;
}

export function RuleCard({ rule, onToggle, onEdit, onEditTemplate }: RuleCardProps) {
  const config = VISUAL_CONFIG[rule.visualType] ?? { color: COLORS.primary, bg: "#EEF2FF", Icon: IconLayout };
  const { Icon } = config;
  const phrase = MOMENT_PHRASES[rule.moment] ?? rule.moment;

  return (
    <Paper
      withBorder
      radius="xl"
      p="md"
      style={{
        opacity: rule.active ? 1 : 0.55,
        borderColor: rule.active ? "rgba(4,52,109,0.12)" : "rgba(4,52,109,0.06)",
        transition: "opacity 0.2s",
        background: "white",
      }}
    >
      <Group justify="space-between" wrap="nowrap" align="center" gap="md">
        {/* Left: icon preview + info */}
        <Group gap="md" wrap="nowrap" align="center" style={{ flex: 1, minWidth: 0 }}>
          {/* Visual type icon */}
          <Box
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: config.bg,
              border: `1.5px solid ${config.color}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={24} color={config.color} />
          </Box>

          {/* Info */}
          <Stack gap={5} style={{ flex: 1, minWidth: 0 }}>
            <Group gap={6} wrap="wrap">
              <Badge
                size="sm"
                variant="light"
                style={{ backgroundColor: config.bg, color: config.color }}
              >
                {rule.visualType}
              </Badge>
              <Badge size="sm" variant="outline" color="gray">
                {rule.format === "P" ? "Post" : "Story"}
              </Badge>
              {rule.isCarousel && (
                <Badge size="sm" variant="light" color="grape">
                  Carrousel
                </Badge>
              )}
              {rule.isCustomDescription && (
                <Badge size="sm" variant="dot" color="orange">
                  Description perso
                </Badge>
              )}
            </Group>

            <Text fw={600} fz="sm" c="dark.7">
              {phrase} à {rule.time}
            </Text>

            <Group gap={4} wrap="wrap">
              {rule.teams.map((team) => (
                <Box
                  key={team.label}
                  style={{
                    padding: "1px 8px",
                    borderRadius: 20,
                    backgroundColor: "#F5F7FA",
                    borderLeft: `3px solid ${team.borderColor}`,
                    fontSize: 11,
                    color: "#04346D",
                    fontWeight: 500,
                  }}
                >
                  {team.label}
                </Box>
              ))}
            </Group>
          </Stack>
        </Group>

        {/* Right: platforms + toggle + menu */}
        <Stack gap={8} align="flex-end" style={{ flexShrink: 0 }}>
          <Group gap="sm" align="center">
            <PlatformIcons platforms={rule.platforms} />
            <Switch
              checked={rule.active}
              onChange={(e) => onToggle(rule.id, e.currentTarget.checked)}
              size="sm"
              color="green"
            />
            <Menu withinPortal position="bottom-end" shadow="md" radius="lg">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray" radius="xl">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {rule.format === "P" && (
                  <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => onEdit(rule)}>
                    Modifier la description
                  </Menu.Item>
                )}
                <Menu.Item leftSection={<IconPalette size={14} />} onClick={onEditTemplate}>
                  Modifier le template
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text fz="xs" c="dimmed" ta="right" style={{ maxWidth: 150 }} lineClamp={1}>
            {rule.templates[0]}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
