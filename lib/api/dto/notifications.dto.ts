export type NotificationEndpointDTO = {
  id: number;
  userId: number;
  type: string;
  endpoint: string;
  isActive: boolean;
  createdAt: string;
};

export type NotificationLogDTO = {
  id: number;
  endpointId: number;
  title: string;
  message: string;
  success: boolean;
  errorMessage: string | null;
  sentAt: string;
};
