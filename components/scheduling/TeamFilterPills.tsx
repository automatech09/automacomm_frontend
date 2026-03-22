"use client";

import { Group, Text } from "@mantine/core";
import type { Team } from "@/types";

interface Props {
  teams: Team[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function TeamFilterPills({ teams, selectedIds, onToggle }: Props) {
  return (
    <Group gap={8}>
      {teams.map((team) => {
        const active = selectedIds.has(team.id);
        return (
          <Text
            key={team.id}
            fz={11}
            fw={600}
            c={active ? team.color : "rgba(4,52,109,0.3)"}
            px={8}
            py={4}
            style={{
              borderRadius: 6,
              backgroundColor: active ? `${team.color}20` : "rgba(4,52,109,0.04)",
              border: `1px solid ${active ? team.color : "rgba(4,52,109,0.1)"}`,
              cursor: "pointer",
              transition: "all 120ms ease",
            }}
            onClick={() => onToggle(team.id)}
          >
            {team.name}
          </Text>
        );
      })}
    </Group>
  );
}
