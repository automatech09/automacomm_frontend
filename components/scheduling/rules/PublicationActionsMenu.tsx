import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconFileText, IconPencil } from "@tabler/icons-react";
import type { Publication } from "@/types/scheduling";

interface Props {
  publication: Publication;
  onEdit: (p: Publication) => void;
  onEditTemplate: () => void;
}

export function PublicationActionsMenu({ publication, onEdit, onEditTemplate }: Props) {
  return (
    <Menu shadow="md" position="bottom-end" withinPortal radius="lg">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" radius="xl">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconPencil size={14} />} onClick={() => onEdit(publication)}>
          Modifier la publication
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />} onClick={onEditTemplate}>
          Modifier le template
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
