import { Router } from "express";
import * as adminController from "./admin.controller";
import { validate } from "../../middleware/validate";
import { authenticate, authorize } from "../../middleware/auth";
import {
  updateUserRoleSchema,
  updateBookingStatusSchema,
  createHotelSchema,
  updateHotelSchema,
  createRoomSchema,
  updateRoomSchema,
  createOfferSchema,
  createTripSchema,
  broadcastNotificationSchema,
} from "./admin.schema";

const router = Router();

router.use(authenticate, authorize("ADMIN"));

// ═══════════════════════════════════════════════════════════════════════════
// ─── Dashboard ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin dashboard statistics
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalUsers: { type: integer, example: 4 }
 *                         totalBookings: { type: integer, example: 10 }
 *                         totalHotels: { type: integer, example: 8 }
 *                         totalTrips: { type: integer, example: 5 }
 *                         totalRevenue: { type: number, example: 25000.50 }
 *                     recentBookings:
 *                       type: array
 *                       items: { type: object }
 */
router.get("/dashboard", adminController.getDashboard);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Users ──────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: List all users (paginated)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *         description: Items per page
 *     responses:
 *       200: { description: Paginated list of users }
 */
router.get("/users", adminController.getUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get user by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: User details }
 *       404: { description: User not found }
 */
router.get("/users/:id", adminController.getUserById);

/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     tags: [Admin]
 *     summary: Update user role or active status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: ADMIN
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200: { description: User updated }
 *       404: { description: User not found }
 */
router.patch("/users/:id", validate(updateUserRoleSchema), adminController.updateUser);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Bookings ───────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/bookings:
 *   get:
 *     tags: [Admin]
 *     summary: List all bookings (paginated, filterable)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED]
 *         description: Filter by booking status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [HOTEL, TRIP]
 *         description: Filter by booking type
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200: { description: Paginated list of bookings }
 */
router.get("/bookings", adminController.getBookings);

/**
 * @swagger
 * /admin/bookings/{id}/status:
 *   patch:
 *     tags: [Admin]
 *     summary: Update booking status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED]
 *                 example: CONFIRMED
 *     responses:
 *       200: { description: Booking status updated }
 *       404: { description: Booking not found }
 */
router.patch(
  "/bookings/:id/status",
  validate(updateBookingStatusSchema),
  adminController.updateBookingStatus,
);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Hotels ─────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/hotels:
 *   post:
 *     tags: [Admin]
 *     summary: Create a new hotel
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, location]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Grand Palace Hotel
 *               description:
 *                 type: string
 *                 example: A luxurious 5-star hotel in the heart of the city
 *               location:
 *                 type: string
 *                 example: Dubai, UAE
 *               latitude:
 *                 type: number
 *                 example: 25.2048
 *               longitude:
 *                 type: number
 *                 example: 55.2708
 *               starRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 default: 3
 *                 example: 5
 *               images:
 *                 type: array
 *                 items: { type: string }
 *                 example: ["https://example.com/img1.jpg", "https://example.com/img2.jpg"]
 *               checkInTime:
 *                 type: string
 *                 default: "14:00"
 *                 example: "15:00"
 *               checkOutTime:
 *                 type: string
 *                 default: "11:00"
 *                 example: "12:00"
 *               isFeatured:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [name]
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Swimming Pool
 *                     icon:
 *                       type: string
 *                       example: pool
 *                 example:
 *                   - { name: Swimming Pool, icon: pool }
 *                   - { name: Free WiFi, icon: wifi }
 *                   - { name: Spa, icon: spa }
 *     responses:
 *       201: { description: Hotel created successfully }
 *       400: { description: Validation error }
 */
router.post("/hotels", validate(createHotelSchema), adminController.createHotel);

/**
 * @swagger
 * /admin/hotels/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a hotel
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Updated Hotel Name }
 *               description: { type: string }
 *               location: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               starRating: { type: integer, minimum: 1, maximum: 5 }
 *               images: { type: array, items: { type: string } }
 *               checkInTime: { type: string }
 *               checkOutTime: { type: string }
 *               isFeatured: { type: boolean }
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name: { type: string }
 *                     icon: { type: string }
 *     responses:
 *       200: { description: Hotel updated }
 *       404: { description: Hotel not found }
 */
router.put("/hotels/:id", validate(updateHotelSchema), adminController.updateHotel);

/**
 * @swagger
 * /admin/hotels/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Soft-delete a hotel (sets isActive to false)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Hotel deleted }
 *       404: { description: Hotel not found }
 */
router.delete("/hotels/:id", adminController.deleteHotel);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Rooms ──────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/hotels/{hotelId}/rooms:
 *   post:
 *     tags: [Admin]
 *     summary: Create a room for a hotel
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Deluxe Suite
 *               description:
 *                 type: string
 *                 example: Spacious suite with ocean view
 *               sqft:
 *                 type: integer
 *                 example: 550
 *               bedType:
 *                 type: string
 *                 example: King
 *               view:
 *                 type: string
 *                 example: Ocean View
 *               price:
 *                 type: number
 *                 example: 350
 *               taxInfo:
 *                 type: string
 *                 example: per night, excluding taxes
 *               maxGuests:
 *                 type: integer
 *                 default: 2
 *                 example: 3
 *               isRefundable:
 *                 type: boolean
 *                 default: true
 *               images:
 *                 type: array
 *                 items: { type: string }
 *                 example: ["https://example.com/room1.jpg"]
 *               tags:
 *                 type: array
 *                 items: { type: string }
 *                 example: ["Luxury", "Ocean View"]
 *     responses:
 *       201: { description: Room created }
 *       404: { description: Hotel not found }
 */
