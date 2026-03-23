"use client";

import { useEffect, useState } from "react";
import { ActionIcon, Button, Group, Skeleton, Stack, Tabs, Title } from "@mantine/core";
import { IconCalendar, IconPlus, IconSettings } from "@tabler/icons-react";
import { initialTeams } from "@/lib/mockupdata/teams/data";
import { TeamFilterPills } from "@/components/scheduling/TeamFilterPills";
import { SchedulerCalendarView } from "@/components/scheduling/SchedulerCalendarView";
import { SchedulerRulesView } from "@/components/scheduling/rules/SchedulerRulesView";

export default function SchedulingPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<string | null>("calendar");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(
    () => new Set(initialTeams.map((t) => t.id))
  );

  useEffect(() => { setMounted(true); }, []);

  function toggleTeam(id: string) {
    setSelectedTeams((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <Tabs value={tab} onChange={setTab} variant="pills" radius="xl">
      <Group justify="space-between" align="center" mb="sm">
        <Group align="center" gap="lg">
          <Title order={1} c="brand.7" fz="1.4rem" visibleFrom="sm">Planification</Title>
          <Tabs.List>
            <Tabs.Tab value="calendar" leftSection={<IconCalendar size={15} />}>Calendrier</Tabs.Tab>
            <Tabs.Tab value="rules" leftSection={<IconSettings size={15} />}>Publications</Tabs.Tab>
          </Tabs.List>
        </Group>
        <Button
          visibleFrom="sm"
          leftSection={<IconPlus size={15} />}
          radius="xl"
          size="sm"
          onClick={() => { setTab("rules"); setCreateOpen(true); }}
        >
          Nouvelle publication
        </Button>
        <ActionIcon
          hiddenFrom="sm"
          radius="xl"
          size="md"
          onClick={() => { setTab("rules"); setCreateOpen(true); }}
        >
          <IconPlus size={16} />
        </ActionIcon>
      </Group>

      <Stack gap="md" mb="lg">
        <TeamFilterPills teams={initialTeams} selectedIds={selectedTeams} onToggle={toggleTeam} />
      </Stack>

      <Tabs.Panel value="calendar">
        {mounted ? <SchedulerCalendarView selectedTeams={selectedTeams} /> : (
          <Stack gap="md">
            <Skeleton height={40} radius="md" />
            <Skeleton height="calc(100vh - 260px)" radius="xl" />
          </Stack>
        )}
      </Tabs.Panel>
      <Tabs.Panel value="rules">
        {mounted ? <SchedulerRulesView selectedTeams={selectedTeams} createOpen={createOpen} onCreateClose={() => setCreateOpen(false)} /> : (
          <Stack gap="sm">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={80} radius="xl" />)}
          </Stack>
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
