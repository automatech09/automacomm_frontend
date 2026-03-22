"use client";

import { useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronLeft, IconCopy, IconSparkles, IconX } from "@tabler/icons-react";
import { templateCreationTeams, teamUIColors } from "@/lib/constants/templates";
import { SelectionCard } from "@/components/common/SelectionCard";
import { VisualTypeSelector } from "@/components/common/VisualTypeSelector";
import type { CreateTemplatePayload, TeamName, Template, TemplateCreationStep, VisualType } from "@/types";

type CreateTemplateModalProps = {
  opened: boolean;
  templates: Template[];
  onClose: () => void;
  onCreateTemplate: (payload: CreateTemplatePayload) => Promise<boolean>;
};


export function CreateTemplateModal({
  opened,
  templates,
  onClose,
  onCreateTemplate,
}: CreateTemplateModalProps) {
  const [step, setStep] = useState<TemplateCreationStep>(1);
  const [selectedType, setSelectedType] = useState<VisualType | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamName | null>(null);
  const [startFromScratch, setStartFromScratch] = useState<boolean | null>(null);
  const [creating, setCreating] = useState(false);

  const existingOfSelectedType = useMemo(
    () => (selectedType ? templates.filter((item) => item.visualType === selectedType) : []),
    [selectedType, templates]
  );

  const resetState = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedTeam(null);
    setStartFromScratch(null);
    setCreating(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleCreate = async () => {
    if (!selectedType || !selectedTeam || startFromScratch === null) {
      return;
    }

    setCreating(true);
    const success = await onCreateTemplate({
      visualType: selectedType,
      team: selectedTeam,
      startFromScratch,
    });
    setCreating(false);

    if (success) {
      handleClose();
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} centered radius="xl" size={760} withCloseButton={false}>
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Group gap="xs">
            {step > 1 ? (
              <ActionIcon variant="light" color="brand" onClick={() => setStep((prev) => (prev === 1 ? 1 : (prev - 1) as TemplateCreationStep))}>
                <IconChevronLeft size={16} />
              </ActionIcon>
            ) : null}
            <Stack gap={2}>
              <Badge variant="light" color="brand" w="fit-content">Étape {step}/3</Badge>
              <Title order={3} c="brand.7">Créer un nouveau template</Title>
              <Text fz="sm" c="rgba(4,52,109,0.55)">
                {step === 1 ? "Choisissez le type de visuel" : step === 2 ? "Pour quelle équipe ?" : "Partir de zéro ou d'un modèle ?"}
              </Text>
            </Stack>
          </Group>
          <ActionIcon variant="light" color="brand" onClick={handleClose}><IconX size={16} /></ActionIcon>
        </Group>

        {step === 1 ? (
          <VisualTypeSelector
            value={selectedType}
            onChange={setSelectedType}
            description="Template personnalisable avec aperçu placeholder"
          />
        ) : null}

        {step === 2 ? (
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
            {templateCreationTeams.map((team) => (
              <UnstyledButton key={team} onClick={() => setSelectedTeam(team)}>
                <Paper p="md" radius="xl" style={{ textAlign: "center", border: `2px solid ${selectedTeam === team ? teamUIColors[team].text : "transparent"}`, background: selectedTeam === team ? teamUIColors[team].bg : "rgba(4,52,109,0.03)" }}>
                  <Badge variant="light" style={{ color: teamUIColors[team].text, background: `${teamUIColors[team].text}20` }}>{team}</Badge>
                  <Text mt="sm" c="brand.7" fw={600}>{team}</Text>
                </Paper>
              </UnstyledButton>
            ))}
          </SimpleGrid>
        ) : null}

        {step === 3 ? (
          <Stack gap="sm">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <SelectionCard icon={IconSparkles} title="Partir de zéro" description="Page vierge dans le builder" color="#04346D" selected={startFromScratch === true} onClick={() => setStartFromScratch(true)} />
              <SelectionCard icon={IconCopy} title="Partir d'un template" description={`${existingOfSelectedType.length} modèles disponibles`} color="#FF6B35" selected={startFromScratch === false} onClick={() => setStartFromScratch(false)} />
            </SimpleGrid>
            {startFromScratch === false ? (
              <Stack gap="xs">
                <Text fz="sm" fw={600} c="brand.7">Templates de base</Text>
                {existingOfSelectedType.slice(0, 3).map((template) => (
                  <Paper key={template.id} p="sm" radius="md" withBorder style={{ borderColor: "rgba(4,52,109,0.1)" }}>
                    <Group wrap="nowrap" gap="sm">
                      <Image src={template.thumbnail} alt={template.visualType} w={56} h={56} radius="sm" fit="cover" />
                      <Stack gap={2}>
                        <Text c="brand.7" fz="sm" fw={600}>Template {template.id}</Text>
                        <Text c="rgba(4,52,109,0.55)" fz="xs">{template.team?.name ?? "-"} · {template.format}</Text>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            ) : null}
          </Stack>
        ) : null}

        <Divider />
        <Group justify="space-between">
          <Button variant="light" color="brand" onClick={() => (step === 1 ? handleClose() : setStep((prev) => (prev - 1) as TemplateCreationStep))}>
            {step === 1 ? "Annuler" : "Retour"}
          </Button>
          <Button
            bg="#04346D"
            disabled={(step === 1 && !selectedType) || (step === 2 && !selectedTeam) || (step === 3 && startFromScratch === null)}
            onClick={() => {
              if (step < 3) {
                setStep((prev) => (prev + 1) as TemplateCreationStep);
                return;
              }
              void handleCreate();
            }}
            loading={creating}
          >
            {step < 3 ? "Continuer" : "Créer le template"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
