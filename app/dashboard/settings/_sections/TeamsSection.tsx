"use client";

import { useState } from "react";
import {
  Stack, Group, Box, Text, ActionIcon, Select, ColorInput, UnstyledButton, Popover, ColorPicker,
} from "@mantine/core";
import { IconTrash, IconPlus, IconX, IconCheck, IconPalette } from "@tabler/icons-react";
import { possibleNameTeams } from "@/lib/constants/teams/nameTeams";
import type { Team } from "@/types";

interface Props {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

export function TeamsSection({ teams, setTeams }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState<string | null>(null);
  const [newColor, setNewColor] = useState("#04346D");

  const addTeam = () => {
    if (!newName) return;
    setTeams((prev) => [...prev, { id: crypto.randomUUID(), name: newName, league: "", color: newColor }]);
    setNewName(null);
    setNewColor("#04346D");
    setShowAdd(false);
  };

  const updateColor = (id: string, color: string) =>
    setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, color } : t)));

  const remove = (id: string) => setTeams((prev) => prev.filter((t) => t.id !== id));

  const availableNames = possibleNameTeams.filter((n) => !teams.some((t) => t.name === n));

  const colorSwatches = ["#04346D", "#FF6B35", "#0F9B58", "#7A0FB0", "#E63946", "#F4A261", "#2A9D8F"];

  return (
    <Stack gap="sm">
      {teams.map((team) => (
        <Group
          key={team.id}
          justify="space-between"
          wrap="nowrap"
          px="md" py="sm"
          style={{ borderRadius: 12, background: "rgba(4,52,109,0.02)", border: "1px solid rgba(4,52,109,0.07)" }}
        >
          <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            <Popover withinPortal position="bottom-start" shadow="md" radius="lg">
              <Popover.Target>
                <Box
                  w={32} h={32}
                  style={{ borderRadius: 9, background: `${team.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}
                >
                  <IconPalette size={15} color={team.color} />
                </Box>
              </Popover.Target>
              <Popover.Dropdown p="sm">
                <ColorPicker
                  value={team.color}
                  onChange={(v) => updateColor(team.id, v)}
                  format="hex"
                  swatches={colorSwatches}
                  swatchesPerRow={7}
                  size="sm"
                />
              </Popover.Dropdown>
            </Popover>
            <Text fz="sm" fw={600} style={{ color: "#04346D" }} truncate>{team.name}</Text>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <ActionIcon variant="subtle" color="red" size="sm" onClick={() => remove(team.id)}>
              <IconTrash size={13} />
            </ActionIcon>
          </Group>
        </Group>
      ))}

      {showAdd ? (
        <Group
          wrap="nowrap" gap="sm" px="md" py="sm"
          style={{ borderRadius: 12, border: "1.5px dashed rgba(4,52,109,0.15)", background: "rgba(4,52,109,0.01)" }}
        >
          <Select
            placeholder="Choisir un nom…"
            data={availableNames}
            value={newName}
            onChange={setNewName}
            size="xs"
            radius="md"
            style={{ flex: 1 }}
            styles={{ input: { background: "#F5F3EB", border: "1px solid rgba(4,52,109,0.1)", color: "#04346D" } }}
          />
          <ColorInput
            value={newColor}
            onChange={setNewColor}
            format="hex"
            withPicker
            withEyeDropper={false}
            swatches={colorSwatches}
            size="xs"
            w={90}
            styles={{
              input: { background: "#F5F3EB", border: "1px solid rgba(4,52,109,0.1)", borderRadius: 8, fontSize: 11, color: "#04346D", paddingLeft: 28 },
              preview: { borderRadius: 5 },
            }}
          />
          <ActionIcon size="sm" radius="md" style={{ background: "#04346D" }} onClick={addTeam} disabled={!newName}>
            <IconCheck size={13} color="white" />
          </ActionIcon>
          <ActionIcon size="sm" radius="md" variant="subtle" color="gray" onClick={() => setShowAdd(false)}>
            <IconX size={13} />
          </ActionIcon>
        </Group>
      ) : (
        <UnstyledButton
          onClick={() => availableNames.length > 0 && setShowAdd(true)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#04346D",
            opacity: availableNames.length > 0 ? 0.55 : 0.25,
            fontSize: 13, fontWeight: 500,
            cursor: availableNames.length > 0 ? "pointer" : "default",
          }}
        >
          <IconPlus size={14} />
          {availableNames.length > 0 ? "Ajouter une équipe" : "Toutes les équipes ont été ajoutées"}
        </UnstyledButton>
      )}
    </Stack>
  );
}
