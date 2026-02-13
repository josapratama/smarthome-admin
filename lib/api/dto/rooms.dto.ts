export type RoomDTO = {
  id: number;
  homeId: number;
  name: string;
  createdAt: string;
  deletedAt: string | null;
};

export type RoomCreateRequest = {
  name: string;
};

export type RoomUpdateRequest = {
  name?: string;
};
