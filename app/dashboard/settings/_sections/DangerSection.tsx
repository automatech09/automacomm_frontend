"use client";

import { useState } from "react";
import { Stack, Group, Box, Text, Paper, Button, Modal, Title } from "@mantine/core";
import { IconTrash, IconAlertTriangle } from "@tabler/icons-react";

export function DangerSection() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Paper radius="xl" p="xl" style={{ background: "white", border: "1.5px solid rgba(239,68,68,0.2)" }}>
        <Stack gap="md">
          <Stack gap={2}>
            <Text fw={700} style={{ color: "#DC2626" }}>Zone de danger</Text>
            <Text fz="xs" style={{ color: "rgba(239,68,68,0.6)" }}>Ces actions sont définitives et irréversibles</Text>
          </Stack>

          <Box p="md" style={{ borderRadius: 12, background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.1)" }}>
            <Group justify="space-between">
              <Stack gap={2}>
                <Text fz="sm" fw={600} style={{ color: "#DC2626" }}>Supprimer le compte</Text>
                <Text fz="xs" style={{ color: "rgba(239,68,68,0.65)", lineHeight: 1.5 }}>
                  Supprime définitivement le compte, toutes vos données, templates et publications.
                </Text>
              </Stack>
              <Button
                onClick={() => setShowConfirm(true)}
                leftSection={<IconTrash size={13} />}
                size="xs"
                style={{ background: "rgba(239,68,68,0.1)", color: "#DC2626", border: "1.5px solid rgba(239,68,68,0.2)", fontWeight: 600, borderRadius: 10, flexShrink: 0 }}
              >
                Supprimer
              </Button>
            </Group>
          </Box>
        </Stack>
      </Paper>

      <Modal
        opened={showConfirm}
        onClose={() => setShowConfirm(false)}
        withCloseButton={false}
        radius="lg" centered
        styles={{ overlay: { backdropFilter: "blur(4px)" } }}
      >
        <Stack align="center" ta="center" mb="md">
          <Box w={54} h={54} style={{ background: "rgba(239,68,68,0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconAlertTriangle size={26} color="#EF4444" />
          </Box>
          <Title order={4} style={{ color: "#DC2626", fontWeight: 700 }}>Supprimer le compte ?</Title>
          <Text fz="sm" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.6 }}>
            Cette action est <strong style={{ color: "#DC2626" }}>irréversible</strong>. Toutes vos données (équipes, templates, publications, arrière-plans) seront définitivement supprimées.
          </Text>
        </Stack>
        <Group grow>
          <Button radius="md" style={{ background: "#04346D", color: "white", fontWeight: 600 }} onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button radius="md" style={{ background: "#DC2626", fontWeight: 600 }} onClick={() => setShowConfirm(false)}>
            Supprimer définitivement
          </Button>
        </Group>
      </Modal>
    </>
  );
}
