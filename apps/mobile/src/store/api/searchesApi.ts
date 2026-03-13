import { apiSlice } from "../slices/apiSlice";
import type { RecentSearches, ApiResponse } from "@/@types/api.type";
import { SEARCHES_RECENT } from "@/constants/urls";

export const searchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecentSearches: builder.query<RecentSearches, void>({
      query: () => SEARCHES_RECENT,
      transformResponse: (response: ApiResponse<RecentSearches>) => response.data,
      providesTags: ["Searches"],
    }),

    addRecentSearch: builder.mutation<{ id: string }, { type: "HOTEL" | "FLIGHT"; query: string }>({
      query: (body) => ({
        url: SEARCHES_RECENT,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<{ id: string }>) => response.data,
      invalidatesTags: ["Searches"],
    }),

    clearRecentSearches: builder.mutation<void, void>({
      query: () => ({
        url: SEARCHES_RECENT,
        method: "DELETE",
      }),
      invalidatesTags: ["Searches"],
    }),
  }),
});

export const {
  useGetRecentSearchesQuery,
  useAddRecentSearchMutation,
  useClearRecentSearchesMutation,
} = searchesApi;
