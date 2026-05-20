"use client";
import useSWR from "swr";
import { fetcher, authedRequest } from "@/utils/api/fetcher";
import { HOTELS } from "@/constants/urls";

export function useHotels() {
  const { data, error, mutate } = useSWR(HOTELS, fetcher);
  return { hotels: data?.data, isLoading: !error && !data, isError: !!error, mutate };
}

export async function createHotel(data: Record<string, unknown>) {
  return authedRequest(HOTELS, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateHotel(id: string, data: Record<string, unknown>) {
  return authedRequest(`${HOTELS}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteHotel(id: string) {
  return authedRequest(`${HOTELS}/${id}`, { method: "DELETE" });
}
