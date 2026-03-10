import { Request, Response, NextFunction } from "express";
import * as notificationsService from "./notifications.service";
import { successResponse } from "../../utils/apiResponse";

export async function getNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await notificationsService.getNotifications(req.user!.id, page, limit);
    successResponse(res, {
      data: { notifications: result.data, unreadCount: result.unreadCount },
      meta: result.meta,
    });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const notification = await notificationsService.markAsRead(req.params.id, req.user!.id);
    successResponse(res, { data: notification });
  } catch (error) {
    next(error);
  }
}

export async function markAllAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    await notificationsService.markAllAsRead(req.user!.id);
    successResponse(res, { data: null, message: "All notifications marked as read" });
  } catch (error) {
    next(error);
  }
}
