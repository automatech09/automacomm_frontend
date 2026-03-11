"use client";

import { useMemo, useState } from "react";
import { Alert, Badge, Box, Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconCalendarClock, IconMessageCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { PostConfigDrawer } from "@/components/PostConfigDrawer";
import type { ScheduleRule } from "@/types";
import { SchedulingRulesDesktop } from "@/components/scheduling/SchedulingRulesDesktop";
import { SchedulingRulesMobile } from "@/components/scheduling/SchedulingRulesMobile";
import { initialRules, momentOptions, teamFilters, teamTags, type TeamFilter } from "./data";

export default function SchedulingPage() {
  const router = useRouter();
  const [rules, setRules] = useState<ScheduleRule[]>(initialRules);
  const [filter, setFilter] = useState<TeamFilter>("Tous");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<ScheduleRule | null>(null);

  const filteredRules = useMemo(() => {
    if (filter === "Tous") return rules;
    return rules.filter((rule) => rule.teams.some((team) => team.label === filter));
  }, [filter, rules]);

  const activeCount = rules.filter((rule) => rule.active).length;
  const customDescriptionCount = rules.filter((rule) => rule.format === "P" && rule.isCustomDescription).length;

  const updateRule = (id: string, patch: Partial<ScheduleRule>) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)));
  };

  const handleEditDescription = (rule: ScheduleRule) => {
    setSelectedRule(rule);
    setDrawerOpen(true);
  };

  const handleSaveDrawer = (rule: ScheduleRule) => {
    updateRule(rule.id, rule);
    notifications.show({ message: "Configuration sauvegardée", color: "green" });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Stack gap={2}>
          <Title order={1} c="brand.7" fz="1.6rem">Planification des publications</Title>
          <Text fz="sm" c="rgba(4,52,109,0.55)" maw={780}>
            Choisissez quand vos visuels doivent se publier automatiquement chaque semaine de match.
          </Text>
        </Stack>
        <Group gap="xs">
          <Badge color="green" variant="light">{activeCount} actives</Badge>
          <Badge color="orange" variant="light" leftSection={<IconMessageCircle size={12} />}>
            {customDescriptionCount} descriptions perso
          </Badge>
        </Group>
      </Group>

      <Group gap="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.1)" }}>
        {teamFilters.map((item) => {
          const isActive = filter === item;
          const borderColor = teamTags[item]?.borderColor ?? "#04346D";

          return (
            <Button
              key={item}
              variant="subtle"
              color="dark"
              px="md"
              onClick={() => setFilter(item)}
              styles={{
                root: {
                  borderBottom: isActive ? `2px solid ${borderColor}` : "2px solid transparent",
                  borderRadius: 0,
                },
                label: {
                  color: isActive ? borderColor : "rgba(4,52,109,0.55)",
                  fontWeight: isActive ? 600 : 500,
                },
              }}
            >
              {item}
            </Button>
          );
        })}
      </Group>

      <Paper withBorder radius="xl" p={0} style={{ overflow: "hidden", boxShadow: "0 6px 18px rgba(4,52,109,0.06)" }}>
        <Box visibleFrom="md">
          <SchedulingRulesDesktop
            rules={filteredRules}
            momentOptions={momentOptions}
            onToggleActive={(id, active) => updateRule(id, { active })}
            onMomentChange={(id, moment) => updateRule(id, { moment })}
            onTimeChange={(id, time) => updateRule(id, { time })}
            onEditDescription={handleEditDescription}
            onEditTemplate={() => router.push("/dashboard/templates")}
          />
        </Box>

        <Box hiddenFrom="md">
          <SchedulingRulesMobile
            rules={filteredRules}
            momentOptions={momentOptions}
            onToggleActive={(id, active) => updateRule(id, { active })}
            onMomentChange={(id, moment) => updateRule(id, { moment })}
            onTimeChange={(id, time) => updateRule(id, { time })}
            onEditDescription={handleEditDescription}
            onEditTemplate={() => router.push("/dashboard/templates")}
          />
        </Box>
      </Paper>

      {filteredRules.length === 0 ? (
        <Paper radius="xl" p="xl" withBorder style={{ borderStyle: "dashed" }}>
          <Stack align="center" gap="xs">
            <Text fz="sm" c="dimmed">Aucune règle pour cette équipe.</Text>
            <Text fz="xs" c="rgba(4,52,109,0.35)">Sélectionnez « Tous » ou créez un template.</Text>
          </Stack>
        </Paper>
      ) : null}

      <Text ta="center" fz="xs" c="rgba(4,52,109,0.35)">
        <Text span fw={600}>S</Text> = Story · <Text span fw={600}>P</Text> = Post · Le format est défini dans chaque template.
      </Text>

      <PostConfigDrawer
        open={drawerOpen}
        config={selectedRule}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveDrawer}
      />
    </Stack>
  );
}
