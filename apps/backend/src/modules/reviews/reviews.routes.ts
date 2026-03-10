import { Router } from "express";
import * as reviewsController from "./reviews.controller";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import { createReviewSchema, updateReviewSchema } from "./reviews.schema";

const router = Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Create a review for a hotel
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [hotelId, rating, text]
 *             properties:
 *               hotelId: { type: string, format: uuid }
 *               rating: { type: number, minimum: 1, maximum: 5 }
 *               text: { type: string }
 *     responses:
 *       201: { description: Review created }
 */
router.post("/", authenticate, validate(createReviewSchema), reviewsController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Review details }
 *   put:
 *     tags: [Reviews]
 *     summary: Update own review
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Review updated }
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete own review
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Review deleted }
 */
router.get("/:id", reviewsController.getReview);
router.put("/:id", authenticate, validate(updateReviewSchema), reviewsController.updateReview);
router.delete("/:id", authenticate, reviewsController.deleteReview);

export default router;
