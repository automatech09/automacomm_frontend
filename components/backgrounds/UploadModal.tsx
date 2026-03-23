"use client";

import { useState } from "react";
import { Box, Button, Group, Modal, NativeSelect, Stack, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { initialTeams } from "@/lib/mockupdata/teams/data";

type Props = { opened: boolean; onClose: () => void };

export function UploadModal({ opened, onClose }: Props) {
  const [dragging, setDragging] = useState(false);
  const [fileReady, setFileReady] = useState(false);

  return (
    <Modal opened={opened} onClose={onClose} title={<Text fw={700} c="brand.7">Ajouter un arrière-plan</Text>} centered radius="xl">
      <Stack gap="md">
        <Box
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); setFileReady(true); }}
          style={{
            borderRadius: 16, padding: "2rem", textAlign: "center", cursor: "pointer",
            background: dragging ? "rgba(4,52,109,0.06)" : "#F5F3EB",
            border: `2px dashed ${dragging ? "#04346D" : "rgba(4,52,109,0.2)"}`,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          }}
        >
          <Box w={48} h={48} style={{ borderRadius: 16, background: dragging ? "#04346D" : "rgba(4,52,109,0.08)", display: "grid", placeItems: "center" }}>
            <IconUpload size={22} color={dragging ? "white" : "rgba(4,52,109,0.5)"} />
          </Box>
          <Stack gap={2}>
            <Text fz="sm" fw={600} c="brand.7">Glissez vos images ici</Text>
            <Text fz="xs" c="rgba(4,52,109,0.5)">ou cliquez pour sélectionner — JPG, PNG, WEBP</Text>
          </Stack>
          {fileReady && (
            <Box px="sm" py={4} style={{ borderRadius: 8, background: "rgba(15,155,88,0.1)", display: "flex", alignItems: "center", gap: 8 }}>
              <Box w={8} h={8} style={{ borderRadius: "50%", background: "#0F9B58" }} />
              <Text fz="xs" c="#0F9B58" fw={600}>1 fichier prêt</Text>
            </Box>
          )}
        </Box>

        <Stack gap="xs">
          <Text fz="sm" fw={600} c="brand.7">Attribuer à un visuel</Text>
          <NativeSelect label="Équipe concernée" data={["Toutes", ...initialTeams.map((t) => t.name)]} />
          <NativeSelect label="Template visuel" data={["Résultat victoire", "Résultat défaite", "Affiche match", "Classement semaine", "Calendrier mensuel"]} />
        </Stack>

        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose}>Annuler</Button>
          <Button bg="#04346D" onClick={onClose}>Ajouter l'arrière-plan</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
