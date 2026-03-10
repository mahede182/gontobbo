import { z } from "zod";

export const addWishlistSchema = z.object({
  hotelId: z.string().uuid().optional(),
  offerId: z.string().uuid().optional(),
  type: z.enum(["HOTEL", "FLIGHT"]),
  name: z.string().min(1, "Name is required"),
  rating: z.number().optional(),
});

export type AddWishlistInput = z.infer<typeof addWishlistSchema>;
