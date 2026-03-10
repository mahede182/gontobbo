import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).optional(),
  isActive: z.boolean().optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});

export const createHotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  starRating: z.number().int().min(1).max(5).default(3),
  images: z.array(z.string()).optional(),
  checkInTime: z.string().default("14:00"),
  checkOutTime: z.string().default("11:00"),
  isFeatured: z.boolean().default(false),
  amenities: z.array(z.object({ name: z.string(), icon: z.string().optional() })).optional(),
});

export const updateHotelSchema = createHotelSchema.partial();

export const createRoomSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  sqft: z.number().int().optional(),
  bedType: z.string().optional(),
  view: z.string().optional(),
  price: z.number().positive(),
  taxInfo: z.string().optional(),
  maxGuests: z.number().int().positive().default(2),
  isRefundable: z.boolean().default(true),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateRoomSchema = createRoomSchema.partial();

export const createOfferSchema = z.object({
  hotelId: z.string().uuid().optional(),
  name: z.string().min(1),
  location: z.string().optional(),
  image: z.string().optional(),
  tier1Title: z.string().optional(),
  tier1Subtitle: z.string().optional(),
  tier1Value: z.string().optional(),
  tier1Discount: z.number().optional(),
  tier1Price: z.number().optional(),
  tier2Title: z.string().optional(),
  tier2Subtitle: z.string().optional(),
  tier2Value: z.string().optional(),
  tier2Discount: z.number().optional(),
  tier2Price: z.number().optional(),
  validFrom: z.string().optional(),
  validTo: z.string().optional(),
});

export const createTripSchema = z.object({
  title: z.string().min(1),
  destination: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().optional(),
  feature: z.string().optional(),
  image: z.string().optional(),
  price: z.number().positive(),
  isRefundable: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  packageDetails: z.array(z.string()).optional(),
});

export const broadcastNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().optional(),
  userIds: z.array(z.string().uuid()).optional(), // if omitted, send to all
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type CreateOfferInput = z.infer<typeof createOfferSchema>;
export type CreateTripInput = z.infer<typeof createTripSchema>;
export type BroadcastNotificationInput = z.infer<typeof broadcastNotificationSchema>;
