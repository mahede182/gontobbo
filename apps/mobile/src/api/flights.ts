import api from "./client";

export type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopLocation: string | null;
  price: number;
  services: string[];
  route: string;
  createdAt: string;
  updatedAt: string;
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

export const searchFlights = async (params?: {
  departure?: string;
  arrival?: string;
  date?: string;
  passengers?: number;
  maxStops?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "duration" | "departure";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}) => {
  const { data } = await api.get<PaginatedResponse<Flight>>("/flights", { params });
  return data;
};

export const getFlightDetail = async (id: string) => {
  const { data } = await api.get<ApiResponse<Flight>>(`/flights/${encodeURIComponent(id)}`);
  return data.data;
};
