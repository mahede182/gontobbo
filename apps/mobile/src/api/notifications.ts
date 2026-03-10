import api from "./client";

export type Notification = {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type NotificationsResponse = {
  success: boolean;
  data: { notifications: Notification[]; unreadCount: number };
  meta: { total: number; page: number; limit: number; totalPages: number };
};

export const getNotifications = async (page = 1, limit = 20) => {
  const { data } = await api.get<NotificationsResponse>("/notifications", {
    params: { page, limit },
  });
  return data;
};

export const markAsRead = async (id: string) => {
  const { data } = await api.patch<ApiResponse<Notification>>(
    `/notifications/${encodeURIComponent(id)}/read`,
  );
  return data.data;
};

export const markAllAsRead = async () => {
  await api.patch("/notifications/read-all");
};
