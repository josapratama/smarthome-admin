import { api } from "./client";
import type {
  Device,
  DeviceFilters,
  PaginatedResponse,
  SensorData,
  Command,
  CommandStatus,
} from "../types";

export const devicesApi = {
  async getDevices(
    filters?: DeviceFilters,
  ): Promise<PaginatedResponse<Device>> {
    const { data } = await api.get<PaginatedResponse<Device>>("/devices", {
      params: filters,
    });
    return data;
  },

  async getDevice(id: number): Promise<Device> {
    const { data } = await api.get<Device>(`/devices/${id}`);
    return data;
  },

  async updateDevice(id: number, updates: Partial<Device>): Promise<Device> {
    const { data } = await api.patch<Device>(`/devices/${id}`, updates);
    return data;
  },

  async deleteDevice(id: number): Promise<void> {
    await api.delete(`/devices/${id}`);
  },

  async getDeviceTelemetry(
    deviceId: number,
    limit = 100,
  ): Promise<SensorData[]> {
    const { data } = await api.get<SensorData[]>(
      `/devices/${deviceId}/telemetry`,
      { params: { limit } },
    );
    return data;
  },

  async sendCommand(
    deviceId: number,
    type: string,
    payload: Record<string, unknown>,
  ): Promise<Command> {
    const { data } = await api.post<Command>(`/devices/${deviceId}/command`, {
      type,
      payload,
    });
    return data;
  },

  async getCommandStatus(commandId: number): Promise<Command> {
    const { data } = await api.get<Command>(`/commands/${commandId}`);
    return data;
  },

  async getDeviceCommands(deviceId: number): Promise<Command[]> {
    const { data } = await api.get<Command[]>(`/devices/${deviceId}/commands`);
    return data;
  },
};
