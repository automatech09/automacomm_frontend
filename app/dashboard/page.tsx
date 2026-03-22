"use client";

import { useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Image,
  Divider,
} from "@mantine/core";
import {
  IconBellFilled,
  IconBrandFacebook,
  IconBrandInstagram,
  IconCalendar,
  IconCircleCheckFilled,
  IconPalette,
  IconSparkles,
} from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { DashboardOnboarding } from "@/components/onboarding/DashboardOnboarding";
import { Team } from "@/types";
import { Publication } from "@/types/publication";
import { upcomingPublications } from "@/lib/mockupdata/publications/data";

type TeamPalette = { bg: string; text: string; border: string };


const initialTeamColors: Record<Team["name"], TeamPalette> = {
  "Équipe 1": { bg: "#FFE8E0", text: "#FF6B35", border: "#FF6B35" },
  U18: { bg: "#E0F5EA", text: "#0F9B58", border: "#0F9B58" },
  "Réserve": { bg: "#EBE0FF", text: "#7A0FB0", border: "#7A0FB0" },
};

const LastPublishTeam: Team = { name: "Réserve", color: "#7A0FB0", id: "reserve", league: "Division Honneur Régionale" };

const NextPublishTeam: Team = { name: "Équipe 1", color: "#FF6B35", id: "team1", league: "Division Régionale 1 - Auvergne-Rhône-Alpes" };
const visualTypeColor = { bg: "#04346D", text: "#F5F3EB" };

const lastPostPlaceholder = "https://placehold.co/700x700/04346D/F5F3EB?text=Apercu+Resultat";
const nextPostPlaceholder = "https://placehold.co/700x700/FF6B35/FFFFFF?text=Apercu+Affiche";

function publicationVisualType(publication: Publication) {
  return publication.templates[0]?.visualType ?? "Publication";
}

function publicationTeams(publication: Publication) {
  const teams = publication.templates
    .map((template) => template.team)
    .filter((team): team is Team => team !== null);

  return teams.filter((team, index, array) => array.findIndex((candidate) => candidate.id === team.id) === index);
}

// TODO: récupérer depuis l'API — true si l'utilisateur n'a pas encore complété l'onboarding
const IS_FIRST_TIME = true;

