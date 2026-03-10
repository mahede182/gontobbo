import { Router } from "express";
import * as usersController from "./users.controller";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import {
  updateProfileSchema,
  updatePassportSchema,
  updateFlightPreferencesSchema,
  updateBaggageSchema,
} from "./users.schema";

const router = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: User profile }
 *   put:
 *     tags: [Users]
 *     summary: Update current user profile
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               username: { type: string }
 *               phone: { type: string }
 *               nationality: { type: string }
 *               address: { type: string }
 *               avatar: { type: string }
 *               gender: { type: string }
 *     responses:
 *       200: { description: Profile updated }
 */
router.get("/me", authenticate, usersController.getProfile);
router.put("/me", authenticate, validate(updateProfileSchema), usersController.updateProfile);

/**
 * @swagger
 * /users/me/passport:
 *   put:
 *     tags: [Users]
 *     summary: Update passport details
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Passport details updated }
 */
router.put(
  "/me/passport",
  authenticate,
  validate(updatePassportSchema),
  usersController.updatePassport,
);

/**
 * @swagger
 * /users/me/flight-preferences:
 *   put:
 *     tags: [Users]
 *     summary: Update flight preferences
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Flight preferences updated }
 */
router.put(
  "/me/flight-preferences",
  authenticate,
  validate(updateFlightPreferencesSchema),
  usersController.updateFlightPreferences,
);

/**
 * @swagger
 * /users/me/member-card:
 *   get:
 *     tags: [Users]
 *     summary: Get member card info
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Member card }
 */
router.get("/me/member-card", authenticate, usersController.getMemberCard);

/**
 * @swagger
 * /users/me/baggage:
 *   get:
 *     tags: [Users]
 *     summary: Get baggage preferences
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Baggage items }
 *   put:
 *     tags: [Users]
 *     summary: Update baggage preferences
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [type, name, weight]
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: Existing baggage ID (for updates)
 *                 type:
 *                   type: string
 *                   enum: [CABIN, CHECKED, SPECIAL]
 *                   example: CABIN
 *                 name:
 *                   type: string
 *                   example: Carry-on Bag
 *                 description:
 *                   type: string
 *                   example: Small cabin luggage
 *                 weight:
 *                   type: string
 *                   example: 7kg
 *                 dimensions:
 *                   type: string
 *                   example: 55x40x20 cm
 *                 status:
 *                   type: string
 *                   enum: [INCLUDED, EXTRA_FEE, NOT_ALLOWED]
 *                   example: INCLUDED
 *             example:
 *               - { type: CABIN, name: Carry-on Bag, weight: "7kg", dimensions: "55x40x20 cm", status: INCLUDED }
 *               - { type: CHECKED, name: Suitcase, weight: "23kg", dimensions: "75x50x30 cm", status: INCLUDED }
 *     responses:
 *       200: { description: Baggage updated }
 */
router.get("/me/baggage", authenticate, usersController.getBaggage);
router.put(
  "/me/baggage",
  authenticate,
  validate(updateBaggageSchema),
  usersController.updateBaggage,
);

export default router;
