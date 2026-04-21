import { Request, Response, NextFunction } from "express";
import * as adminService from "./admin.service";
import { successResponse } from "../../utils/apiResponse";

// ─── Dashboard ──────────────────────────────────────────────────────────────

export async function getDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const dashboard = await adminService.getDashboard();
    successResponse(res, { data: dashboard });
  } catch (error) {
    next(error);
  }
}

// ─── Users ──────────────────────────────────────────────────────────────────

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await adminService.getUsers(page, limit);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await adminService.getUserById(req.params.id);
    successResponse(res, { data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    successResponse(res, { data: user, message: "User updated" });
  } catch (error) {
    next(error);
  }
}

// ::: Bookings :::
export async function getBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await adminService.getBookings(
      page,
      limit,
      req.query.status as string,
      req.query.type as string,
    );
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await adminService.updateBookingStatus(req.params.id, req.body.status);
    successResponse(res, { data: booking, message: "Booking status updated" });
  } catch (error) {
    next(error);
  }
}

// ─── Hotels ─────────────────────────────────────────────────────────────────

export async function createHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await adminService.createHotel(req.body);
    successResponse(res, { data: hotel, message: "Hotel created", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function updateHotel(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await adminService.updateHotel(req.params.id, req.body);
    successResponse(res, { data: hotel, message: "Hotel updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteHotel(req: Request, res: Response, next: NextFunction) {
  try {
    await adminService.deleteHotel(req.params.id);
    successResponse(res, { data: null, message: "Hotel deleted" });
  } catch (error) {
    next(error);
  }
}

// ─── Rooms ──────────────────────────────────────────────────────────────────

export async function createRoom(req: Request, res: Response, next: NextFunction) {
  try {
    const room = await adminService.createRoom(req.params.hotelId, req.body);
    successResponse(res, { data: room, message: "Room created", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function updateRoom(req: Request, res: Response, next: NextFunction) {
  try {
    const room = await adminService.updateRoom(req.params.id, req.body);
    successResponse(res, { data: room, message: "Room updated" });
  } catch (error) {
    next(error);
  }
}

export async function getRooms(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const hotelId = req.query.hotelId as string;
    const result = await adminService.getRooms(page, limit, hotelId);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function getRoomById(req: Request, res: Response, next: NextFunction) {
  try {
    const room = await adminService.getRoomById(req.params.id);
    successResponse(res, { data: room });
  } catch (error) {
    next(error);
  }
}

// ─── Trips ──────────────────────────────────────────────────────────────────

export async function createTrip(req: Request, res: Response, next: NextFunction) {
  try {
    const trip = await adminService.createTrip(req.body);
    successResponse(res, { data: trip, message: "Trip created", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function updateTrip(req: Request, res: Response, next: NextFunction) {
  try {
    const trip = await adminService.updateTrip(req.params.id, req.body);
    successResponse(res, { data: trip, message: "Trip updated" });
  } catch (error) {
    next(error);
  }
}

// ─── Notifications ──────────────────────────────────────────────────────────

export async function broadcastNotification(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await adminService.broadcastNotification(req.body);
    successResponse(res, {
      data: result,
      message: `Notification sent to ${result.sent} users`,
    });
  } catch (error) {
    next(error);
  }
}
