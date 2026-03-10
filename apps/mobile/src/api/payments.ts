import api from "./client";

export type PaymentMethod = {
  id: string;
  userId: string;
  type: "CREDIT_CARD" | "PAYPAL" | "MASTER_CARD" | "BKASH" | "NAGAD";
  name: string;
  last4: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getPaymentMethods = async () => {
  const { data } = await api.get<ApiResponse<PaymentMethod[]>>("/payments/methods");
  return data.data;
};

export const addPaymentMethod = async (params: {
  type: PaymentMethod["type"];
  name: string;
  last4?: string;
  isDefault?: boolean;
}) => {
  const { data } = await api.post<ApiResponse<PaymentMethod>>("/payments/methods", params);
  return data.data;
};

export const removePaymentMethod = async (id: string) => {
  await api.delete(`/payments/methods/${encodeURIComponent(id)}`);
};
