"use client";

import { useState } from "react";
import { ActionIcon, Box, Button, FileButton, Group, Loader, Image,  Modal, Paper, Popover, Stack, Text, TextInput, Title, Tooltip, UnstyledButton } from "@mantine/core";
import { IconArrowLeft, IconCheck, IconRefresh, IconUpload, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { opponentTeams, resetTeamOverrides, saveTeamOverrides } from "@/lib/mockupdata/opponent-teams/data";
import type { OpponentTeam } from "@/types";

type EditMap = Record<number, { name: string; shortName: string; logoUrl: string }>;

function TeamLogo({ logoUrl, size = 40, onClick }: { size?: number; logoUrl?: string; onClick?: () => void }) {
  return (
    <Box
      onClick={onClick}
      w={size} h={size}
      style={{ borderRadius: size * 0.25, overflow: "hidden", flexShrink: 0, cursor: onClick ? "pointer" : "default", background: "rgba(4,52,109,0.06)" }}
    >
      <Image src={logoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
    </Box>
  );
}

const toEditEntry = (t: OpponentTeam) => ({ name: t.name, shortName: t.shortName, logoUrl: t.logoUrl });

const initialEdits: EditMap = Object.fromEntries(opponentTeams.map((t) => [t.id, toEditEntry(t)]));
const initialSaved: EditMap = Object.fromEntries(opponentTeams.map((t) => [t.id, toEditEntry(t)]));

export default function OpponentTeamsPage() {
  const [edits, setEdits] = useState<EditMap>(initialEdits);
  const [savedState, setSavedState] = useState<EditMap>(initialSaved);
  const [saving, setSaving] = useState(false);
  const [saveDone, setSaveDone] = useState(false);
  const [resetting, setResetting] = useState<number | null>(null);
  const [openedPopover, setOpenedPopover] = useState<number | null>(null);
  const [logoModal, setLogoModal] = useState<{ id: number; draft: string } | null>(null);

  const update = (id: number, field: keyof EditMap[number], value: string) =>
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

  const hasChanges = opponentTeams.some((t) => {
    const e = edits[t.id], s = savedState[t.id];
    return e.name !== s.name || e.shortName !== s.shortName || e.logoUrl !== s.logoUrl;
  });

  const handleReset = async (id: number) => {
    setOpenedPopover(null);
    setResetting(id);
    const official = await resetTeamOverrides(id);
    setEdits((prev) => ({ ...prev, [id]: official }));
    setSavedState((prev) => ({ ...prev, [id]: official }));
    setResetting(null);
  };

  const handleSave = async () => {
    setSaving(true);
    const changed = opponentTeams.filter((t) => {
      const e = edits[t.id], s = savedState[t.id];
      return e.name !== s.name || e.shortName !== s.shortName || e.logoUrl !== s.logoUrl;
    });
    await Promise.all(changed.map((t) => saveTeamOverrides(t.id, edits[t.id])));
    setSavedState({ ...edits });
    setSaving(false);
    setSaveDone(true);
    setTimeout(() => setSaveDone(false), 2000);
  };

  const openLogoModal = (id: number) => setLogoModal({ id, draft: edits[id].logoUrl });

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setLogoModal((m) => m ? { ...m, draft: URL.createObjectURL(file) } : m);
  };

  const confirmLogo = () => {
    if (!logoModal) return;
    update(logoModal.id, "logoUrl", logoModal.draft);
    setLogoModal(null);
  };

  const modalTeam = logoModal ? opponentTeams.find((t) => t.id === logoModal.id) : null;

  return (
    <Stack gap="xl" maw={760}>
      <Stack gap={4}>
        <Group gap="sm">
          <Box
            component={Link} href="/dashboard/settings"
            style={{ display: "flex", alignItems: "center", color: "rgba(4,52,109,0.45)", textDecoration: "none" }}
          >
            <IconArrowLeft size={18} />
          </Box>
          <Title order={2} style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Informations des équipes adverses</Title>
        </Group>
      
        <Text fz="sm" style={{ color: "rgba(4,52,109,0.5)" }}>
          Modifiez les noms des équipes que vous affrontez. Cliquez sur le logo pour le modifier si vous souhaitez utilisé votre propre version.
        </Text>
      </Stack>

      

      <Stack gap="sm">
        <Group px="xl" gap="md">
          <Tooltip label="Le nom complet est le nom entier du club (ex: Rugby Club Toulonnais)" position="top" withArrow radius="md">
            <Text fz={11} fw={600} ta="center" style={{ color: "rgba(4,52,109,0.35)", flex: 2, cursor: "default" }}>NOM COMPLET</Text>
          </Tooltip>
          <Tooltip label="Le nom court est utilisé dans les espaces réduits (ex : score en live, descriptions...)." position="top" withArrow radius="md">
            <Text fz={11} fw={600} ta="center" style={{ color: "rgba(4,52,109,0.35)", flex: 1, cursor: "default" }}>NOM SIMPLE</Text>
          </Tooltip>
          <Tooltip label="Logo de chaque équipe. Cliquez pour le modifier." position="top" withArrow radius="md">
            <Text fz={11} fw={600} ta="center" style={{ color: "rgba(4,52,109,0.35)", width: 40, flexShrink: 0, cursor: "default" }}>LOGO</Text>
          </Tooltip>
          <Box w={28} style={{ flexShrink: 0 }} />
        </Group>
        {opponentTeams.map((team) => {
          const edit = edits[team.id];
          const isResetting = resetting === team.id;
          return (
            <Paper key={team.id} radius="xl" px="xl" py="sm" withBorder>
              <Group gap="md" wrap="nowrap">
                <TextInput
                  value={edit.name}
                  onChange={(e) => update(team.id, "name", e.currentTarget.value)}
                  radius="lg"
                  style={{ flex: 2 }}
                  styles={{ input: { border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" } }}
                />
                <TextInput
                  value={edit.shortName}
                  onChange={(e) => update(team.id, "shortName", e.currentTarget.value)}
                  radius="lg"
                  style={{ flex: 1 }}
                  styles={{ input: { border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" } }}
                />
                <TeamLogo logoUrl={edit.logoUrl} onClick={() => openLogoModal(team.id)} />

                <Popover width={210} position="left" withArrow shadow="sm" radius="lg" opened={openedPopover === team.id} onChange={(o) => setOpenedPopover(o ? team.id : null)}>
                  <Popover.Target>
                    <ActionIcon
                      variant="subtle" size="md" loading={isResetting}
                      onClick={() => setOpenedPopover(openedPopover === team.id ? null : team.id)}
                    >
                      {isResetting ? <Loader size={14} /> : <IconRefresh size={15} color="rgba(4,52,109,0.4)" />}
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown style={{ border: "1px solid rgba(4,52,109,0.1)" }}>
                    <Stack gap="sm">
                      <Text fz="xs" style={{ color: "#04346D" }}>Réinitialiser les données de cette équipe ?</Text>
                      <Group gap="xs" justify="flex-end">
                        <Button size="xs" variant="subtle" color="red" onClick={() => handleReset(team.id)}>
                          Confirmer
                        </Button>
                      </Group>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            </Paper>
          );
        })}
      </Stack>

      <Group justify="flex-end">
        <Button
          leftSection={saveDone ? <IconCheck size={14} /> : undefined}
          loading={saving}
          disabled={!hasChanges}
          onClick={handleSave}
          style={{ background: "#04346D", borderRadius: 10, opacity: hasChanges ? 1 : 0.4 }}
        >
          {saveDone ? "Enregistré !" : "Enregistrer les modifications"}
        </Button>
      </Group>

      <Modal
        opened={!!logoModal}
        onClose={() => setLogoModal(null)}
        title={<Text fw={700} style={{ color: "#04346D" }}>Logo — {modalTeam?.name}</Text>}
        radius="xl" centered
        styles={{ header: { borderBottom: "1px solid rgba(4,52,109,0.07)" }, body: { padding: "24px" } }}
      >
        {logoModal && modalTeam && (
          <Stack gap="lg">
            <FileButton onChange={handleFileSelect} accept="image/*">
              {(props) => (
                <UnstyledButton {...props} style={{ display: "block" }}>
                  <Box
                    style={{
                      border: `2px dashed ${logoModal.draft ? "rgba(4,52,109,0.15)" : "rgba(4,52,109,0.2)"}`,
                      borderRadius: 20, padding: "32px 24px",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                      background: "rgba(4,52,109,0.02)", cursor: "pointer",
                    }}
                  >
                        <Image src={logoModal.draft} alt="" style={{ width: 88, height: 88, objectFit: "contain", borderRadius: 14 }} />
                        <Text fz="xs" c="rgba(4,52,109,0.4)">Cliquez pour changer l&apos;image</Text>
                  </Box>
                </UnstyledButton>
              )}
            </FileButton>

            <Group justify="flex-end" gap="sm">
              <Button variant="subtle" onClick={() => setLogoModal(null)} style={{ color: "rgba(4,52,109,0.5)" }}>Annuler</Button>
              <Button onClick={confirmLogo} style={{ background: "#04346D", borderRadius: 10 }}>Confirmer</Button>
            </Group>
          </Stack>
        )}
      </Modal>

    </Stack>
  );
}
