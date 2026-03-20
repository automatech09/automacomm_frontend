"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ActionIcon, Box, Button, Group, Skeleton, Tabs, Title } from "@mantine/core";
import { IconCalendar, IconPlus, IconSettings } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { SchedulerRulesView } from "@/components/scheduling/SchedulerRulesView";

const SchedulerCalendarView = dynamic(
  () => import("@/components/scheduling/SchedulerCalendarView").then((m) => ({ default: m.SchedulerCalendarView })),
  {
    ssr: false,
    loading: () => (
      <Box>
        <Skeleton height={40} radius="xl" mb="md" />
        <Skeleton height={620} radius="xl" />
      </Box>
    ),
  }
);

export default function SchedulingPage() {
  const [tab, setTab] = useState<string | null>("calendar");

  return (
    <Tabs value={tab} onChange={setTab} variant="pills" radius="xl">
      <Group justify="space-between" align="center" mb="lg">
        <Group align="center" gap="lg">
          <Title order={1} c="brand.7" fz="1.4rem" visibleFrom="sm">Planification</Title>
          <Tabs.List>
            <Tabs.Tab value="calendar" leftSection={<IconCalendar size={15} />}>Calendrier</Tabs.Tab>
            <Tabs.Tab value="rules" leftSection={<IconSettings size={15} />}>Règles</Tabs.Tab>
          </Tabs.List>
        </Group>
        {tab === "calendar" && (
          <>
            <Button
              visibleFrom="sm"
              leftSection={<IconPlus size={15} />}
              radius="xl"
              size="sm"
              onClick={() => notifications.show({ message: "Fonctionnalité bientôt disponible", color: "blue" })}
            >
              Programmer un visuel
            </Button>
            <ActionIcon
              hiddenFrom="sm"
              radius="xl"
              size="md"
              onClick={() => notifications.show({ message: "Fonctionnalité bientôt disponible", color: "blue" })}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </>
        )}
      </Group>

      <Tabs.Panel value="calendar">
        <SchedulerCalendarView />
      </Tabs.Panel>
      <Tabs.Panel value="rules">
        <SchedulerRulesView />
      </Tabs.Panel>
    </Tabs>
  );
}
