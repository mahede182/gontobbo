"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";

export function useUsers(page = 1, limit = 20) {
  const { data, error, mutate } = useSWR(`/api/admin/users?page=${page}&limit=${limit}`, fetcher);
  return {
    users: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export async function updateUserRole(id: string, role: string) {
  return fetch(`/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  }).then((res) => res.json());
}
