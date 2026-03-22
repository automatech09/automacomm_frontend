"use client";

import { useMemo, useState } from "react";
import { addMonths, addWeeks, endOfWeek, format, startOfWeek, subMonths, subWeeks } from "date-fns";
import { fr } from "date-fns/locale";
import { ActionIcon, Box, Button, Group, Stack, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { scheduledItems } from "@/lib/mockupdata/scheduler/data";
import { initialTeams } from "@/lib/mockupdata/teams/data";
import { SchedulerWeekView } from "@/components/scheduling/SchedulerWeekView";
import { SchedulerMonthView } from "@/components/scheduling/SchedulerMonthView";
import { SchedulerAgendaView } from "@/components/scheduling/SchedulerAgendaView";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { COLORS } from "@/lib/constants/colors";

const PRIMARY = COLORS.primary;

type ViewType = "week" | "month" | "agenda";

const VIEWS: { value: ViewType; label: string }[] = [
  { value: "week", label: "Semaine" },
  { value: "month", label: "Mois" },
  { value: "agenda", label: "Agenda" },
];

function getLabel(date: Date, view: ViewType): string {
  if (view === "week") {
    const s = startOfWeek(date, { weekStartsOn: 1 });
    const e = endOfWeek(date, { weekStartsOn: 1 });
    return `${format(s, "d MMM", { locale: fr })} – ${format(e, "d MMM yyyy", { locale: fr })}`;
  }
  if (view === "agenda") return "Toutes les publications";
  return format(date, "MMMM yyyy", { locale: fr });
}

function navigate(date: Date, view: ViewType, dir: 1 | -1): Date {
  if (view === "week") return dir === 1 ? addWeeks(date, 1) : subWeeks(date, 1);
  return dir === 1 ? addMonths(date, 1) : subMonths(date, 1);
}

interface Props {
  selectedTeams: Set<string>;
}

export function SchedulerCalendarView({ selectedTeams }: Props) {
  const isMobile = useIsMobile();
  const [view, setView] = useState<ViewType>("week");
  const effectiveView: ViewType = isMobile ? "agenda" : view;
  const [date, setDate] = useState(() => new Date());

  const allSelected = selectedTeams.size === 0 || selectedTeams.size === initialTeams.length;
  const events = useMemo(
    () => allSelected
      ? scheduledItems
      : scheduledItems.filter((item) => item.templates.some((t) => t.team && selectedTeams.has(t.team.id))),
    [selectedTeams, allSelected]
  );

  return (
    <Stack
      gap={0}
      bd="1px solid rgba(4,52,109,0.1)"
      bdrs={isMobile ? 0 : 16}
      bg="white"
      mx={isMobile ? -24 : 0}
      style={{ overflow: "hidden", boxShadow: "0 2px 12px rgba(4,52,109,0.06)", height: "calc(100vh - 200px)" }}
    >
      {/* Toolbar */}
      <Group justify="space-between" px={16} py={10} style={{ borderBottom: "1px solid rgba(4,52,109,0.08)", flexShrink: 0 }}>
        <Group gap={6}>
          <Button variant="default" size="xs" radius="md" onClick={() => setDate(new Date())}>
            Aujourd'hui
          </Button>
          <ActionIcon variant="subtle" color="dark" size="sm" onClick={() => setDate((d) => navigate(d, effectiveView, -1))}>
            <IconChevronLeft size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="dark" size="sm" onClick={() => setDate((d) => navigate(d, effectiveView, 1))}>
            <IconChevronRight size={16} />
          </ActionIcon>
        </Group>

        <Text fz={14} fw={600} c={PRIMARY}>
          {getLabel(date, effectiveView).toUpperCase()}
        </Text>

        {!isMobile && (
          <Button.Group>
            {VIEWS.map((v) => (
              <Button
                key={v.value}
                size="xs"
                variant={view === v.value ? "filled" : "default"}
                color={view === v.value ? PRIMARY : undefined}
                style={{ borderRadius: v.value === "week" ? "6px 0 0 6px" : v.value === "agenda" ? "0 6px 6px 0" : 0 }}
                onClick={() => setView(v.value)}
              >
                {v.label}
              </Button>
            ))}
          </Button.Group>
        )}
      </Group>

      {/* Contenu */}
      <Box style={{ flex: 1, overflow: effectiveView === "agenda" ? "auto" : "hidden", padding: effectiveView === "agenda" ? 16 : 0 }}>
        {effectiveView === "week" ? (
          <SchedulerWeekView date={date} events={events} />
        ) : effectiveView === "month" ? (
          <SchedulerMonthView date={date} events={events} />
        ) : (
          <SchedulerAgendaView date={date} events={events} />
        )}
      </Box>
    </Stack>
  );
}
