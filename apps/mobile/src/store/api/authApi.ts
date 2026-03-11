import { apiSlice } from "../slices/apiSlice";
import type { User, AuthTokens } from "@/@types/auth.type";
import { saveTokens, saveItem, clearTokens } from "@/utils/storage";
import { STORAGE_KEYS } from "@/@types/storage.type";
import { setCredentials, clearCredentials } from "../slices/authSlice";
import { LOGIN, REGISTER, GOOGLE_LOGIN, APPLE_LOGIN, GET_ME, LOGOUT } from "@/constants/urls";

interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const onAuthSuccess = async (data: AuthData, dispatch: any) => {
  await saveTokens(data.accessToken, data.refreshToken);
  await saveItem(STORAGE_KEYS.USER, data.user);
  dispatch(setCredentials({ user: data.user }));
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthData, { email: string; password: string }>({
      query: (body) => ({
        url: LOGIN,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<AuthData>) => response.data,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await onAuthSuccess(data, dispatch);
        } catch {}
      },
    }),

    register: builder.mutation<
      AuthData,
      {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
      }
    >({
      query: (body) => ({
        url: REGISTER,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<AuthData>) => response.data,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await onAuthSuccess(data, dispatch);
        } catch {}
      },
    }),

    googleLogin: builder.mutation<AuthData, { idToken: string }>({
      query: (body) => ({
        url: GOOGLE_LOGIN,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<AuthData>) => response.data,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await onAuthSuccess(data, dispatch);
        } catch {}
      },
    }),

    appleLogin: builder.mutation<
      AuthData,
      {
        identityToken: string;
        user?: string;
        email?: string | null;
        fullName?: { givenName?: string | null; familyName?: string | null };
      }
    >({
      query: (body) => ({
        url: APPLE_LOGIN,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<AuthData>) => response.data,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await onAuthSuccess(data, dispatch);
        } catch {}
      },
    }),

    getMe: builder.query<User, void>({
      query: () => GET_ME,
      transformResponse: (response: ApiResponse<User>) => response.data,
      providesTags: ["Auth"],
    }),

    logout: builder.mutation<void, { refreshToken?: string }>({
      query: (body) => ({
        url: LOGOUT,
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {}
        await clearTokens();
        dispatch(clearCredentials());
        dispatch(apiSlice.util.resetApiState());
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useAppleLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
