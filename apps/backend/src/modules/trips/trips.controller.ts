import { Request, Response, NextFunction } from "express";
import * as tripsService from "./trips.service";
import { successResponse } from "../../utils/apiResponse";

export async function getTrips(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await tripsService.getTrips(page, limit);
    successResponse(res, { data: result.data, meta: result.meta });
  } catch (error) {
    next(error);
  }
}

export async function getPopularTrips(req: Request, res: Response, next: NextFunction) {
  try {
    const trips = await tripsService.getPopularTrips();
    successResponse(res, { data: trips });
  } catch (error) {
    next(error);
  }
}

export async function getTripById(req: Request, res: Response, next: NextFunction) {
  try {
    const trip = await tripsService.getTripById(req.params.id);
    successResponse(res, { data: trip });
  } catch (error) {
    next(error);
  }
}
