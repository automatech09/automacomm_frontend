import { useState } from "react";
import { Badge, Box, Button, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconAlertTriangle, IconBrandFacebook, IconBrandInstagram,
  IconCheck, IconRefresh, IconTimeline, IconUnlink, IconPlugConnected,
} from "@tabler/icons-react";
import { initialNetworks, soonNetworks, type ConnectionStatus, type NetworkState } from "@/lib/mockupdata/networks/data";

function StatusDot({ status }: { status: ConnectionStatus }) {
    const color = status === "active" ? "#0F9B58" : status === "expired" ? "#B45309" : "rgba(4,52,109,0.3)";
    return <Box w={7} h={7} style={{ borderRadius: "50%", background: color, flexShrink: 0 }} />;
  }


export function NetworkCard({
    title, icon, iconBg, border, status, connected,
    main,
    onConnect, onDisconnect, onReconnect, reconnecting,
    showExpiredAlert, showViewButton,
    disconnectedText, connectLabel,
  }: {
    title: string; icon: React.ReactNode; iconBg: string; border: string;
    status: ConnectionStatus; connected: boolean; main: string;
    onConnect: () => void; onDisconnect: () => void; onReconnect: () => void;
    reconnecting?: boolean; showExpiredAlert?: boolean; showViewButton?: boolean;
    disconnectedText: string; connectLabel: string;
  }) {
    return (
      <Paper
        radius="xl" p="lg"
        style={{ border, display: "flex", flexDirection: "column", gap: 16 }}
      >
        {/* Header */}
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Box w={38} h={38} style={{ borderRadius: 12, background: iconBg, display: "grid", placeItems: "center", flexShrink: 0 }}>
              {icon}
            </Box>
            <Text fw={700} fz="sm" c="brand.7">{title}</Text>
          </Group>
          <Group gap={6} wrap="nowrap">
            <StatusDot status={status} />
            <Text fz={11} fw={500} style={{ color: status === "active" ? "#0F9B58" : status === "expired" ? "#B45309" : "rgba(4,52,109,0.4)" }}>
              {status === "active" ? "Actif" : status === "expired" ? "Expiré" : "Non connecté"}
            </Text>
          </Group>
        </Group>
  
        {/* Body */}
        {connected ? (
          <Stack gap={12}>
            {showExpiredAlert && (
              <Group gap="xs" p="xs" style={{ borderRadius: 10, background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }} wrap="nowrap">
                <IconAlertTriangle size={13} color="#B45309" style={{ flexShrink: 0 }} />
                <Text fz={11} c="#B45309" lh={1.4}>Token expiré — reconnectez la page.</Text>
              </Group>
            )}
  
            <Stack gap={3}>
              <Text fz="sm" fw={600} c="brand.7" truncate>{main}</Text>
            </Stack>
  
            <Group gap={6} wrap="nowrap">
              <IconCheck size={12} color="#0F9B58" />
              <Text fz={11} c="#0F9B58">Publications automatiques activées</Text>
            </Group>
  
            <Group gap="xs" mt="auto">
              {showViewButton ? null : (
                <Button
                  size="xs" radius="md" bg="#04346D"
                  leftSection={<IconRefresh size={13} />}
                  loading={reconnecting}
                  onClick={onReconnect}
                  style={{ flex: 1 }}
                >
                  Reconnecter
                </Button>
              )}
              <Button
                size="xs" radius="md" variant="light" color="red"
                leftSection={<IconUnlink size={13} />}
                onClick={onDisconnect}
                style={{ flex: 1, border: "1px solid rgba(239,68,68,0.18)", background: "rgba(239,68,68,0.06)" }}
              >
                Déconnecter
              </Button>
            </Group>
          </Stack>
        ) : (
          <Stack gap="sm" align="center" py="xs">
            <Text fz="xs" c="rgba(4,52,109,0.5)" ta="center" lh={1.5}>{disconnectedText}</Text>
            <Button
              size="xs" radius="md"
              leftSection={<IconPlugConnected size={13} />}
              onClick={onConnect}
              loading={reconnecting}
              style={{ background: iconBg }}
            >
              {connectLabel}
            </Button>
          </Stack>
        )}
      </Paper>
    );
  }