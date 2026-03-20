"use client";

import { useEffect, useMemo } from "react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { fr } from "date-fns/locale";
import { ActionIcon, Badge, Box, Group, Image, Menu, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { scheduledItems, type ScheduledItem } from "@/lib/mockupdata/scheduler/data";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { COLORS } from "@/lib/constants/colors";
import { STATUS_CONFIG } from "@/lib/constants/scheduler";

const PRIMARY = COLORS.primary;

function getDayLabel(date: Date): string {
  if (isToday(date))     return `Aujourd'hui, ${format(date, "d MMMM", { locale: fr })}`;
  if (isTomorrow(date))  return `Demain, ${format(date, "d MMMM", { locale: fr })}`;
  if (isYesterday(date)) return `Hier, ${format(date, "d MMMM", { locale: fr })}`;
  return format(date, "EEEE d MMMM", { locale: fr });
}

// ─── Card d'un événement ──────────────────────────────────
function AgendaEventCard({ event }: { event: ScheduledItem }) {
  const { templates, status } = event;
  const statusConfig = STATUS_CONFIG[status];
  const uniqueTeams = [...new Map(templates.map((t) => t.team).filter(Boolean).map((t) => [t!.id, t!])).values()];
  return (
    <Paper bd="1px solid rgba(4,52,109,0.1)" bdrs={12} style={{ overflow: "hidden" }}>
      {/* Header */}
      <Group justify="space-between" px={12} pt={12} pb={10} wrap="nowrap">
        <Group gap={8} wrap="nowrap" style={{ minWidth: 0 }}>
          <Text fz={15} fw={800} c={PRIMARY} lh={1} style={{ flexShrink: 0 }}>
            {format(event.date, "HH:mm")}
          </Text>
          <Box style={{ width: 1, height: 14, backgroundColor: "rgba(4,52,109,0.15)", flexShrink: 0 }} />
          <Group gap={4} style={{ minWidth: 0, overflow: "hidden" }}>
            {uniqueTeams.map((t) => <BadgeTeam key={t.id} teamData={t} />)}
          </Group>
        </Group>
        
      </Group>

      {/* Grille de visuels */}

        <SimpleGrid px={12} pb={10} cols={templates.length === 1 ? 1 : 2} spacing={8} style={{ alignItems: "end" }}>
          {templates.map((t, i) => (
            <Stack key={i} gap={4} align={templates.length === 1 ? "center" : "stretch"}>
              <Box style={{ position: "relative", display: "inline-block" }}>
                <Image
                  src={t.thumbnail}
                  alt={t.name}
                  w={templates.length === 1 ? "auto" : "100%"}
                  mah={300}
                  radius={8}
                />
                <Badge
                  size="xs"
                  radius="xl"
                  color="brand"
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                  }}
                >
                  {t.visualType}
                </Badge>
              </Box>
              <Group gap={4} align="center">
                <Box w={6} h={6} style={{ borderRadius: "50%", backgroundColor: t.team?.color ?? PRIMARY, flexShrink: 0 }} />
                <Text fz={11} fw={600} c={PRIMARY} lh={1} truncate>{t.name}</Text>
              </Group>
            </Stack>
          ))}
        </SimpleGrid>

      {/* Footer */}
      <Group justify="space-between" px={12} py={8} style={{ borderTop: "1px solid rgba(4,52,109,0.07)", backgroundColor: "rgba(4,52,109,0.02)" }}>
      <Badge size="sm" radius="xl" color={statusConfig.color} variant="light" style={{ flexShrink: 0 }}>
          {statusConfig.label}
        </Badge>
        <Menu position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon size="sm" variant="subtle" color="gray"><IconDots size={16} /></ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Reprogrammer</Menu.Item>
            <Menu.Item color="red">Supprimer</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
}

// ─── Vue agenda ───────────────────────────────────────────
export function SchedulerAgendaView({ date, events = scheduledItems }: { date: Date; events?: ScheduledItem[] }) {
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

  useEffect(() => {
    const key = format(date, "yyyy-MM-dd");
    document.getElementById(`agenda-day-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [date]);

  return (
    <Stack gap={24}>
      {grouped.map(({ date: dayDate, events: dayEvents }) => (
        <Stack key={dayDate.toISOString()} id={`agenda-day-${format(dayDate, "yyyy-MM-dd")}`} gap={10}>
          <Text fz={13} fw={700} c={`${PRIMARY}80`} tt="uppercase">
            {getDayLabel(dayDate)}
          </Text>
          {dayEvents.map((event) => (
            <AgendaEventCard key={event.id} event={event} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
