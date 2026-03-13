import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/urls";
import { getTokens, saveTokens, clearTokens } from "@/utils/storage";
import { clearCredentials } from "@/store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    const tokens = await getTokens();
    if (tokens?.accessToken) {
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const tokens = await getTokens();

    if (tokens?.refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken: tokens.refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken } = (refreshResult.data as any).data;
        await saveTokens(accessToken, refreshToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        await clearTokens();
        api.dispatch(clearCredentials());
      }
    } else {
      await clearTokens();
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
