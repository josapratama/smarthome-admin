export type HomeDTO = {
  id: number;
  name: string;
  ownerUserId: number;
  addressText: string | null;
  city: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
};

export type HomeCreateRequest = {
  name: string;
  ownerUserId: number;
  addressText?: string;
  city?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
};

export type HomeUpdateRequest = {
  name?: string;
  ownerUserId?: number;
  addressText?: string;
  city?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
};

export type HomesListResponse = {
  data: HomeDTO[];
  nextCursor: number | null;
};

export type TransferOwnershipRequest = {
  newOwnerUserId: number;
};
