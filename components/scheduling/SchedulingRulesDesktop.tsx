import { Badge, Group, NativeSelect, Switch, Table, TextInput } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import type { ScheduleRule } from "@/types";
import { TeamPill } from "./TeamPill";
import { RuleActionsMenu } from "./RuleActionsMenu";

type SchedulingRulesDesktopProps = {
  rules: ScheduleRule[];
  momentOptions: string[];
  onToggleActive: (id: string, active: boolean) => void;
  onMomentChange: (id: string, moment: string) => void;
  onTimeChange: (id: string, time: string) => void;
  onEditDescription: (rule: ScheduleRule) => void;
  onEditTemplate: () => void;
};

export function SchedulingRulesDesktop({
  rules,
  momentOptions,
  onToggleActive,
  onMomentChange,
  onTimeChange,
  onEditDescription,
  onEditTemplate,
}: SchedulingRulesDesktopProps) {
  return (
    <Table.ScrollContainer minWidth={980}>
      <Table
        verticalSpacing="sm"
        horizontalSpacing="md"
        highlightOnHover
        withRowBorders
        styles={{
          thead: {
            background: "linear-gradient(90deg, rgba(4,52,109,0.045), rgba(4,52,109,0.015))",
          },
          th: {
            color: "rgba(4,52,109,0.55)",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            fontWeight: 700,
          },
          td: {
            borderColor: "rgba(4,52,109,0.06)",
          },
          tr: {
            transition: "background-color 120ms ease",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom du visuel</Table.Th>
            <Table.Th>Équipe(s)</Table.Th>
            <Table.Th ta="center">Actif</Table.Th>
            <Table.Th>Moment de publication</Table.Th>
            <Table.Th>Heure</Table.Th>
            <Table.Th>Modifier</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rules.map((rule) => (
            <Table.Tr key={rule.id}>
              <Table.Td>
                <Group gap="xs" wrap="nowrap">
                  <Badge variant="light" color="brand" radius="lg" py={0}>
                    {rule.format}
                  </Badge>
                  <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>
                    {rule.visualType}
                  </Badge>
                  {rule.format === "P" && rule.isCustomDescription ? (
                    <IconMessageCircle size={14} color="#FF6B35" />
                  ) : null}
                </Group>
              </Table.Td>

              <Table.Td>
                <Group gap="xs" wrap="wrap">
                  {rule.teams.map((team) => (
                    <TeamPill key={`${rule.id}-${team.label}`} tag={team} />
                  ))}
                </Group>
              </Table.Td>

              <Table.Td>
                <Group justify="center">
                  <Switch
                    color="brand"
                    checked={rule.active}
                    onChange={(event) => onToggleActive(rule.id, event.currentTarget.checked)}
                  />
                </Group>
              </Table.Td>

              <Table.Td>
                <NativeSelect
                  size="sm"
                  value={rule.moment}
                  onChange={(event) => onMomentChange(rule.id, event.currentTarget.value)}
                  data={momentOptions}
                />
              </Table.Td>

              <Table.Td>
                <TextInput
                  size="sm"
                  type="time"
                  value={rule.time}
                  onChange={(event) => onTimeChange(rule.id, event.currentTarget.value)}
                />
              </Table.Td>

              <Table.Td>
                <Group justify="center">
                  <RuleActionsMenu
                    rule={rule}
                    onEditDescription={onEditDescription}
                    onEditTemplate={onEditTemplate}
                  />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
