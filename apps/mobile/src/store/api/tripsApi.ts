import { apiSlice } from "../slices/apiSlice";
import type { Trip, ApiResponse, PaginatedResponse } from "@/@types/api.type";
import { TRIPS, TRIPS_POPULAR, TRIP_DETAIL } from "@/constants/urls";

export type { Trip };

export const tripsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularTrips: builder.query<Trip[], void>({
      query: () => TRIPS_POPULAR,
      transformResponse: (response: ApiResponse<Trip[]>) => response.data,
      providesTags: ["Trips"],
    }),

    getTrips: builder.query<PaginatedResponse<Trip>, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: TRIPS,
        params: params
          ? { page: params.page ?? 1, limit: params.limit ?? 10 }
          : { page: 1, limit: 10 },
      }),
      providesTags: ["Trips"],
    }),

    getTripDetail: builder.query<Trip, string>({
      query: (id) => TRIP_DETAIL(id),
      transformResponse: (response: ApiResponse<Trip>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Trips", id }],
    }),
  }),
});

// ─── Hook Exports ───────────────────────────────────────────────────────────

export const { useGetPopularTripsQuery, useGetTripsQuery, useGetTripDetailQuery } = tripsApi;
