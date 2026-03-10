import { Router } from "express";
import * as flightsController from "./flights.controller";
import { validate } from "../../middleware/validate";
import { searchFlightsSchema } from "./flights.schema";

const router = Router();

/**
 * @swagger
 * /flights:
 *   get:
 *     tags: [Flights]
 *     summary: Search flights
 *     parameters:
 *       - in: query
 *         name: departure
 *         schema: { type: string }
 *       - in: query
 *         name: arrival
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: passengers
 *         schema: { type: integer }
 *       - in: query
 *         name: maxStops
 *         schema: { type: integer }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [price, duration, departure] }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of flights }
 */
router.get("/", validate(searchFlightsSchema, "query"), flightsController.searchFlights);

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     tags: [Flights]
 *     summary: Get flight details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Flight details }
 *       404: { description: Flight not found }
 */
router.get("/:id", flightsController.getFlightById);

export default router;
