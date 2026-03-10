import api from "./client";

export type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  rating: number;
  starRating: number;
  images: string[];
  checkInTime: string;
  checkOutTime: string;
  isFeatured: boolean;
  isActive: boolean;
  startingPrice: number | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type HotelDetail = Hotel & {
  amenities: Amenity[];
  rooms: Room[];
  reviews: HotelReview[];
};

export type Room = {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  sqft: number;
  bedType: string;
  view: string;
  price: number;
  taxInfo: string;
  maxGuests: number;
  isRefundable: boolean;
  isAvailable: boolean;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type Amenity = {
  id: string;
  hotelId: string;
  name: string;
  icon: string;
};

export type HotelReview = {
  id: string;
  hotelId: string;
  userId: string;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: { firstName: string; lastName: string; avatar: string | null };
};

export type HotelGallery = {
  hotelImages: string[];
  roomImages: { roomName: string; images: string[] }[];
};

export type SearchParams = {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  minPrice?: number;
  maxPrice?: number;
  starRating?: number;
  sortBy?: "name" | "price" | "rating" | "starRating";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getFeaturedHotels = async () => {
  const { data } = await api.get<ApiResponse<Hotel[]>>("/hotels/featured");
  return data.data;
};

export const searchHotels = async (params: SearchParams) => {
  const { data } = await api.get<PaginatedResponse<Hotel>>("/hotels", { params });
  return data;
};

export const getHotelDetail = async (id: string) => {
  const { data } = await api.get<ApiResponse<HotelDetail>>(`/hotels/${encodeURIComponent(id)}`);
  return data.data;
};

export const getHotelRooms = async (hotelId: string) => {
  const { data } = await api.get<ApiResponse<Room[]>>(
    `/hotels/${encodeURIComponent(hotelId)}/rooms`,
  );
  return data.data;
};

export const getHotelGallery = async (hotelId: string) => {
  const { data } = await api.get<ApiResponse<HotelGallery>>(
    `/hotels/${encodeURIComponent(hotelId)}/gallery`,
  );
  return data.data;
};

export const getHotelAmenities = async (hotelId: string) => {
  const { data } = await api.get<ApiResponse<Amenity[]>>(
    `/hotels/${encodeURIComponent(hotelId)}/amenities`,
  );
  return data.data;
};

export const getHotelReviews = async (hotelId: string, page = 1, limit = 10) => {
  const { data } = await api.get<PaginatedResponse<HotelReview>>(
    `/hotels/${encodeURIComponent(hotelId)}/reviews`,
    { params: { page, limit } },
  );
  return data;
};
