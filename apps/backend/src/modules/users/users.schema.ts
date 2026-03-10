import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  username: z.string().min(3).optional(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().url().optional(),
  gender: z.string().optional(),
});

export const updatePassportSchema = z.object({
  passportNumber: z.string().min(1, "Passport number is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  dateOfIssue: z.string().min(1, "Date of issue is required"),
  dateOfExpiry: z.string().min(1, "Date of expiry is required"),
});

export const updateFlightPreferencesSchema = z.object({
  isFlexibleDates: z.boolean().optional(),
  isNonStopFlights: z.boolean().optional(),
  isEarlyDeparture: z.boolean().optional(),
  isLateDeparture: z.boolean().optional(),
});

export const updateBaggageSchema = z.array(
  z.object({
    id: z.string().optional(),
    type: z.enum(["CABIN", "CHECKED", "SPECIAL"]),
    name: z.string().min(1),
    description: z.string().optional(),
    weight: z.string().min(1),
    dimensions: z.string().optional(),
    status: z.enum(["INCLUDED", "EXTRA_FEE", "NOT_ALLOWED"]).optional(),
  }),
);

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePassportInput = z.infer<typeof updatePassportSchema>;
export type UpdateFlightPreferencesInput = z.infer<typeof updateFlightPreferencesSchema>;
export type UpdateBaggageInput = z.infer<typeof updateBaggageSchema>;
