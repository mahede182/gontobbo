"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/fetcher";
import { USERS } from "@/constants/urls";
export const useGuests = () => useSWR(USERS, fetcher);
