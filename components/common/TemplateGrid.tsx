"use client";

import { Badge, Box, Group, Image, Paper, SimpleGrid, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { Template } from "@/types";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";

interface Props {
  templates: Template[];
  onSelect: (template: Template) => void;
  /** IDs des templates sélectionnés — affiche une bordure bleue */
  selectedIds?: number[];
  /** Si fourni, affiche une carte "Nouveau template" à la fin de la grille */
  onAdd?: () => void;
}

export function TemplateGrid({ templates, onSelect, selectedIds, onAdd }: Props) {
  return (
    <SimpleGrid style={{alignItems: 'flex-end'}} cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
      {templates.map((template) => {
        const isSelected = selectedIds?.includes(template.id);
        return (
          <UnstyledButton key={template.id} onClick={() => onSelect(template)}>
            <Paper
              withBorder
              radius="lg"
              style={{
                overflow: "hidden",
                borderColor: isSelected ? "var(--mantine-color-brand-5)" : undefined,
                borderWidth: isSelected ? 2 : 1,
              }}
            >
              <Box style={{ position: "relative", aspectRatio: "1 / 1" }}>
                <Image src={template.thumbnail} alt={template.name} h="100%" w="100%" fit="cover" />
                <Box style={{ position: "absolute", top: 12, left: 12, right: 12 }}>
                  <Badge radius="xl" color="brand">{template.visualType}</Badge>
                </Box>
              </Box>
              <Stack justify="space-between" py="lg" px="md" gap="xs">
                <Text c="brand.7" fz="sm" fw={600} lineClamp={1}>{template.name}</Text>
                <Group gap="xs">
                  {template.team && <BadgeTeam teamData={template.team} />}
                  <BadgeStoryOrPost format={template.format} />
                </Group>
              </Stack>
            </Paper>
          </UnstyledButton>
        );
      })}

      {onAdd && (
        <UnstyledButton onClick={onAdd}>
          <Paper
            p="xl"
            radius="xl"
            style={{
              border: "1.5px dashed rgba(4,52,109,0.22)",
              minHeight: 280,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              background: "white",
            }}
          >
            <Stack align="center" gap="sm">
              <Box
                w={48}
                h={48}
                style={{ borderRadius: 14, display: "grid", placeItems: "center", background: "rgba(4,52,109,0.06)" }}
              >
                <IconPlus size={24} color="rgba(4,52,109,0.45)" />
              </Box>
              <Text c="rgba(4,52,109,0.6)" fw={500}>Nouveau template</Text>
              <Text c="rgba(4,52,109,0.4)" fz="xs">Créer depuis zéro ou depuis un modèle</Text>
            </Stack>
          </Paper>
        </UnstyledButton>
      )}
    </SimpleGrid>
  );
}
