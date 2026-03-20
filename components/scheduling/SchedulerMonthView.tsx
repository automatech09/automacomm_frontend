"use client";

import { useMemo, useState } from "react";
import { addDays, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from "date-fns";
import { Box, Center, Group, Stack, Text } from "@mantine/core";
import type { ScheduledItem } from "@/lib/mockupdata/scheduler/data";
import { CalendarEventCard } from "./CalendarEventCard";

// ─── Constantes ───────────────────────────────────────────
const MAX_VISIBLE = 2;
const CARD_HEIGHT = 36;
const CARD_GAP = 4;
const DAY_HEADER_HEIGHT = 30;
const CELL_PADDING = 6;

const PRIMARY = "#04346D";
const COL_BORDER = "rgba(4,52,109,0.07)";
const ROW_BORDER = "rgba(4,52,109,0.08)";

const DAYS_HEADER = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function rowHeight(n: number): number {
  const slots = Math.max(n, 1);
  return DAY_HEADER_HEIGHT + slots * CARD_HEIGHT + (slots - 1) * CARD_GAP + 2 * CELL_PADDING;
}

function getWeeks(date: Date): Date[][] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const weeks: Date[][] = [];
  let current = start;
  for (let w = 0; w < 6; w++) {
    const week = Array.from({ length: 7 }, (_, i) => addDays(current, i));
    if (week.some((d) => isSameMonth(d, date))) weeks.push(week);
    current = addDays(current, 7);
  }
  return weeks;
}

// ─── Cellule d'un jour ────────────────────────────────────
function DayCell({
  day, events, maxVisible, expanded, onExpand, month,
}: {
  day: Date; events: ScheduledItem[]; maxVisible: number;
  expanded: boolean; onExpand: () => void; month: Date;
}) {
  const visible = events.slice(0, maxVisible);
  const hidden = events.length - maxVisible;
  const inMonth = isSameMonth(day, month);

  return (
    <Stack
      gap={CARD_GAP}
      p={CELL_PADDING}
      style={{
        flex: 1,
        minWidth: 0,
        borderLeft: `1px solid ${COL_BORDER}`,
        opacity: inMonth ? 1 : 0.35,
      }}
    >
      <Center
        w={22}
        h={22}
        style={{
          borderRadius: "50%",
          backgroundColor: isToday(day) ? PRIMARY : "transparent",
          alignSelf: "flex-start",
          flexShrink: 0,
        }}
      >
        <Text fz={11} fw={isToday(day) ? 700 : 400} c={isToday(day) ? "white" : `${PRIMARY}99`} lh={1}>
          {format(day, "d")}
        </Text>
      </Center>

      {visible.map((event) => (
        <CalendarEventCard key={event.id} event={event} view="month" />
      ))}

      {hidden > 0 && !expanded && (
        <Text
          fz={10}
          fw={600}
          c={PRIMARY}
          style={{ cursor: "pointer", paddingLeft: 2, opacity: 0.7 }}
          onClick={onExpand}
        >
          +{hidden} de plus
        </Text>
      )}
    </Stack>
  );
}

// ─── Ligne d'une semaine ──────────────────────────────────
function WeekRow({ days, events, month }: { days: Date[]; events: ScheduledItem[]; month: Date }) {
  const [expanded, setExpanded] = useState(false);

  const eventsByDay = days.map((day) => events.filter((e) => isSameDay(e.date, day)));
  const maxPerDay = Math.max(0, ...eventsByDay.map((evs) => evs.length));
  const hasOverflow = !expanded && maxPerDay > MAX_VISIBLE;
  const height = rowHeight(expanded ? maxPerDay : MAX_VISIBLE) + (hasOverflow ? 8 : 0);

  return (
    <Box style={{ position: "relative", flexShrink: 0, borderBottom: `1px solid ${ROW_BORDER}` }}>
      <Group gap={0} wrap="nowrap" align="flex-start" style={{ height }}>
        {days.map((day, i) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            events={eventsByDay[i]}
            maxVisible={expanded ? eventsByDay[i].length : MAX_VISIBLE}
            expanded={expanded}
            onExpand={() => setExpanded(true)}
            month={month}
          />
        ))}
      </Group>
      {expanded && (
        <Text
          fz={10}
          fw={600}
          c={PRIMARY}
          style={{ position: "absolute", bottom: 4, right: 8, cursor: "pointer", opacity: 0.5 }}
          onClick={() => setExpanded(false)}
        >
          Réduire ↑
        </Text>
      )}
    </Box>
  );
}

// ─── Vue mois ─────────────────────────────────────────────
interface Props {
  date: Date;
  events: ScheduledItem[];
}

export function SchedulerMonthView({ date, events }: Props) {
  const weeks = useMemo(() => getWeeks(date), [date]);

  return (
    <Stack gap={0} h="100%" style={{ overflow: "hidden" }}>
      {/* En-têtes des jours */}
      <Group wrap="nowrap" gap={0} style={{ borderBottom: `1px solid ${ROW_BORDER}`, flexShrink: 0 }}>
        {DAYS_HEADER.map((d, i) => (
          <Box
            key={d}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "6px 0",
              borderLeft: i > 0 ? `1px solid ${COL_BORDER}` : undefined,
            }}
          >
            <Text fz={10} fw={600} tt="uppercase" c={`${PRIMARY}55`} lh={1}>
              {d}
            </Text>
          </Box>
        ))}
      </Group>

      {/* Grille */}
      <Box style={{ overflow: "auto", flex: 1 }}>
        {weeks.map((week) => (
          <WeekRow
            key={week[0].toISOString()}
            days={week}
            events={events}
            month={date}
          />
        ))}
      </Box>
    </Stack>
  );
}
