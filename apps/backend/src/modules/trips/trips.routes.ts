import { Router } from "express";
import * as tripsController from "./trips.controller";

const router = Router();

/**
 * @swagger
 * /trips:
 *   get:
 *     tags: [Trips]
 *     summary: List trips
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of trips }
 */
router.get("/", tripsController.getTrips);

/**
 * @swagger
 * /trips/popular:
 *   get:
 *     tags: [Trips]
 *     summary: Get popular trips
 *     responses:
 *       200: { description: Popular trips }
 */
router.get("/popular", tripsController.getPopularTrips);

/**
 * @swagger
 * /trips/{id}:
 *   get:
 *     tags: [Trips]
 *     summary: Get trip details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Trip details }
 */
router.get("/:id", tripsController.getTripById);

export default router;
