import { apiSlice } from "../slices/apiSlice";
import type { Offer, ApiResponse } from "@/@types/api.type";

export type { Offer };

export const offersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query<Offer[], void>({
      query: () => "/offers",
      transformResponse: (response: ApiResponse<Offer[]>) => response.data,
      providesTags: ["Offers"],
    }),

    getOfferDetail: builder.query<Offer, string>({
      query: (id) => `/offers/${encodeURIComponent(id)}`,
      transformResponse: (response: ApiResponse<Offer>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Offers", id }],
    }),
  }),
});

export const { useGetOffersQuery, useGetOfferDetailQuery } = offersApi;