export default function DashboardPage() {
  const [teams, setTeams] = useState(initialTeamColors);

  if (IS_FIRST_TIME) {
    return <DashboardOnboarding clubName="FC Beaumont" />;
  }


  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-start">
        <Stack gap={2}>
          <Title order={1} c="brand.7" fz="1.6rem">
            Bonjour, Jean 👋
          </Title>
          <Text fz="sm" c="rgba(4,52,109,0.55)">
            Voici un résumé de la semaine pour <Text span fw={700} c="brand.7">FC Beaumont</Text>
          </Text>
        </Stack>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="brand"><IconBellFilled size={18} /></ActionIcon>
        </Group>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        <Paper radius="xl" p="lg" withBorder>
          <Stack gap="md">
            <Group gap="xs">
              <Box w={32} h={32} style={{ borderRadius: 12, background: "rgba(4,52,109,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCalendar size={16} color="#04346D" />
              </Box>
              <Text fz="xs" tt="uppercase" fw={600} c="rgba(4,52,109,0.5)">
                Cette semaine
              </Text>
            </Group>
            <Stack gap={2} align="center">
              <Text fz={56} fw={800} lh={1} c="brand.7">7</Text>
              <Text fz="xs" c="rgba(4,52,109,0.5)">Publications programmées</Text>
            </Stack>
            <Stack gap="xs">
              {[
                ["Résultat", 3],
                ["Affiche", 2],
                ["Classement", 2],
              ].map(([type, count]) => (
                <Group key={type} justify="space-between" px="sm" py={6} style={{ borderRadius: 10, background: "rgba(4,52,109,0.03)" }}>
                  <Badge radius="xl" size="sm" style={{ background: visualTypeColor.bg, color: visualTypeColor.text }}>
                    {type}
                  </Badge>
                  <Text fz="xs" fw={700} c="brand.7">{count}</Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Paper radius="xl" p="lg" withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Group gap="xs">
  
                  <IconCircleCheckFilled size={22} color="#0F9B58" />
  
                <Text fz="xs" tt="uppercase" fw={600} c="rgba(4,52,109,0.5)">
                  Dernière publication
                </Text>
              </Group>
              <Badge color="green" variant="light">Publié</Badge>
            </Group>

            <Group gap="xs" wrap="wrap">
              <Badge radius="xl" style={{ background: visualTypeColor.bg, color: visualTypeColor.text }}>Résultat</Badge>
              <BadgeTeam teamData={LastPublishTeam} />
            </Group>

            <Text fz="sm" fw={700} c="brand.7">Dim 2 mars à 20h00</Text>
            <Group gap={6}><IconBrandInstagram size={14} color="#DB2777" /><Text fz="xs" c="dimmed">Instagram</Text></Group>

            <Divider />
            <Image src={lastPostPlaceholder} alt="Aperçu publication" radius="md" />
          </Stack>
        </Paper>

        <Paper radius="xl" p="lg" bg="brand.7" style={{ position: "relative", overflow: "hidden" }}>
          <Box w={100} h={100} style={{ position: "absolute", top: -30, right: -30, borderRadius: "50%", background: "#F5F3EB", opacity: 0.1 }} />
          <Stack gap="sm" style={{ position: "relative", zIndex: 1 }}>
            <Group gap="xs">
              <Box w={32} h={32} style={{ borderRadius: 12, background: "rgba(245,243,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconSparkles size={16} color="white" />
              </Box>
              <Text fz="xs" tt="uppercase" fw={600} c="rgba(245,243,235,0.7)">
                Prochaine publication
              </Text>
            </Group>

            <Group gap="xs" wrap="wrap">
              <Badge radius="xl" style={{ background: visualTypeColor.bg, color: visualTypeColor.text }}>Affiche match</Badge>
              <BadgeTeam teamData={NextPublishTeam} />
            </Group>

            <Text fz="sm" fw={700} c="white">Lundi 3 mars à 18h00</Text>
            <Group gap={6}><IconBrandInstagram size={14} color="#FDA4AF" /><Text fz="xs" c="rgba(245,243,235,0.75)">Instagram - Post carré</Text></Group>

            <Divider />
            <Image src={nextPostPlaceholder} alt="Aperçu prochaine publication" radius="md" />
          </Stack>
        </Paper>
      </SimpleGrid>

      <Paper radius="xl" withBorder p={0}>
        <Group justify="space-between" px="lg" py="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.08)", background: "linear-gradient(to right, rgba(4,52,109,0.02), transparent)" }}>
          <Stack gap={0}>
            <Text fw={700} c="brand.7">Publications à venir</Text>
            <Text fz="xs" c="rgba(4,52,109,0.45)">7 prochains jours - 7 publications planifiées</Text>
          </Stack>
          <Button size="xs" variant="default">Voir tout</Button>
        </Group>

        <Stack gap={0}>
          {upcomingPublications.map((publication) => {
            return (
              <Group
                key={publication.id}
                px="lg"
                py="sm"
                style={{ borderBottom: "1px solid rgba(4,52,109,0.06)", transition: "all 150ms" }}
              >
                <Box w={88}>
                  <Text fz="xs" fw={700} c="brand.7">{publication.date}</Text>
                  <Text fz="xs" c="rgba(4,52,109,0.4)">{publication.time}</Text>
                </Box>

                <Box w={100}>
                  <Badge radius="xl" style={{ background: visualTypeColor.bg, color: visualTypeColor.text }}>
                    {publicationVisualType(publication)}
                  </Badge>
                </Box>

                <Group gap="xs" style={{ flex: 1 }}>
                  {publicationTeams(publication).map((dataTeam) => (
                    <BadgeTeam key={dataTeam.id} teamData={dataTeam} />
                  ))}
                </Group>

                <Group gap="xs" wrap="nowrap">
                  {publication.network === "instagram" || publication.network === "both" ? (
                    <Box w={28} h={28} style={{ borderRadius: 8, background: "rgba(219,39,119,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconBrandInstagram size={14} color="#DB2777" />
                    </Box>
                  ) : null}

                  {publication.network === "facebook" || publication.network === "both" ? (
                    <Box w={28} h={28} style={{ borderRadius: 8, background: "rgba(37,99,235,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconBrandFacebook size={14} color="#2563EB" />
                    </Box>
                  ) : null}
                </Group>
              </Group>
            );
          })}
        </Stack>
      </Paper>

    </Stack>
  );
}
