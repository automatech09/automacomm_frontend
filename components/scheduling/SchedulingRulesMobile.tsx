import { Badge, Group, NativeSelect, Stack, Switch, TextInput } from "@mantine/core";
import type { ScheduleRule } from "@/types";
import { RuleActionsMenu } from "./RuleActionsMenu";
import { TeamPill } from "./TeamPill";

type SchedulingRulesMobileProps = {
  rules: ScheduleRule[];
  momentOptions: string[];
  onToggleActive: (id: string, active: boolean) => void;
  onMomentChange: (id: string, moment: string) => void;
  onTimeChange: (id: string, time: string) => void;
  onEditDescription: (rule: ScheduleRule) => void;
  onEditTemplate: () => void;
};

export function SchedulingRulesMobile({
  rules,
  momentOptions,
  onToggleActive,
  onMomentChange,
  onTimeChange,
  onEditDescription,
  onEditTemplate,
}: SchedulingRulesMobileProps) {
  return (
    <Stack gap={0}>
      {rules.map((rule, index) => (
        <Stack
          key={rule.id}
          p="md"
          gap="sm"
          style={{
            borderBottom: index === rules.length - 1 ? "none" : "1px solid rgba(4,52,109,0.06)",
          }}
        >
          <Group justify="space-between">
            <Group gap="xs">
              <Badge variant="light" color="brand" radius="sm">
                {rule.format}
              </Badge>
              <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>
                {rule.visualType}
              </Badge>
            </Group>
            <Group gap="xs">
              <Switch
                color="brand"
                checked={rule.active}
                onChange={(event) => onToggleActive(rule.id, event.currentTarget.checked)}
              />
              <RuleActionsMenu
                rule={rule}
                onEditDescription={onEditDescription}
                onEditTemplate={onEditTemplate}
              />
            </Group>
          </Group>

          <Group gap="xs" wrap="wrap">
            {rule.teams.map((team) => (
              <TeamPill key={`${rule.id}-mobile-${team.label}`} tag={team} />
            ))}
          </Group>

          <Group grow>
            <NativeSelect
              size="sm"
              value={rule.moment}
              onChange={(event) => onMomentChange(rule.id, event.currentTarget.value)}
              data={momentOptions}
            />
            <TextInput
              size="sm"
              type="time"
              value={rule.time}
              onChange={(event) => onTimeChange(rule.id, event.currentTarget.value)}
            />
          </Group>
        </Stack>
      ))}
    </Stack>
  );
}
