"use client";

import { useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
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
import { notifications } from "@mantine/notifications";
import {
  IconBolt,
  IconCalendarStats,
  IconChartBar,
  IconChevronLeft,
  IconCopy,
  IconEdit,
  IconLayout,
  IconPlus,
  IconSparkles,
  IconTrophy,
  IconX,
  IconTrash,
  type TablerIcon,
} from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { Team } from "@/types";

type TeamName = "Équipe 1" | "Réserve" | "U18";
type TemplateType = "Résultat" | "Classement" | "Affiche" | "Calendrier";
type TemplateFormat = "Post" | "Story";

type TemplateCard = {
  id: number;
  type: TemplateType;
  format: TemplateFormat;
  teamData: Team;
  active: boolean;
  lastUsed?: string;
  name: string; 
  thumbnail: string;
};

const templates: TemplateCard[] = [
  { id: 1, type: "Résultat", name: 'Match day', format: "Post", teamData: { name: "Équipe 1", color: "#FF6B35", id: "team1", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" }, active: true, lastUsed: "2 mars 2026", thumbnail: "https://placehold.co/800x800/04346D/F5F3EB?text=Resultat+Post" },
  { id: 2, type: "Résultat", name: 'Test',format: "Story", teamData: { name: "Équipe 1", color: "#FF6B35", id: "team1", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" }, active: true, thumbnail: "https://placehold.co/800x800/0A5EBF/F5F3EB?text=Resultat+Story" },
  { id: 3, type: "Affiche", name: 'Test',format: "Post", teamData: { name: "Réserve", color: "#7A0FB0", id: "reserve", league: "Division Honneur Régionale" }, active: true, lastUsed: "28 fév. 2026", thumbnail: "https://placehold.co/800x800/7A0FB0/F5F3EB?text=Affiche+Post" },
  { id: 4, type: "Affiche", name: 'Test',format: "Story", teamData: { name: "Équipe 1", color: "#FF6B35", id: "team1", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" }, active: true, thumbnail: "https://placehold.co/800x800/0F9B58/F5F3EB?text=Affiche+Story" },
  { id: 5, type: "Classement", name: 'Test',format: "Post", teamData: { name: "Équipe 1", color: "#FF6B35", id: "team1", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" }, active: false, thumbnail: "https://placehold.co/800x800/D4640A/F5F3EB?text=Classement+Post" },
  { id: 6, type: "Calendrier", name: 'Test',format: "Post", teamData: { name: "Réserve", color: "#7A0FB0", id: "reserve", league: "Division Honneur Régionale" } , active: true, thumbnail: "https://placehold.co/800x800/0F9B58/F5F3EB?text=Calendrier+Post" },
  { id: 7, type: "Résultat", name: 'Test',format: "Post", teamData: { name: "Réserve", color: "#7A0FB0", id: "reserve", league: "Division Honneur Régionale" } , active: true, lastUsed: "1 mars 2026", thumbnail: "https://placehold.co/800x800/04346D/F5F3EB?text=Resultat+U18" },
  { id: 8, type: "Classement", name: 'Test',format: "Post", teamData: { name: "Équipe 1", color: "#FF6B35", id: "team1", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" }, active: false, thumbnail: "https://placehold.co/800x800/D4640A/F5F3EB?text=Classement+Post" },
];

const typeConfig: Record<TemplateType, { icon: TablerIcon; color: string; bg: string }> = {
  Résultat: { icon: IconTrophy, color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { icon: IconChartBar, color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { icon: IconLayout, color: "#7A0FB0", bg: "#F3EEFB" },
  Calendrier: { icon: IconCalendarStats, color: "#0F9B58", bg: "#EEFBF3" },
};

const teamColors: Record<TeamName | "Tous", { text: string; bg: string }> = {
  Tous: { text: "#04346D", bg: "#F8F9FA" },
  "Équipe 1": { text: "#FF6B35", bg: "#FFE8E0" },
  Réserve: { text: "#7A0FB0", bg: "#EBE0FF" },
  U18: { text: "#0F9B58", bg: "#E0F5EA" },
};

const teams: (TeamName | "Tous")[] = ["Tous", "Équipe 1", "Réserve", "U18"];

function StepCard({ icon: Icon, title, description, color, selected, onClick }: { icon: TablerIcon; title: string; description: string; color: string; selected: boolean; onClick: () => void }) {
  return (
    <UnstyledButton onClick={onClick}>
      <Paper p="md" radius="xl" style={{ border: `2px solid ${selected ? color : "transparent"}`, background: selected ? `${color}14` : "rgba(4,52,109,0.03)" }}>
        <Box w={44} h={44} mb="sm" style={{ borderRadius: 12, display: "grid", placeItems: "center", background: `${color}20` }}>
          <Icon size={22} color={color} />
        </Box>
        <Text c="brand.7" fw={600}>{title}</Text>
        <Text c="rgba(4,52,109,0.6)" fz="xs" mt={6}>{description}</Text>
      </Paper>
    </UnstyledButton>
  );
}

export default function TemplatesPage() {
  const [activeTeam, setActiveTeam] = useState<TeamName | "Tous">("Tous");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCard | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<TemplateType | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamName | null>(null);
  const [startFromScratch, setStartFromScratch] = useState<boolean | null>(null);

  const filteredTemplates = useMemo(
    () => (activeTeam === "Tous" ? templates : templates.filter((item) => item.teamData.name === activeTeam)),
    [activeTeam]
  );

  const existingOfSelectedType = useMemo(
    () => (selectedType ? templates.filter((item) => item.type === selectedType) : []),
    [selectedType]
  );

  const resetCreate = () => {
    setCreateOpen(false);
    setStep(1);
    setSelectedType(null);
    setSelectedTeam(null);
    setStartFromScratch(null);
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Stack gap={2}>
          <Title order={1} c="brand.7" fz="1.6rem">Templates</Title>
          <Text fz="sm" c="rgba(4,52,109,0.5)">{filteredTemplates.length} templates · {filteredTemplates.filter((item) => item.active).length} actifs</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} bg="#04346D" radius="xl" onClick={() => setCreateOpen(true)}>
          Créer un template
        </Button>
      </Group>

      <Group gap="sm" style={{ borderBottom: "1px solid rgba(4,52,109,0.1)" }}>
        {teams.map((team) => {
          const isActive = team === activeTeam;
          return (
            <UnstyledButton key={team} onClick={() => setActiveTeam(team)} px="md" py="sm" style={{ position: "relative", color: isActive ? teamColors[team].text : "rgba(4,52,109,0.5)", fontWeight: isActive ? 600 : 500 }}>
              <Text fz="sm">{team}</Text>
              {isActive ? <Box style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: teamColors[team].text }} /> : null}
            </UnstyledButton>
          );
        })}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {filteredTemplates.map((tpl) => {
          return (
            <UnstyledButton key={tpl.id} onClick={() => setSelectedTemplate(tpl)}>
              <Paper withBorder radius="lg" style={{ overflow: "hidden", borderColor: "rgba(4,52,109,0.08)" }}>
                <Box style={{ position: "relative", aspectRatio: "1 / 1" }}>
                  <Image src={tpl.thumbnail} alt={`Template ${tpl.id}`} h="100%" w="100%" fit="cover" />
                  <Group justify="space-between" style={{ position: "absolute", top: 12, left: 12, right: 12 }}>
                      <Badge radius="xl" style={{ background: "rgba(4,52,109,0.88)", color: "#F5F3EB" }}>{tpl.type}</Badge>
                    </Group>
                  {!tpl.active ? (
                    <Box style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.36)" }}>
                      <Badge color="dark">Inactif</Badge>
                    </Box>
                  ) : null}
                </Box>
                <Stack justify="space-between" py="lg" px='md'>
                <Text c="brand.7" fz="sm" fw={600}>{tpl.name}</Text>
                <Group>
                  
                  <BadgeTeam teamData={tpl.teamData} />
                  <Badge variant="light" color='brand'>
                    {tpl.format == "Story" ? "S" : "P"}
                  </Badge>
                  </Group>
                </Stack>
              </Paper>
            </UnstyledButton>
          );
        })}

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

      <Modal opened={selectedTemplate !== null} onClose={() => setSelectedTemplate(null)} withCloseButton={false} padding={0} radius="xl" centered>
        {selectedTemplate ? (
          <Stack gap={0}>
            <Box style={{ position: "relative", height: 200 }}>
              <Image src={selectedTemplate.thumbnail} alt="Preview" h="100%" w="100%" fit="cover" />
              <ActionIcon variant="filled" color="dark" radius="xl" style={{ position: "absolute", top: 12, right: 12 }} onClick={() => setSelectedTemplate(null)}>
                <IconX size={16} />
              </ActionIcon>
              <Badge radius="xl" variant="white" style={{ position: "absolute", top: 12, left: 12 }}>
                {selectedTemplate.format}
              </Badge>
            </Box>
            <Stack p="lg" gap="md">
              <Stack gap={4}>
                <Title order={3} c="brand.7">Template {selectedTemplate.id}</Title>
                <Group gap="xs">
                  <Badge radius="sm" variant="light" style={{ color: "#04346D", background: "#F8F9FA", borderLeft: `3px solid ${selectedTemplate.teamData.color}` }}>{selectedTemplate.teamData.name}</Badge>
                  <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>{selectedTemplate.type}</Badge>
                </Group>
              </Stack>
              <Button leftSection={<IconEdit size={16} />} bg="#04346D">Modifier le template</Button>
              <Button leftSection={<IconCopy size={16} />} variant="light" color="brand">Dupliquer</Button>
              <Button leftSection={<IconTrash size={16} />} variant="light" color="orange">Supprimer</Button>
              {selectedTemplate.lastUsed ? <Text ta="center" fz="xs" c="rgba(4,52,109,0.45)">Dernière utilisation: {selectedTemplate.lastUsed}</Text> : null}
            </Stack>
          </Stack>
        ) : null}
      </Modal>

      <Modal opened={createOpen} onClose={resetCreate} centered radius="xl" size={760} withCloseButton={false}>
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <Group gap="xs">
              {step > 1 ? <ActionIcon variant="light" color="brand" onClick={() => setStep((prev) => (prev === 1 ? 1 : (prev - 1) as 1 | 2 | 3))}><IconChevronLeft size={16} /></ActionIcon> : null}
              <Stack gap={2}>
                <Badge variant="light" color="brand" w="fit-content">Étape {step}/3</Badge>
                <Title order={3} c="brand.7">Créer un nouveau template</Title>
                <Text fz="sm" c="rgba(4,52,109,0.55)">{step === 1 ? "Choisissez le type de visuel" : step === 2 ? "Pour quelle équipe ?" : "Partir de zéro ou d'un modèle ?"}</Text>
              </Stack>
            </Group>
            <ActionIcon variant="light" color="brand" onClick={resetCreate}><IconX size={16} /></ActionIcon>
          </Group>

          {step === 1 ? (
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              {Object.entries(typeConfig).map(([type, config]) => (
                <StepCard key={type} icon={config.icon} title={type} description="Template personnalisable avec aperçu placeholder" color={config.color} selected={selectedType === type} onClick={() => setSelectedType(type as TemplateType)} />
              ))}
            </SimpleGrid>
          ) : null}

          {step === 2 ? (
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
              {(["Équipe 1", "Réserve", "U18"] as TeamName[]).map((team) => (
                <UnstyledButton key={team} onClick={() => setSelectedTeam(team)}>
                  <Paper p="md" radius="xl" style={{ textAlign: "center", border: `2px solid ${selectedTeam === team ? teamColors[team].text : "transparent"}`, background: selectedTeam === team ? teamColors[team].bg : "rgba(4,52,109,0.03)" }}>
                    <Badge variant="light" style={{ color: teamColors[team].text, background: `${teamColors[team].text}20` }}>{team}</Badge>
                    <Text mt="sm" c="brand.7" fw={600}>{team}</Text>
                  </Paper>
                </UnstyledButton>
              ))}
            </SimpleGrid>
          ) : null}

          {step === 3 ? (
            <Stack gap="sm">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                <StepCard icon={IconSparkles} title="Partir de zéro" description="Page vierge dans le builder" color="#04346D" selected={startFromScratch === true} onClick={() => setStartFromScratch(true)} />
                <StepCard icon={IconCopy} title="Partir d'un template" description={`${existingOfSelectedType.length} modèles disponibles`} color="#FF6B35" selected={startFromScratch === false} onClick={() => setStartFromScratch(false)} />
              </SimpleGrid>
              {startFromScratch === false ? (
                <Stack gap="xs">
                  <Text fz="sm" fw={600} c="brand.7">Templates de base</Text>
                  {existingOfSelectedType.slice(0, 3).map((tpl) => (
                    <Paper key={tpl.id} p="sm" radius="md" withBorder style={{ borderColor: "rgba(4,52,109,0.1)" }}>
                      <Group wrap="nowrap" gap="sm">
                        <Image src={tpl.thumbnail} alt={tpl.type} w={56} h={56} radius="sm" fit="cover" />
                        <Stack gap={2}>
                          <Text c="brand.7" fz="sm" fw={600}>Template {tpl.id}</Text>
                          <Text c="rgba(4,52,109,0.55)" fz="xs">{tpl.teamData.name} · {tpl.format}</Text>
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
            <Button variant="light" color="brand" onClick={() => (step === 1 ? resetCreate() : setStep((prev) => (prev - 1) as 1 | 2 | 3))}>
              {step === 1 ? "Annuler" : "Retour"}
            </Button>
            <Button
              bg="#04346D"
              disabled={(step === 1 && !selectedType) || (step === 2 && !selectedTeam) || (step === 3 && startFromScratch === null)}
              onClick={() => {
                if (step < 3) {
                  setStep((prev) => (prev + 1) as 1 | 2 | 3);
                  return;
                }
                notifications.show({ color: "green", message: "Template prêt à être créé" });
                resetCreate();
              }}
            >
              {step < 3 ? "Continuer" : "Créer le template"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
