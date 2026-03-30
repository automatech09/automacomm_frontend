import { Badge, Group, Text, Stack } from "@mantine/core";

interface Props {
  variables: string[];
  onInsert: (variable: string) => void;
}

export function VariablePicker({ variables, onInsert }: Props) {
  return (
    <Stack gap={6}>
      <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: 0.5 }}>
        Variables disponibles
      </Text>
      <Group gap={6}>
        {variables.map((v) => (
          <Badge
            key={v}
            variant="light"
            color="brand"
            radius="xl"
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => onInsert(v)}
          >
            {v}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
}
