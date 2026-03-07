import { SCHEDULE_RULES } from "@/lib/constants/dashboardData";
import type { ScheduleRule } from "@/types";

export const schedulingService = {
  async getAll(): Promise<ScheduleRule[]> {
    return Promise.resolve(SCHEDULE_RULES);
  },
};
