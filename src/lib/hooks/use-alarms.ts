import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alarmsApi } from "../api/alarms";
import type { AlarmFilters } from "../types";

export function useAlarms(filters?: AlarmFilters) {
  return useQuery({
    queryKey: ["alarms", filters],
    queryFn: () => alarmsApi.getAlarms(filters),
  });
}

export function useAlarm(id: number) {
  return useQuery({
    queryKey: ["alarm", id],
    queryFn: () => alarmsApi.getAlarm(id),
    enabled: !!id,
  });
}

export function useAlarmStats(homeId?: number) {
  return useQuery({
    queryKey: ["alarms", "stats", homeId],
    queryFn: () => alarmsApi.getAlarmStats(homeId),
  });
}

export function useAcknowledgeAlarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alarmsApi.acknowledgeAlarm,
    onSuccess: (_, alarmId) => {
      queryClient.invalidateQueries({ queryKey: ["alarm", alarmId] });
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
      queryClient.invalidateQueries({ queryKey: ["alarms", "stats"] });
    },
  });
}

export function useResolveAlarm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alarmsApi.resolveAlarm,
    onSuccess: (_, alarmId) => {
      queryClient.invalidateQueries({ queryKey: ["alarm", alarmId] });
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
      queryClient.invalidateQueries({ queryKey: ["alarms", "stats"] });
    },
  });
}
