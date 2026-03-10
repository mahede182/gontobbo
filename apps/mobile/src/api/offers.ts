import api from "./client";

export type Offer = {
  id: string;
  hotelId: string | null;
  name: string;
  location: string;
  image: string;
  tier1Title: string;
  tier1Subtitle: string;
  tier1Value: string;
  tier1Discount: number;
  tier1Price: number;
  tier2Title: string;
  tier2Subtitle: string;
  tier2Value: string;
  tier2Discount: number;
  tier2Price: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hotel: { name: string; location: string; rating: number; images?: string[] } | null;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getOffers = async () => {
  const { data } = await api.get<ApiResponse<Offer[]>>("/offers");
  return data.data;
};

export const getOfferDetail = async (id: string) => {
  const { data } = await api.get<ApiResponse<Offer>>(`/offers/${encodeURIComponent(id)}`);
  return data.data;
};
