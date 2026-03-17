"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

export function useOffers() {
  const { data, error, mutate } = useSWR("/api/admin/offers", fetcher);
  return { offers: data?.data, isLoading: !error && !data, isError: error, mutate };
}

export async function createOffer(data: any) {
  return fetch("/api/admin/offers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function deleteOffer(id: string) {
  return fetch(`/api/admin/offers/${id}`, { method: "DELETE" }).then((res) => res.json());
}
