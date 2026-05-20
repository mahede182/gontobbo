"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";
import { INVOICES } from "@/constants/urls";

export function useInvoices(params: { status?: string; page?: number; limit?: number } = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== "")) as Record<string, string>
  ).toString();
  const { data, error, mutate } = useSWR(`${INVOICES}?${query}`, fetcher);
  return {
    invoices: data?.data,
    meta: data?.meta,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}
