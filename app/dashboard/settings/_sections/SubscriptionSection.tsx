"use client";

import { Stack, Group, Box, Text, Paper, Button, SimpleGrid, Badge } from "@mantine/core";

const plans = [
  { name: "Starter", price: "19€/mois", current: false },
  { name: "Pro", price: "39€/mois", current: true },
  { name: "Club", price: "79€/mois", current: false },
];

export function SubscriptionSection() {
  return (
    <Paper radius="xl" p="xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
      <Stack gap="md">
        <Stack gap={2}>
          <Text fw={700} style={{ color: "#04346D" }}>Votre abonnement</Text>
          <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>Choisissez le plan adapté à votre club</Text>
        </Stack>

        <SimpleGrid cols={3}>
          {plans.map((plan) => (
            <Box
              key={plan.name}
              pos="relative" p="md"
              style={{
                borderRadius: 14,
                background: plan.current ? "#04346D" : "rgba(4,52,109,0.03)",
                border: `1.5px solid ${plan.current ? "#04346D" : "rgba(4,52,109,0.08)"}`,
                cursor: plan.current ? "default" : "pointer",
              }}
            >
              {plan.current && (
                <Box pos="absolute" top={-11} left="50%" style={{ transform: "translateX(-50%)" }}>
                  <Badge size="sm" radius="xl" style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 700 }}>
                    Actuel
                  </Badge>
                </Box>
              )}
              <Text fz="sm" fw={700} style={{ color: plan.current ? "white" : "#04346D" }}>{plan.name}</Text>
              <Text fz="xs" style={{ color: plan.current ? "rgba(245,243,235,0.65)" : "rgba(4,52,109,0.45)" }}>
                {plan.price}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <Box p="md" style={{ borderRadius: 12, background: "rgba(4,52,109,0.03)", border: "1px solid rgba(4,52,109,0.07)" }}>
          <Group justify="space-between">
            <Stack gap={2}>
              <Text fz="sm" fw={600} style={{ color: "#04346D" }}>Plan Pro — Actif</Text>
              <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>Prochain renouvellement le 1 avril 2026 · 39€</Text>
            </Stack>
            <Group gap="xs">
              <Button size="xs" radius="md" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D" }}>
                Changer de plan
              </Button>
              <Button size="xs" radius="md" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D" }}>
                Factures
              </Button>
            </Group>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}
