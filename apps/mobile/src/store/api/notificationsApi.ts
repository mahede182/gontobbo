import { apiSlice } from "../slices/apiSlice";
import type { Notification, ApiResponse, PaginatedResponse } from "@/@types/api.type";
import { NOTIFICATIONS, NOTIFICATION_READ, NOTIFICATIONS_READ_ALL } from "@/constants/urls";
export type { Notification };
type NotificationsResponse = ApiResponse<PaginatedResponse<Notification>>;

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationsResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: NOTIFICATIONS,
        params: params
          ? { page: params.page ?? 1, limit: params.limit ?? 20 }
          : { page: 1, limit: 20 },
      }),
      providesTags: ["Notifications"],
    }),

    markAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: NOTIFICATION_READ(id),
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<Notification>) => response.data,
      invalidatesTags: ["Notifications"],
    }),

    markAllAsRead: builder.mutation<void, void>({
      query: () => ({
        url: NOTIFICATIONS_READ_ALL,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAsReadMutation, useMarkAllAsReadMutation } =
  notificationsApi;
