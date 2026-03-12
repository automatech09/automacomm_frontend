"use client";

import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ThemeIcon,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBrandInstagram,
  IconCheck,
  IconLayout,
  IconNetwork,
  IconSettings,
  IconSparkles,
  IconUsers,
  type TablerIcon,
} from "@tabler/icons-react";

type OnboardingStep = {
  id: string;
  icon: TablerIcon;
  color: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  done: boolean;
};

const steps: OnboardingStep[] = [
  {
    id: "club",
    icon: IconSettings,
    color: "#04346D",
    title: "Configurer votre club",
    description: "Renseignez le nom, le logo et les couleurs de votre club.",
    cta: "Configurer",
    href: "/dashboard/settings",
    done: false,
  },
  {
    id: "teams",
    icon: IconUsers,
    color: "#FF6B35",
    title: "Ajouter vos équipes",
    description: "Créez vos équipes (Équipe 1, Réserve, U18…) pour organiser vos visuels.",
    cta: "Ajouter",
    href: "/dashboard/settings",
    done: false,
  },
  {
    id: "template",
    icon: IconLayout,
    color: "#7A0FB0",
    title: "Créer votre premier template",
    description: "Concevez le visuel de base qui sera réutilisé pour chaque publication.",
    cta: "Créer",
    href: "/dashboard/templates",
    done: false,
  },
  {
    id: "networks",
    icon: IconBrandInstagram,
    color: "#E91E8C",
    title: "Connecter vos réseaux",
    description: "Liez votre Instagram et Facebook pour publier directement depuis AutoMaComm.",
    cta: "Connecter",
    href: "/dashboard/settings",
    done: false,
  }
];

export function DashboardOnboarding({ clubName = "votre club" }: { clubName?: string }) {
  const doneCount = steps.filter((s) => s.done).length;
  const progress = Math.round((doneCount / steps.length) * 100);

  return (
    <Stack gap="xl">
      {/* Hero */}
      <Paper
        radius="xl"
        p="xl"
        style={{
          background: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decoration circles */}
        <Box style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(245,243,235,0.06)" }} />
        <Box style={{ position: "absolute", bottom: -20, right: 80, width: 80, height: 80, borderRadius: "50%", background: "rgba(245,243,235,0.04)" }} />

        <Stack gap="md" style={{ position: "relative", zIndex: 1 }}>
          <Group gap="sm">
            <Badge variant="light" color="yellow" radius="xl" leftSection={<IconSparkles size={12} />}>
              Bienvenue !
            </Badge>
          </Group>

          <Stack gap={4}>
            <Title order={1} c="white" fz={{ base: "1.6rem", sm: "2rem" }}>
              Bienvenue sur AutoMaComm
            </Title>
            <Text c="rgba(245,243,235,0.7)" fz="sm" maw={520}>
              Vous êtes à quelques étapes de publier automatiquement les visuels de <Text span fw={700} c="white">{clubName}</Text>. Suivez le guide — ça prend moins de 5 minutes.
            </Text>
          </Stack>

          <Stack gap={6}>
            <Group justify="space-between">
              <Text fz="xs" c="rgba(245,243,235,0.6)" fw={500}>
                {doneCount}/{steps.length} étapes complétées
              </Text>
              <Text fz="xs" c="rgba(245,243,235,0.6)" fw={600}>{progress}%</Text>
            </Group>
            <Progress
              value={progress}
              size="sm"
              radius="xl"
              color="yellow"
              bg="rgba(245,243,235,0.15)"
            />
          </Stack>
        </Stack>
      </Paper>

      {/* Steps */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Paper
              key={step.id}
              radius="xl"
              p="lg"
              withBorder
              style={{
                borderColor: step.done ? "rgba(15,155,88,0.3)" : "rgba(4,52,109,0.08)",
                background: step.done ? "rgba(15,155,88,0.03)" : "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {step.done && (
                <Box
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#0F9B58",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <IconCheck size={13} color="white" strokeWidth={3} />
                </Box>
              )}

              <Stack gap="md">
                <Group gap="sm">
                  <ThemeIcon
                    size={44}
                    radius="xl"
                    style={{ background: `${step.color}18`, color: step.color }}
                    variant="filled"
                  >
                    <Icon size={20} />
                  </ThemeIcon>
                  <Badge
                    variant="light"
                    color="gray"
                    radius="xl"
                    size="sm"
                    style={{ color: "rgba(4,52,109,0.4)" }}
                  >
                    Étape {index + 1}
                  </Badge>
                </Group>

                <Stack gap={4}>
                  <Text fw={700} c="brand.7">{step.title}</Text>
                  <Text fz="sm" c="rgba(4,52,109,0.55)" lh={1.5}>{step.description}</Text>
                </Stack>

                <Button
                  component={Link}
                  href={step.href}
                  size="sm"
                  radius="xl"
                  variant={step.done ? "light" : "filled"}
                  color={step.done ? "green" : "brand"}
                  bg={step.done ? undefined : step.color}
                  rightSection={step.done ? <IconCheck size={14} /> : <IconArrowRight size={14} />}
                  style={{ alignSelf: "flex-start" }}
                >
                  {step.done ? "Terminé" : step.cta}
                </Button>
              </Stack>
            </Paper>
          );
        })}
      </SimpleGrid>

      {/* Footer tip */}
      <Paper
        radius="xl"
        p="md"
        style={{ background: "rgba(4,52,109,0.03)", border: "1px solid rgba(4,52,109,0.08)" }}
      >
        <Group gap="sm" wrap="nowrap">
          <Box
            w={36}
            h={36}
            style={{ borderRadius: 10, background: "#04346D", display: "grid", placeItems: "center", flexShrink: 0 }}
          >
            <IconNetwork size={18} color="white" />
          </Box>
          <Stack gap={0}>
            <Text fz="sm" fw={600} c="brand.7">Vous pouvez tout configurer plus tard</Text>
            <Text fz="xs" c="rgba(4,52,109,0.5)">
              L'onboarding reste accessible depuis les paramètres tant que toutes les étapes ne sont pas complètes.
            </Text>
          </Stack>
        </Group>
      </Paper>
    </Stack>
  );
}
