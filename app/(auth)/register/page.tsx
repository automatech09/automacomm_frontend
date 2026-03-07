"use client";

import Link from "next/link";
import { IconBolt, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import {
  Box,
  Stack,
  Group,
  Text,
  Title,
  Button,
  TextInput,
  PasswordInput,
  NativeSelect,
  Anchor,
  SimpleGrid,
  Paper,
} from "@mantine/core";

const benefits = [
  "14 jours d'essai gratuit",
  "Aucune carte bancaire requise",
  "Configuration en 5 minutes",
  "Annulation à tout moment",
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ plan: "pro" });

  return (
    <Box style={{ minHeight: "100vh", display: "flex" }} bg="#F5F3EB">
      {/* Left panel */}
      <Box
        visibleFrom="lg"
        style={{
          width: "42%",
          background: "#04346D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            background: "radial-gradient(circle at 70% 30%, #0A5EBF 0%, transparent 60%)",
          }}
        />

        <Anchor component={Link} href="/" underline="never" style={{ position: "relative", zIndex: 1 }}>
          <Group gap="xs">
            <Box
              w={36}
              h={36}
              style={{ borderRadius: "0.75rem", background: "rgba(245,243,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <IconBolt size={18} color="white" fill="white" />
            </Box>
            <Text c="white" fw={700} fz="lg">AutoMaComm</Text>
          </Group>
        </Anchor>

        <Stack gap="lg" style={{ position: "relative", zIndex: 1 }}>
          <Title order={2} c="#F5F3EB" fw={700} style={{ lineHeight: 1.3, fontSize: "1.7rem" }}>
            Votre club mérite une communication professionnelle.
          </Title>

          <Stack gap="sm">
            {benefits.map((b) => (
              <Group key={b} gap="sm">
                <IconCircleCheck size={16} color="rgba(245,243,235,0.7)" />
                <Text c="rgba(245,243,235,0.8)" fz="sm">{b}</Text>
              </Group>
            ))}
          </Stack>

          <Paper style={{ background: "rgba(245,243,235,0.08)", border: "1px solid rgba(245,243,235,0.12)" }} radius="xl" p="lg">
            <Group gap={2} mb="sm">
              {[...Array(5)].map((_, i) => (
                <Text key={i} c="yellow" fz="sm">★</Text>
              ))}
            </Group>
            <Text c="rgba(245,243,235,0.8)" fz="sm" mb="sm" style={{ lineHeight: 1.6 }}>
              "En 10 minutes on a tout configuré. Maintenant ça tourne tout seul !"
            </Text>
            <Text c="rgba(245,243,235,0.45)" fz="xs">Sophie Renard — AS Moirans</Text>
          </Paper>
        </Stack>

        <Text c="rgba(245,243,235,0.3)" fz="xs" style={{ position: "relative", zIndex: 1 }}>
          © 2026 AutoMaComm
        </Text>
      </Box>

      {/* Right panel */}
      <Box
        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", overflowY: "auto" }}
      >
        <Stack w="100%" maw={400} gap="lg">
          {/* Mobile logo */}
          <Anchor component={Link} href="/" underline="never" hiddenFrom="lg">
            <Group gap="xs" mb="lg">
              <Box
                w={32}
                h={32}
                bg="brand.7"
                style={{ borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <IconBolt size={16} color="white" fill="white" />
              </Box>
              <Text fw={700} fz="lg" c="brand.7">AutoMaComm</Text>
            </Group>
          </Anchor>

          {/* Step indicator */}
          <Group gap="xs">
            {[1, 2].map((s) => (
              <Group key={s} gap="xs">
                <Box
                  w={28}
                  h={28}
                  style={{
                    borderRadius: "50%",
                    background: step >= s ? "#04346D" : "rgba(4,52,109,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text c={step >= s ? "white" : "rgba(4,52,109,0.4)"} fz="xs" fw={600}>
                    {step > s ? "✓" : s}
                  </Text>
                </Box>
                {s < 2 && (
                  <Box
                    w={48}
                    h={2}
                    style={{ background: step > s ? "#04346D" : "rgba(4,52,109,0.12)", borderRadius: 1 }}
                  />
                )}
              </Group>
            ))}
            <Text fz="xs" c="rgba(4,52,109,0.5)" ml="xs">
              {step === 1 ? "Votre compte" : "Votre club"}
            </Text>
          </Group>

          {step === 1 ? (
            <Stack gap="md">
              <Box>
                <Title order={1} c="brand.7" fz="1.7rem" fw={700} mb={4}>Créez votre compte</Title>
                <Text c="rgba(4,52,109,0.55)" fz="sm">14 jours gratuits, sans carte bancaire.</Text>
              </Box>

              <SimpleGrid cols={2} spacing="sm">
                <TextInput
                  label="Prénom"
                  placeholder="Jean"
                  styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
                />
                <TextInput
                  label="Nom"
                  placeholder="Dupont"
                  styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
                />
              </SimpleGrid>

              <TextInput
                label="Email professionnel"
                placeholder="jean@fcmonclub.fr"
                type="email"
                styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />

              <PasswordInput
                label="Mot de passe"
                placeholder="8 caractères minimum"
                styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />

              <Button fullWidth bg="brand.7" size="md" onClick={() => setStep(2)}>
                Continuer →
              </Button>
            </Stack>
          ) : (
            <Stack gap="md">
              <Box>
                <Title order={1} c="brand.7" fz="1.7rem" fw={700} mb={4}>Votre club</Title>
                <Text c="rgba(4,52,109,0.55)" fz="sm">Quelques informations pour configurer votre espace.</Text>
              </Box>

              <TextInput
                label="Nom du club"
                placeholder="FC Mon Club"
                styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />

              <NativeSelect
                label="Votre rôle dans le club"
                data={["Président", "Secrétaire", "Community Manager", "Bénévole", "Autre"]}
                styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />

              <NativeSelect
                label="Discipline sportive"
                data={["Football", "Basketball", "Rugby", "Handball", "Volleyball", "Autre"]}
                styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />

              <Box>
                <Text fz="sm" fw={500} c="brand.7" mb="xs">Plan choisi</Text>
                <SimpleGrid cols={3} spacing="sm">
                  {["Starter", "Pro", "Club"].map((p) => (
                    <Button
                      key={p}
                      variant={form.plan === p.toLowerCase() ? "filled" : "default"}
                      bg={form.plan === p.toLowerCase() ? "brand.7" : undefined}
                      c={form.plan === p.toLowerCase() ? "white" : "rgba(4,52,109,0.6)"}
                      style={{ border: `1.5px solid ${form.plan === p.toLowerCase() ? "#04346D" : "rgba(4,52,109,0.15)"}` }}
                      onClick={() => setForm({ ...form, plan: p.toLowerCase() })}
                    >
                      {p}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>

              <Group gap="sm">
                <Button
                  variant="default"
                  style={{ flex: 1, border: "1.5px solid rgba(4,52,109,0.2)" }}
                  c="brand.7"
                  onClick={() => setStep(1)}
                >
                  ← Retour
                </Button>
                <Button
                  component={Link}
                  href="/dashboard"
                  bg="brand.7"
                  style={{ flex: 1 }}
                >
                  Créer mon espace
                </Button>
              </Group>
            </Stack>
          )}

          <Text ta="center" fz="sm" c="rgba(4,52,109,0.5)">
            Déjà un compte ?{" "}
            <Anchor component={Link} href="/login" c="brand.7" fw={600} underline="hover">
              Se connecter
            </Anchor>
          </Text>

          <Text ta="center" fz="xs" c="rgba(4,52,109,0.35)">
            En vous inscrivant, vous acceptez nos{" "}
            <Anchor fz="xs" c="rgba(4,52,109,0.35)" underline="always">CGU</Anchor>
            {" "}et notre{" "}
            <Anchor fz="xs" c="rgba(4,52,109,0.35)" underline="always">Politique de confidentialité</Anchor>.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
