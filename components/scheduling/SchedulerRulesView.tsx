"use client";

import { useMemo, useState } from "react";
import { Badge, Box, Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconBolt, IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { RuleCard } from "./RuleCard";
import { PostConfigDrawer } from "@/components/PostConfigDrawer";
import { initialRules, teamFilters, teamTags, type TeamFilter } from "@/app/dashboard/scheduling/data";
import type { ScheduleRule } from "@/types";

const MOMENT_SHORT: Record<string, string> = {
  "J-4": "J-4",
  "J-3": "J-3",
  "J-2": "J-2",
  "J-1 (veille du match)": "Veille",
  "Jour J": "Jour J",
  "J+1 (lendemain)": "Lendemain",
  "J+2": "J+2",
  "J+3": "J+3",
  "J+4": "J+4",
  Lundi: "Lundi",
  Mardi: "Mardi",
  Mercredi: "Mercredi",
  Jeudi: "Jeudi",
  Vendredi: "Vendredi",
  Samedi: "Samedi",
  Dimanche: "Dimanche",
};

function StrategySummary({ rules }: { rules: ScheduleRule[] }) {
  const activeRules = rules.filter((r) => r.active);
  if (activeRules.length === 0) return null;

  const VISUAL_COLORS: Record<string, string> = {
    Résultat: "#0A5EBF",
    Classement: "#D4640A",
    Affiche: "#7A0FB0",
    "Score en direct": "#0F9B58",
  };

  return (
    <Paper
      radius="xl"
      p="md"
      style={{
        background: "linear-gradient(135deg, #F0F6FF 0%, #F8F0FF 100%)",
        border: "1px solid rgba(4,52,109,0.1)",
      }}
    >
      <Group gap="xs" mb={8}>
        <IconBolt size={16} color="#04346D" />
        <Text fz="sm" fw={700} c="brand.7">
          Votre stratégie de publication
        </Text>
      </Group>
      <Group gap={6} wrap="wrap">
        {activeRules.map((rule) => {
          const momentLabel = MOMENT_SHORT[rule.moment] ?? rule.moment;
          const color = VISUAL_COLORS[rule.visualType] ?? "#04346D";
          return (
            <Badge
              key={rule.id}
              size="sm"
              variant="light"
              style={{
                backgroundColor: "white",
                color,
                border: `1px solid ${color}30`,
                fontWeight: 500,
              }}
            >
              {momentLabel} · {rule.visualType}
            </Badge>
          );
        })}
      </Group>
    </Paper>
  );
}

export function SchedulerRulesView() {
  const router = useRouter();
  const [rules, setRules] = useState<ScheduleRule[]>(initialRules);
  const [filter, setFilter] = useState<TeamFilter>("Tous");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<ScheduleRule | null>(null);

  const filteredRules = useMemo(() => {
    if (filter === "Tous") return rules;
    return rules.filter((r) => r.teams.some((t) => t.label === filter));
  }, [filter, rules]);

  const updateRule = (id: string, patch: Partial<ScheduleRule>) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const handleSaveDrawer = (rule: ScheduleRule) => {
    updateRule(rule.id, rule);
    notifications.show({ message: "Configuration sauvegardée", color: "green" });
  };

  return (
    <Stack gap="lg">
      <StrategySummary rules={rules} />

      {/* Filter + Add */}
      <Group justify="space-between" wrap="wrap" gap="sm">
        <Group gap={6} style={{ borderBottom: "1px solid rgba(4,52,109,0.08)", paddingBottom: 0 }}>
          {teamFilters.map((item) => {
            const isActive = filter === item;
            const borderColor = teamTags[item]?.borderColor ?? "#04346D";
            return (
              <Button
                key={item}
                variant="subtle"
                color="dark"
                size="sm"
                px="md"
                onClick={() => setFilter(item)}
                styles={{
                  root: {
                    borderBottom: isActive ? `2px solid ${borderColor}` : "2px solid transparent",
                    borderRadius: 0,
                  },
                  label: {
                    color: isActive ? borderColor : "rgba(4,52,109,0.5)",
                    fontWeight: isActive ? 600 : 500,
                  },
                }}
              >
                {item}
              </Button>
            );
          })}
        </Group>
        <Button
          leftSection={<IconPlus size={15} />}
          variant="light"
          radius="xl"
          size="sm"
          onClick={() =>
            notifications.show({ message: "Fonctionnalité bientôt disponible", color: "blue" })
          }
        >
          Ajouter une règle
        </Button>
      </Group>

      {/* Rules list */}
      {filteredRules.length === 0 ? (
        <Paper radius="xl" p="xl" withBorder style={{ borderStyle: "dashed" }}>
          <Stack align="center" gap="xs">
            <Text fz="sm" c="dimmed">Aucune règle pour cette équipe.</Text>
            <Text fz="xs" c="rgba(4,52,109,0.35)">Sélectionnez « Tous » ou créez un template.</Text>
          </Stack>
        </Paper>
      ) : (
        <Stack gap="sm">
          {filteredRules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onToggle={(id, active) => updateRule(id, { active })}
              onEdit={(r) => {
                setSelectedRule(r);
                setDrawerOpen(true);
              }}
              onEditTemplate={() => router.push("/dashboard/templates")}
            />
          ))}
        </Stack>
      )}

      <PostConfigDrawer
        open={drawerOpen}
        config={selectedRule}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveDrawer}
      />
    </Stack>
  );
}
