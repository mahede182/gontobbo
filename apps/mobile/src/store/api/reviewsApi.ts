import { apiSlice } from "../slices/apiSlice";
import type { Review, ApiResponse } from "@/@types/api.type";
import { REVIEWS, REVIEW_DETAIL } from "@/constants/urls";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, { hotelId: string; rating: number; text: string }>({
      query: (body) => ({
        url: REVIEWS,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<Review>) => response.data,
      invalidatesTags: ["Reviews"],
    }),

    getReview: builder.query<Review, string>({
      query: (id) => REVIEW_DETAIL(id),
      transformResponse: (response: ApiResponse<Review>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Reviews", id }],
    }),

    updateReview: builder.mutation<Review, { id: string; rating?: number; text?: string }>({
      query: ({ id, ...body }) => ({
        url: REVIEW_DETAIL(id),
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiResponse<Review>) => response.data,
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: REVIEW_DETAIL(id),
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
