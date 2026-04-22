"use client";
import useSWR from "swr";
import { fetcher, authedRequest } from "@/utils/api/fetcher";

export function useOrders(params: { status?: string; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams(params as any).toString();
  const { data, error, mutate } = useSWR(`/api/admin/orders?${query}`, fetcher);
  return {
    orders: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export async function updateOrderStatus(id: string, status: string) {
  return authedRequest(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteOrder(id: string) {
  return authedRequest(`/api/admin/orders/${id}`, {
    method: "DELETE",
  });
}
