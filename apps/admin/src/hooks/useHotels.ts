"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

export function useHotels() {
  const { data, error, mutate } = useSWR("/api/admin/hotels", fetcher);
  return { hotels: data?.data, isLoading: !error && !data, isError: error, mutate };
}

export async function createHotel(data: any) {
  return fetch("/api/admin/hotels", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function updateHotel(id: string, data: any) {
  return fetch(`/api/admin/hotels/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function deleteHotel(id: string) {
  return fetch(`/api/admin/hotels/${id}`, { method: "DELETE" }).then((res) => res.json());
}
