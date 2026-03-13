import { z } from "zod";

export const searchFlightsSchema = z.object({
  departure: z.string().optional(),
  arrival: z.string().optional(),
  date: z.string().optional(),
  passengers: z.coerce.number().int().positive().optional(),
  maxStops: z.coerce.number().int().min(0).optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sortBy: z.enum(["price", "duration", "departure"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type SearchFlightsInput = z.infer<typeof searchFlightsSchema>;
