import api from "./client";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  duration: string;
  description: string;
  feature: string;
  image: string;
  peopleJoined: number;
  price: number;
  isRefundable: boolean;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  packageDetails: { id: string; tripId: string; detail: string }[];
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

export const getPopularTrips = async () => {
  const { data } = await api.get<ApiResponse<Trip[]>>("/trips/popular");
  return data.data;
};

export const getTrips = async (page = 1, limit = 10) => {
  const { data } = await api.get<PaginatedResponse<Trip>>("/trips", { params: { page, limit } });
  return data;
};

export const getTripDetail = async (id: string) => {
  const { data } = await api.get<ApiResponse<Trip>>(`/trips/${encodeURIComponent(id)}`);
  return data.data;
};
