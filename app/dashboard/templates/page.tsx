"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBolt, IconPlus } from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { CreateTemplateModal } from "@/components/templates/CreateTemplateModal";
import { TemplateDetailsModal } from "@/components/templates/TemplateDetailsModal";
import type { CreateTemplatePayload, Template, TemplateTeamFilter } from "@/types";
import { initialTemplates } from "@/lib/mockupdata/templates/data";
import { teamUIColors, templateTeamTabs } from "@/lib/constants/templates";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";

const teamColors = teamUIColors;

export default function TemplatesPage() {
  const [activeTeam, setActiveTeam] = useState<TemplateTeamFilter>("Tous");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // TODO: remplacer par un vrai fetch GET /api/templates
  useEffect(() => {
    console.log("[templates] fetch GET /api/templates");
  }, []);

  const filteredTemplates = useMemo(
    () => (activeTeam === "Tous" ? initialTemplates : initialTemplates.filter((item) => item.team?.name === activeTeam)),
    [activeTeam]
  );

  // TODO: POST /api/templates — body: { visualType, team, startFromScratch }
  const handleCreateTemplate = async (payload: CreateTemplatePayload) => {
    console.log("[templates] POST /api/templates", payload);

    try {
      // const res = await fetch("/api/templates", { method: "POST", body: JSON.stringify(payload) });
      // const data = await res.json();
      notifications.show({ color: "green", message: "Template créé avec succès" });
      return true;
    } catch (err) {
      console.error("[templates] erreur création", err);
      notifications.show({ color: "red", message: "Erreur lors de la création du template" });
      return false;
    }
  };

  // TODO: POST /api/templates/:id/duplicate
  const handleDuplicate = async (template: Template) => {
    console.log("[templates] POST /api/templates/:id/duplicate", { id: template.id });
    setDuplicating(true);

    try {
      // const res = await fetch(`/api/templates/${template.id}/duplicate`, { method: "POST" });
      // const data = await res.json();
      notifications.show({ color: "green", message: `Template \"${template.name}\" dupliqué` });
      setSelectedTemplate(null);
    } catch (err) {
      console.error("[templates] erreur duplication", err);
      notifications.show({ color: "red", message: "Erreur lors de la duplication" });
    } finally {
      setDuplicating(false);
    }
  };

  // TODO: DELETE /api/templates/:id
  const handleDelete = async (template: Template) => {
    console.log("[templates] DELETE /api/templates/:id", { id: template.id });
    setDeleting(true);

    try {
      // await fetch(`/api/templates/${template.id}`, { method: "DELETE" });
      notifications.show({ color: "orange", message: `Template \"${template.name}\" supprimé` });
      setSelectedTemplate(null);
    } catch (err) {
      console.error("[templates] erreur suppression", err);
      notifications.show({ color: "red", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Stack gap={2}>
          <Title order={1} c="brand.7" fz="1.6rem">Templates</Title>
          <Text fz="sm" c="rgba(4,52,109,0.5)">{filteredTemplates.length} templates </Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} bg="#04346D" radius="xl" onClick={() => setCreateOpen(true)}>
          Créer un template
        </Button>
      </Group>

      <Group gap="sm" style={{ borderBottom: "1px solid rgba(4,52,109,0.1)" }}>
        {templateTeamTabs.map((team) => {
          const isActive = team === activeTeam;
          return (
            <UnstyledButton key={team} onClick={() => setActiveTeam(team)} px="md" py="sm" style={{ position: "relative", color: isActive ? teamColors[team].text : "rgba(4,52,109,0.5)", fontWeight: isActive ? 600 : 500 }}>
              <Text fz="sm">{team}</Text>
              {isActive ? <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: teamColors[team].text }} /> : null}
            </UnstyledButton>
          );
        })}
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
        {filteredTemplates.map((template) => (
          <UnstyledButton key={template.id} onClick={() => setSelectedTemplate(template)}>
            <Paper withBorder radius="lg" style={{ overflow: "hidden" }}>
              <Box style={{ position: "relative", aspectRatio: "1 / 1" }}>
                <Image src={template.thumbnail} alt={`Template ${template.id}`} h="100%" w="100%" fit="cover" />
                <Group justify="space-between" style={{ position: "absolute", top: 12, left: 12, right: 12 }}>
                  <Badge radius="xl" color="brand">{template.visualType}</Badge>
                </Group>
              </Box>
              <Stack justify="space-between" py="lg" px="md">
                <Text c="brand.7" fz="sm" fw={600}>{template.name}</Text>
                <Group>
                  {template.team ? <BadgeTeam teamData={template.team} /> : null}
                  <BadgeStoryOrPost format={template.format} />
                </Group>
              </Stack>
            </Paper>
          </UnstyledButton>
        ))}

        <UnstyledButton onClick={() => setCreateOpen(true)}>
          <Paper p="xl" radius="xl" style={{ border: "1.5px dashed rgba(4,52,109,0.22)", minHeight: 280, display: "grid", placeItems: "center", textAlign: "center", background: "white" }}>
            <Stack align="center" gap="sm">
              <Box w={48} h={48} style={{ borderRadius: 14, display: "grid", placeItems: "center", background: "rgba(4,52,109,0.06)" }}>
                <IconPlus size={24} color="rgba(4,52,109,0.45)" />
              </Box>
              <Text c="rgba(4,52,109,0.6)" fw={500}>Nouveau template</Text>
              <Text c="rgba(4,52,109,0.4)" fz="xs">Créer depuis zéro ou depuis un modèle</Text>
            </Stack>
          </Paper>
        </UnstyledButton>
      </SimpleGrid>

      <Paper p="md" radius="xl" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
        <Group justify="space-between" wrap="wrap" gap="md">
          <Group gap="sm" wrap="nowrap">
            <Box w={40} h={40} style={{ borderRadius: 12, display: "grid", placeItems: "center", background: "#04346D" }}>
              <IconBolt size={20} color="white" />
            </Box>
            <Stack gap={2}>
              <Text c="brand.7" fw={600} fz="sm">Builder visuel intégré</Text>
              <Text c="rgba(4,52,109,0.55)" fz="xs">Personnalisez vos templates sans gérer de structures complexes.</Text>
            </Stack>
          </Group>
          <Button bg="#04346D" radius="xl">Ouvrir le builder</Button>
        </Group>
      </Paper>

      <TemplateDetailsModal
        template={selectedTemplate}
        duplicating={duplicating}
        deleting={deleting}
        onClose={() => setSelectedTemplate(null)}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />

      <CreateTemplateModal
        opened={createOpen}
        templates={initialTemplates}
        onClose={() => setCreateOpen(false)}
        onCreateTemplate={handleCreateTemplate}
      />
    </Stack>
  );
}
