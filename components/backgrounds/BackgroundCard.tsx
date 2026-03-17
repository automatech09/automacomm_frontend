"use client";

import { useState } from "react";
import { Badge, Group, Image, Stack, Text, UnstyledButton } from "@mantine/core";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import type { Template } from "@/types";
import { BadgeStoryOrPost } from "../common/BadgeStoryPost";


type Props = {
  template: Template;
  schedule?: string;
  onClick: () => void;
};

export function BackgroundCard({ template, schedule, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const bgUrl = template.urlArrierePlan;

  return (
    <Stack gap="xs">
      <UnstyledButton
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{
          borderRadius: 12, overflow: "hidden", position: "relative",
          border: "1.5px solid rgba(4,52,109,0.06)",
          display: "block",
        }}
      >
        {/* Thumbnail invisible — sert uniquement à établir le ratio du conteneur */}
        <Image src={template.thumbnail} alt="" w="100%" style={{ display: "block", visibility: "hidden" }} />
        {/* Image affichée en absolu par-dessus */}
        <Image
          src={hovered ? template.thumbnail : (bgUrl ?? template.thumbnail)}
          alt={hovered ? "Aperçu template" : "Arrière-plan"}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            transition: "opacity 150ms",
          }}
        />
      </UnstyledButton>

      <Group gap={6} wrap="wrap">
        <BadgeStoryOrPost format={template.format} />
        <Badge size="sm" radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>
          {template.name}
        </Badge>
      </Group>

      <Group gap="xs" wrap="wrap">
        {template.team && <BadgeTeam teamData={template.team} />}
        <Text fz="xs" c="rgba(4,52,109,0.45)">{schedule}</Text>
      </Group>
    </Stack>
  );
}
