import { Router } from "express";
import * as offersController from "./offers.controller";

const router = Router();

/**
 * @swagger
 * /offers:
 *   get:
 *     tags: [Offers]
 *     summary: Get active offers
 *     responses:
 *       200: { description: List of offers }
 */
router.get("/", offersController.getOffers);

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     tags: [Offers]
 *     summary: Get offer details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Offer details }
 */
router.get("/:id", offersController.getOfferById);

export default router;
