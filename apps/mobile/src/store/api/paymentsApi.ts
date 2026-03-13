import { apiSlice } from "../slices/apiSlice";
import type { PaymentMethod, ApiResponse } from "@/@types/api.type";
import { PAYMENTS_METHODS, PAYMENT_METHOD_DETAIL } from "@/constants/urls";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => PAYMENTS_METHODS,
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
        url: PAYMENTS_METHODS,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<PaymentMethod>) => response.data,
      invalidatesTags: ["Payments"],
    }),

    removePaymentMethod: builder.mutation<void, string>({
      query: (id) => ({
        url: PAYMENT_METHOD_DETAIL(id),
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
