import api from "./client";

export type Tag = {
  id: string;
  label: string;
  icon: string;
  active: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getTags = async () => {
  const { data } = await api.get<ApiResponse<Tag[]>>("/tags");
  return data.data;
};
