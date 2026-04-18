"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

export function useBookings(
  params: { status?: string; type?: string; page?: number; limit?: number } = {},
) {
  const query = new URLSearchParams(params as any).toString();
  const { data, error, mutate } = useSWR(`/api/admin/bookings?${query}`, fetcher);
  return {
    bookings: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export async function updateBookingStatus(id: string, status: string) {
  return fetch(`/api/admin/bookings/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).then((res) => res.json());
}
