import api from "./client";
import type { User } from "@/@types/auth.type";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type MemberCard = {
  name: string;
  memberNumber: string;
  memberClass: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  avatar: string | null;
};

export const getProfile = async () => {
  const { data } = await api.get<ApiResponse<User>>("/users/me");
  return data.data;
};

export const updateProfile = async (params: {
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  nationality?: string;
  address?: string;
  avatar?: string;
  gender?: string;
}) => {
  const { data } = await api.put<ApiResponse<User>>("/users/me", params);
  return data.data;
};

export const getMemberCard = async () => {
  const { data } = await api.get<ApiResponse<MemberCard>>("/users/me/member-card");
  return data.data;
};

export const updatePassport = async (params: {
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  dateOfIssue: string;
  dateOfExpiry: string;
}) => {
  const { data } = await api.put("/users/me/passport", params);
  return data.data;
};

export const updateFlightPreferences = async (params: {
  isFlexibleDates?: boolean;
  isNonStopFlights?: boolean;
  isEarlyDeparture?: boolean;
  isLateDeparture?: boolean;
}) => {
  const { data } = await api.put("/users/me/flight-preferences", params);
  return data.data;
};

export const getBaggage = async () => {
  const { data } = await api.get("/users/me/baggage");
  return data.data;
};

export const updateBaggage = async (
  items: {
    type: "CABIN" | "CHECKED" | "SPECIAL";
    name: string;
    description?: string;
    weight: number;
    dimensions?: string;
    status?: "INCLUDED" | "EXTRA_FEE" | "NOT_ALLOWED";
  }[],
) => {
  const { data } = await api.put("/users/me/baggage", items);
  return data.data;
};
