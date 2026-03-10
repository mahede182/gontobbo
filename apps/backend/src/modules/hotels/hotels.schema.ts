import { z } from "zod";

export const searchHotelsSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.coerce.number().int().positive().optional(),
  rooms: z.coerce.number().int().positive().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  starRating: z.coerce.number().int().min(1).max(5).optional(),
  sortBy: z.enum(["name", "price", "rating", "starRating"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export const hotelIdSchema = z.object({
  id: z.string().uuid("Invalid hotel ID"),
});

export const hotelReviewsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type SearchHotelsInput = z.infer<typeof searchHotelsSchema>;
export type HotelIdInput = z.infer<typeof hotelIdSchema>;
