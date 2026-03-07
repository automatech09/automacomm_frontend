"use client";

import Link from "next/link";
import { IconBolt } from "@tabler/icons-react";
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
  Anchor,
  Divider,
  Paper,
} from "@mantine/core";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <Box style={{ minHeight: "100vh", display: "flex" }} bg="#F5F3EB">
      {/* Left panel */}
      <Box
        visibleFrom="lg"
        style={{
          width: "50%",
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
            background: "radial-gradient(circle at 30% 70%, #0A5EBF 0%, transparent 60%)",
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
          <Box>
            <Text
              c="#F5F3EB"
              fw={600}
              fz="xl"
              style={{ lineHeight: 1.5 }}
              mb="sm"
            >
              "Depuis AutoMaComm, notre club publie 3x plus régulièrement sur les réseaux, sans effort supplémentaire."
            </Text>
            <Text c="rgba(245,243,235,0.7)" fz="sm">Marc Lefebvre</Text>
            <Text c="rgba(245,243,235,0.45)" fz="xs">Président — FC Bergerac</Text>
          </Box>

          <Paper style={{ background: "rgba(245,243,235,0.08)", border: "1px solid rgba(245,243,235,0.12)" }} radius="xl" p="md">
            <Stack gap="sm">
              <Group gap="sm" p="sm" style={{ background: "rgba(245,243,235,0.1)", borderRadius: "0.75rem" }}>
                <Box w={32} h={32} style={{ borderRadius: "0.5rem", background: "rgba(245,243,235,0.2)" }} />
                <Box style={{ flex: 1 }}>
                  <Box h={8} w={96} style={{ borderRadius: 4, background: "rgba(245,243,235,0.3)", marginBottom: 6 }} />
                  <Box h={6} w={64} style={{ borderRadius: 4, background: "rgba(245,243,235,0.15)" }} />
                </Box>
                <Box
                  px="xs"
                  py={4}
                  style={{ borderRadius: "1rem", background: "rgba(34,197,94,0.2)" }}
                >
                  <Text fz="xs" c="rgb(134,239,172)">✓ Publié</Text>
                </Box>
              </Group>
              <Group gap="sm" p="sm" style={{ background: "rgba(245,243,235,0.06)", borderRadius: "0.75rem" }}>
                <Box w={32} h={32} style={{ borderRadius: "0.5rem", background: "rgba(245,243,235,0.15)" }} />
                <Box style={{ flex: 1 }}>
                  <Box h={8} w={128} style={{ borderRadius: 4, background: "rgba(245,243,235,0.2)", marginBottom: 6 }} />
                  <Box h={6} w={80} style={{ borderRadius: 4, background: "rgba(245,243,235,0.1)" }} />
                </Box>
                <Box px="xs" py={4} style={{ borderRadius: "1rem", background: "rgba(245,243,235,0.15)" }}>
                  <Text fz="xs" c="rgba(245,243,235,0.6)">Demain</Text>
                </Box>
              </Group>
            </Stack>
          </Paper>
        </Stack>

        <Text c="rgba(245,243,235,0.35)" fz="xs" style={{ position: "relative", zIndex: 1 }}>
          © 2026 AutoMaComm — La comm' de votre club, en automatique.
        </Text>
      </Box>

      {/* Right panel */}
      <Box
        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}
      >
        <Stack w="100%" maw={400} gap="lg">
          {/* Mobile logo */}
          <Anchor component={Link} href="/" underline="never" hiddenFrom="lg">
            <Group gap="xs" mb="xl">
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

          <Box>
            <Title order={1} c="brand.7" fz="2rem" fw={700} mb={4}>Bon retour 👋</Title>
            <Text c="rgba(4,52,109,0.55)" fz="sm">Connectez-vous à votre espace club.</Text>
          </Box>

          <Stack gap="sm">
            <TextInput
              label="Email"
              placeholder="jean@fcmonclub.fr"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              styles={{ label: { color: "#04346D", fontWeight: 500 }, input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
            />

            <Box>
              <Group justify="space-between" mb={6}>
                <Text fz="sm" fw={500} c="brand.7">Mot de passe</Text>
                <Anchor fz="xs" c="rgba(4,52,109,0.55)" underline="hover">Mot de passe oublié ?</Anchor>
              </Group>
              <PasswordInput
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                styles={{ input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />
            </Box>

            <Button component={Link} href="/dashboard" fullWidth bg="brand.7" size="md" mt={4}>
              Se connecter
            </Button>
          </Stack>

          <Divider label="ou" labelPosition="center" c="rgba(4,52,109,0.4)" />

          <Button
            variant="default"
            fullWidth
            leftSection={
              <svg width={16} height={16} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            }
            c="brand.7"
            style={{ border: "1.5px solid rgba(4,52,109,0.12)" }}
          >
            Continuer avec Google
          </Button>

          <Text ta="center" fz="sm" c="rgba(4,52,109,0.5)">
            Pas encore de compte ?{" "}
            <Anchor component={Link} href="/register" c="brand.7" fw={600} underline="hover">
              S'inscrire gratuitement
            </Anchor>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
