import { api } from "./client";
import type {
  EnergyUsageDaily,
  EnergyPrediction,
  EnergyFilters,
  EnergyStats,
} from "../types";

export const energyApi = {
  async getEnergyUsage(filters: EnergyFilters): Promise<EnergyUsageDaily[]> {
    const { data } = await api.get<EnergyUsageDaily[]>("/energy/usage", {
      params: filters,
    });
    return data;
  },

  async getEnergyPredictions(
    deviceId: number,
    days = 7,
  ): Promise<EnergyPrediction[]> {
    const { data } = await api.get<EnergyPrediction[]>(
      `/energy/predictions/${deviceId}`,
      { params: { days } },
    );
    return data;
  },

  async getEnergyStats(homeId?: number): Promise<EnergyStats> {
    const { data } = await api.get<EnergyStats>("/energy/stats", {
      params: { homeId },
    });
    return data;
  },

  async getDailyUsage(
    homeId: number,
    startDate: string,
    endDate: string,
  ): Promise<EnergyUsageDaily[]> {
    const { data } = await api.get<EnergyUsageDaily[]>("/energy/daily", {
      params: { homeId, startDate, endDate },
    });
    return data;
  },
};
