"use client";

import Link from "next/link";
import { IconBolt } from "@tabler/icons-react";
import {
  AppShell,
  Box,
  Group,
  Stack,
  Container,
  Text,
  Button,
  Anchor,
  Burger,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const navLinks = [
  { label: "Fonctionnalités", href: "/features" },
  { label: "Tarifs", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell header={{ height: 65 }} bg="#F5F3EB">
      <AppShell.Header
        style={{
          background: "rgba(245,243,235,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(4,52,109,0.1)",
        }}
      >
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            {/* Logo */}
            <Anchor component={Link} href="/" underline="never">
              <Group gap="xs">
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

            {/* Desktop nav */}
            <Group gap="xl" visibleFrom="md">
              {navLinks.map((link) => (
                <Anchor
                  key={link.href}
                  component={Link}
                  href={link.href}
                  c="brand.7"
                  fz="sm"
                  underline="never"
                  style={{ opacity: 0.8 }}
                >
                  {link.label}
                </Anchor>
              ))}
            </Group>

            {/* Desktop CTA */}
            <Group gap="sm" visibleFrom="md">
              <Button component={Link} href="/login" variant="subtle" c="brand.7">
                Connexion
              </Button>
              <Button component={Link} href="/register" bg="brand.7">
                Essai gratuit
              </Button>
            </Group>

            {/* Mobile burger */}
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" color="#04346D" />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Group gap="xs">
            <Box
              w={28}
              h={28}
              bg="brand.7"
              style={{ borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <IconBolt size={14} color="white" fill="white" />
            </Box>
            <Text fw={700} c="brand.7">AutoMaComm</Text>
          </Group>
        }
        position="right"
        size="xs"
        hiddenFrom="md"
      >
        <Stack gap="sm" mt="md">
          {navLinks.map((link) => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              c="brand.7"
              fz="sm"
              underline="never"
              py="xs"
              onClick={close}
            >
              {link.label}
            </Anchor>
          ))}
          <Button component={Link} href="/login" variant="outline" c="brand.7" style={{ borderColor: "#04346D" }} fullWidth onClick={close}>
            Connexion
          </Button>
          <Button component={Link} href="/register" bg="brand.7" fullWidth onClick={close}>
            Essai gratuit
          </Button>
        </Stack>
      </Drawer>

      <AppShell.Main>
        {children}

        {/* Footer */}
        <Box bg="brand.7" py="xl">
          <Container size="xl">
            <Group justify="space-between" wrap="wrap" gap="lg">
              <Group gap="xs">
                <Box
                  w={28}
                  h={28}
                  style={{ borderRadius: "0.4rem", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <IconBolt size={14} color="white" fill="white" />
                </Box>
                <Text c="white" fw={700} fz="lg">AutoMaComm</Text>
              </Group>

              <Group gap="xl">
                {navLinks.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    c="rgba(255,255,255,0.7)"
                    fz="sm"
                    underline="never"
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Group>

              <Text c="rgba(255,255,255,0.4)" fz="sm">
                © 2026 AutoMaComm. Tous droits réservés.
              </Text>
            </Group>
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
