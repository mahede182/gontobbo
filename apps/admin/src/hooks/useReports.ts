"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";
import { REPORTS } from "@/constants/urls";

export function useReports() {
  const { data, error, mutate } = useSWR(REPORTS, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 5 * 60 * 1000,
  });
  return {
    report: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}
