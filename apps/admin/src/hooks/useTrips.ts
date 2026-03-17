"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

export function useTrips() {
  const { data, error, mutate } = useSWR("/api/admin/trips", fetcher);
  return { trips: data?.data, isLoading: !error && !data, isError: error, mutate };
}

export async function createTrip(data: any) {
  return fetch("/api/admin/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function updateTrip(id: string, data: any) {
  return fetch(`/api/admin/trips/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
