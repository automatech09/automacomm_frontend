"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ActionIcon,
  Avatar,
  Box,
  Drawer,
  Flex,
  Group,
  Indicator,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  Bell,
  CalendarClock,
  ChevronRight,
  Image,
  Layout,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Share2,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";

const SIDEBAR_WIDTH = 240;

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Mes équipes", href: "/dashboard/teams" },
  { icon: Layout, label: "Templates", href: "/dashboard/templates" },
  { icon: Wand2, label: "Génération manuelle", href: "/dashboard/generation" },
  { icon: CalendarClock, label: "Planification", href: "/dashboard/scheduling" },
  { icon: Image, label: "Arrière-plans", href: "/dashboard/backgrounds" },
  { icon: Share2, label: "Mes réseaux", href: "/dashboard/networks" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

type SidebarContentProps = {
  isActive: (href: string) => boolean;
  onNavClick: () => void;
  onClose?: () => void;
  onLogout: () => void;
};

function SidebarContent({ isActive, onNavClick, onClose, onLogout }: SidebarContentProps) {
  return (
    <Flex direction="column" h="100%" bg="#04346D">
      <Group justify="space-between" px="md" py="md">
        <UnstyledButton component={Link} href="/" onClick={onNavClick}>
          <Group gap="sm" wrap="nowrap">
            <Text c="white" fz="md" fw={700}>
              AutoMaComm
            </Text>
          </Group>
        </UnstyledButton>

        {onClose ? (
          <ActionIcon variant="subtle" c="rgba(255,255,255,0.7)" onClick={onClose}>
            <X size={16} />
          </ActionIcon>
        ) : null}
      </Group>

      <Box
        mx="md"
        mb="md"
        p="sm"
        style={{ borderRadius: 12, background: "rgba(255,255,255,0.08)" }}
      >
        <Group gap="sm" wrap="nowrap">
          <Box
            w={36}
            h={36}
            style={{
              borderRadius: 10,
              background: "rgba(255,255,255,0.2)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Text c="white" fz="xs" fw={700}>
              FC
            </Text>
          </Box>

          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text c="white" fz="xs" fw={600} truncate>
              FC Beaumont
            </Text>
            <Text c="rgba(255,255,255,0.5)" fz="xs" truncate>
              Plan Pro
            </Text>
          </Box>

          <ChevronRight size={14} color="rgba(255,255,255,0.4)" />
        </Group>
      </Box>

      <ScrollArea type="never" style={{ flex: 1 }} px="xs">
        <Stack gap={4} pb="xs">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(href);

            return (
              <UnstyledButton
                key={href}
                component={Link}
                href={href}
                onClick={onNavClick}
                px="sm"
                py={10}
                style={{
                  borderRadius: 12,
                  color: active ? "white" : "rgba(255,255,255,0.6)",
                  background: active ? "rgba(255,255,255,0.15)" : "transparent",
                }}
              >
                <Group gap="sm" wrap="nowrap">
                  <Icon size={16} />
                  <Text fz="sm" fw={active ? 500 : 400} style={{ flex: 1 }}>
                    {label}
                  </Text>
                  {active ? (
                    <Box w={6} h={6} style={{ borderRadius: 9999, background: "rgba(255,255,255,0.7)" }} />
                  ) : null}
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </ScrollArea>

      <Box p="md" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Group gap="sm" wrap="nowrap" px={4} py={6}>
          <Avatar radius="xl" size={32} color="gray" styles={{ root: { background: "rgba(255,255,255,0.2)" } }}>
            <Text c="white" fz="xs" fw={700}>
              JD
            </Text>
          </Avatar>

          <Box style={{ flex: 1, minWidth: 0 }}>
            <Text c="white" fz="xs" fw={500} truncate>
              Jean Dupont
            </Text>
            <Text c="rgba(255,255,255,0.5)" fz="xs" truncate>
              jean@fcbeaumont.fr
            </Text>
          </Box>
        </Group>

        <UnstyledButton
          onClick={onLogout}
          px="sm"
          py={8}
          mt={4}
          w="100%"
          style={{ borderRadius: 12, color: "rgba(255,255,255,0.5)" }}
        >
          <Group gap={8} wrap="nowrap">
            <LogOut size={16} />
            <Text fz="sm">Déconnexion</Text>
          </Group>
        </UnstyledButton>
      </Box>
    </Flex>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  const handleNavClick = () => setSidebarOpen(false);
  const handleLogout = () => router.push("/login");

  return (
    <Box mih="100vh" bg="#F5F3EB">
      <Drawer
        opened={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        withCloseButton={false}
        hiddenFrom="sm"
        size={SIDEBAR_WIDTH}
        radius={0}
        padding={0}
        overlayProps={{ color: "#000", opacity: 0.4 }}
        styles={{
          content: { background: "#04346D" },
          body: { height: "100%", padding: 0 },
        }}
      >
        <SidebarContent
          isActive={isActive}
          onNavClick={handleNavClick}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
      </Drawer>

      <Group align="stretch" gap={0} wrap="nowrap" mih="100vh">
        <Box
          visibleFrom="sm"
          w={SIDEBAR_WIDTH}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            flexShrink: 0,
          }}
        >
          <SidebarContent isActive={isActive} onNavClick={handleNavClick} onLogout={handleLogout} />
        </Box>

        <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
          <Box
            component="header"
            px={24}
            py={16}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "rgba(245,243,235,0.95)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid rgba(4,52,109,0.08)",
            }}
          >
            <Group justify="space-between">
              <ActionIcon
                hiddenFrom="sm"
                variant="subtle"
                c="#04346D"
                size="lg"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </ActionIcon>

              <Box visibleFrom="sm" />

              <Group gap="sm" wrap="nowrap">
                <Indicator inline color="red" size={6} offset={6} position="top-end" withBorder>
                  <ActionIcon
                    size={36}
                    radius="md"
                    variant="default"
                    styles={{ root: { background: "white", borderColor: "rgba(4,52,109,0.1)" } }}
                  >
                    <Bell size={16} color="#04346D" />
                  </ActionIcon>
                </Indicator>

                <Avatar radius="md" size={36} styles={{ root: { background: "#04346D" } }}>
                  <Text c="white" fz="xs" fw={700}>
                    JD
                  </Text>
                </Avatar>
              </Group>
            </Group>
          </Box>

          <Box component="main" style={{ flex: 1, overflow: "auto" }} p={24}>
            {children}
          </Box>
        </Flex>
      </Group>
    </Box>
  );
}
