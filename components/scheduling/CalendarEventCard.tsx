"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge, Box, Group, Image, Text } from "@mantine/core";
import type { EventProps } from "react-big-calendar";
import type { VisualType } from "@/types/template";
import type { CalendarEvent } from "@/lib/mockupdata/scheduler/data";

export const VISUAL_CONFIG: Record<VisualType, { color: string; bg: string }> = {
  Résultat: { color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { color: "#0F9B58", bg: "#EEFBF3" },
};

export function CalendarEventCard({ event }: EventProps<CalendarEvent>) {
  const { template } = event.resource;
  const config = VISUAL_CONFIG[template.visualType] ?? { color: "#04346D", bg: "#E8F4FF" };
  const time = format(event.start, "HH:mm", { locale: fr });

  return (
    <Box p={6} style={{ height: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      <Group gap={6} wrap="nowrap" align="center" style={{ flexShrink: 0 }}>
        <Text fz={11} fw={600} style={{ color: config.color, lineHeight: 1 }}>
          {time}
        </Text>
        <Badge
          size="xs"
          variant="filled"
          style={{ backgroundColor: config.bg, color: config.color, fontSize: 9, fontWeight: 600, padding: "2px 5px", height: "auto" }}
        >
          {template.visualType}
        </Badge>
      </Group>
      <Box style={{ flex: 1, minHeight: 0, borderRadius: 4, overflow: "hidden" }}>
        <Image
          src={template.thumbnail}
          alt={template.name}
          mah={60}
          maw={60}
          fit="contain"
        />
      </Box>
    </Box>
  );
}
