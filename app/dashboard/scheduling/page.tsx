"use client";

import { useMemo, useState } from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Group,
  Menu,
  NativeSelect,
  Paper,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconCalendarClock,
  IconChevronDown,
  IconDotsVertical,
  IconFileText,
  IconMessageCircle,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { PostConfigDrawer } from "@/components/PostConfigDrawer";
import type { ScheduleRule, TeamTag } from "@/types";
import { useRouter } from "next/navigation";

type VisualType = "Résultat" | "Classement" | "Affiche" | "Calendrier";

const teamTags: Record<string, TeamTag> = {
  "Équipe 1": { label: "Équipe 1", borderColor: "#FF6B35" },
  "Réserve": { label: "Réserve", borderColor: "#7A0FB0" },
  U18: { label: "U18", borderColor: "#0F9B58" },
  Toutes: { label: "Toutes", borderColor: "#D4640A" },
};

const teamFilters = ["Tous", "Équipe 1", "Réserve", "U18"] as const;
const momentOptions = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
  "J-4",
  "J-3",
  "J-2",
  "J-1 (veille du match)",
  "Jour J",
  "J+1 (lendemain)",
  "J+2",
  "J+3",
  "J+4",
];

const initialRules: ScheduleRule[] = [
  {
    id: "1",
    visualType: "Résultat" as VisualType,
    format: "P",
    teams: [teamTags["Équipe 1"]],
    active: true,
    moment: "J+1 (lendemain)",
    time: "09:00",
    description: "Belle victoire de {team} face à {opponent} ! Score final : {score}",
    isCustomDescription: true,
    templates: ["Template Résultat Principal"],
    isCarousel: false,
  },
  {
    id: "2",
    visualType: "Affiche" as VisualType,
    format: "P",
    teams: [teamTags["Équipe 1"]],
    active: true,
    moment: "J-2",
    time: "18:00",
    templates: ["Template Affiche Match"],
    isCarousel: false,
  },
  {
    id: "3",
    visualType: "Classement" as VisualType,
    format: "P",
    teams: [teamTags["Équipe 1"], teamTags["Réserve"]],
    active: true,
    moment: "Lundi",
    time: "10:00",
    templates: ["Template Classement", "Template Stats"],
    isCarousel: true,
  },
  {
    id: "4",
    visualType: "Affiche" as VisualType,
    format: "S",
    teams: [teamTags["Équipe 1"]],
    active: false,
    moment: "J-1 (veille du match)",
    time: "17:00",
    templates: ["Template Affiche Story"],
    isCarousel: false,
  },
  {
    id: "5",
    visualType: "Résultat" as VisualType,
    format: "P",
    teams: [teamTags.U18],
    active: true,
    moment: "Dimanche",
    time: "20:00",
    templates: ["Template Résultat U18"],
    isCarousel: false,
  },
  {
    id: "6",
    visualType: "Calendrier" as VisualType,
    format: "P",
    teams: [teamTags.Toutes],
    active: true,
    moment: "Lundi",
    time: "08:00",
    templates: ["Template Calendrier Semaine"],
    isCarousel: false,
  },
];

function TeamPill({ tag }: { tag: TeamTag }) {
  return (
    <Box
      px="xs"
      py={3}
      style={{
        borderRadius: 6,
        background: "#F5F7FA",
        borderLeft: `3px solid ${tag.borderColor}`,
      }}
    >
      <Text fz="xs" fw={600} c="brand.7">
        {tag.label}
      </Text>
    </Box>
  );
}

