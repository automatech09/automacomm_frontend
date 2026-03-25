"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge, Box, Group, Image, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ScheduledPublication } from "@/types";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";
import { BadgeTeam } from "../teams/BadgeTeam";
import { ScheduledPublicationModal } from "./ScheduledPublicationModal";
import { VISUAL_CONFIG } from "@/lib/constants/scheduler";
import { getEventColor } from "@/lib/utils/scheduler";
import { getUniqueTeams } from "@/lib/utils/publications";
import { BadgeVisualType } from "../common/BadgeVisualType";

export { VISUAL_CONFIG };

function EventTooltipLabel({ event }: { event: ScheduledPublication }) {
  const teams = getUniqueTeams(event);
  const isCarousel = teams.length > 1
  return (
    <Stack gap={8} p={4}>
      {/* Date & heure */}
      <Group gap={6}>
        <Text fz={12} fw={700} c="dark" lh={1}>
          {format(event.date, "d MMMM yyyy", { locale: fr })}
        </Text>
        <Text fz={12} fw={700} c="dimmed" lh={1}>
          {format(event.date, "HH:mm", { locale: fr })}
        </Text>
      </Group>
      {isCarousel &&  
      
      <Badge radius="xl" variant="light" color={"brand"} size="xs">
        Carousel
      </Badge> 
      
      }
     

      {/* Équipes */}
      <Group gap={4}>
        {teams.map((t) => <BadgeTeam key={t.id} teamData={t} />)}
      </Group>

      {/* Templates */}
      <Stack gap={6}>
        {event.templates.map((t) => (
          <Group key={t.id} gap={6} align="center">
            <BadgeVisualType visualTypeName={t.visualType} size="xs"/>
            <Text fz={11} c="brand" fw={500} lh={1}>{t.name}</Text>
          </Group>
        ))}
      </Stack>
    </Stack>
  );
}

export function CalendarEventCard({ event, view = "semaine" }: { event: ScheduledPublication; view?: "semaine" | "month" }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { templates } = event;
  const color = getEventColor(event);
  const time = format(event.date, "HH:mm", { locale: fr });

  const cardContent =
    view === "semaine" ? (
      <Stack
        gap={4}
        bdrs={8}
        bg={`${color}20`}
        bd={`1px solid ${color}`}
        justify="space-between"
        p={6}
        style={{ cursor: "pointer", overflow: "hidden" }}
        onClick={open}
      >
        <Group gap={4} wrap="nowrap">
          <Text fz={11} fw={700} c={color} lh={1}>{time}</Text>
          <BadgeStoryOrPost format={templates[0].format} size="xs" />
        </Group>
        {/* Carousel thumbnails */}
        <Group gap={4} wrap="nowrap">
        <Image src={templates[0].thumbnail} radius={3} alt={templates[0].name} mah={70} maw={60} style={{objectFit: "cover" }}/>
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
      <ScheduledPublicationModal event={event} opened={opened} onClose={close} />
    </>
  );
}
