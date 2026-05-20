"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

export interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

/**
 * Fetches the authenticated admin's profile from the backend.
 * Revalidates on focus and every 5 minutes to keep data fresh.
 */
export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR<{ data: AdminProfile }>(
    "/api/admin/profile",
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 5 * 60 * 1000, // 5 min
      dedupingInterval: 60 * 1000,
    }
  );

  return {
    profile: data?.data ?? null,
    isLoading,
    isError: !!error,
    mutate,
  };
}
