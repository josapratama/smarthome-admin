import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { devicesApi } from "../api/devices";
import type { DeviceFilters } from "../types";

export function useDevices(filters?: DeviceFilters) {
  return useQuery({
    queryKey: ["devices", filters],
    queryFn: () => devicesApi.getDevices(filters),
  });
}

export function useDevice(id: number) {
  return useQuery({
    queryKey: ["device", id],
    queryFn: () => devicesApi.getDevice(id),
    enabled: !!id,
  });
}

export function useDeviceTelemetry(deviceId: number, limit = 100) {
  return useQuery({
    queryKey: ["device", deviceId, "telemetry"],
    queryFn: () => devicesApi.getDeviceTelemetry(deviceId, limit),
    enabled: !!deviceId,
    refetchInterval: 5000,
  });
}

export function useDeviceCommands(deviceId: number) {
  return useQuery({
    queryKey: ["device", deviceId, "commands"],
    queryFn: () => devicesApi.getDeviceCommands(deviceId),
    enabled: !!deviceId,
  });
}

export function useSendCommand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      deviceId,
      type,
      payload,
    }: {
      deviceId: number;
      type: string;
      payload: Record<string, unknown>;
    }) => devicesApi.sendCommand(deviceId, type, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["device", variables.deviceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["device", variables.deviceId, "commands"],
      });
    },
  });
}
