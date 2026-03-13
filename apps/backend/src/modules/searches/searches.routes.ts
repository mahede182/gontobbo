import { Router } from "express";
import * as searchesController from "./searches.controller";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import { addRecentSearchSchema } from "./searches.schema";

const router = Router();

/**
 * @swagger
 * /searches/recent:
 *   get:
 *     tags: [Searches]
 *     summary: Get recent searches
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Recent searches grouped by type }
 *   post:
 *     tags: [Searches]
 *     summary: Save a recent search
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, query]
 *             properties:
 *               type: { type: string, enum: [HOTEL, FLIGHT] }
 *               query: { type: string }
 *     responses:
 *       201: { description: Search saved }
 *   delete:
 *     tags: [Searches]
 *     summary: Clear recent searches
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Searches cleared }
 */
router.get("/recent", authenticate, searchesController.getRecentSearches);
router.post(
  "/recent",
  authenticate,
  validate(addRecentSearchSchema),
  searchesController.addRecentSearch,
);
router.delete("/recent", authenticate, searchesController.clearRecentSearches);

export default router;
