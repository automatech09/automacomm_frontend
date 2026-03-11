import { ActionIcon, Box, Menu } from "@mantine/core";
import { IconDotsVertical, IconFileText, IconMessageCircle } from "@tabler/icons-react";
import type { ScheduleRule } from "@/types";

type RuleActionsMenuProps = {
  rule: ScheduleRule;
  onEditDescription: (rule: ScheduleRule) => void;
  onEditTemplate: () => void;
};

export function RuleActionsMenu({ rule, onEditDescription, onEditTemplate }: RuleActionsMenuProps) {
  return (
    <Menu shadow="md" position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon variant="light" color="brand" radius="md" aria-label="Options de modification">
          <IconDotsVertical size={15} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {rule.format === "P" ? (
          <Menu.Item
            leftSection={<IconMessageCircle size={14} />}
            rightSection={
              rule.isCustomDescription ? (
                <Box w={7} h={7} style={{ borderRadius: "50%", background: "#FF6B35" }} />
              ) : null
            }
            onClick={() => onEditDescription(rule)}
          >
            Modifier la description
          </Menu.Item>
        ) : null}
        <Menu.Item leftSection={<IconFileText size={14} />} onClick={onEditTemplate}>
          Modifier le template
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
