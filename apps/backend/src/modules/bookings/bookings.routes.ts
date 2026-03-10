import { Router } from "express";
import * as bookingsController from "./bookings.controller";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import { createBookingSchema, addTravellerSchema, bookingsQuerySchema } from "./bookings.schema";

const router = Router();

/**
 * @swagger
 * /bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a new booking
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, checkIn, checkOut]
 *             properties:
 *               type: { type: string, enum: [HOTEL, TRIP] }
 *               hotelId: { type: string }
 *               roomId: { type: string }
 *               tripId: { type: string }
 *               checkIn: { type: string, format: date }
 *               checkOut: { type: string, format: date }
 *               adults: { type: integer, default: 1 }
 *               children: { type: integer, default: 0 }
 *               rooms: { type: integer, default: 1 }
 *               bookingFor: { type: string, enum: [MYSELF, SOMEONE_ELSE] }
 *     responses:
 *       201: { description: Booking created }
 *   get:
 *     tags: [Bookings]
 *     summary: Get user's bookings
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [HOTEL, TRIP] }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED] }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of bookings }
 */
router.post("/", authenticate, validate(createBookingSchema), bookingsController.createBooking);
router.get(
  "/",
  authenticate,
  validate(bookingsQuerySchema, "query"),
  bookingsController.getBookings,
);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     tags: [Bookings]
 *     summary: Get booking details
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Booking details }
 */
router.get("/:id", authenticate, bookingsController.getBookingById);

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   patch:
 *     tags: [Bookings]
 *     summary: Cancel a booking
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Booking cancelled }
 */
router.patch("/:id/cancel", authenticate, bookingsController.cancelBooking);

/**
 * @swagger
 * /bookings/{id}/travellers:
 *   post:
 *     tags: [Bookings]
 *     summary: Add a traveller to a booking
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName]
 *             properties:
 *               fullName: { type: string }
 *               dateOfBirth: { type: string }
 *               gender: { type: string }
 *               nationality: { type: string }
 *               passportNumber: { type: string }
 *     responses:
 *       201: { description: Traveller added }
 */
router.post(
  "/:id/travellers",
  authenticate,
  validate(addTravellerSchema),
  bookingsController.addTraveller,
);

export default router;
