import { Router } from "express";
import * as wishlistController from "./wishlist.controller";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import { addWishlistSchema } from "./wishlist.schema";

const router = Router();

/**
 * @swagger
 * /wishlist:
 *   get:
 *     tags: [Wishlist]
 *     summary: Get user's wishlist
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Wishlist items }
 *   post:
 *     tags: [Wishlist]
 *     summary: Add item to wishlist
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, name]
 *             properties:
 *               hotelId: { type: string }
 *               type: { type: string, enum: [HOTEL, FLIGHT] }
 *               name: { type: string }
 *               rating: { type: number }
 *     responses:
 *       201: { description: Added to wishlist }
 */
router.get("/", authenticate, wishlistController.getWishlist);
router.post("/", authenticate, validate(addWishlistSchema), wishlistController.addToWishlist);

/**
 * @swagger
 * /wishlist/{id}:
 *   delete:
 *     tags: [Wishlist]
 *     summary: Remove from wishlist
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Removed from wishlist }
 */
router.delete("/:id", authenticate, wishlistController.removeFromWishlist);

export default router;
