import { Router } from "express";
import * as hotelsController from "./hotels.controller";
import { validate } from "../../middleware/validate";
import { searchHotelsSchema, hotelIdSchema } from "./hotels.schema";

const router = Router();

/**
 * @swagger
 * /hotels:
 *   get:
 *     tags: [Hotels]
 *     summary: Search and list hotels
 *     parameters:
 *       - in: query
 *         name: location
 *         schema: { type: string }
 *       - in: query
 *         name: checkIn
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: checkOut
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: guests
 *         schema: { type: integer }
 *       - in: query
 *         name: rooms
 *         schema: { type: integer }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *       - in: query
 *         name: starRating
 *         schema: { type: integer, minimum: 1, maximum: 5 }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [name, price, rating, starRating] }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200: { description: List of hotels }
 */
router.get("/", validate(searchHotelsSchema, "query"), hotelsController.searchHotels);

/**
 * @swagger
 * /hotels/featured:
 *   get:
 *     tags: [Hotels]
 *     summary: Get featured hotels
 *     responses:
 *       200: { description: Featured hotels }
 */
router.get("/featured", hotelsController.getFeaturedHotels);

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     tags: [Hotels]
 *     summary: Get hotel details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Hotel details }
 *       404: { description: Hotel not found }
 */
router.get("/:id", validate(hotelIdSchema, "params"), hotelsController.getHotelById);

/**
 * @swagger
 * /hotels/{id}/rooms:
 *   get:
 *     tags: [Hotels]
 *     summary: Get hotel rooms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Hotel rooms }
 */
router.get("/:id/rooms", validate(hotelIdSchema, "params"), hotelsController.getHotelRooms);

/**
 * @swagger
 * /hotels/{id}/gallery:
 *   get:
 *     tags: [Hotels]
 *     summary: Get hotel gallery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Hotel gallery }
 */
router.get("/:id/gallery", validate(hotelIdSchema, "params"), hotelsController.getHotelGallery);

/**
 * @swagger
 * /hotels/{id}/amenities:
 *   get:
 *     tags: [Hotels]
 *     summary: Get hotel amenities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Hotel amenities }
 */
router.get("/:id/amenities", validate(hotelIdSchema, "params"), hotelsController.getHotelAmenities);

/**
 * @swagger
 * /hotels/{id}/reviews:
 *   get:
 *     tags: [Hotels]
 *     summary: Get hotel reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Hotel reviews }
 */
router.get("/:id/reviews", validate(hotelIdSchema, "params"), hotelsController.getHotelReviews);

export default router;
