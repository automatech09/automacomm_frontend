"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge, Box, Group, Image, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { VisualType } from "@/types/template";
import type { CalendarEvent } from "@/lib/mockupdata/scheduler/data";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";
import { BadgeTeam } from "../teams/BadgeTeam";
import { Carousel } from "@/components/common/Carousel";

export const VISUAL_CONFIG: Record<VisualType, { color: string; bg: string }> = {
  Résultat: { color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { color: "#0F9B58", bg: "#EEFBF3" },
};

const NEUTRAL = "#04346D";

function getUniqueTeams(event: CalendarEvent) {
  const seen = new Set<string>();
  return event.resource.templates
    .map((t) => t.team)
    .filter((t): t is NonNullable<typeof t> => !!t && !seen.has(t.id) && !!seen.add(t.id));
}

function getEventColor(event: CalendarEvent): string {
  const teams = getUniqueTeams(event);
  return teams.length === 1 ? teams[0].color : NEUTRAL;
}

function EventTooltipLabel({ event }: { event: CalendarEvent }) {
  const teams = getUniqueTeams(event);
  return (
    <Stack gap={8} p={4}>
      {/* Date & heure */}
      <Group gap={6}>
        <Text fz={12} fw={700} c="dark" lh={1}>
          {format(event.start, "d MMMM yyyy", { locale: fr })}
        </Text>
        <Text fz={12} fw={700} c="dimmed" lh={1}>
          {format(event.start, "HH:mm", { locale: fr })}
        </Text>
      </Group>

      {/* Équipes */}
      <Group gap={4}>
        {teams.map((t) => <BadgeTeam key={t.id} teamData={t} />)}
      </Group>

      {/* Templates */}
      <Stack gap={6}>
        {event.resource.templates.map((t) => (
          <Group key={t.id} gap={6} align="center">
            <Badge radius="xl" variant="light" color={"brand"} size="xs">
              {t.visualType}
            </Badge>
            <Text fz={11} c="brand" fw={500} lh={1}>{t.name}</Text>
          </Group>
        ))}
      </Stack>
    </Stack>
  );
}

export function CalendarEventCard({ event, view = "semaine" }: { event: CalendarEvent; view?: "semaine" | "month" }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { templates } = event.resource;
  const color = getEventColor(event);
  const time = format(event.start, "HH:mm", { locale: fr });

  const cardContent =
    view === "semaine" ? (
      <Stack
        gap={4}
        bdrs={8}
        bg={`${color}20`}
        bd={`1px solid ${color}`}
        justify="space-between"
        p={6}
        h="100%"
        style={{ cursor: "pointer", overflow: "hidden" }}
        onClick={open}
      >
        <Group gap={4} wrap="nowrap">
          <Text fz={11} fw={700} c={color} lh={1}>{time}</Text>
          <BadgeStoryOrPost format={templates[0].format} size="xs" />
        </Group>
        {/* Carousel thumbnails */}
        <Group gap={4} wrap="nowrap">
          {templates.map((t, i) => (
            <Box key={i} style={{flex: 1, justifyItems: 'center' }}>
              <Image src={t.thumbnail}radius={6} alt={t.name} mah={70} maw={60} style={{objectFit: "cover" }} />
            </Box>
          ))}
        </Group>
      </Stack>
    ) : (
      <Group
        gap={4}
        justify="space-between"
        bdrs={8}
        bg={`${color}20`}
        bd={`1px solid ${color}`}
        p={3}
        style={{ cursor: "pointer" }}
        onClick={open}
      >
        <Group gap={3}>
          <BadgeStoryOrPost format={templates[0].format} size="xs" />
          <Text fz={11} fw={700} c={color} lh={1}>{time}</Text>
        </Group>
        {/* Carousel thumbnails */}
        <Group gap={2} wrap="nowrap" style={{ flexShrink: 0 }}>
          {templates.map((t, i) => (
            <Image key={i} src={t.thumbnail} alt={t.name} mah={25} maw={25} radius={3} style={{ objectFit: "cover" }} />
          ))}
        </Group>
      </Group>
    );

  return (
    <>
      <Tooltip radius={8} openDelay={500} color="white" label={<EventTooltipLabel event={event}/>} styles={{ tooltip: { boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)" } }}>
        {cardContent}
      </Tooltip>
      <Modal opened={opened} onClose={close} title="">
        {/* à remplir */}
        <Carousel
          slides={templates.map((t) => (
            <Image src={t.thumbnail} alt={t.name} style={{objectFit: "cover" }} />
          ))}
        />
      </Modal>
    </>
  );
}
