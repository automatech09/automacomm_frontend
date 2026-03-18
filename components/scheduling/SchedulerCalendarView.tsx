"use client";

import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { Box } from "@mantine/core";
import { scheduledItems, toCalendarEvents, type CalendarEvent } from "@/lib/mockupdata/scheduler/data";
import { CalendarEventCard, VISUAL_CONFIG } from "@/components/scheduling/CalendarEventCard";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales: { fr },
});

const MESSAGES = {
  next: "Suiv.",
  previous: "Préc.",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Publication",
  noEventsInRange: "Aucune publication prévue.",
  showMore: (total: number) => `+${total} de plus`,
};


export function SchedulerCalendarView() {
  const [view, setView] = useState<(typeof Views)[keyof typeof Views]>(Views.WEEK);
  const [date, setDate] = useState(() => new Date());
  const events = useMemo(() => toCalendarEvents(scheduledItems), []);
  const scrollToTime = useMemo(() => {
    const now = new Date();
    const centeredHour = Math.max(0, now.getHours() - 4);
    now.setHours(centeredHour, now.getMinutes(), 0, 0);
    return now;
  }, []);

  const eventPropGetter = (event: CalendarEvent) => {
    const config = VISUAL_CONFIG[event.resource.visualType] ?? { color: "#04346D", bg: "#E8F4FF" };
    return {
      style: {
        backgroundColor: config.bg,
        border: `1px solid ${config.color}30`,
        borderLeft: `3px solid ${config.color}`,
        borderRadius: 6,
        color: config.color,
      },
    };
  };

  return (
    <Box>
      <Box
      h="80vh"
      bd={"1px solid rgba(4,52,109,0.1)"}
      bdrs={16}
      bg='white'
        style={{
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(4,52,109,0.06)",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.WEEK}
          view={view}
          step={60}
          timeslots={2}
          onView={setView}
          date={date}
          onNavigate={setDate}
          culture="fr"
          messages={MESSAGES}
          eventPropGetter={eventPropGetter}
          components={{ event: CalendarEventCard }}
          scrollToTime={scrollToTime}
          formats={{
            agendaDateFormat: (d) => format(d, "EEE d MMM", { locale: fr }),
            agendaTimeRangeFormat: ({ start }) => format(start, "HH:mm", { locale:
             fr }),
            eventTimeRangeFormat: () => "",
            dayHeaderFormat: (d) => format(d, "EEE d MMM", { locale: fr }),
            dayRangeHeaderFormat: ({ start, end }) =>
              `${format(start, "d MMM", { locale: fr })} – ${format(end, "d MMM yyyy", { locale: fr })}`,
            monthHeaderFormat: (d) => format(d, "MMMM yyyy", { locale: fr }).toUpperCase(),
            dayFormat: (d) => format(d, "EEE d", { locale: fr }),
            weekdayFormat: (d) => format(d, "EEE", { locale: fr }),
          }}
        />
      </Box>
    </Box>
  );
}
