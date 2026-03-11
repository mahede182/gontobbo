import { apiSlice } from "../slices/apiSlice";
import type { RecentSearches, ApiResponse } from "@/@types/api.type";

export const searchesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecentSearches: builder.query<RecentSearches, void>({
      query: () => "/searches/recent",
      transformResponse: (response: ApiResponse<RecentSearches>) => response.data,
      providesTags: ["Searches"],
    }),

    addRecentSearch: builder.mutation<{ id: string }, { type: "HOTEL" | "FLIGHT"; query: string }>({
      query: (body) => ({
        url: "/searches/recent",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<{ id: string }>) => response.data,
      invalidatesTags: ["Searches"],
    }),

    clearRecentSearches: builder.mutation<void, void>({
      query: () => ({
        url: "/searches/recent",
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
