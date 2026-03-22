import { Box, Paper, Text, UnstyledButton } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";

interface Props {
  icon: TablerIcon;
  title: string;
  description?: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectionCard({ icon: Icon, title, description, color, selected, onClick }: Props) {
  return (
    <UnstyledButton onClick={onClick}>
      <Paper
        p="md"
        radius="xl"
        style={{
          border: `2px solid ${selected ? color : "transparent"}`,
          background: selected ? `${color}14` : "rgba(4,52,109,0.03)",
        }}
      >
        <Box
          w={44}
          h={44}
          mb="sm"
          style={{ borderRadius: 12, display: "grid", placeItems: "center", background: `${color}20` }}
        >
          <Icon size={22} color={color} />
        </Box>
        <Text c="brand.7" fw={600}>{title}</Text>
        {description && <Text c="rgba(4,52,109,0.6)" fz="xs" mt={6}>{description}</Text>}
      </Paper>
    </UnstyledButton>
  );
}
