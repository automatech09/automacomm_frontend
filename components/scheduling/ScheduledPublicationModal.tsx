"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Badge, Box, Button, CloseButton, Divider,
  Group, Modal, ScrollArea, Stack, Text,
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

const STATUS_ICON = {
  upcoming:  <IconClockHour4 size={13} />,
  published: <IconCircleCheckFilled size={13} />,
  error:     <IconAlertTriangle size={13} />,
};

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
  const isCarousel = event.templates.length > 1;
  const dayLabel = format(event.date, "EEEE d MMMM yyyy", { locale: fr });
  const timeLabel = format(event.date, "HH:mm", { locale: fr });

  function handleDelete() {
    onDelete?.(event.id);
    onClose();
  }

  function handleGoToTemplate(templateId: number) {
    router.push(`/dashboard/templates?highlight=${templateId}`);
    onClose();
  }

  const IMG_HEIGHT = 580;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="85%"
      radius="xl"
      padding={0}
      styles={{ body: { padding: 0 }, content: { maxHeight: "90vh" } }}
    >
      <Group align="stretch" wrap="nowrap" gap={0} style={{ height: "85vh", maxHeight: 700 }}>

        {/* ── Colonne image ────────────────────────────────── */}
        <Box
          style={{
            width: "48%",
            flexShrink: 0,
            background: "#0d0d0d",
            borderRadius: "var(--mantine-radius-xl) 0 0 var(--mantine-radius-xl)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Group
            gap={8}
            wrap="nowrap"
            align="center"
            justify="center"
            style={{ height: IMG_HEIGHT, padding: 16 }}
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  flex: 1,
                  minWidth: 0,
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: 10,
                }}
              />
            ))}
          </Group>

          {/* Gradient haut (pour les badges overlay) */}
          <Box style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)", pointerEvents: "none" }} />
          {/* Gradient bas */}
          <Box style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", pointerEvents: "none" }} />

          {/* Status overlay haut gauche */}
          <Box style={{ position: "absolute", top: 14, left: 14 }}>
            <Badge size="sm" radius="xl" color={color} variant="filled" leftSection={STATUS_ICON[event.status]}
              style={{ backdropFilter: "blur(6px)", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
              {label}
            </Badge>
          </Box>

          {/* Format badge bas gauche */}
          <Box style={{ position: "absolute", bottom: 16, left: 16 }}>
            <BadgeStoryOrPost format={event.templates[0].format} size="sm" />
          </Box>

          {/* Carousel badge bas droite */}
          {isCarousel && (
            <Box style={{ position: "absolute", bottom: 16, right: 16 }}>
              <Badge size="xs" radius="xl" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)", color: "white" }}>
                {event.templates.length} visuels
              </Badge>
            </Box>
          )}
        </Box>

        {/* ── Colonne infos ─────────────────────────────────── */}
        <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>

          {/* Header */}
          <Group justify="space-between" align="center" px="xl" pt="xl" pb="md">
            <Text fw={700} fz="md" c="brand.7">Détails de la publication</Text>
            <CloseButton radius="xl" size="md" onClick={onClose} />
          </Group>

          <Divider />

          <ScrollArea style={{ flex: 1 }} px="xl" py="lg">
            <Stack gap="xl">

              {/* Date & heure */}
              <Stack gap={8}>
                <Group gap={8} align="center">
                  <IconCalendar size={16} color="var(--mantine-color-brand-6)" />
                  <Text fz="md" fw={700} c="brand.7" style={{ textTransform: "capitalize" }}>
                    {dayLabel}
                  </Text>
                </Group>
                <Group gap={8} align="center">
                  <IconClock size={16} color="var(--mantine-color-dimmed)" />
                  <Text fz="sm" c="dimmed">Publication prévue à {timeLabel}</Text>
                </Group>
              </Stack>

              <Divider />

              {/* Équipes */}
              {teams.length > 0 && (
                <Stack gap={10}>
                  <Text fz="xs" fw={600} tt="uppercase" c="dimmed" style={{ letterSpacing: 0.5 }}>Équipes concernées</Text>
                  <Group gap={6} wrap="wrap">
                    {teams.map((t) => <BadgeTeam key={t.id} teamData={t} />)}
                  </Group>
                </Stack>
              )}

              {/* Visuels */}
              <Stack gap={10}>
                <Text fz="xs" fw={600} tt="uppercase" c="dimmed" style={{ letterSpacing: 0.5 }}>
                  {isCarousel ? `Carrousel · ${event.templates.length} visuels` : "Visuel"}
                </Text>
                <Stack gap={10}>
                  {event.templates.map((t) => {
                    return (
                      <Group key={t.id} justify="space-between" wrap="nowrap" align="center"
                        p="sm" style={{ borderRadius: 12, border: "1px solid rgba(4,52,109,0.08)", background: "rgba(4,52,109,0.02)" }}>
                        <Group gap={10} wrap="nowrap">
                          <Box style={{ width: 40, height: 52, borderRadius: 8, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(0,0,0,0.07)" }}>
                            <img src={t.thumbnail} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </Box>
                          <Stack gap={4}>
                            <BadgeVisualType visualTypeName={t.visualType} size="xs"/>
                            <Text fz="xs" c="dark.5" fw={500}>{t.name}</Text>
                          </Stack>
                        </Group>
                        <Button
                          size="xs"
                          variant="subtle"
                          radius="xl"
                          color="brand"
                          leftSection={<IconExternalLink size={12} />}
                          onClick={() => handleGoToTemplate(t.id)}
                        >
                          Voir
                        </Button>
                      </Group>
                    );
                  })}
                </Stack>
              </Stack>

              {/* Erreur */}
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

          {/* Footer actions */}
          {event.status === "upcoming" && (
            <>
              <Divider />
              <Box px="xl" py="md">
                <Button
                  fullWidth
                  variant="light"
                  color="red"
                  radius="xl"
                  leftSection={<IconTrash size={15} />}
                  onClick={handleDelete}
                >
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
