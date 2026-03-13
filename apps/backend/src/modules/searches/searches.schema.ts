import { z } from "zod";

export const addRecentSearchSchema = z.object({
  type: z.enum(["HOTEL", "FLIGHT"]),
  query: z.string().min(1, "Search query is required"),
});

export type AddRecentSearchInput = z.infer<typeof addRecentSearchSchema>;
