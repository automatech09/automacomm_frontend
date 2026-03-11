"use client";

import { useState } from "react";
import { Stack, Group, Box, Text, Title, ActionIcon } from "@mantine/core";
import { IconUsers, IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { RosterSection } from "../_sections/RosterSection";
import { categories, initialPlayers } from "@/lib/mockupdata/teams/data";
import type { PlayerRow } from "@/types";

export default function RosterPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<PlayerRow[]>(initialPlayers);

  return (
    <Stack gap="lg" maw={900}>
      <Group gap="sm" align="flex-start">
        <ActionIcon
          variant="light"
          color="brand"
          size="lg"
          radius="xl"
          mt={4}
          onClick={() => router.back()}
        >
          <IconArrowLeft size={18} />
        </ActionIcon>
        <Stack gap={4}>
          <Group gap="xs">
            <Box
              w={36} h={36}
              style={{ background: "#04346D", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <IconUsers size={16} color="white" />
            </Box>
            <Title order={2} style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>
              Effectif du club
            </Title>
          </Group>
          <Text size="sm" style={{ color: "rgba(4,52,109,0.5)" }}>
            {players.length} joueur{players.length > 1 ? "s" : ""} enregistrés · Gérez les joueurs par catégorie
          </Text>
        </Stack>
      </Group>

      <RosterSection players={players} setPlayers={setPlayers} />
    </Stack>
  );
}
