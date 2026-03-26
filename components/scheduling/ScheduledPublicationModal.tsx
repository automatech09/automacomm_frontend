"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Badge, Box, Button, CloseButton, Divider,
  Group, Image, Modal, ScrollArea, Stack, Text,
} from "@mantine/core";
import {
  IconCalendar, IconClock, IconAlertTriangle,
  IconCircleCheckFilled, IconClockHour4, IconTrash, IconExternalLink,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { BadgeTeam } from "@/components/teams/BadgeTeam";
import { BadgeStoryOrPost } from "@/components/common/BadgeStoryPost";
import { getUniqueTeams, getDisplayImages } from "@/lib/utils/publications";
import { STATUS_CONFIG } from "@/lib/constants/scheduler";
import type { ScheduledPublication } from "@/types";
import { BadgeVisualType } from "@/components/common/BadgeVisualType";
import { DisplayImage } from "../common/DisplayImage";
import { Carousel } from "../common/Carousel";

const STATUS_ICON = {
  upcoming:  <IconClockHour4 size={13} />,
  published: <IconCircleCheckFilled size={13} />,
  error:     <IconAlertTriangle size={13} />,
};

const GRADIENT_TOP = "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)";
const GRADIENT_BOTTOM = "linear-gradient(to top, rgba(0,0,0,0.65), transparent)";

interface Props {
  event: ScheduledPublication;
  opened: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function ScheduledPublicationModal({ event, opened, onClose, onDelete }: Props) {
  const router = useRouter();
  const teams = getUniqueTeams(event);
  const images = getDisplayImages(event);
  const { color, label } = STATUS_CONFIG[event.status];
  const isCarousel = images.length > 1;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="85%"
      radius="xl"
      padding={0}
      styles={{ body: { padding: 0 } }}
    >
      <Group align="stretch" wrap="nowrap" gap={0} style={{ height: "85vh", maxHeight: 700 }}>

        {/* ── Colonne image ────────────────────────────────── */}
        <Box style={{
          width: "40%"
        }}>
          {/* Carousel */}
          <Carousel
            height="100%"
            showDots={isCarousel}
            showArrows={isCarousel}
            slides={images.map((src) => (
              <Box style={{ height: "100%", padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DisplayImage src={src} fit="contain" mah={'80vh'} w='auto' radius={10} />
              </Box>
            ))}
          />

          

          {/* Status badge — haut gauche */}
          <Box style={{ position: "absolute", top: 14, left: 14 }}>
            <Badge size="sm" radius="xl" color={color} variant="filled" leftSection={STATUS_ICON[event.status]}
              style={{ backdropFilter: "blur(6px)", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
              {label}
            </Badge>
          </Box>
        </Box>

        {/* ── Colonne infos ─────────────────────────────────── */}
        <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>

          <Group justify="space-between" align="center" px="xl" pt="xl" pb="md">
            <Text fw={700} fz="md" c="brand.7">Détails de la publication</Text>
            <CloseButton radius="xl" size="md" onClick={onClose} />
          </Group>

          <Divider />

          <ScrollArea style={{ flex: 1 }} px="xl" py="lg">
            <Stack gap="xl">

              <Stack gap={8}>
                <Group gap={8} align="center">
                  <IconCalendar size={16} color="var(--mantine-color-brand-6)" />
                  <Text fz="md" fw={700} c="brand.7" style={{ textTransform: "capitalize" }}>
                    {format(event.date, "EEEE d MMMM yyyy", { locale: fr })}
                  </Text>
                </Group>
                <Group gap={8} align="center">
                  <IconClock size={16} color="var(--mantine-color-dimmed)" />
                  <Text fz="sm" c="dimmed">Publication prévue à {format(event.date, "HH:mm", { locale: fr })}</Text>
                </Group>
              </Stack>

              <Divider />

              {teams.length > 0 && (
                <Stack gap={10}>
                  <Text fz="xs" fw={600} tt="uppercase" c="dimmed" style={{ letterSpacing: 0.5 }}>Équipes concernées</Text>
                  <Group gap={6} wrap="wrap">
                    {teams.map((t) => <BadgeTeam key={t.id} teamData={t} />)}
                  </Group>
                </Stack>
              )}

              <Stack gap={10}>
                <Text fz="xs" fw={600} tt="uppercase" c="dimmed" style={{ letterSpacing: 0.5 }}>
                  {isCarousel ? `Carrousel · ${event.templates.length} visuels` : "Visuel"}
                </Text>
                {event.templates.map((t) => (
                  <Group key={t.id} justify="space-between" wrap="nowrap" align="center"
                    p="sm" style={{ borderRadius: 12, border: "1px solid rgba(4,52,109,0.08)", background: "rgba(4,52,109,0.02)" }}>
                    <Group gap={10} wrap="nowrap">
                      <Box style={{ width: 40, height: 52, borderRadius: 8, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(0,0,0,0.07)" }}>
                        <Image src={t.thumbnail} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </Box>
                      <Stack gap={4}>
                        <BadgeVisualType visualTypeName={t.visualType} size="xs" />
                        <Text fz="xs" c="dark.5" fw={500}>{t.name}</Text>
                      </Stack>
                    </Group>
                    <Button size="xs" variant="subtle" radius="xl" color="brand" leftSection={<IconExternalLink size={12} />}
                      onClick={() => { router.push(`/dashboard/templates?highlight=${t.id}`); onClose(); }}>
                      Voir
                    </Button>
                  </Group>
                ))}
              </Stack>

              {event.status === "error" && (
                <Box p="sm" style={{ borderRadius: 12, background: "var(--mantine-color-red-0)", border: "1px solid var(--mantine-color-red-2)" }}>
                  <Group gap={6} align="flex-start" wrap="nowrap">
                    <IconAlertTriangle size={14} color="var(--mantine-color-red-6)" style={{ flexShrink: 0, marginTop: 1 }} />
                    <Text fz="xs" c="red.7">
                      La publication a échoué. Vérifiez votre connexion aux réseaux sociaux dans les paramètres.
                    </Text>
                  </Group>
                </Box>
              )}

            </Stack>
          </ScrollArea>

          {event.status === "upcoming" && (
            <>
              <Divider />
              <Box px="xl" py="md">
                <Button fullWidth variant="light" color="red" radius="xl" leftSection={<IconTrash size={15} />}
                  onClick={() => { onDelete?.(event.id); onClose(); }}>
                  Supprimer cette publication
                </Button>
              </Box>
            </>
          )}

        </Stack>
      </Group>
    </Modal>
  );
}
