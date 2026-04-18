"use client";
import useSWR from "swr";
import { fetcher, authedRequest } from "@/utils/api/fetcher";

export function useRooms(hotelId?: string, page = 1, limit = 20) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (hotelId) query.append("hotelId", hotelId);
  const { data, error, mutate } = useSWR(`/api/admin/rooms?${query.toString()}`, fetcher);
  return {
    rooms: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export async function createRoom<T = Record<string, unknown>>(hotelId: string, data: T) {
  return authedRequest(`/api/admin/hotels/${hotelId}/rooms`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateRoom<T = Record<string, unknown>>(id: string, data: T) {
  return authedRequest(`/api/admin/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
