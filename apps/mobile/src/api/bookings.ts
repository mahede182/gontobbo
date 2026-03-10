import api from "./client";

export type Booking = {
  id: string;
  userId: string;
  hotelId: string | null;
  roomId: string | null;
  tripId: string | null;
  type: "HOTEL" | "TRIP";
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  totalPrice: number;
  discountAmount: number;
  taxAmount: number;
  flightFee: number;
  bookingFor: "MYSELF" | "SOMEONE_ELSE";
  guestTitle: string | null;
  guestFirstName: string | null;
  guestLastName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  guestAddress: string | null;
  guestState: string | null;
  createdAt: string;
  updatedAt: string;
  hotel: { name: string; location: string; images: string[]; rating: number } | null;
  room: { name: string; price: number } | null;
  trip: { title: string; destination: string; image: string } | null;
};

export type CreateBookingParams = {
  type: "HOTEL" | "TRIP";
  hotelId?: string;
  roomId?: string;
  tripId?: string;
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  rooms?: number;
  bookingFor?: "MYSELF" | "SOMEONE_ELSE";
  guestTitle?: string;
  guestFirstName?: string;
  guestLastName?: string;
  guestEmail?: string;
  guestPhone?: string;
  guestAddress?: string;
  guestState?: string;
  travellers?: {
    fullName: string;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    passportNumber?: string;
    passportCountry?: string;
    travellerType?: string;
  }[];
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

export const createBooking = async (params: CreateBookingParams) => {
  const { data } = await api.post<ApiResponse<Booking>>("/bookings", params);
  return data.data;
};

export const getBookings = async (params?: {
  type?: "HOTEL" | "TRIP";
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const { data } = await api.get<PaginatedResponse<Booking>>("/bookings", { params });
  return data;
};

export const getBookingDetail = async (id: string) => {
  const { data } = await api.get<ApiResponse<Booking>>(`/bookings/${encodeURIComponent(id)}`);
  return data.data;
};

export const cancelBooking = async (id: string) => {
  const { data } = await api.patch<ApiResponse<Booking>>(
    `/bookings/${encodeURIComponent(id)}/cancel`,
  );
  return data.data;
};

export const addTraveller = async (
  bookingId: string,
  traveller: {
    fullName: string;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    passportNumber?: string;
    passportCountry?: string;
    travellerType?: string;
  },
) => {
  const { data } = await api.post(
    `/bookings/${encodeURIComponent(bookingId)}/travellers`,
    traveller,
  );
  return data.data;
};
