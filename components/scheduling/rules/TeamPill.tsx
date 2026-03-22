import { Box, Text } from "@mantine/core";
import { COLORS } from "@/lib/constants/colors";
import type { Team } from "@/types";

export function TeamPill({ team }: { team: Team }) {
  return (
    <Box
      px="xs"
      py={3}
      style={{ borderRadius: 6, background: "#F5F7FA", borderLeft: `3px solid ${team.color}` }}
    >
      <Text fz="xs" fw={600} c={COLORS.primary}>{team.name}</Text>
    </Box>
  );
}
