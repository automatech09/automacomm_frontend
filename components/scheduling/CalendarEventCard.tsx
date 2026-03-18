"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Box, Group, Image, Text, Tooltip } from "@mantine/core";
import type { EventProps } from "react-big-calendar";
import type { VisualType } from "@/types/template";
import type { CalendarEvent } from "@/lib/mockupdata/scheduler/data";
import { IconPointFilled } from "@tabler/icons-react";
import { BadgeTeam } from "../teams/BadgeTeam";

export const VISUAL_CONFIG: Record<VisualType, { color: string; bg: string }> = {
  Résultat: { color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { color: "#0F9B58", bg: "#EEFBF3" },
};

function EventTooltip({ event }: { event: CalendarEvent }) {
  const config = VISUAL_CONFIG[event.resource.visualType] ?? { color: "#04346D", bg: "#E8F4FF" };
  const time = format(event.start, "HH:mm", { locale: fr });
  return (
    <Box w={160}>
      <Image
        src={event.resource.thumbnail}
        alt={event.title as string}
        radius="sm"
        mb={8}
        style={{ aspectRatio: "1/1", objectFit: "cover" }}
      />
      <Text fz={12} fw={600} c="white" lh={1.3}>
        {event.title as string}
      </Text>
      <Text fz={11} c="rgba(255,255,255,0.65)" mt={2}>
        {time} · <span style={{ color: config.color === "#04346D" ? "white" : config.bg }}>{event.resource.visualType}</span>
      </Text>
    </Box>
  );
}

export function CalendarEventCard({ event }: EventProps<CalendarEvent>) {
  const config = VISUAL_CONFIG[event.resource.visualType] ?? { color: "#04346D", bg: "#E8F4FF" };
  const time = format(event.start, "HH:mm", { locale: fr });
  return (
    <Tooltip
      label={<EventTooltip event={event} />}
      position="top"
      offset={6}
      radius="md"
    >
      <Group gap={4} wrap="nowrap" style={{ height: "100%", alignItems: "center", padding: "1px 2px" }}>
        <IconPointFilled size={10}/>
        <Text style={{ fontSize: 11, fontWeight: 400, color: config.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {event.title}
        </Text>
      </Group>
    </Tooltip>
  );
}
