"use client";

import { useMemo, useState } from "react";
import {
  Stack, Group, Box, Text, Paper, Button, Modal,
  TextInput, Avatar, Badge, Table, ScrollArea,
  ActionIcon, NativeSelect, SimpleGrid,
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus, IconUsers, IconCamera, IconX } from "@tabler/icons-react";
import { categories } from "@/lib/mockupdata/teams/data";
import type { PlayerRow } from "@/types";

interface Props {
  players: PlayerRow[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerRow[]>>;
}

export function RosterSection({ players, setPlayers }: Props) {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingFirstName, setEditingFirstName] = useState("");
  const [addPlayerOpen, setAddPlayerOpen] = useState(false);
  const [playerForm, setPlayerForm] = useState({ firstName: "", lastName: "", category: "Senior" });

  const filteredPlayers = useMemo(
    () => (activeCategory === "Tous" ? players : players.filter((p) => p.category === activeCategory)),
    [activeCategory, players]
  );

  const saveEditedName = (id: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, firstName: editingFirstName || p.firstName } : p)));
    setEditingPlayerId(null);
  };

  const addPlayer = () => {
    if (!playerForm.firstName.trim() || !playerForm.lastName.trim()) return;
    setPlayers((prev) => [...prev, { id: crypto.randomUUID(), ...playerForm, photo: null }]);
    setPlayerForm({ firstName: "", lastName: "", category: "Senior" });
    setAddPlayerOpen(false);
  };

  const categoryTabs = [
    { label: "Tous", count: players.length },
    ...categories.map((cat) => ({ label: cat, count: players.filter((p) => p.category === cat).length })),
  ];

  return (
    <>
      <Stack gap="sm">
        <Group gap="xs" wrap="wrap">
          {categoryTabs.map((tab) => (
            <Button
              key={tab.label}
              size="xs"
              variant={activeCategory === tab.label ? "filled" : "outline"}
              color="brand"
              radius="xl"
              style={activeCategory !== tab.label ? { borderColor: "rgba(4,52,109,0.2)" } : { background: "#04346D" }}
              onClick={() => setActiveCategory(tab.label)}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </Group>

        <Paper radius="lg" p={0} style={{ overflow: "hidden", border: "1px solid rgba(4,52,109,0.08)" }}>
          <ScrollArea>
            <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
              <Table.Thead style={{ background: "rgba(4,52,109,0.03)" }}>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th>Prénom</Table.Th>
                  <Table.Th>Nom</Table.Th>
                  <Table.Th>Catégorie</Table.Th>
                  <Table.Th ta="right">Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredPlayers.length ? (
                  filteredPlayers.map((player) => (
                    <Table.Tr key={player.id}>
                      <Table.Td>
                        <Avatar size="sm" radius="xl" color="brand" styles={{ root: { background: "rgba(4,52,109,0.1)" } }}>
                          {player.firstName[0]}{player.lastName[0]}
                        </Avatar>
                      </Table.Td>
                      <Table.Td>
                        {editingPlayerId === player.id ? (
                          <TextInput
                            size="xs"
                            value={editingFirstName}
                            onChange={(e) => setEditingFirstName(e.currentTarget.value)}
                            onBlur={() => saveEditedName(player.id)}
                            onKeyDown={(e) => e.key === "Enter" && saveEditedName(player.id)}
                            autoFocus
                          />
                        ) : (
                          <Text fz="sm" fw={600} c="brand.7">{player.firstName}</Text>
                        )}
                      </Table.Td>
                      <Table.Td><Text fz="sm" fw={600} c="brand.7">{player.lastName}</Text></Table.Td>
                      <Table.Td><Badge variant="light" color="brand" size="sm">{player.category}</Badge></Table.Td>
                      <Table.Td>
                        <Group justify="flex-end" gap={6} wrap="nowrap">
                          <ActionIcon
                            variant="light" color="brand" size="sm"
                            onClick={() => { setEditingPlayerId(player.id); setEditingFirstName(player.firstName); }}
                          >
                            <IconEdit size={13} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light" color="red" size="sm"
                            onClick={() => setPlayers((prev) => prev.filter((p) => p.id !== player.id))}
                          >
                            <IconTrash size={13} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Stack align="center" py="lg" gap="xs">
                        <IconUsers size={26} color="rgba(4,52,109,0.25)" />
                        <Text fz="sm" c="rgba(4,52,109,0.45)">Aucun joueur dans cette catégorie</Text>
                      </Stack>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>
          <Box p="sm" style={{ borderTop: "1px solid rgba(4,52,109,0.07)", background: "rgba(4,52,109,0.02)" }}>
            <Button variant="subtle" color="brand" fullWidth size="sm" leftSection={<IconPlus size={15} />} onClick={() => setAddPlayerOpen(true)}>
              Ajouter un joueur
            </Button>
          </Box>
        </Paper>
      </Stack>

      <Modal
        opened={addPlayerOpen}
        onClose={() => setAddPlayerOpen(false)}
        title={<Text fw={700} c="brand.7">Ajouter un joueur</Text>}
        radius="lg"
        centered
      >
        <Stack gap="sm">
          <Group gap="sm" wrap="nowrap">
            <Avatar size={54} radius="xl" style={{ background: "rgba(4,52,109,0.08)", border: "1px dashed rgba(4,52,109,0.2)" }}>
              <IconCamera size={18} color="rgba(4,52,109,0.35)" />
            </Avatar>
            <Stack gap={2}>
              <Text fz="sm" fw={500} c="brand.7">Photo du joueur</Text>
              <Text fz="xs" c="rgba(4,52,109,0.45)">Optionnel — JPG, PNG</Text>
            </Stack>
          </Group>
          <SimpleGrid cols={2} spacing="sm">
            <TextInput
              label="Prénom"
              value={playerForm.firstName}
              onChange={(e) => setPlayerForm((prev) => ({ ...prev, firstName: e.currentTarget.value }))}
            />
            <TextInput
              label="Nom"
              value={playerForm.lastName}
              onChange={(e) => setPlayerForm((prev) => ({ ...prev, lastName: e.currentTarget.value }))}
            />
          </SimpleGrid>
          <NativeSelect
            label="Catégorie"
            value={playerForm.category}
            onChange={(e) => setPlayerForm((prev) => ({ ...prev, category: e.currentTarget.value }))}
            data={categories}
          />
          <Group justify="flex-end" mt="xs">
            <Button variant="light" color="brand" radius="md" leftSection={<IconX size={14} />} onClick={() => setAddPlayerOpen(false)}>
              Annuler
            </Button>
            <Button radius="md" style={{ background: "#04346D", fontWeight: 600 }} onClick={addPlayer}>
              Ajouter le joueur
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
