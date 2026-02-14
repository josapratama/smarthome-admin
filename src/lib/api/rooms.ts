import { api } from "./client";
import type { Room } from "../types";

export const roomsApi = {
  async getRooms(homeId: number): Promise<Room[]> {
    const { data } = await api.get<Room[]>(`/homes/${homeId}/rooms`);
    return data;
  },

  async getRoom(id: number): Promise<Room> {
    const { data } = await api.get<Room>(`/rooms/${id}`);
    return data;
  },

  async createRoom(homeId: number, name: string): Promise<Room> {
    const { data } = await api.post<Room>(`/homes/${homeId}/rooms`, { name });
    return data;
  },

  async updateRoom(id: number, name: string): Promise<Room> {
    const { data } = await api.patch<Room>(`/rooms/${id}`, { name });
    return data;
  },

  async deleteRoom(id: number): Promise<void> {
    await api.delete(`/rooms/${id}`);
  },
};
