import { apiSlice } from "../slices/apiSlice";
import type { MemberCard, ApiResponse } from "@/@types/api.type";
import type { User, Passport, FlightPreference, Baggage } from "@/@types/auth.type";
import {
  USERS_ME,
  USERS_MEMBER_CARD,
  USERS_PASSPORT,
  USERS_FLIGHT_PREFERENCES,
  USERS_BAGGAGE,
} from "@/constants/urls";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => USERS_ME,
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
        url: USERS_ME,
        method: "PUT",
        body,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
      invalidatesTags: ["Users"],
    }),

    getMemberCard: builder.query<MemberCard, void>({
      query: () => USERS_MEMBER_CARD,
      transformResponse: (response: ApiResponse<MemberCard>) => response.data,
      providesTags: ["Users"],
    }),

    getPassport: builder.query<Passport, void>({
      query: () => USERS_PASSPORT,
      transformResponse: (response: ApiResponse<Passport>) => response.data,
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
        url: USERS_PASSPORT,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    getFlightPreferences: builder.query<FlightPreference, void>({
      query: () => USERS_FLIGHT_PREFERENCES,
      transformResponse: (response: ApiResponse<FlightPreference>) => response.data,
      providesTags: ["Users"],
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
        url: USERS_FLIGHT_PREFERENCES,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    getBaggage: builder.query<Baggage[], void>({
      query: () => USERS_BAGGAGE,
      transformResponse: (response: ApiResponse<Baggage[]>) => response.data,
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
        url: USERS_BAGGAGE,
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
  useGetPassportQuery,
  useUpdatePassportMutation,
  useGetFlightPreferencesQuery,
  useUpdateFlightPreferencesMutation,
  useGetBaggageQuery,
  useUpdateBaggageMutation,
} = usersApi;
