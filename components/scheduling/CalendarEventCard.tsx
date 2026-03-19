"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Group, Image, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { VisualType } from "@/types/template";
import type { CalendarEvent } from "@/lib/mockupdata/scheduler/data";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";

export const VISUAL_CONFIG: Record<VisualType, { color: string; bg: string }> = {
  Résultat: { color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { color: "#7A0FB0", bg: "#F3EEFB" },
  "Score en direct": { color: "#0F9B58", bg: "#EEFBF3" },
};

export function CalendarEventCard({ event, view = "semaine" }: { event: CalendarEvent; view?: "semaine" | "month" }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { template, teamData } = event.resource;
  const time = format(event.start, "HH:mm", { locale: fr });

  const cardContent =
    view === "semaine" ? (
      <Stack
        gap={4}
        bdrs={8}        
        bg={`${teamData.color}20`}
        bd={`1px solid ${teamData.color}`}
        p={6}
        style={{ cursor: "pointer", overflow: "hidden" }}
        onClick={open}
      >
        <Group gap={4} wrap="nowrap">
          <Text fz={11} fw={700} c={teamData.color} lh={1}>{time}</Text>
          <BadgeStoryOrPost format={template.format} size="xs" />
        </Group>
          <Image
            src={template.thumbnail}
            alt={template.name}
            mah={60}
            maw={60}
            radius={6}
            style={{ objectFit: "cover"}}
          />
      </Stack>
    ) : (
      <Group
        gap={4}
        justify="space-between"
        bdrs={8}
        bg={`${teamData.color}20`}
        bd={`1px solid ${teamData.color}`}
        p={3}
        style={{ cursor: "pointer" }}
        onClick={open}
      >
          <Group gap={3} >
          <BadgeStoryOrPost format={template.format} size="xs" />
          <Text fz={11} fw={700} c={teamData.color} lh={1}>{time}</Text>
          
          </Group>
          <Image
            src={template.thumbnail}
            alt={template.name}
            mah={25}
            maw={25}
            radius={3}
            style={{ objectFit: "cover" }}
          />
      </Group>
    );

  return (
    <>
      <Tooltip label={"Label à remplir"} >
        {cardContent}
      </Tooltip>
      <Modal opened={opened} onClose={close} title="">
        {/* à remplir */}
        <Image radius={4} src={template.thumbnail} alt={template.name} mah={60} maw={60} />
      </Modal>
    </>
  );
}