export default function SchedulingPage() {
  const router = useRouter();
  const [rules, setRules] = useState<ScheduleRule[]>(initialRules);
  const [filter, setFilter] = useState<(typeof teamFilters)[number]>("Tous");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<ScheduleRule | null>(null);

  const filteredRules = useMemo(() => {
    if (filter === "Tous") {
      return rules;
    }
    return rules.filter((rule) => rule.teams.some((team) => team.label === filter));
  }, [filter, rules]);

  const activeCount = rules.filter((rule) => rule.active).length;
  const customDescriptionCount = rules.filter(
    (rule) => rule.format === "P" && rule.isCustomDescription
  ).length;

  const updateRule = (id: string, patch: Partial<ScheduleRule>) => {
    setRules((old) => old.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)));
  };

  const handleSaveDrawer = (rule: ScheduleRule) => {
    updateRule(rule.id, rule);
    notifications.show({ message: "Configuration sauvegardée", color: "green" });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Stack gap={2}>
          <Title order={1} c="brand.7" fz="1.6rem">
            Planification des publications
          </Title>
          <Text fz="sm" c="rgba(4,52,109,0.55)" maw={780}>
            Choisissez quand vos visuels doivent se publier automatiquement chaque semaine de
            match. Le format (Story/Post) est défini dans le template.
          </Text>
        </Stack>
        <Group gap="xs">
          <Badge color="green" variant="light">
            {activeCount} actives
          </Badge>
          <Badge color="orange" variant="light" leftSection={<IconMessageCircle size={12} />}>
            {customDescriptionCount} descriptions perso
          </Badge>
        </Group>
      </Group>

      <Stack gap="sm">
        <Alert
          variant="light"
          color="brand"
          icon={<IconCalendarClock size={16} />}
          radius="lg"
          title="Ces règles s'appliquent uniquement les semaines de match"
        >
          Si aucun match n&apos;est prévu pour une équipe, la règle ne se déclenche pas.
        </Alert>
        <Alert
          variant="light"
          color="orange"
          icon={<IconMessageCircle size={16} />}
          radius="lg"
          title="Personnalisez vos descriptions (Posts uniquement)"
        >
          Cliquez sur « Modifier la description » pour les règles au format Post.
        </Alert>
      </Stack>

      <Group gap="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.1)" }}>
        {teamFilters.map((item) => {
          const isActive = filter === item;
          const borderColor = teamTags[item]?.borderColor ?? "#04346D";
          return (
            <Button
              key={item}
              variant="subtle"
              color="dark"
              px="md"
              onClick={() => setFilter(item)}
              styles={{
                root: {
                  borderBottom: isActive ? `2px solid ${borderColor}` : "2px solid transparent",
                  borderRadius: 0,
                },
                label: {
                  color: isActive ? borderColor : "rgba(4,52,109,0.55)",
                  fontWeight: isActive ? 600 : 500,
                },
              }}
            >
              {item}
            </Button>
          );
        })}
      </Group>

      <Paper withBorder radius="xl" p={0} style={{ overflow: "hidden", boxShadow: "0 6px 18px rgba(4,52,109,0.06)" }}>
        <Box visibleFrom="md">
          <Table.ScrollContainer minWidth={980}>
            <Table
              verticalSpacing="sm"
              horizontalSpacing="md"
              highlightOnHover
              withRowBorders
              styles={{
                thead: {
                  background: "linear-gradient(90deg, rgba(4,52,109,0.045), rgba(4,52,109,0.015))",
                },
                th: {
                  color: "rgba(4,52,109,0.55)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  fontWeight: 700,
                },
                td: {
                  borderColor: "rgba(4,52,109,0.06)",
                },
                tr: {
                  transition: "background-color 120ms ease",
                },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nom du visuel</Table.Th>
                  <Table.Th>Équipe(s)</Table.Th>
                  <Table.Th ta="center">Actif</Table.Th>
                  <Table.Th>Moment de publication</Table.Th>
                  <Table.Th>Heure</Table.Th>
                  <Table.Th>Modifier</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {filteredRules.map((rule) => (
                  <Table.Tr key={rule.id}>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Badge variant="light" color="brand" radius="lg" py={0}>
                          {rule.format}
                        </Badge>
                        <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>
                          {rule.visualType}
                        </Badge>
                        {rule.format === "P" && rule.isCustomDescription ? (
                          <IconMessageCircle size={14} color="#FF6B35" />
                        ) : null}
                      </Group>
                    </Table.Td>

                    <Table.Td>
                      <Group gap="xs" wrap="wrap">
                        {rule.teams.map((team) => (
                          <TeamPill key={`${rule.id}-${team.label}`} tag={team} />
                        ))}
                      </Group>
                    </Table.Td>

                    <Table.Td>
                      <Group justify="center">
                        <Switch
                          color="brand"
                          checked={rule.active}
                          onChange={(event) =>
                            updateRule(rule.id, { active: event.currentTarget.checked })
                          }
                        />
                      </Group>
                    </Table.Td>

                    <Table.Td>
                      <NativeSelect
                        size="sm"
                        value={rule.moment}
                        onChange={(event) => updateRule(rule.id, { moment: event.currentTarget.value })}
                        data={momentOptions}
                        rightSection={<IconChevronDown size={14} />}
                      />
                    </Table.Td>

                    <Table.Td>
                      <TextInput
                        size="sm"
                        type="time"
                        value={rule.time}
                        onChange={(event) => updateRule(rule.id, { time: event.currentTarget.value })}
                      />
                    </Table.Td>

                    <Table.Td>
                      <Group justify="center">
                        <Menu shadow="md" position="bottom-end" withinPortal>
                          <Menu.Target>
                            <ActionIcon
                              variant="light"
                              color="brand"
                              radius="md"
                              aria-label="Options de modification"
                            >
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
                                onClick={() => {
                                  setSelectedRule(rule);
                                  setDrawerOpen(true);
                                }}
                              >
                                Modifier la description
                              </Menu.Item>
                            ) : null}
                            <Menu.Item
                              leftSection={<IconFileText size={14} />}
                              onClick={() => router.push("/dashboard/templates")}
                            >
                              Modifier le template
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>

        <Stack hiddenFrom="md" gap={0}>
          {filteredRules.map((rule, index) => (
            <Stack
              key={rule.id}
              p="md"
              gap="sm"
              style={{
                borderBottom:
                  index === filteredRules.length - 1 ? "none" : "1px solid rgba(4,52,109,0.06)",
              }}
            >
              <Group justify="space-between">
                <Group gap="xs">
                  <Badge variant="light" color="brand" radius="sm">
                    {rule.format}
                  </Badge>
                  <Badge radius="xl" style={{ background: "#04346D", color: "#F5F3EB" }}>
                    {rule.visualType}
                  </Badge>
                </Group>
                <Group gap="xs">
                  <Switch
                    color="brand"
                    checked={rule.active}
                    onChange={(event) => updateRule(rule.id, { active: event.currentTarget.checked })}
                  />
                  <Menu shadow="md" position="bottom-end" withinPortal>
                    <Menu.Target>
                      <ActionIcon
                        variant="light"
                        color="brand"
                        radius="md"
                        aria-label="Options de modification"
                      >
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
                          onClick={() => {
                            setSelectedRule(rule);
                            setDrawerOpen(true);
                          }}
                        >
                          Modifier la description
                        </Menu.Item>
                      ) : null}
                      <Menu.Item
                        leftSection={<IconFileText size={14} />}
                        onClick={() => router.push("/dashboard/templates")}
                      >
                        Modifier le template
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>

              <Group gap="xs" wrap="wrap">
                {rule.teams.map((team) => (
                  <TeamPill key={`${rule.id}-mobile-${team.label}`} tag={team} />
                ))}
              </Group>

              <Group grow>
                <NativeSelect
                  size="sm"
                  value={rule.moment}
                  onChange={(event) => updateRule(rule.id, { moment: event.currentTarget.value })}
                  data={momentOptions}
                  rightSection={<IconChevronDown size={14} />}
                />
                <TextInput
                  size="sm"
                  type="time"
                  value={rule.time}
                  onChange={(event) => updateRule(rule.id, { time: event.currentTarget.value })}
                />
              </Group>

            </Stack>
          ))}
        </Stack>
      </Paper>

      {filteredRules.length === 0 ? (
        <Paper radius="xl" p="xl" withBorder style={{ borderStyle: "dashed" }}>
          <Stack align="center" gap="xs">
            <Text fz="sm" c="dimmed">
              Aucune règle pour cette équipe.
            </Text>
            <Text fz="xs" c="rgba(4,52,109,0.35)">
              Sélectionnez « Tous » ou créez un template.
            </Text>
          </Stack>
        </Paper>
      ) : null}

      <Text ta="center" fz="xs" c="rgba(4,52,109,0.35)">
        <Text span fw={600}>S</Text> = Story · <Text span fw={600}>P</Text> = Post · Le format
        est défini dans chaque template.
      </Text>

      <PostConfigDrawer
        open={drawerOpen}
        config={selectedRule}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveDrawer}
      />
    </Stack>
  );
}
