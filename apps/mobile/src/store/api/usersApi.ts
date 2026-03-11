import { apiSlice } from "../slices/apiSlice";
import type { MemberCard, ApiResponse } from "@/@types/api.type";
import type { User } from "@/@types/auth.type";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => "/users/me",
      transformResponse: (response: ApiResponse<User>) => response.data,
      providesTags: ["Users"],
    }),

    updateProfile: builder.mutation<
      User,
      {
        firstName?: string;
        lastName?: string;
        username?: string;
        phone?: string;
        nationality?: string;
        address?: string;
        avatar?: string;
        gender?: string;
      }
    >({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
      invalidatesTags: ["Users"],
    }),

    getMemberCard: builder.query<MemberCard, void>({
      query: () => "/users/me/member-card",
      transformResponse: (response: ApiResponse<MemberCard>) => response.data,
      providesTags: ["Users"],
    }),

    updatePassport: builder.mutation<
      any,
      {
        passportNumber: string;
        nationality: string;
        dateOfBirth: string;
        dateOfIssue: string;
        dateOfExpiry: string;
      }
    >({
      query: (body) => ({
        url: "/users/me/passport",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateFlightPreferences: builder.mutation<
      any,
      {
        isFlexibleDates?: boolean;
        isNonStopFlights?: boolean;
        isEarlyDeparture?: boolean;
        isLateDeparture?: boolean;
      }
    >({
      query: (body) => ({
        url: "/users/me/flight-preferences",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    getBaggage: builder.query<any, void>({
      query: () => "/users/me/baggage",
      providesTags: ["Users"],
    }),

    updateBaggage: builder.mutation<
      any,
      {
        type: "CABIN" | "CHECKED" | "SPECIAL";
        name: string;
        description?: string;
        weight: number;
        dimensions?: string;
        status?: "INCLUDED" | "EXTRA_FEE" | "NOT_ALLOWED";
      }[]
    >({
      query: (body) => ({
        url: "/users/me/baggage",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// ─── Hook Exports ───────────────────────────────────────────────────────────

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetMemberCardQuery,
  useUpdatePassportMutation,
  useUpdateFlightPreferencesMutation,
  useGetBaggageQuery,
  useUpdateBaggageMutation,
} = usersApi;
