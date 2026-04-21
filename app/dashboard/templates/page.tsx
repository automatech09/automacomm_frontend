"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Group, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { CreateTemplateModal } from "@/components/templates/CreateTemplateModal";
import { TemplateDetailsModal } from "@/components/templates/TemplateDetailsModal";
import type { Template } from "@/types";
import type { CreateTemplatePayload } from "@/types/template";
import { getTemplates } from "@/lib/api/templates";
import { initialTeams } from "@/lib/mockupdata/teams/data";
import { TemplateGrid } from "@/components/common/TemplateGrid";

const TEAM_TABS = [
  { label: "Tous", color: "#04346D" },
  ...initialTeams.map((t) => ({ label: t.name, color: t.color })),
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeTeam, setActiveTeam] = useState("Tous");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const handleCreateTemplate = async (payload: CreateTemplatePayload): Promise<boolean> => {
    console.log("[templates] POST /api/templates", payload);
    notifications.show({ color: "green", message: "Template créé" });
    setCreateOpen(false);
    return true;
  };

  const filteredTemplates = useMemo(
    () => (activeTeam === "Tous" ? templates : templates.filter((item) => item.team?.name === activeTeam)),
    [activeTeam, templates]
  );


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
        {TEAM_TABS.map(({ label, color }) => {
          const isActive = label === activeTeam;
          return (
            <UnstyledButton key={label} onClick={() => setActiveTeam(label)} px="md" py="sm" style={{ position: "relative", color: isActive ? color : "rgba(4,52,109,0.5)", fontWeight: isActive ? 600 : 500 }}>
              <Text fz="sm">{label}</Text>
              {isActive && <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: color }} />}
            </UnstyledButton>
          );
        })}
      </Group>

      <TemplateGrid
        templates={filteredTemplates}
        onSelect={setSelectedTemplate}
        onAdd={() => setCreateOpen(true)}
      />

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
        templates={templates}
        onClose={() => setCreateOpen(false)}
        onCreateTemplate={handleCreateTemplate}
      />
    </Stack>
  );
}
