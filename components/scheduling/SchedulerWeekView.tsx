"use client";

import { useEffect, useMemo, useRef } from "react";
import { addDays, format, isSameDay, isToday, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { Box, Center, Group, Stack, Text } from "@mantine/core";
import type { ScheduledItem } from "@/lib/mockupdata/scheduler/data";
import { CalendarEventCard } from "./CalendarEventCard";

// ─── Constantes ───────────────────────────────────────────
const HOUR_START = 0;
const HOUR_END = 24;
const CARD_HEIGHT = 100;
const CARD_GAP = 4;
const SLOT_PADDING = 8;
const MIN_SLOT_HEIGHT = 48;
const TIME_COL = 52;
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);

const PRIMARY = "#04346D";
const BORDER_LIGHT = "rgba(4,52,109,0.06)";  // séparateurs horizontaux
const BORDER_MID = "rgba(4,52,109,0.07)";    // séparateurs verticaux
const BORDER_HEADER = "rgba(4,52,109,0.08)"; // bas du header

function getSlotHeight(maxEvents: number): number {
  if (maxEvents === 0) return MIN_SLOT_HEIGHT;
  const rows = Math.ceil(maxEvents / 2);
  return rows * CARD_HEIGHT + (rows - 1) * CARD_GAP + SLOT_PADDING;
}

// ─── Indicateur heure actuelle ────────────────────────────
function NowLine({ day, slotHeights }: { day: Date; slotHeights: number[] }) {
  if (!isToday(day)) return null;
  const now = new Date();
  const idx = now.getHours() - HOUR_START;
  if (idx < 0 || idx >= slotHeights.length) return null;
  const top = slotHeights.slice(0, idx).reduce((sum, h) => sum + h, 0) + (now.getMinutes() / 60) * slotHeights[idx];
  return (
    <Box style={{ position: "absolute", top, left: 0, right: 0, zIndex: 2, pointerEvents: "none" }}>
      <Box style={{ position: "absolute", left: -4, top: -3, width: 8, height: 8, borderRadius: "50%", backgroundColor: PRIMARY }} />
      <Box style={{ height: 2, backgroundColor: PRIMARY }} />
    </Box>
  );
}

// ─── Groupe d'events (2 par ligne) ───────────────────────
function EventGroup({ events }: { events: ScheduledItem[] }) {
  const rows: ScheduledItem[][] = [];
  for (let i = 0; i < events.length; i += 2) rows.push(events.slice(i, i + 2));
  return (
    <Stack gap={CARD_GAP}>
      {rows.map((row, i) => (
        <Group key={i} gap={CARD_GAP} wrap="nowrap" grow>
          {row.map((event) => (
            <Box key={event.id} style={{ height: CARD_HEIGHT, minWidth: 0 }}>
              <CalendarEventCard event={event} />
            </Box>
          ))}
          {row.length === 1 && <Box style={{ flex: 1 }} />}
        </Group>
      ))}
    </Stack>
  );
}

// ─── Colonne d'un jour ────────────────────────────────────
function DayColumn({ day, events, slotHeights }: { day: Date; events: ScheduledItem[]; slotHeights: number[] }) {
  return (
    <Stack gap={0} style={{ flex: 1, minWidth: 0, position: "relative", borderLeft: `1px solid ${BORDER_MID}` }}>
      {HOURS.map((h, i) => {
        const hourEvents = events.filter((e) => e.date.getHours() === h);
        return (
          <Box
            key={h}
            style={{
              height: slotHeights[i],
              flexShrink: 0,
              borderTop: `1px solid ${BORDER_LIGHT}`,
              padding: hourEvents.length > 0 ? SLOT_PADDING / 2 : 0,
            }}
          >
            {hourEvents.length > 0 && <EventGroup events={hourEvents} />}
          </Box>
        );
      })}
      <NowLine day={day} slotHeights={slotHeights} />
    </Stack>
  );
}

// ─── Vue semaine ──────────────────────────────────────────
interface Props {
  date: Date;
  events: ScheduledItem[];
}

export function SchedulerWeekView({ date, events }: Props) {
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date, { weekStartsOn: 1 }), i)),
    [date]
  );

  const slotHeights = useMemo(
    () => HOURS.map((h) => {
      const max = Math.max(0, ...days.map((day) =>
        events.filter((e) => isSameDay(e.date, day) && e.date.getHours() === h).length
      ));
      return getSlotHeight(max);
    }),
    [events, days]
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const idx = new Date().getHours() - HOUR_START;
      const top = slotHeights.slice(0, Math.max(0, idx - 2)).reduce((sum, h) => sum + h, 0);
      scrollRef.current.scrollTop = top;
    }
  }, [slotHeights]);

  return (
    <Stack gap={0} h="100%" style={{ overflow: "hidden" }}>
      {/* En-têtes des jours */}
      <Group wrap="nowrap" gap={0} align="stretch" bg="white" style={{ borderBottom: `1px solid ${BORDER_HEADER}`, flexShrink: 0 }}>
        <Box w={TIME_COL} style={{ flexShrink: 0 }} />
        {days.map((day) => (
          <Box key={day.toISOString()} py={8} style={{ flex: 1, textAlign: "center", borderLeft: `1px solid ${BORDER_MID}` }}>
            <Text fz={10} fw={600} tt="uppercase" c="rgba(4,52,109,0.4)" lh={1}>
              {format(day, "EEE", { locale: fr })}
            </Text>
            <Center w={28} h={28} mx="auto" mt={4} style={{ borderRadius: "50%", backgroundColor: isToday(day) ? PRIMARY : "transparent" }}>
              <Text fz={14} fw={isToday(day) ? 700 : 400} c={isToday(day) ? "white" : "rgba(4,52,109,0.7)"}>
                {format(day, "d")}
              </Text>
            </Center>
          </Box>
        ))}
      </Group>

      {/* Grille scrollable */}
      <Box ref={scrollRef} style={{ overflow: "auto", flex: 1 }}>
        <Group wrap="nowrap" gap={0} align="stretch">
          <Stack gap={0} w={TIME_COL} style={{ flexShrink: 0 }}>
            {HOURS.map((h, i) => (
              <Box key={h} style={{ height: slotHeights[i], flexShrink: 0, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingRight: 8, paddingTop: 4 }}>
                <Text fz={11} c="rgba(4,52,109,0.35)">{String(h).padStart(2, "0")}:00</Text>
              </Box>
            ))}
          </Stack>
          {days.map((day) => (
            <DayColumn
              key={day.toISOString()}
              day={day}
              events={events.filter((e) => isSameDay(e.date, day))}
              slotHeights={slotHeights}
            />
          ))}
        </Group>
      </Box>
    </Stack>
  );
}
