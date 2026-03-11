import { apiSlice } from "../slices/apiSlice";
import type { Review, ApiResponse } from "@/@types/api.type";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, { hotelId: string; rating: number; text: string }>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<Review>) => response.data,
      invalidatesTags: ["Reviews"],
    }),

    getReview: builder.query<Review, string>({
      query: (id) => `/reviews/${encodeURIComponent(id)}`,
      transformResponse: (response: ApiResponse<Review>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Reviews", id }],
    }),

    updateReview: builder.mutation<Review, { id: string; rating?: number; text?: string }>({
      query: ({ id, ...body }) => ({
        url: `/reviews/${encodeURIComponent(id)}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiResponse<Review>) => response.data,
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reviews/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
