import { Router } from "express";
import * as locationsController from "./locations.controller";

const router = Router();

/**
 * @swagger
 * /locations:
 *   get:
 *     tags: [Locations]
 *     summary: Search locations
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Search query
 *     responses:
 *       200: { description: List of locations }
 */
router.get("/", locationsController.searchLocations);

/**
 * @swagger
 * /locations/popular:
 *   get:
 *     tags: [Locations]
 *     summary: Get popular locations
 *     responses:
 *       200: { description: Popular locations }
 */
router.get("/popular", locationsController.getPopularLocations);

export default router;
