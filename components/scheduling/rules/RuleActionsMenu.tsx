import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconFileText, IconMessageCircle } from "@tabler/icons-react";
import type { ScheduleRule } from "@/types";

interface Props {
  rule: ScheduleRule;
  onEditDescription: (rule: ScheduleRule) => void;
  onEditTemplate: () => void;
}

export function RuleActionsMenu({ rule, onEditDescription, onEditTemplate }: Props) {
  return (
    <Menu shadow="md" position="bottom-end" withinPortal radius="lg">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" radius="xl">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {rule.format === "P" && (
          <Menu.Item leftSection={<IconMessageCircle size={14} />} onClick={() => onEditDescription(rule)}>
            Modifier la description
          </Menu.Item>
        )}
        <Menu.Item leftSection={<IconFileText size={14} />} onClick={onEditTemplate}>
          Modifier le template
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
