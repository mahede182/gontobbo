import { apiSlice } from "../slices/apiSlice";
import type { WishlistItem, ApiResponse } from "@/@types/api.type";
import { WISHLIST, WISHLIST_ITEM } from "@/constants/urls";

export type { WishlistItem };

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => WISHLIST,
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
        url: WISHLIST,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<WishlistItem>) => response.data,
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<void, string>({
      query: (id) => ({
        url: WISHLIST_ITEM(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } =
  wishlistApi;
