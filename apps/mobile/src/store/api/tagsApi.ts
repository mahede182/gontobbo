import { apiSlice } from "../slices/apiSlice";
import type { Tag, ApiResponse } from "@/@types/api.type";

export type { Tag };

export const tagsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => "/tags",
      transformResponse: (response: ApiResponse<Tag[]>) => response.data,
      providesTags: ["Tags"],
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;
