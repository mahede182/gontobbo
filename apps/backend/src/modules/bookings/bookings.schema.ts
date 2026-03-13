import { z } from "zod";

export const createBookingSchema = z.object({
  hotelId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  tripId: z.string().uuid().optional(),
  type: z.enum(["HOTEL", "TRIP"]),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  adults: z.number().int().positive().default(1),
  children: z.number().int().min(0).default(0),
  rooms: z.number().int().positive().default(1),
  bookingFor: z.enum(["MYSELF", "SOMEONE_ELSE"]).default("MYSELF"),
  guestTitle: z.string().optional(),
  guestFirstName: z.string().optional(),
  guestLastName: z.string().optional(),
  guestEmail: z.string().email().optional(),
  guestPhone: z.string().optional(),
  guestAddress: z.string().optional(),
  guestState: z.string().optional(),
  travellers: z
    .array(
      z.object({
        fullName: z.string().min(1),
        dateOfBirth: z.string().optional(),
        gender: z.string().optional(),
        nationality: z.string().optional(),
        passportNumber: z.string().optional(),
        passportCountry: z.string().optional(),
        travellerType: z.string().optional(),
      }),
    )
    .optional(),
});

export const addTravellerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  passportCountry: z.string().optional(),
  travellerType: z.string().optional(),
});

export const bookingsQuerySchema = z.object({
  type: z.enum(["HOTEL", "TRIP"]).optional(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type AddTravellerInput = z.infer<typeof addTravellerSchema>;
export type BookingsQueryInput = z.infer<typeof bookingsQuerySchema>;
