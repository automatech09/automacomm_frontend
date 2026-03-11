import { Box, Text } from "@mantine/core";
import type { TeamTag } from "@/types";

export function TeamPill({ tag }: { tag: TeamTag }) {
  return (
    <Box
      px="xs"
      py={3}
      style={{
        borderRadius: 6,
        background: "#F5F7FA",
        borderLeft: `3px solid ${tag.borderColor}`,
      }}
    >
      <Text fz="xs" fw={600} c="brand.7">
        {tag.label}
      </Text>
    </Box>
  );
}
