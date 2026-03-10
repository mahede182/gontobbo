import api from "./client";

export type Location = {
  id: string;
  name: string;
  country: string;
  image: string | null;
  isPopular: boolean;
  latitude: number | null;
  longitude: number | null;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const searchLocations = async (q?: string) => {
  const { data } = await api.get<ApiResponse<Location[]>>("/locations", {
    params: q ? { q } : undefined,
  });
  return data.data;
};

export const getPopularLocations = async () => {
  const { data } = await api.get<ApiResponse<Location[]>>("/locations/popular");
  return data.data;
};
