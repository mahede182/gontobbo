"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";
import { GUESTS } from "@/constants/urls";

export function useGuests(params: { page?: number; limit?: number } = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    )
  ).toString();
  const { data, error, mutate } = useSWR(`${GUESTS}?${query}`, fetcher);
  return {
    guests: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}
