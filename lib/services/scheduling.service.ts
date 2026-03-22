import type { Publication } from "@/types/scheduling";
import { initialPublications } from "@/lib/mockupdata/scheduler/rules";

export const schedulingService = {
  async getAll(): Promise<Publication[]> {
    return Promise.resolve(initialPublications);
  },
};
