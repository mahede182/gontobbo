"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

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

export async function createRoom(hotelId: string, data: any) {
  return fetch(`/api/admin/hotels/${hotelId}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function updateRoom(id: string, data: any) {
  return fetch(`/api/admin/rooms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
