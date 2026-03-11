import { apiSlice } from "../slices/apiSlice";
import type { PaymentMethod, ApiResponse } from "@/@types/api.type";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => "/payments/methods",
      transformResponse: (response: ApiResponse<PaymentMethod[]>) => response.data,
      providesTags: ["Payments"],
    }),

    addPaymentMethod: builder.mutation<
      PaymentMethod,
      {
        type: PaymentMethod["type"];
        name: string;
        last4?: string;
        isDefault?: boolean;
      }
    >({
      query: (body) => ({
        url: "/payments/methods",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<PaymentMethod>) => response.data,
      invalidatesTags: ["Payments"],
    }),

    removePaymentMethod: builder.mutation<void, string>({
      query: (id) => ({
        url: `/payments/methods/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useRemovePaymentMethodMutation,
} = paymentsApi;
