import { Router } from "express";
import * as tagsController from "./tags.controller";

const router = Router();

/**
 * @swagger
 * /tags:
 *   get:
 *     tags: [Tags]
 *     summary: Get all active tags
 *     responses:
 *       200: { description: List of tags }
 */
router.get("/", tagsController.getTags);

export default router;
