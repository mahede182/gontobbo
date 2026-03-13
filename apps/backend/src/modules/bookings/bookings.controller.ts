import { Request, Response, NextFunction } from "express";
import * as bookingsService from "./bookings.service";
import { successResponse } from "../../utils/apiResponse";

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingsService.createBooking(req.user!.id, req.body);
    successResponse(res, { data: booking, message: "Booking created", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}

export async function getBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await bookingsService.getBookings(req.user!.id, req.query as any);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function getBookingById(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingsService.getBookingById(req.params.id, req.user!.id);
    successResponse(res, { data: booking });
  } catch (error) {
    next(error);
  }
}

export async function cancelBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingsService.cancelBooking(req.params.id, req.user!.id);
    successResponse(res, { data: booking, message: "Booking cancelled" });
  } catch (error) {
    next(error);
  }
}

export async function addTraveller(req: Request, res: Response, next: NextFunction) {
  try {
    const traveller = await bookingsService.addTraveller(req.params.id, req.user!.id, req.body);
    successResponse(res, { data: traveller, message: "Traveller added", statusCode: 201 });
  } catch (error) {
    next(error);
  }
}
