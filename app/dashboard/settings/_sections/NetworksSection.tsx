"use client";

import { useState } from "react";
import { Badge, Box, Button, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconAlertTriangle, IconBrandFacebook, IconBrandInstagram,
  IconCheck, IconRefresh, IconTimeline, IconUnlink, IconPlugConnected,
} from "@tabler/icons-react";
import { initialNetworks, soonNetworks, type ConnectionStatus, type NetworkState } from "@/lib/mockupdata/networks/data";
import { NetworkCard } from "@/components/networks/NetworkCard";

export function NetworksSection() {
  const [networks, setNetworks] = useState<NetworkState>(initialNetworks);
  const [reconnectingFb, setReconnectingFb] = useState(false);

  const connectInstagram = () =>
    setNetworks((prev) => ({ ...prev, instagram: { ...prev.instagram, connected: true, status: "active" } }));
  const disconnectInstagram = () =>
    setNetworks((prev) => ({ ...prev, instagram: { ...prev.instagram, connected: false, status: "disconnected" } }));

  const reconnectFacebook = () => {
    setReconnectingFb(true);
    window.setTimeout(() => {
      setNetworks((prev) => ({ ...prev, facebook: { ...prev.facebook, connected: true, status: "active" } }));
      setReconnectingFb(false);
    }, 1200);
  };
  const disconnectFacebook = () =>
    setNetworks((prev) => ({ ...prev, facebook: { ...prev.facebook, connected: false, status: "disconnected" } }));

  return (
    <Stack gap="sm">
      <SimpleGrid cols={2} spacing="md">
        <NetworkCard
          title="Instagram"
          icon={<IconBrandInstagram size={18} color="white" />}
          iconBg="linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)"
          border={networks.instagram.status === "expired" ? "1px solid rgba(234,179,8,0.3)" : "1px solid rgba(4,52,109,0.07)"}
          status={networks.instagram.status}
          connected={networks.instagram.connected}
          main={networks.instagram.username}
          onConnect={connectInstagram}
          onDisconnect={disconnectInstagram}
          onReconnect={connectInstagram}
          showViewButton
          disconnectedText="Connectez votre compte Instagram pour activer les publications automatiques."
          connectLabel="Connecter"
        />

        <NetworkCard
          title="Facebook"
          icon={<IconBrandFacebook size={18} color="white" />}
          iconBg="#1877F2"
          border={networks.facebook.status === "expired" ? "1px solid rgba(234,179,8,0.3)" : "1px solid rgba(4,52,109,0.07)"}
          status={networks.facebook.status}
          connected={networks.facebook.connected}
          main={networks.facebook.pageName}
          onConnect={reconnectFacebook}
          onDisconnect={disconnectFacebook}
          onReconnect={reconnectFacebook}
          reconnecting={reconnectingFb}
          showExpiredAlert={networks.facebook.connected && networks.facebook.status === "expired"}
          disconnectedText="Connectez votre page Facebook pour activer les publications automatiques."
          connectLabel="Connecter"
        />
      </SimpleGrid>

      <Paper radius="xl" p="md" style={{ background: "rgba(4,52,109,0.03)", border: "1.5px dashed rgba(4,52,109,0.12)" }}>
        <Group gap="xs" mb="xs">
          <IconTimeline size={15} color="rgba(4,52,109,0.45)" />
          <Text fz="xs" fw={600} c="rgba(4,52,109,0.5)">Prochainement</Text>
        </Group>
        <Group gap="sm" wrap="wrap">
          {soonNetworks.map((network) => (
            <Group key={network} gap={6} px="sm" py={5} style={{ borderRadius: 20, background: "rgba(4,52,109,0.05)", border: "1px solid rgba(4,52,109,0.08)" }}>
              <Text fz={11} c="rgba(4,52,109,0.45)">{network}</Text>
              <Badge size="xs" radius="xl" style={{ background: "rgba(4,52,109,0.06)", color: "rgba(4,52,109,0.35)" }}>Bientôt</Badge>
            </Group>
          ))}
        </Group>
      </Paper>
    </Stack>
  );
}
