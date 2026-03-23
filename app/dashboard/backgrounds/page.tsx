"use client";

import { useState } from "react";
import {
  Badge, Box, Button, Group, Image, Paper,
  SimpleGrid, Stack, Text, Title, UnstyledButton,
} from "@mantine/core";
import { IconInfoCircle, IconPlus, IconUpload, IconX } from "@tabler/icons-react";
import { BackgroundCard } from "@/components/backgrounds/BackgroundCard";
import { UploadModal } from "@/components/backgrounds/UploadModal";
import { EditBackgroundModal } from "@/components/backgrounds/EditBackgroundModal";
import { usedBackgrounds, reserveBackgroundUrls } from "@/lib/mockupdata/backgrounds/data";
import type { Template } from "@/types";
import { initialTemplates } from "@/lib/mockupdata/templates/data";
import { initialTeams } from "@/lib/mockupdata/teams/data";

const TABS = ["Vos prochains arrière-plans", "Arrière-plans utilisés", "Réserve aléatoire"] as const;
const TEAM_FILTERS = [
  { label: "Tous", color: "#04346D" },
  ...initialTeams.map((t) => ({ label: t.name, color: t.color })),
];

type TabIndex = 0 | 1 | 2;

export default function BackgroundsPage() {
  const [activeTab, setActiveTab] = useState<TabIndex>(0);
  const [teamFilter, setTeamFilter] = useState("Tous");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editing, setEditing] = useState<{ template: Template } | null>(null);
  const [reserveUrls, setReserveUrls] = useState<string[]>(reserveBackgroundUrls);
  const [draggingReserve, setDraggingReserve] = useState(false);
  const [hoveredUsedId, setHoveredUsedId] = useState<number | null>(null);

  const filtered = teamFilter === "Tous"
    ? initialTemplates
    : initialTemplates.filter((s) => s.team?.name === teamFilter);

  return (
    <Stack gap="lg">
      <Stack gap={2}>
        <Title order={1} c="brand.7" fz="1.6rem">Gestion des arrière-plans</Title>
        <Text fz="sm" c="rgba(4,52,109,0.5)">Gérez les visuels utilisés en arrière-plan de vos publications.</Text>
      </Stack>

      {/* Tab selector */}
      <Paper p={4} radius="xl" withBorder style={{ width: "fit-content", borderColor: "rgba(4,52,109,0.07)" }}>
        <Group gap={4}>
          {TABS.map((tab, i) => (
            <UnstyledButton
              key={tab}
              onClick={() => setActiveTab(i as TabIndex)}
              px="md" py="xs"
              style={{
                borderRadius: 10,
                background: activeTab === i ? "#04346D" : "transparent",
                color: activeTab === i ? "white" : "rgba(4,52,109,0.6)",
              }}
            >
              <Text fz="sm" fw={activeTab === i ? 600 : 400}>{tab}</Text>
            </UnstyledButton>
          ))}
        </Group>
      </Paper>

      {/* Tab 0 — Prochains */}
      {activeTab === 0 && (
        <Stack gap="md">
          <Group gap="sm" style={{ borderBottom: "1px solid rgba(4,52,109,0.1)" }}>
            {TEAM_FILTERS.map(({ label, color }) => {
              const isActive = label === teamFilter;
              return (
                <UnstyledButton
                  key={label}
                  onClick={() => setTeamFilter(label)}
                  px="md" py="sm"
                  style={{ position: "relative", color: isActive ? color : "rgba(4,52,109,0.5)", fontWeight: isActive ? 600 : 500 }}
                >
                  <Text fz="sm">{label}</Text>
                  {isActive && <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: color }} />}
                </UnstyledButton>
              );
            })}
          </Group>

          <Group justify="space-between">
            <Text fz="sm" c="rgba(4,52,109,0.6)">
              {filtered.length} arrière-plan{filtered.length > 1 ? "s" : ""} programmé{filtered.length > 1 ? "s" : ""}
            </Text>
            <Button leftSection={<IconPlus size={16} />} bg="#04346D" onClick={() => setUploadOpen(true)}>
              Ajouter un arrière-plan
            </Button>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" style={{ alignItems: "end" }}>
            {filtered.map((template) => (
              <BackgroundCard
                key={template.id}
                template={template}
                onClick={() => setEditing({ template })}
              />
            ))}
          </SimpleGrid>
        </Stack>
      )}

      {/* Tab 1 — Utilisés */}
      {activeTab === 1 && (
        <Stack gap="md">
          <Text fz="sm" c="rgba(4,52,109,0.6)">
            {usedBackgrounds.length} arrière-plan{usedBackgrounds.length > 1 ? "s" : ""} utilisé{usedBackgrounds.length > 1 ? "s" : ""} · Survolez pour voir la date.
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="sm">
            {usedBackgrounds.map((bg) => (
              <Box
                key={bg.id}
                onMouseEnter={() => setHoveredUsedId(bg.id)}
                onMouseLeave={() => setHoveredUsedId(null)}
                style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1", cursor: "pointer" }}
              >
                <Image src={bg.imageUrl} alt="Arrière-plan utilisé" h="100%" w="100%" fit="cover" />
                <Box
                  style={{
                    position: "absolute", inset: 0,
                    background: "rgba(4,52,109,0.65)",
                    opacity: hoveredUsedId === bg.id ? 1 : 0,
                    transition: "opacity 200ms",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                  }}
                >
                  <Text c="white" fz="xs" fw={600}>Utilisé le</Text>
                  <Text c="rgba(255,255,255,0.8)" fz="xs">{bg.usedDate}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      )}

      {/* Tab 2 — Réserve */}
      {activeTab === 2 && (
        <Stack gap="md">
          <Paper p="md" radius="xl" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
            <Group gap="sm" wrap="nowrap" align="flex-start">
              <IconInfoCircle size={18} color="#04346D" style={{ flexShrink: 0, marginTop: 2 }} />
              <Stack gap={2}>
                <Text fz="sm" fw={600} c="brand.7">Réserve aléatoire</Text>
                <Text fz="xs" c="rgba(4,52,109,0.6)" lh={1.6}>
                  Les images ici seront utilisées automatiquement et aléatoirement pour vos prochaines publications. Une image différente est sélectionnée à chaque nouveau visuel publié.
                </Text>
              </Stack>
            </Group>
          </Paper>

          <Box
            onDragOver={(e) => { e.preventDefault(); setDraggingReserve(true); }}
            onDragLeave={() => setDraggingReserve(false)}
            onDrop={(e) => { e.preventDefault(); setDraggingReserve(false); setReserveUrls((prev) => [...prev, reserveBackgroundUrls[0]]); }}
            style={{
              borderRadius: 16, padding: "2rem",
              background: draggingReserve ? "rgba(4,52,109,0.06)" : "#F5F3EB",
              border: `2px dashed ${draggingReserve ? "#04346D" : "rgba(4,52,109,0.2)"}`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer",
            }}
          >
            <Box w={48} h={48} style={{ borderRadius: 16, background: draggingReserve ? "#04346D" : "rgba(4,52,109,0.08)", display: "grid", placeItems: "center" }}>
              <IconUpload size={22} color={draggingReserve ? "white" : "rgba(4,52,109,0.4)"} />
            </Box>
            <Stack gap={2} style={{ textAlign: "center" }}>
              <Text fz="sm" fw={600} c="brand.7">Glissez vos images ici</Text>
              <Text fz="xs" c="rgba(4,52,109,0.5)">ou cliquez pour sélectionner · JPG, PNG, WEBP</Text>
            </Stack>
          </Box>

          {reserveUrls.length > 0 ? (
            <Stack gap="xs">
              <Text fz="sm" fw={600} c="brand.7">{reserveUrls.length} image{reserveUrls.length > 1 ? "s" : ""} dans la réserve</Text>
              <SimpleGrid cols={{ base: 2, sm: 3, lg: 5 }} spacing="sm">
                {reserveUrls.map((url, i) => (
                  <Box
                    key={i}
                    style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1" }}
                    onMouseEnter={(e) => { const el = e.currentTarget.querySelector<HTMLElement>("[data-overlay]"); if (el) el.style.opacity = "1"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget.querySelector<HTMLElement>("[data-overlay]"); if (el) el.style.opacity = "0"; }}
                  >
                    <Image src={url} alt="Réserve" h="100%" w="100%" fit="cover" />
                    <Box
                      data-overlay
                      style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", opacity: 0, transition: "opacity 200ms", display: "grid", placeItems: "center" }}
                    >
                      <UnstyledButton
                        onClick={() => setReserveUrls((prev) => prev.filter((_, idx) => idx !== i))}
                        style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "grid", placeItems: "center" }}
                      >
                        <IconX size={16} color="#EF4444" />
                      </UnstyledButton>
                    </Box>
                    <Badge size="xs" style={{ position: "absolute", bottom: 6, left: 6, background: "rgba(4,52,109,0.7)", color: "white" }}>
                      #{i + 1}
                    </Badge>
                  </Box>
                ))}
                <UnstyledButton
                  onClick={() => setReserveUrls((prev) => [...prev, reserveBackgroundUrls[0]])}
                  style={{ borderRadius: 12, aspectRatio: "1", background: "rgba(4,52,109,0.04)", border: "1.5px dashed rgba(4,52,109,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  <IconPlus size={18} color="rgba(4,52,109,0.35)" />
                  <Text fz="xs" c="rgba(4,52,109,0.4)">Ajouter</Text>
                </UnstyledButton>
              </SimpleGrid>
            </Stack>
          ) : (
            <Stack align="center" py="xl" gap="xs">
              <Text fz="sm" c="rgba(4,52,109,0.4)">Aucune image dans la réserve.</Text>
              <Text fz="xs" c="rgba(4,52,109,0.3)">Ajoutez des images ci-dessus pour commencer.</Text>
            </Stack>
          )}
        </Stack>
      )}

      <UploadModal opened={uploadOpen} onClose={() => setUploadOpen(false)} />
      {editing && (
        <EditBackgroundModal
          template={editing.template}
          opened
          onClose={() => setEditing(null)}
        />
      )}
    </Stack>
  );
}
