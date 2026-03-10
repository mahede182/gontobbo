import api from "./client";

export type RecentSearches = {
  hotels: string[];
  flights: string[];
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getRecentSearches = async () => {
  const { data } = await api.get<ApiResponse<RecentSearches>>("/searches/recent");
  return data.data;
};

export const addRecentSearch = async (params: { type: "HOTEL" | "FLIGHT"; query: string }) => {
  const { data } = await api.post<ApiResponse<{ id: string }>>("/searches/recent", params);
  return data.data;
};

export const clearRecentSearches = async () => {
  await api.delete("/searches/recent");
};
