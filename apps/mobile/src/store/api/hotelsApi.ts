import { apiSlice } from "../slices/apiSlice";
import type {
  Hotel,
  Room,
  HotelDetail,
  HotelGallery,
  Amenity,
  HotelReview,
  SearchParams,
  ApiResponse,
  PaginatedResponse,
} from "@/@types/api.type";

export type { Hotel, Room };

export const hotelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedHotels: builder.query<Hotel[], void>({
      query: () => "/hotels/featured",
      transformResponse: (response: ApiResponse<Hotel[]>) => response.data,
      providesTags: ["Hotels"],
    }),

    searchHotels: builder.query<PaginatedResponse<Hotel>, SearchParams>({
      query: (params) => ({
        url: "/hotels",
        params,
      }),
      providesTags: ["Hotels"],
    }),

    getHotelDetail: builder.query<HotelDetail, string>({
      query: (id) => `/hotels/${encodeURIComponent(id)}`,
      transformResponse: (response: ApiResponse<HotelDetail>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Hotels", id }],
    }),

    getHotelRooms: builder.query<Room[], string>({
      query: (hotelId) => `/hotels/${encodeURIComponent(hotelId)}/rooms`,
      transformResponse: (response: ApiResponse<Room[]>) => response.data,
      providesTags: (_result, _error, hotelId) => [{ type: "Hotels", id: `${hotelId}-rooms` }],
    }),

    getHotelGallery: builder.query<HotelGallery, string>({
      query: (hotelId) => `/hotels/${encodeURIComponent(hotelId)}/gallery`,
      transformResponse: (response: ApiResponse<HotelGallery>) => response.data,
      providesTags: (_result, _error, hotelId) => [{ type: "Hotels", id: `${hotelId}-gallery` }],
    }),

    getHotelAmenities: builder.query<Amenity[], string>({
      query: (hotelId) => `/hotels/${encodeURIComponent(hotelId)}/amenities`,
      transformResponse: (response: ApiResponse<Amenity[]>) => response.data,
      providesTags: (_result, _error, hotelId) => [{ type: "Hotels", id: `${hotelId}-amenities` }],
    }),

    getHotelReviews: builder.query<
      PaginatedResponse<HotelReview>,
      { hotelId: string; page?: number; limit?: number }
    >({
      query: ({ hotelId, page = 1, limit = 10 }) => ({
        url: `/hotels/${encodeURIComponent(hotelId)}/reviews`,
        params: { page, limit },
      }),
      providesTags: (_result, _error, { hotelId }) => [{ type: "Reviews", id: hotelId }],
    }),
  }),
});

export const {
  useGetFeaturedHotelsQuery,
  useSearchHotelsQuery,
  useGetHotelDetailQuery,
  useGetHotelRoomsQuery,
  useGetHotelGalleryQuery,
  useGetHotelAmenitiesQuery,
  useGetHotelReviewsQuery,
} = hotelsApi;
