import { api } from "./client";
import type {
  AlarmEvent,
  AlarmFilters,
  PaginatedResponse,
  AlarmStats,
} from "../types";

export const alarmsApi = {
  async getAlarms(
    filters?: AlarmFilters,
  ): Promise<PaginatedResponse<AlarmEvent>> {
    const { data } = await api.get<PaginatedResponse<AlarmEvent>>("/alarms", {
      params: filters,
    });
    return data;
  },

  async getAlarm(id: number): Promise<AlarmEvent> {
    const { data } = await api.get<AlarmEvent>(`/alarms/${id}`);
    return data;
  },

  async acknowledgeAlarm(id: number): Promise<AlarmEvent> {
    const { data } = await api.post<AlarmEvent>(`/alarms/${id}/acknowledge`);
    return data;
  },

  async resolveAlarm(id: number): Promise<AlarmEvent> {
    const { data } = await api.post<AlarmEvent>(`/alarms/${id}/resolve`);
    return data;
  },

  async getAlarmStats(homeId?: number): Promise<AlarmStats> {
    const { data } = await api.get<AlarmStats>("/alarms/stats", {
      params: { homeId },
    });
    return data;
  },
};
