import { apiSlice } from "../slices/apiSlice";
import type { Offer, ApiResponse } from "@/@types/api.type";
import { OFFERS, OFFER_DETAIL } from "@/constants/urls";

export type { Offer };

export const offersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query<Offer[], void>({
      query: () => OFFERS,
      transformResponse: (response: ApiResponse<Offer[]>) => response.data,
      providesTags: ["Offers"],
    }),

    getOfferDetail: builder.query<Offer, string>({
      query: (id) => OFFER_DETAIL(id),
      transformResponse: (response: ApiResponse<Offer>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Offers", id }],
    }),
  }),
});

export const { useGetOffersQuery, useGetOfferDetailQuery } = offersApi;
