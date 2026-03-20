"use client";

import { useMemo } from "react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { fr } from "date-fns/locale";
import { ActionIcon, Badge, Box, Group, Image, Menu, Paper, Stack, Text } from "@mantine/core";
import { IconDots, IconEdit, IconPlayerPlay } from "@tabler/icons-react";
import { scheduledItems, type ScheduledItem } from "@/lib/mockupdata/scheduler/data";
import { BadgeTeam } from "@/components/teams/BadgeTeam";

// ─── Constantes ───────────────────────────────────────────
const PRIMARY = "#04346D";

const STATUS_CONFIG = {
  upcoming:  { color: "blue",  label: "À venir" },
  published: { color: "green", label: "Publié" },
  error:     { color: "red",   label: "Erreur" },
};

function getDayLabel(date: Date): string {
  if (isToday(date))     return `Aujourd'hui, ${format(date, "d MMMM", { locale: fr })}`;
  if (isTomorrow(date))  return `Demain, ${format(date, "d MMMM", { locale: fr })}`;
  if (isYesterday(date)) return `Hier, ${format(date, "d MMMM", { locale: fr })}`;
  return format(date, "EEEE d MMMM", { locale: fr });
}

// ─── Card d'un événement ──────────────────────────────────
function AgendaEventCard({ event }: { event: ScheduledItem }) {
  const { templates, status, ruleId } = event;
  const statusConfig = STATUS_CONFIG[status];
  const uniqueTeams = [...new Map(templates.map((t) => t.team).filter(Boolean).map((t) => [t!.id, t!])).values()];

  return (
    <Group gap={12} align="flex-start">
      {/* Colonne heure */}
      <Stack gap={2} style={{ width: 56, flexShrink: 0, paddingTop: 14 }}>
        <Text fz={13} fw={700} c={PRIMARY} lh={1}>{format(event.date, "HH:mm")}</Text>
        {ruleId && <Text fz={10} c="dimmed" lh={1}>Règle #{ruleId}</Text>}
      </Stack>

      {/* Card */}
      <Paper flex={1} bd="1px solid rgba(4,52,109,0.1)" bdrs={12} style={{ overflow: "hidden" }}>
        {/* Corps */}
        <Group gap={12} p={12} align="flex-start">
          <Stack gap={8} style={{ flex: 1, minWidth: 0 }}>
            <Group gap={6} wrap="wrap">
              {uniqueTeams.map((t) => <BadgeTeam key={t.id} teamData={t} />)}
            </Group>
            <Stack gap={4}>
              {templates.map((t) => (
                <Group key={t.id} gap={6} align="center">
                  <Text fz={13} fw={600} c={PRIMARY} lh={1}>{t.name}</Text>
                  <Badge size="xs" radius="xl" variant="light">{t.visualType}</Badge>
                </Group>
              ))}
            </Stack>
          </Stack>

          {/* Thumbnails */}
          <Group gap={4} wrap="nowrap" style={{ flexShrink: 0 }}>
            {templates.slice(0, 2).map((t, i) => (
              <Image key={i} src={t.thumbnail} alt={t.name} w={64} h={64} radius={8} style={{ objectFit: "cover" }} />
            ))}
            {templates.length > 2 && (
              <Box w={64} h={64} style={{ borderRadius: 8, backgroundColor: "rgba(4,52,109,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Text fz={12} fw={700} c="dimmed">+{templates.length - 2}</Text>
              </Box>
            )}
          </Group>
        </Group>

        {/* Footer */}
        <Group justify="space-between" px={12} py={8} style={{ borderTop: "1px solid rgba(4,52,109,0.07)", backgroundColor: "rgba(4,52,109,0.02)" }}>
          <Badge size="sm" radius="xl" color={statusConfig.color} variant="light">{statusConfig.label}</Badge>
          <Group gap={6}>
            {status === "upcoming" && (
              <Badge size="sm" radius="xl" color={PRIMARY} variant="filled" leftSection={<IconPlayerPlay size={10} />} style={{ cursor: "pointer" }}>
                Publier maintenant
              </Badge>
            )}
            <ActionIcon size="sm" variant="subtle" color="gray"><IconEdit size={14} /></ActionIcon>
            <Menu position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon size="sm" variant="subtle" color="gray"><IconDots size={14} /></ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Reprogrammer</Menu.Item>
                <Menu.Item color="red">Supprimer</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Paper>
    </Group>
  );
}

// ─── Vue agenda ───────────────────────────────────────────
const DEFAULT_EVENTS = scheduledItems;

interface Props {
  date: Date;
  events?: ScheduledItem[];
}

export function SchedulerAgendaView({ events = DEFAULT_EVENTS }: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, { date: Date; events: ScheduledItem[] }>();
    const sorted = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
    for (const event of sorted) {
      const key = format(event.date, "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, { date: event.date, events: [] });
      map.get(key)!.events.push(event);
    }
    return [...map.values()];
  }, [events]);

  return (
    <Stack gap={24}>
      {grouped.map(({ date, events: dayEvents }) => (
        <Stack key={date.toISOString()} gap={12}>
          <Text fz={14} fw={700} c={PRIMARY} style={{ textTransform: "capitalize" }}>
            {getDayLabel(date)}
          </Text>
          {dayEvents.map((event) => (
            <AgendaEventCard key={event.id} event={event} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
