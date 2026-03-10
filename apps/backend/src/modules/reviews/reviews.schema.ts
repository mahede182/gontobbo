import { z } from "zod";

export const createReviewSchema = z.object({
  hotelId: z.string().uuid("Invalid hotel ID"),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, "Review must be at least 10 characters"),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  text: z.string().min(10).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
