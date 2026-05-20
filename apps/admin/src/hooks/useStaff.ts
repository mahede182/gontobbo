"use client";
import useSWR from "swr";
import { fetcher, authedRequest } from "@/utils/api/fetcher";
import { STAFF } from "@/constants/urls";

export function useStaff(params: { department?: string; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== "")) as Record<string, string>
  ).toString();
  const { data, error, mutate } = useSWR(`${STAFF}?${query}`, fetcher);
  return {
    staff: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}

export async function updateStaffMember(id: string, updates: Record<string, unknown>) {
  return authedRequest(`${STAFF}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}
