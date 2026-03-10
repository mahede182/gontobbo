import api from "./client";

export type WishlistItem = {
  id: string;
  userId: string;
  hotelId: string | null;
  offerId: string | null;
  type: "HOTEL" | "FLIGHT";
  name: string;
  rating: number | null;
  createdAt: string;
  hotel: { name: string; location: string; rating: number; images: string[] } | null;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getWishlist = async () => {
  const { data } = await api.get<ApiResponse<WishlistItem[]>>("/wishlist");
  return data.data;
};

export const addToWishlist = async (params: {
  hotelId?: string;
  offerId?: string;
  type: "HOTEL" | "FLIGHT";
  name: string;
  rating?: number;
}) => {
  const { data } = await api.post<ApiResponse<WishlistItem>>("/wishlist", params);
  return data.data;
};

export const removeFromWishlist = async (id: string) => {
  await api.delete(`/wishlist/${encodeURIComponent(id)}`);
};
