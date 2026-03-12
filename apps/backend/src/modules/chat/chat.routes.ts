import { Router } from "express";
import passport from "../../config/passport";
import { chatHandler } from "./chat.controller";

const router = Router();

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a message to Gontobbo AI
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: AI reply
 */
router.post("/", passport.authenticate("jwt", { session: false }) as any, chatHandler as any);

export default router;
