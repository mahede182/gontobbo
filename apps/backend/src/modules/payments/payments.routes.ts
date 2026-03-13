import { Router } from "express";
import * as paymentsController from "./payments.controller";
import { validate } from "../../middleware/validate";
import { authenticate } from "../../middleware/auth";
import { addPaymentMethodSchema } from "./payments.schema";

const router = Router();

/**
 * @swagger
 * /payments/methods:
 *   get:
 *     tags: [Payments]
 *     summary: Get payment methods
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of payment methods }
 *   post:
 *     tags: [Payments]
 *     summary: Add payment method
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, name]
 *             properties:
 *               type: { type: string, enum: [CREDIT_CARD, PAYPAL, MASTER_CARD, BKASH] }
 *               name: { type: string }
 *               last4: { type: string }
 *               isDefault: { type: boolean }
 *     responses:
 *       201: { description: Payment method added }
 */
router.get("/methods", authenticate, paymentsController.getPaymentMethods);
router.post(
  "/methods",
  authenticate,
  validate(addPaymentMethodSchema),
  paymentsController.addPaymentMethod,
);

/**
 * @swagger
 * /payments/methods/{id}:
 *   delete:
 *     tags: [Payments]
 *     summary: Remove payment method
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Payment method removed }
 */
router.delete("/methods/:id", authenticate, paymentsController.removePaymentMethod);

export default router;
