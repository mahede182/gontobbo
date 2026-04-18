"use client";
import useSWR from "swr";
import { fetcher, authedRequest } from "@/utils/api/fetcher";

export function useOffers() {
  const { data, error, mutate } = useSWR("/api/admin/offers", fetcher);
  return { offers: data?.data, isLoading: !error && !data, isError: error, mutate };
}

export async function createOffer<T = Record<string, unknown>>(data: T) {
  return authedRequest("/api/admin/offers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteOffer(id: string) {
  return authedRequest(`/api/admin/offers/${id}`, { method: "DELETE" });
}
