"use client";

import Link from "next/link";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCopy,
  IconEdit,
  IconPalette,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import type { Template } from "@/types";

type TemplateDetailsModalProps = {
  template: Template | null;
  duplicating: boolean;
  deleting: boolean;
  onClose: () => void;
  onDuplicate: (template: Template) => void;
  onDelete: (template: Template) => void;
};

export function TemplateDetailsModal({
  template,
  duplicating,
  deleting,
  onClose,
  onDuplicate,
  onDelete,
}: TemplateDetailsModalProps) {
  return (
    <Modal opened={template !== null} onClose={onClose} withCloseButton={false} padding={0} radius="xl" centered>
      {template ? (
        <Stack gap={0}>
          <Box style={{ position: "relative", height: 200 }}>
            <Image src={template.thumbnail} alt="Preview" h="100%" w="100%" fit="cover" />
            <ActionIcon variant="filled" color="dark" radius="xl" style={{ position: "absolute", top: 12, right: 12 }} onClick={onClose}>
              <IconX size={16} />
            </ActionIcon>
            <Badge radius="xl" variant="white" style={{ position: "absolute", top: 12, left: 12 }}>
              {template.format}
            </Badge>
          </Box>
          <Stack p="lg" gap="md">
            <Stack gap={4}>
              <Title order={3} c="brand.7">Template {template.id}</Title>
              <Group gap="xs">
                {template.team ? (
                  <Badge radius="sm" variant="light" style={{ color: "#04346D", background: "#F8F9FA", borderLeft: `3px solid ${template.team.color}` }}>
                    {template.team.name}
                  </Badge>
                ) : null}
                <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>{template.visualType}</Badge>
              </Group>
            </Stack>
            <Button
              leftSection={<IconEdit size={16} />}
              bg="#04346D"
              component={Link}
              href={`/dashboard/templates/${template.id}`}
            >
              Générer manuellement
            </Button>
            <Button leftSection={<IconPalette size={16} />} variant="light" color="brand">Modifier le template</Button>
            <Button leftSection={<IconCopy size={16} />} variant="light" color="brand" loading={duplicating} onClick={() => onDuplicate(template)}>Dupliquer</Button>
            <Button leftSection={<IconTrash size={16} />} variant="light" color="orange" loading={deleting} onClick={() => onDelete(template)}>Supprimer</Button>
            {template.lastUsed ? <Text ta="center" fz="xs" c="rgba(4,52,109,0.45)">Dernière utilisation: {template.lastUsed}</Text> : null}
          </Stack>
        </Stack>
      ) : null}
    </Modal>
  );
}
