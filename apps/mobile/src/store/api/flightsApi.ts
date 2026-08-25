import { apiSlice } from "../slices/apiSlice";
import type { Flight, ApiResponse, PaginatedResponse } from "@/@types/api.type";
import { FLIGHTS, FLIGHT_DETAIL } from "@/constants/urls";

export const flightsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchFlights: builder.query<
      PaginatedResponse<Flight>,
      {
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
      } | void
    >({
      query: (params) => ({
        url: FLIGHTS,
        params: params || undefined,
      }),
      providesTags: ["Flights"],
    }),

    getFlightDetail: builder.query<Flight, string>({
      query: (id) => FLIGHT_DETAIL(id),
      transformResponse: (response: ApiResponse<Flight>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Flights", id }],
    }),
  }),
});

export const { useSearchFlightsQuery, useGetFlightDetailQuery } = flightsApi;