router.post("/hotels/:hotelId/rooms", validate(createRoomSchema), adminController.createRoom);

/**
 * @swagger
 * /admin/rooms/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a room
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               sqft: { type: integer }
 *               bedType: { type: string }
 *               view: { type: string }
 *               price: { type: number }
 *               taxInfo: { type: string }
 *               maxGuests: { type: integer }
 *               isRefundable: { type: boolean }
 *               images: { type: array, items: { type: string } }
 *               tags: { type: array, items: { type: string } }
 *     responses:
 *       200: { description: Room updated }
 *       404: { description: Room not found }
 */
router.put("/rooms/:id", validate(updateRoomSchema), adminController.updateRoom);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Offers ─────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/offers:
 *   post:
 *     tags: [Admin]
 *     summary: Create a new offer
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               hotelId:
 *                 type: string
 *                 format: uuid
 *                 description: Optional hotel to link the offer to
 *               name:
 *                 type: string
 *                 example: Summer Special
 *               location:
 *                 type: string
 *                 example: Dubai, UAE
 *               image:
 *                 type: string
 *                 example: https://example.com/offer.jpg
 *               tier1Title: { type: string, example: Weekend Getaway }
 *               tier1Subtitle: { type: string, example: 2 nights stay }
 *               tier1Value: { type: string, example: "Save $150" }
 *               tier1Discount: { type: number, example: 25 }
 *               tier1Price: { type: number, example: 299 }
 *               tier2Title: { type: string, example: Week-long Escape }
 *               tier2Subtitle: { type: string, example: 5 nights stay }
 *               tier2Value: { type: string, example: "Save $500" }
 *               tier2Discount: { type: number, example: 35 }
 *               tier2Price: { type: number, example: 649 }
 *               validFrom:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               validTo:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *     responses:
 *       201: { description: Offer created }
 */
router.post("/offers", validate(createOfferSchema), adminController.createOffer);

/**
 * @swagger
 * /admin/offers/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update an offer
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *               image: { type: string }
 *               tier1Title: { type: string }
 *               tier1Subtitle: { type: string }
 *               tier1Value: { type: string }
 *               tier1Discount: { type: number }
 *               tier1Price: { type: number }
 *               tier2Title: { type: string }
 *               tier2Subtitle: { type: string }
 *               tier2Value: { type: string }
 *               tier2Discount: { type: number }
 *               tier2Price: { type: number }
 *               validFrom: { type: string, format: date }
 *               validTo: { type: string, format: date }
 *     responses:
 *       200: { description: Offer updated }
 *       404: { description: Offer not found }
 */
router.put("/offers/:id", validate(createOfferSchema.partial()), adminController.updateOffer);

/**
 * @swagger
 * /admin/offers/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Soft-delete an offer
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Offer deleted }
 *       404: { description: Offer not found }
 */
router.delete("/offers/:id", adminController.deleteOffer);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Trips ──────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/trips:
 *   post:
 *     tags: [Admin]
 *     summary: Create a new trip
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, destination, duration, price]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buckingham Palace, London
 *               destination:
 *                 type: string
 *                 example: London, United Kingdom
 *               duration:
 *                 type: string
 *                 example: 5 Days Package
 *               description:
 *                 type: string
 *                 example: Explore the heart of London
 *               feature:
 *                 type: string
 *                 example: Return Flight
 *               image:
 *                 type: string
 *                 example: https://example.com/trip.jpg
 *               price:
 *                 type: number
 *                 example: 1299
 *               isRefundable:
 *                 type: boolean
 *                 default: true
 *               isPopular:
 *                 type: boolean
 *                 default: false
 *               packageDetails:
 *                 type: array
 *                 items: { type: string }
 *                 example: ["Round-trip flights", "4 nights hotel", "Daily breakfast"]
 *     responses:
 *       201: { description: Trip created }
 */
router.post("/trips", validate(createTripSchema), adminController.createTrip);

/**
 * @swagger
 * /admin/trips/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update a trip
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               destination: { type: string }
 *               duration: { type: string }
 *               description: { type: string }
 *               feature: { type: string }
 *               image: { type: string }
 *               price: { type: number }
 *               isRefundable: { type: boolean }
 *               isPopular: { type: boolean }
 *               packageDetails:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200: { description: Trip updated }
 *       404: { description: Trip not found }
 */
router.put("/trips/:id", validate(createTripSchema.partial()), adminController.updateTrip);

// ═══════════════════════════════════════════════════════════════════════════
// ─── Notifications ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

/**
 * @swagger
 * /admin/notifications/broadcast:
 *   post:
 *     tags: [Admin]
 *     summary: Broadcast notification to users
 *     description: Send to specific users (provide userIds) or to all active users (omit userIds)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Special Offer! 🎉"
 *               body:
 *                 type: string
 *                 example: "Get 30% off on all bookings this weekend!"
 *               userIds:
 *                 type: array
 *                 items: { type: string, format: uuid }
 *                 description: "Send to specific users. Omit to broadcast to ALL active users."
 *     responses:
 *       200:
 *         description: Notification sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     sent: { type: integer, example: 3 }
 *                 message: { type: string, example: "Notification sent to 3 users" }
 */
router.post(
  "/notifications/broadcast",
  validate(broadcastNotificationSchema),
  adminController.broadcastNotification,
);

export default router;
