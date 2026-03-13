import { apiSlice } from "../slices/apiSlice";
import type { Location, ApiResponse } from "@/@types/api.type";
import { LOCATIONS, LOCATIONS_POPULAR } from "@/constants/urls";

export const locationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchLocations: builder.query<Location[], string | void>({
      query: (q) => ({
        url: LOCATIONS,
        params: q ? { q } : undefined,
      }),
      transformResponse: (response: ApiResponse<Location[]>) => response.data,
      providesTags: ["Locations"],
    }),

    getPopularLocations: builder.query<Location[], void>({
      query: () => LOCATIONS_POPULAR,
      transformResponse: (response: ApiResponse<Location[]>) => response.data,
      providesTags: ["Locations"],
    }),
  }),
});

export const { useSearchLocationsQuery, useGetPopularLocationsQuery } = locationsApi;
