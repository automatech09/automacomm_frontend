"use client";

import { useEffect, useState } from "react";
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
  Divider,
  Image,
} from "@mantine/core";
import {
  IconBellFilled,
  IconBrandInstagram,
  IconCalendar,
  IconCircleCheckFilled,
  IconSparkles,
} from "@tabler/icons-react";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { DashboardOnboarding } from "@/components/onboarding/DashboardOnboarding";
import { getSchedulerSummary } from "@/lib/api/scheduler";
import { getVisualType, getUniqueTeams, getDisplayImages } from "@/lib/utils/publications";
import { formatDate, formatTime } from "@/lib/utils/format";
import { ScheduledPublication } from "@/types";


function ThumbnailGrid({ publication }: { publication: ScheduledPublication }) {
  const images = getDisplayImages(publication);
  return (
    <Group gap={6} wrap="nowrap" align="stretch">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          radius="md"
          fit="cover"
          h={180}
          style={{ flex: 1, minWidth: 0 }}
        />
      ))}
    </Group>
  );
}



export default function DashboardPage() {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const {upcomingItems, lastPublished, thisWeekItems } = getSchedulerSummary();
  const nextUpcoming = upcomingItems[0] ?? null;


  const IS_FIRST_TIME = false

  // Comptage par type de visuel pour la semaine
  const weekByType = thisWeekItems.reduce<Record<string, number>>((acc, item) => {
    const vt = getVisualType(item);
    acc[vt] = (acc[vt] ?? 0) + 1;
    return acc;
  }, {});

  if (isFirstTime) {
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
        {/* Compteur semaine */}
        <Paper radius="xl" p="lg" withBorder>
          <Stack gap="md">
            <Group gap="xs">
              <Box w={32} h={32} style={{ borderRadius: 12, background: "rgba(4,52,109,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCalendar size={16} color="#04346D" />
              </Box>
              <Text fz="xs" tt="uppercase" fw={600} c="rgba(4,52,109,0.5)">Cette semaine</Text>
            </Group>
            <Stack gap={2} align="center">
              <Text fz={56} fw={800} lh={1} c="brand.7">{thisWeekItems.length}</Text>
              <Text fz="xs" c="rgba(4,52,109,0.5)">Publications programmées</Text>
            </Stack>
            <Stack gap="xs">
              {Object.entries(weekByType).map(([type, count]) => (
                <Group key={type} justify="space-between" px="sm" py={6} style={{ borderRadius: 10, background: "rgba(4,52,109,0.03)" }}>
                  <Badge radius="xl" size="sm" bg={'brand'}>{type}</Badge>
                  <Text fz="xs" fw={700} c="brand.7">{count}</Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Paper>

        {/* Dernière publication */}
        <Paper radius="xl" p="lg" withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Group gap="xs">
                <IconCircleCheckFilled size={22} color="#0F9B58" />
                <Text fz="xs" tt="uppercase" fw={600} c="rgba(4,52,109,0.5)">Dernière publication</Text>
              </Group>
              <Badge color="green" variant="light">Publié</Badge>
            </Group>

            {lastPublished ? (
              <>
                <Group gap="xs" wrap="wrap">
                <Badge radius="xl" bg={'brand'}>
                    {getVisualType(lastPublished)}
                  </Badge>
                  {getUniqueTeams(lastPublished).map((t) => <BadgeTeam key={t.id} teamData={t} />)}
                </Group>
                <Text fz="sm" fw={700} c="brand.7">
                  {formatDate(lastPublished.date)} à {formatTime(lastPublished.date)}
                </Text>
                <Group gap={6}><IconBrandInstagram size={14} color="#DB2777" /><Text fz="xs" c="dimmed">Instagram</Text></Group>
              </>
            ) : (
              <Text fz="sm" c="dimmed">Aucune publication récente</Text>
            )}

            <Divider />
            {lastPublished && <ThumbnailGrid publication={lastPublished} />}
          </Stack>
        </Paper>

        {/* Prochaine publication */}
        <Paper radius="xl" p="lg" bg="brand.7" style={{ position: "relative", overflow: "hidden" }}>
          <Box w={100} h={100} style={{ position: "absolute", top: -30, right: -30, borderRadius: "50%", background: "#F5F3EB", opacity: 0.1 }} />
          <Stack gap="sm" style={{ position: "relative", zIndex: 1 }}>
            <Group gap="xs">
              <Box w={32} h={32} style={{ borderRadius: 12, background: "rgba(245,243,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconSparkles size={16} color="white" />
              </Box>
              <Text fz="xs" tt="uppercase" fw={600} c="rgba(245,243,235,0.7)">Prochaine publication</Text>
            </Group>

            {nextUpcoming ? (
              <>
                <Group gap="xs" wrap="wrap">
                  <Badge radius="xl" bg={'brand'}>
                    {getVisualType(nextUpcoming)}
                  </Badge>
                  {getUniqueTeams(nextUpcoming).map((t) => <BadgeTeam key={t.id} teamData={t} />)}
                </Group>
                <Text fz="sm" fw={700} c="white">
                  {formatDate(nextUpcoming.date)} à {formatTime(nextUpcoming.date)}
                </Text>
                <Group gap={6}><IconBrandInstagram size={14} color="#FDA4AF" /><Text fz="xs" c="rgba(245,243,235,0.75)">Instagram</Text></Group>
              </>
            ) : (
              <Text fz="sm" c="rgba(245,243,235,0.7)">Aucune publication à venir</Text>
            )}

            <Divider />
            {nextUpcoming && <ThumbnailGrid publication={nextUpcoming} />}
          </Stack>
        </Paper>
      </SimpleGrid>

      {/* Liste publications à venir */}
      <Paper radius="xl" withBorder p={0}>
        <Group justify="space-between" px="lg" py="md" style={{ borderBottom: "1px solid rgba(4,52,109,0.08)", background: "linear-gradient(to right, rgba(4,52,109,0.02), transparent)" }}>
          <Stack gap={0}>
            <Text fw={700} c="brand.7">Publications à venir</Text>
            <Text fz="xs" c="rgba(4,52,109,0.45)">{upcomingItems.length} publication{upcomingItems.length > 1 ? "s" : ""} planifiée{upcomingItems.length > 1 ? "s" : ""}</Text>
          </Stack>
          <Button size="xs" variant="default">Voir tout</Button>
        </Group>

        <Stack gap={0}>
          {upcomingItems.map((item) => (
            <Group
              key={item.id}
              px="lg"
              py="sm"
              style={{ borderBottom: "1px solid rgba(4,52,109,0.06)", transition: "all 150ms" }}
            >
              <Box w={88}>
                <Text fz="xs" fw={700} c="brand.7">{formatDate(item.date)}</Text>
                <Text fz="xs" c="rgba(4,52,109,0.4)">{formatTime(item.date)}</Text>
              </Box>

              <Box w={100}>
              <Badge radius="xl" bg={'brand'}>
                {getVisualType(item)}
                </Badge>
              </Box>

              <Group gap="xs" style={{ flex: 1 }}>
                {getUniqueTeams(item).map((team) => (
                  <BadgeTeam key={team.id} teamData={team} />
                ))}
              </Group>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
