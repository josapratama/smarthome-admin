import { api } from "./client";
import type { Home, HomeMember, PaginationParams } from "../types";

export const homesApi = {
  async getHomes(params?: PaginationParams): Promise<Home[]> {
    const { data } = await api.get<Home[]>("/homes", { params });
    return data;
  },

  async getHome(id: number): Promise<Home> {
    const { data } = await api.get<Home>(`/homes/${id}`);
    return data;
  },

  async createHome(homeData: {
    name: string;
    addressText?: string;
    city?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<Home> {
    const { data } = await api.post<Home>("/homes", homeData);
    return data;
  },

  async updateHome(id: number, updates: Partial<Home>): Promise<Home> {
    const { data } = await api.patch<Home>(`/homes/${id}`, updates);
    return data;
  },

  async deleteHome(id: number): Promise<void> {
    await api.delete(`/homes/${id}`);
  },

  async getHomeMembers(homeId: number): Promise<HomeMember[]> {
    const { data } = await api.get<HomeMember[]>(`/homes/${homeId}/members`);
    return data;
  },

  async inviteMember(
    homeId: number,
    email: string,
    role: "MEMBER" | "GUEST",
  ): Promise<{ token: string }> {
    const { data } = await api.post(`/homes/${homeId}/invite`, {
      email,
      role,
    });
    return data;
  },

  async removeMember(homeId: number, memberId: number): Promise<void> {
    await api.delete(`/homes/${homeId}/members/${memberId}`);
  },

  async updateMemberRole(
    homeId: number,
    memberId: number,
    role: "OWNER" | "MEMBER" | "GUEST",
  ): Promise<HomeMember> {
    const { data } = await api.patch<HomeMember>(
      `/homes/${homeId}/members/${memberId}`,
      { role },
    );
    return data;
  },

  async acceptInvite(token: string): Promise<void> {
    await api.post("/homes/accept-invite", { token });
  },
};
