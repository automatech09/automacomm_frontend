"use client";

import { useMemo, useState } from "react";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { initialPublications } from "@/lib/mockupdata/scheduler/rules";
import { initialTeams } from "@/lib/mockupdata/teams/data";
import type { Publication } from "@/types/scheduling";
import { PublicationCard } from "./PublicationCard";
import { PublicationDrawer } from "./PublicationDrawer";

interface Props {
  selectedTeams: Set<string>;
}

export function SchedulerRulesView({ selectedTeams }: Props) {
  const router = useRouter();
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<Publication | null>(null);

  const allSelected = selectedTeams.size === 0 || selectedTeams.size === initialTeams.length;
  const filtered = useMemo(
    () =>
      allSelected
        ? publications
        : publications.filter((p) => p.teams.some((t) => selectedTeams.has(t.id))),
    [selectedTeams, allSelected, publications]
  );

  function toggleActive(id: string, active: boolean) {
    setPublications((prev) => prev.map((p) => (p.id === id ? { ...p, active } : p)));
  }

  function savePublication(updated: Publication) {
    setPublications((prev) =>
      prev.some((p) => p.id === updated.id)
        ? prev.map((p) => (p.id === updated.id ? updated : p))
        : [...prev, updated]
    );
    notifications.show({ message: "Publication sauvegardée", color: "green" });
  }

  function openCreate() {
    setSelected(null);
    setDrawerOpen(true);
  }

  function openEdit(p: Publication) {
    setSelected(p);
    setDrawerOpen(true);
  }

  return (
    <Stack gap="lg">
      <Group justify="flex-end">
        <Button
          leftSection={<IconPlus size={15} />}
          radius="xl"
          size="sm"
          onClick={openCreate}
        >
          Nouvelle publication
        </Button>
      </Group>

      {filtered.length === 0 ? (
        <Paper radius="xl" p="xl" withBorder style={{ borderStyle: "dashed" }}>
          <Stack align="center" gap="xs">
            <Text fz="sm" c="dimmed">Aucune publication pour cette sélection.</Text>
            <Text fz="xs" c="rgba(4,52,109,0.35)">Désélectionnez un filtre ou créez une publication.</Text>
          </Stack>
        </Paper>
      ) : (
        <Stack gap="sm">
          {filtered.map((p) => (
            <PublicationCard
              key={p.id}
              publication={p}
              onToggle={toggleActive}
              onEdit={openEdit}
              onEditTemplate={() => router.push("/dashboard/templates")}
            />
          ))}
        </Stack>
      )}

      <PublicationDrawer
        open={drawerOpen}
        publication={selected}
        onClose={() => setDrawerOpen(false)}
        onSave={savePublication}
      />
    </Stack>
  );
}
