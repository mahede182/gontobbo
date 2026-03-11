import { apiSlice } from "../slices/apiSlice";
import type {
  Booking,
  CreateBookingParams,
  ApiResponse,
  PaginatedResponse,
} from "@/@types/api.type";

export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<Booking, CreateBookingParams>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<Booking>) => response.data,
      invalidatesTags: ["Bookings"],
    }),

    getBookings: builder.query<
      PaginatedResponse<Booking>,
      {
        type?: "HOTEL" | "TRIP";
        status?: string;
        page?: number;
        limit?: number;
      } | void
    >({
      query: (params) => ({
        url: "/bookings",
        params: params || undefined,
      }),
      providesTags: ["Bookings"],
    }),

    getBookingDetail: builder.query<Booking, string>({
      query: (id) => `/bookings/${encodeURIComponent(id)}`,
      transformResponse: (response: ApiResponse<Booking>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Bookings", id }],
    }),

    cancelBooking: builder.mutation<Booking, string>({
      query: (id) => ({
        url: `/bookings/${encodeURIComponent(id)}/cancel`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<Booking>) => response.data,
      invalidatesTags: ["Bookings"],
    }),

    addTraveller: builder.mutation<
      any,
      {
        bookingId: string;
        traveller: {
          fullName: string;
          dateOfBirth?: string;
          gender?: string;
          nationality?: string;
          passportNumber?: string;
          passportCountry?: string;
          travellerType?: string;
        };
      }
    >({
      query: ({ bookingId, traveller }) => ({
        url: `/bookings/${encodeURIComponent(bookingId)}/travellers`,
        method: "POST",
        body: traveller,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingDetailQuery,
  useCancelBookingMutation,
  useAddTravellerMutation,
} = bookingsApi;
