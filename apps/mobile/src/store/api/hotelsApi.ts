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
import {
  HOTELS,
  HOTELS_FEATURED,
  HOTEL_DETAIL,
  HOTEL_ROOMS,
  HOTEL_GALLERY,
  HOTEL_AMENITIES,
  HOTEL_REVIEWS,
} from "@/constants/urls";

export type { Hotel, Room };

export const hotelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedHotels: builder.query<Hotel[], void>({
      query: () => HOTELS_FEATURED,
      transformResponse: (response: ApiResponse<Hotel[]>) => response.data,
      providesTags: ["Hotels"],
    }),

    searchHotels: builder.query<PaginatedResponse<Hotel>, SearchParams>({
      query: (params) => ({
        url: HOTELS,
        params,
      }),
      providesTags: ["Hotels"],
    }),

    getHotelDetail: builder.query<HotelDetail, string>({
      query: (id) => HOTEL_DETAIL(id),
      transformResponse: (response: ApiResponse<HotelDetail>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Hotels", id }],
    }),

    getHotelRooms: builder.query<Room[], string>({
      query: (hotelId) => HOTEL_ROOMS(hotelId),
      transformResponse: (response: ApiResponse<Room[]>) => response.data,
      providesTags: (_result, _error, hotelId) => [{ type: "Hotels", id: `${hotelId}-rooms` }],
    }),

    getHotelGallery: builder.query<HotelGallery, string>({
      query: (hotelId) => HOTEL_GALLERY(hotelId),
      transformResponse: (response: ApiResponse<HotelGallery>) => response.data,
      providesTags: (_result, _error, hotelId) => [{ type: "Hotels", id: `${hotelId}-gallery` }],
    }),

    getHotelAmenities: builder.query<Amenity[], string>({
      query: (hotelId) => HOTEL_AMENITIES(hotelId),
      transformResponse: (response: ApiResponse<Amenity[]>) => response.data,
      providesTags: (_result, _error, hotelId) => [{ type: "Hotels", id: `${hotelId}-amenities` }],
    }),

    getHotelReviews: builder.query<
      PaginatedResponse<HotelReview>,
      { hotelId: string; page?: number; limit?: number }
    >({
      query: ({ hotelId, page = 1, limit = 10 }) => ({
        url: HOTEL_REVIEWS(hotelId),
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
