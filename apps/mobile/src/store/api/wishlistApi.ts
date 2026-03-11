import { apiSlice } from "../slices/apiSlice";
import type { WishlistItem, ApiResponse } from "@/@types/api.type";

export type { WishlistItem };

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      transformResponse: (response: ApiResponse<WishlistItem[]>) => response.data,
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<
      WishlistItem,
      {
        hotelId?: string;
        offerId?: string;
        type: "HOTEL" | "FLIGHT";
        name: string;
        rating?: number;
      }
    >({
      query: (body) => ({
        url: "/wishlist",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<WishlistItem>) => response.data,
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<void, string>({
      query: (id) => ({
        url: `/ wishlist / ${encodeURIComponent(id)} `,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } =
  wishlistApi;
