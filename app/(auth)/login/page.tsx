"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Paper,
} from "@mantine/core";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

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

          <form onSubmit={handleSubmit}>
          <Stack gap="sm">
            <TextInput
              label="Email"
              placeholder="jean@fcmonclub.fr"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
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
                required
                styles={{ input: { background: "white", borderColor: "rgba(4,52,109,0.15)", color: "#04346D" } }}
              />
            </Box>

            {error && <Text fz="xs" c="red">{error}</Text>}

            <Button type="submit" fullWidth bg="brand.7" size="md" mt={4} loading={loading}>
              Se connecter
            </Button>
          </Stack>
          </form>

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
