import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import { IconChevronRight, IconShield } from "@tabler/icons-react";
import Link from "next/link";

export function OpponentTeamsSection() {
  return (
    <Paper radius="xl" p="xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
      <Group justify="space-between" wrap="nowrap">
        <Group gap="md" wrap="nowrap">
          <Box
            w={40} h={40}
            style={{ borderRadius: 12, background: "rgba(4,52,109,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <IconShield size={18} color="#04346D" />
          </Box>
          <Stack gap={2}>
            <Text fw={700} style={{ color: "#04346D" }}>Équipes adverses</Text>
            <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>
              Personnalisez le nom et le logo des équipes adverses affichés sur vos visuels.
            </Text>
          </Stack>
        </Group>
        <Box component={Link} href="/dashboard/settings/opponent-teams" style={{ textDecoration: "none" }}>
          <Box
            px="md" py={8}
            style={{ borderRadius: 10, background: "#04346D", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            <IconChevronRight size={14} color="white" />
            <Text fz="sm" fw={600} style={{ color: "white" }}>Gérer</Text>
          </Box>
        </Box>
      </Group>
    </Paper>
  );
}
