"use client";

import { useState } from "react";
import { Box, Button, Group, Image, Modal, Stack, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import type { Template } from "@/types";

type Props = { template: Template; opened: boolean; onClose: () => void };

export function EditBackgroundModal({ template, opened, onClose }: Props) {
  const [dragging, setDragging] = useState(false);
  const isStory = template.format === "Story";
  const aspectRatio = isStory ? "9/16" : "1/1";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      radius="xl"
      size={600}
      padding={0}
    >
      <Stack gap={0}>
        {/* Header */}
        <Box px="lg" py="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.07)" }}>
          <Text fw={700} c="brand.7">Modifier l'arrière-plan</Text>
          <Text fz="xs" c="rgba(4,52,109,0.5)" mt={2}>
            {template.name}{template.team ? ` · ${template.team.name}` : ""}
          </Text>
        </Box>

        <Stack p="lg" gap="md">
          <Group gap="md" align="flex-start" grow>
            {/* Current preview */}
            <Stack gap="xs">
              <Text fz="xs" fw={600} c="rgba(4,52,109,0.6)">Aperçu actuel</Text>
              <Box style={{ borderRadius: 12, overflow: "hidden", aspectRatio, border: "2px solid rgba(4,52,109,0.08)", background: "#F5F3EB" }}>
                {template.urlArrierePlan
                  ? <Image src={template.urlArrierePlan} alt="Arrière-plan" h="100%" w="100%" fit="cover" />
                  : <Box style={{ height: "100%", display: "grid", placeItems: "center" }}><Text fz="xs" c="rgba(4,52,109,0.3)">Aucun</Text></Box>
                }
              </Box>
              <Group gap="xs" wrap="wrap" mt={4}>
                <Text fz="xs" px={6} py={2} fw={600} style={{ borderRadius: 99, background: "#04346D", color: "#F5F3EB" }}>{template.name}</Text>
                {template.team && <BadgeTeam teamData={template.team} />}
              </Group>
            </Stack>

            {/* Replace zone */}
            <Stack gap="xs">
              <Text fz="xs" fw={600} c="rgba(4,52,109,0.6)">Remplacer l'image</Text>
              <Box
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                style={{
                  borderRadius: 12, aspectRatio,
                  background: dragging ? "rgba(4,52,109,0.06)" : "#F5F3EB",
                  border: `2px dashed ${dragging ? "#04346D" : "rgba(4,52,109,0.2)"}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: 16, cursor: "pointer",
                }}
              >
                <Box w={40} h={40} style={{ borderRadius: 12, background: dragging ? "#04346D" : "rgba(4,52,109,0.08)", display: "grid", placeItems: "center" }}>
                  <IconUpload size={18} color={dragging ? "white" : "rgba(4,52,109,0.5)"} />
                </Box>
                <Text fz="xs" fw={600} c="brand.7">Glissez une image</Text>
                <Text fz="xs" c="rgba(4,52,109,0.5)">ou cliquez pour changer</Text>
              </Box>
            </Stack>
          </Group>
        </Stack>

        {/* Footer */}
        <Group px="lg" pb="lg" gap="sm">
          <Button variant="light" color="red" onClick={onClose}>Supprimer</Button>
          <Box style={{ flex: 1 }} />
          <Button variant="default" onClick={onClose}>Annuler</Button>
          <Button bg="#04346D" onClick={onClose}>Enregistrer</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
