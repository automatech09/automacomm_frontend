"use client";

import { Badge, Box, Group, Paper, SimpleGrid, Stack, Text, UnstyledButton } from "@mantine/core";
import { DisplayImage } from "@/components/common/DisplayImage";
import type { Template } from "@/types/template";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";

interface Props {
  templates: Template[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  /** Appelé immédiatement quand une Story est sélectionnée */
  onAutoAdvance: () => void;
}

export function PublicationTemplateSelector({ templates, selectedIds, onChange, onAutoAdvance }: Props) {
  const selectedFormat = templates.find((t) => selectedIds.includes(t.id))?.format ?? null;

  function handleClick(t: Template) {
    if (selectedFormat === "Post" && t.format === "Story") return;

    if (t.format === "Story") {
      onChange([t.id]);
      onAutoAdvance();
      return;
    }

    // Post : multi-sélection, on ignore les éventuelles Stories dans la liste
    const postIds = selectedIds.filter((id) => templates.find((x) => x.id === id)?.format === "Post");
    if (postIds.includes(t.id)) {
      onChange(postIds.filter((id) => id !== t.id));
    } else {
      onChange([...postIds, t.id]);
    }
  }

  return (
    <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
      {templates.map((t) => {
        const isSelected = selectedIds.includes(t.id);
        const isDisabled = selectedFormat === "Post" && t.format === "Story";

        return (
          <UnstyledButton
            key={t.id}
            onClick={() => handleClick(t)}
            style={{ opacity: isDisabled ? 0.35 : 1, cursor: isDisabled ? "not-allowed" : "pointer", pointerEvents: isDisabled ? "none" : undefined }}
          >
            <Paper
              withBorder
              radius="lg"
              style={{
                overflow: "hidden",
                borderColor: isSelected ? "var(--mantine-color-blue-5)" : undefined,
                borderWidth: isSelected ? 2 : 1,
              }}
            >
              <Box style={{ position: "relative", aspectRatio: "1 / 1" }}>
                <DisplayImage src={t.thumbnail} alt={t.name} h="100%" w="100%" fit="cover" style={{ display: "block" }} />
                <Box style={{ position: "absolute", top: 12, left: 12, right: 12 }}>
                  <Badge radius="xl" color="brand">{t.visualType}</Badge>
                </Box>
              </Box>
              <Stack justify="space-between" py="lg" px="md" gap="xs">
                <Text c="brand.7" fz="sm" fw={600} lineClamp={1}>{t.name}</Text>
                <Group gap="xs">
                  {t.team && <BadgeTeam teamData={t.team} />}
                  <BadgeStoryOrPost format={t.format} />
                </Group>
              </Stack>
            </Paper>
          </UnstyledButton>
        );
      })}
    </SimpleGrid>
  );
}
