import api from "./client";

export type Review = {
  id: string;
  hotelId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: { firstName: string; lastName: string; avatar: string | null };
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const createReview = async (params: { hotelId: string; rating: number; text: string }) => {
  const { data } = await api.post<ApiResponse<Review>>("/reviews", params);
  return data.data;
};

export const getReview = async (id: string) => {
  const { data } = await api.get<ApiResponse<Review>>(`/reviews/${encodeURIComponent(id)}`);
  return data.data;
};

export const updateReview = async (id: string, params: { rating?: number; text?: string }) => {
  const { data } = await api.put<ApiResponse<Review>>(`/reviews/${encodeURIComponent(id)}`, params);
  return data.data;
};

export const deleteReview = async (id: string) => {
  await api.delete(`/reviews/${encodeURIComponent(id)}`);
};
