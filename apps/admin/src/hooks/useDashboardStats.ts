"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";
import { DASHBOARD } from "@/constants/urls";
export const useDashboardStats = () => useSWR(DASHBOARD, fetcher);
