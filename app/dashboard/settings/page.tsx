"use client";

import { useState } from "react";
import { Stack, Text, Title, Divider, Paper, Group, Box } from "@mantine/core";
import { IconUsers, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { SubscriptionSection } from "./_sections/SubscriptionSection";
import { ClubSection } from "./_sections/ClubSection";
import { TeamsSection } from "./_sections/TeamsSection";
import { NetworksSection } from "./_sections/NetworksSection";
import { DangerSection } from "./_sections/DangerSection";
import { OpponentTeamsSection } from "./_sections/OpponentTeamsSection";
import { initialTeams} from "@/lib/mockupdata/teams/data";
import type { Team } from "@/types";

export default function SettingsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);

  return (
    <Stack gap="xl" maw={760}>
      <Stack gap={4}>
        <Title order={2} style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Paramètres</Title>
        <Text fz="sm" style={{ color: "rgba(4,52,109,0.5)" }}>
          Gérez votre abonnement, votre club, vos équipes et votre effectif.
        </Text>
      </Stack>

      <SubscriptionSection />

      <Divider color="rgba(4,52,109,0.07)" />

      <ClubSection />

      <Divider color="rgba(4,52,109,0.07)" />

      <Paper radius="xl" p="xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
        <Stack gap="md">
          <Stack gap={2}>
            <Text fw={700} style={{ color: "#04346D" }}>Mes équipes</Text>
            <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>
              {teams.length} équipe{teams.length > 1 ? "s" : ""}
            </Text>
          </Stack>
          <TeamsSection teams={teams} setTeams={setTeams} />
        </Stack>
      </Paper>

      <Divider color="rgba(4,52,109,0.07)" />

      <Paper radius="xl" p="xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
        <Group justify="space-between" wrap="nowrap">
          <Group gap="md" wrap="nowrap">
            <Box w={40} h={40} style={{ borderRadius: 12, background: "rgba(4,52,109,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconUsers size={18} color="#04346D" />
            </Box>
            <Stack gap={2}>
              <Text fw={700} style={{ color: "#04346D" }}>Effectif du club</Text>
              <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>Joueurs et catégories</Text>
            </Stack>
          </Group>
          <Box component={Link} href="/dashboard/settings/roster" style={{ textDecoration: "none" }}>
            <Box
              px="md" py={8}
              style={{ borderRadius: 10, background: "#04346D", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            >
              <IconChevronRight size={14} color="white" />
              <Text fz="sm" fw={600} style={{ color: "white" }}>Modifier l&apos;effectif</Text>
            </Box>
          </Box>
        </Group>
      </Paper>

      <Divider color="rgba(4,52,109,0.07)" />

      <Stack gap="md">
        <Stack gap={2}>
          <Text fw={700} style={{ color: "#04346D" }}>Réseaux sociaux</Text>
          <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>Connexions pour la publication automatique</Text>
        </Stack>
        <NetworksSection />
      </Stack>

      <Divider color="rgba(4,52,109,0.07)" />

      <OpponentTeamsSection />

      <Divider color="rgba(4,52,109,0.07)" />

      <DangerSection />
    </Stack>
  );
}
