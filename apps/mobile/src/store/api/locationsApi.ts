import { apiSlice } from "../slices/apiSlice";
import type { Location, ApiResponse } from "@/@types/api.type";

export const locationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchLocations: builder.query<Location[], string | void>({
      query: (q) => ({
        url: "/locations",
        params: q ? { q } : undefined,
      }),
      transformResponse: (response: ApiResponse<Location[]>) => response.data,
      providesTags: ["Locations"],
    }),

    getPopularLocations: builder.query<Location[], void>({
      query: () => "/locations/popular",
      transformResponse: (response: ApiResponse<Location[]>) => response.data,
      providesTags: ["Locations"],
    }),
  }),
});

export const { useSearchLocationsQuery, useGetPopularLocationsQuery } = locationsApi;
