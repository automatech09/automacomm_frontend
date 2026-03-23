import { scheduledItems } from "@/lib/mockupdata/scheduler/data";
import type { ScheduledPublication } from "@/types";

export interface SchedulerSummary {
  upcomingItems: ScheduledPublication[];
  lastPublished: ScheduledPublication | null;
  thisWeekItems: ScheduledPublication[];
}

/**
 * Retourne un résumé des publications planifiées.
 * TODO: remplacer par un appel API → fetch("/api/scheduler/summary")
 */
export function getSchedulerSummary(): SchedulerSummary {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingItems = scheduledItems
    .filter((i) => i.status === "upcoming" && i.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const lastPublished = scheduledItems
    .filter((i) => i.status === "published")
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0] ?? null;

  const thisWeekItems = upcomingItems.filter((i) => i.date <= nextWeek);

  return { upcomingItems, lastPublished, thisWeekItems };
}
